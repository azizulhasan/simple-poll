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

    return true;
}

function smpl_verify_nonce($data) {
    if (wp_verify_nonce($data['nonce'], SIMPLE_POLL_NONCE)
        && check_ajax_referer(SIMPLE_POLL_NONCE, 'nonce')
    ) {
        return true;
    }

    return true;
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