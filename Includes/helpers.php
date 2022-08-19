<?php

function smpl_log($data) {
    error_log(print_r($data, true));
}

function smpl_verify_request($data) {
    if (wp_verify_nonce($data['nonce'], SIMPLE_POLL_NONCE)
        && check_ajax_referer(SIMPLE_POLL_NONCE, 'nonce')
        && is_user_logged_in()
        && current_user_can('administrator')
    ) {
        return true;
    }

    return false;
}

function smpl_verify_nonce($data) {
    if (wp_verify_nonce($data['nonce'], SIMPLE_POLL_NONCE)
        && check_ajax_referer(SIMPLE_POLL_NONCE, 'nonce')
    ) {
        return true;
    }

    return false;
}

// save poll.
function handle_create_poll() {
    global $wpdb;
    $response['status'] = true;
    if (smpl_verify_request($_POST)) {

        $question = isset($_POST['question']) ? sanitize_text_field($_POST['question']) : '';

        // update question if id exists.
        if (isset($_POST['id'])) {

            $res = $wpdb->update($wpdb->smpl_question, array('smpl_qid' => $_POST['id'], 'smpl_question' => __($question, 'simple-poll-for-wp')), array('smpl_qid' => $_POST['id']));

            //TODO update all answers;
            // if (isset($_POST['question_answers'])) {
            //     $answers = explode(',', $_POST['question_answers']);
            //     $results = $wpdb->get_results("SELECT smpl_aid, smpl_qid, smpl_answers FROM $wpdb->smpl_answer WHERE smpl_qid = $uid ");
            // }
            $response['data'] = get_polls_data();

        } else {

            $res = $wpdb->insert($wpdb->smpl_question, array('smpl_question' => __($question, 'simple-poll-for-wp'), 'smpl_timestamp' => current_time('timestamp'), 'smpl_totalvotes' => 0), array('%s', '%s', '%d'));

            $qid = $wpdb->insert_id;
            if (isset($_POST['question_answers'])) {
                $answers = explode(',', $_POST['question_answers']);
                foreach ($answers as $answer) {
                    $answer = sanitize_text_field($answer);
                    $wpdb->insert($wpdb->smpl_answer, array('smpl_qid' => $qid, 'smpl_answers' => __($answer, 'simple-poll-for-wp'), 'smpl_votes' => 0), array('%d', '%s', '%d'));
                }
            }

            if ($res) {
                $response['data'] = get_polls_data();
            } else {
                $response['data'] = $GLOBALS['wp_query']->request;
            }
        }

    } else {
        $response['status'] = false;
        $response['data'] = __('Nonce verified request');
    }

    echo json_encode($response);
    wp_die();
}

// Get all poll data.
function handle_get_polls() {
    $response['status'] = true;
    if (smpl_verify_request($_POST)) {
        $response['data'] = get_polls_data();
    } else {
        $response['status'] = false;
        $response['data'] = __('Nonce verified request');
    }

    echo json_encode($response);
    wp_die();
}

// Get poll data.
function handle_get_poll() {
    $response['status'] = true;
    if (smpl_verify_nonce($_POST)) {
        $id = isset($_POST['id']) ? $_POST['id'] : null;
        $response['data'] = get_single_poll($id);
    } else {
        $response['status'] = false;
        $response['data'] = __('Nonce verified request');
    }

    echo json_encode($response);
    wp_die();
}

// Delete single poll
function handle_delete_poll() {
    global $wpdb;
    $response['status'] = true;
    if (smpl_verify_request($_POST)) {
        $id = $_POST['id'];
        $wpdb->delete($wpdb->smpl_question, array('smpl_qid' => $id), array('%d'));

        $wpdb->query("DELETE FROM $wpdb->smpl_answer WHERE smpl_qid = $id ");

        $response['data'] = get_polls_data();
    } else {
        $response['status'] = false;
        $response['data'] = __('Nonce verified request');
    }

    echo json_encode($response);
    wp_die();
}

// Get all polls data.
function get_polls_data() {
    global $wpdb;
    $questions = $wpdb->get_results("SELECT * from $wpdb->smpl_question");
    foreach ($questions as $question) {
        $answers = $wpdb->get_results("SELECT * from $wpdb->smpl_answer WHERE  smpl_qid = $question->smpl_qid");
        $data[] = [
            'id' => $question->smpl_qid,
            'question' => $question->smpl_question,
            'answers' => $answers,
            'totalvotes' => $question->smpl_totalvotes,
        ];
    }

    return $data;
}


// Get single poll.
function get_single_poll($question_id = null) {
    global $wpdb;
    if ($question_id) {
        $questions = $wpdb->get_results("SELECT * from $wpdb->smpl_question WHERE smpl_qid = $question_id");
    } else {
        $questions = $wpdb->get_results("SELECT * from $wpdb->smpl_question  ORDER BY smpl_qid DESC LIMIT 1");
    }

    $data = [];
    if (count($questions)) {
        foreach ($questions as $question) {
            $answers = $wpdb->get_results("SELECT * from $wpdb->smpl_answer WHERE  smpl_qid = $question->smpl_qid");
            $data[] = [
                'id' => $question->smpl_qid,
                'question' => $question->smpl_question,
                'answers' => $answers,
                'totalvotes' => $question->smpl_totalvotes,
            ];
        }
    }

    return $data;
}



function get_shorcode_content( $attrs ) {
    $poll_id = isset($attrs['id']) ? $attrs['id'] : null;
    $poll = get_single_poll($poll_id);
    if (isset($poll[0])) {
        $poll = $poll[0];
        $current_answer_id = get_current_user_answer_id($poll['id']);
        $poll['current_answer_id'] = $current_answer_id;

    } else {

        $str = "<h3>There is no poll.</h3>";
        $arr = array('h3' => array());
        echo wp_kses($str, $arr);
        return;
    }
    ob_start();
    ?>
    <div class='sample_poll_block' id="smpl_block_<?php echo $poll['id']; ?>">
        <?php do_action('smpl_before_question', $poll['question'])?>
        <h3><?php echo esc_html__($poll['question'], 'simple-poll-for-wp') ?></h3>
        <?php do_action('smpl_after_question', $poll['question'])?>
        <div class='poll_answers'>
        <?php
        do_action('smpl_before_question_answer', $poll['answers']);
        $poll_answers = apply_filters('smple_poll_answers', $poll['answers']);
        if (($poll['answers'])) {
            foreach ($poll_answers as $answer) {
                ?>
                    <input
                        type='radio'
                        name='smpl_answers'
                        value="<?php echo $answer->smpl_answers; ?>"
                        <?php echo ($answer->smpl_aid == $poll['current_answer_id']) ? "checked" : ''; ?>
                        onchange='submitVote(<?php echo json_encode($answer) ?> , <?php echo $poll["totalvotes"]; ?>)'
                        id="smpl_answers_<?php echo $answer->smpl_aid; ?>"/>
                    <label for="answer.smpl_answers_<?php echo $answer->smpl_aid; ?>">
                        <?php echo __($answer->smpl_answers, 'simple-poll-for-wp') ?>;
                    </label>
                    <?php
                }
            }   
            do_action('smpl_after_question_answer', $poll['answers']);
            ?>
		</div>
	</div>
    <?php return ob_get_clean();
}

// Get last poll data.
function handle_get_last_poll() {

    $response['status'] = true;
    if (smpl_verify_nonce($_POST)) {
        $poll = get_single_poll();
        if (isset($poll[0])) {
            $current_answer_id = get_current_user_answer_id($poll[0]['id']);
            $poll[0]['current_answer_id'] = $current_answer_id;

            $response['data'] = $poll;
        }

    } else {
        $response['status'] = false;
        $response['data'] = __('Nonce verified request');
    }

    echo json_encode($response);
    wp_die();
}

function get_current_user_answer_id($qid) {
    global $wpdb;
    $ip = $_SERVER['REMOTE_ADDR'];
    $vote = $wpdb->get_results("SELECT * from $wpdb->smpl_votes WHERE smpl_ip = '" . $ip . "' AND smpl_qid = $qid LIMIT 1");
    if (isset($vote[0])) {
        return $vote[0]->smpl_aid;
    }

    return '';

}

// Give vote.
function handle_give_vote() {
    global $wpdb;
    global $current_user;
    $response['status'] = true;
    if (smpl_verify_nonce($_POST)) {

        $ip = $_SERVER['REMOTE_ADDR'];
        $host = $_SERVER['HTTP_HOST'];
        $qid = $_POST['smpl_qid'];
        $aid = $_POST['smpl_aid'];
        $totalvotes = (int) $_POST['totalvotes'];

        if (is_user_logged_in()) { // current logged in user.
            global $current_user;
            $username = $current_user->data->user_login;
            $id = $current_user->ID;

            // if current user already given answer then update the answer. else insert answer.
            $vote = $wpdb->get_results("SELECT * from $wpdb->smpl_votes WHERE smpl_user = '" . $username . "' AND smpl_ip = '" . $ip . "' AND smpl_qid = $qid LIMIT 1");
            if (count($vote) && $vote[0]->smpl_aid != $aid) {

                $wpdb->update($wpdb->smpl_votes,
                    array(
                        'smpl_aid' => $aid,
                        'smpl_timestamp' => current_time('timestamp')),

                    array('smpl_vid' => $vote[0]->smpl_vid));

                update_vote($wpdb, $vote, $aid);

            } else if (count($vote) == 0) {
                $wpdb->insert($wpdb->smpl_votes,
                    array(
                        'smpl_qid' => $qid,
                        'smpl_aid' => $aid,
                        'smpl_ip' => $ip,
                        'smpl_host' => $host,
                        'smpl_timestamp' => current_time('timestamp'),
                        'smpl_user' => $username,
                        'smpl_userid' => $id,
                    ),
                    array('%d', '%d', '%s', '%s', '%s', '%s', '%d'));

                // update total vote.
                $totalvotes = ++$totalvotes;
                $wpdb->update($wpdb->smpl_question, array('smpl_qid' => $qid, 'smpl_totalvotes' => (string) $totalvotes), array('smpl_qid' => $qid));

                update_vote($wpdb, $vote, $aid);

            }

        } else { // geust user.
            // if current user already given answer then update the answer. else insert answer.
            $vote = $wpdb->get_results("SELECT * from $wpdb->smpl_votes WHERE smpl_ip = '" . $ip . "' AND smpl_qid = $qid LIMIT 1");
            if (count($vote) && $vote[0]->smpl_aid != $aid) {
                $wpdb->update($wpdb->smpl_votes,
                    array(
                        'smpl_aid' => $aid,
                        'smpl_timestamp' => current_time('timestamp')),

                    array('smpl_vid' => $vote[0]->smpl_vid));
                update_vote($wpdb, $vote, $aid);
            } else if (count($vote) == 0) {
                $wpdb->insert($wpdb->smpl_votes,
                    array(
                        'smpl_qid' => $qid,
                        'smpl_aid' => $aid,
                        'smpl_ip' => $ip,
                        'smpl_host' => $host,
                        'smpl_timestamp' => current_time('timestamp'),
                        'smpl_user' => '',
                        'smpl_userid' => ''),

                    array('%d', '%d', '%s', '%s', '%s', '%s', '%d'));

                // update total vote.
                $totalvotes = ++$totalvotes;
                $wpdb->update($wpdb->smpl_question, array('smpl_qid' => $qid, 'smpl_totalvotes' => (string) $totalvotes), array('smpl_qid' => $qid));

                update_vote($wpdb, $vote, $aid);
            }
        }

        $response['data'] = true;

    } else {
        $response['status'] = false;
        $response['data'] = __('Nonce verified request');
    }

    echo json_encode($response);
    wp_die();
}

function update_vote($wpdb, $vote, $aid) {
    // Decrease vote from previous answer.
    if (isset($vote[0])) {
        $prev_aid = $vote[0]->smpl_aid;
        $previous_answer = $wpdb->get_results("SELECT * from $wpdb->smpl_answer WHERE smpl_aid = $prev_aid LIMIT 1");
        $previous_answer_votes = (int) $previous_answer[0]->smpl_votes;
        if ($previous_answer_votes) {
            $previous_answer_votes = --$previous_answer_votes;
            $wpdb->update($wpdb->smpl_answer,
                array(
                    'smpl_votes' => (string) $previous_answer_votes),
                array('smpl_aid' => $prev_aid));
        }
    }

    // increase current answer votes.
    $current_answer = $wpdb->get_results("SELECT * from $wpdb->smpl_answer WHERE smpl_aid = $aid LIMIT 1");
    if (isset($current_answer[0])) {
        $current_answer_votes = (int) $current_answer[0]->smpl_votes;
        if ($current_answer_votes) {
            $current_answer_votes = ++$current_answer_votes;
            $wpdb->update($wpdb->smpl_answer,
                array(
                    'smpl_votes' => (string) $current_answer_votes),
                array('smpl_aid' => $prev_aid));
        }
    }
}

// Get recent post
function handle_give_block_vote() {
    global $wpdb;
    $response['status'] = true;
    if (smpl_verify_nonce($_POST)) {

        $data = json_decode(str_replace('\\', '', $_POST['data']));

        $response['data'] = $data;
    } else {
        $response['status'] = false;
        $response['data'] = __('Nonce verified request');
    }

    echo json_encode($response);
    wp_die();
}
