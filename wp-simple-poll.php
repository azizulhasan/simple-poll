<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://azizulhasan.com
 * @since             1.0.0
 * @package           simple_poll
 *
 * @wordpress-plugin
 * Plugin Name:       Wp Simple Poll
 * Description:       Polling system in wordpress.
 * Version:           1.0.0
 * Author:            Azizul Hasan
 * Author URI:        http://azizulhasan.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       simple-poll-for-wp
 * Domain Path:       /languages
 */
include 'vendor/autoload.php';

use WPSimplePoll\Simple_Poll;
use WPSimplePoll\Simple_Poll_Activator;
use WPSimplePoll\Simple_Poll_Deactivator;

global $wpdb;
$wpdb->smpl_question = $wpdb->prefix . 'smpl_question';
$wpdb->smpl_answer = $wpdb->prefix . 'smpl_answer';
$wpdb->smpl_votes = $wpdb->prefix . 'smpl_votes';

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

// Absolute path to the WordPress directory.
if (!defined('ABSPATH')) {
    define('ABSPATH', dirname(__FILE__) . '/');
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */

if (!defined('SIMPLE_POLL_VERSION')) {

    define('SIMPLE_POLL_VERSION', '1.0.0');
}

if (!defined('SIMPLE_POLL_NONCE')) {

    define('SIMPLE_POLL_NONCE', 'SIMPLE_POLL_NONCE');
}

if (!defined('SIMPLE_POLL_TEXT_DOMAIN')) {

    define('SIMPLE_POLL_TEXT_DOMAIN', 'simple-poll-for-wp');
}

if (!defined('SIMPLE_POLL_PLUGIN_DIR_URL')) {

    define('SIMPLE_POLL_PLUGIN_DIR_URL', plugin_dir_url(__FILE__));
}

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */

class Init {

    public function __construct() {

        $this->run_simple_poll();
    }

    public function run_simple_poll() {
        $plugin = new Simple_Poll();
        $plugin->run();
    }

    /**
     * The code that runs during plugin activation.
     * This action is documented in includes/Simple_Poll_Activator.php
     */
    public function activate_simple_poll() {
        Simple_Poll_Activator::activate();
    }

    /**
     * The code that runs during plugin deactivation.
     * This action is documented in includes/Simple_Poll_Deactivator.php
     */
    public function deactivate_simple_poll() {
        Simple_Poll_Deactivator::deactivate();
    }
}

$WPSimplePoll = new Init();

register_activation_hook(__FILE__, [$WPSimplePoll, 'activate_simple_poll']);
register_deactivation_hook(__FILE__, [$WPSimplePoll, 'deactivate_simple_poll']);

// Hooks.
add_action('wp_ajax_create_poll', 'handle_create_poll');
add_action('wp_ajax_get_polls', 'handle_get_polls');
add_action('wp_ajax_delete_poll', 'handle_delete_poll');
add_action('wp_ajax_get_last_poll', 'handle_get_last_poll');
add_action('wp_ajax_give_vote', 'handle_give_vote');

function handle_create_poll() {
    global $wpdb;
    $response['status'] = true;
    if (smpl_verify_request($_POST)) {

        $question = isset($_POST['question']) ? sanitize_text_field($_POST['question']) : '';

        // update question if id exists.
        if (isset($_POST['id'])) {
            $uid = $_POST['id'];
            $wpdb->update($wpdb->smpl_question, array('smpl_qid' => $_POST['id'], 'smpl_question' => __($question, 'simple-poll-for-wp')), array('smpl_qid' => $_POST['id']));

            //TODO update all answers;
            // if (isset($_POST['question_answers'])) {
            //     $answers = explode(',', $_POST['question_answers']);
            //     $results = $wpdb->get_results("SELECT smpl_aid, smpl_qid, smpl_answers FROM $wpdb->smpl_answer WHERE smpl_qid = $uid ");
            // }

            $response['data'] = get_polls_data();

        } else {
            $wpdb->insert($wpdb->smpl_question, array('smpl_question' => __($question, 'simple-poll-for-wp'), 'smpl_timestamp' => current_time('timestamp'), 'smpl_totalvotes' => 0), array('%s', '%s', '%d'));

            $qid = $wpdb->insert_id;
            if (isset($_POST['question_answers'])) {
                $answers = explode(',', $_POST['question_answers']);
                foreach ($answers as $answer) {
                    $answer = sanitize_text_field($answer);
                    $wpdb->insert($wpdb->smpl_answer, array('smpl_qid' => $qid, 'smpl_answers' => __($answer, 'simple-poll-for-wp'), 'smpl_votes' => 0), array('%d', '%s', '%d'));
                }
            }

            $response['data'] = get_polls_data();
        }

    } else {
        $response['status'] = false;
        $response['data'] = __('Nonce verified request');
    }

    echo json_encode($response);
    wp_die();
}

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

// Get last poll data.
function handle_get_last_poll() {

    $response['status'] = true;
    if (smpl_verify_nonce($_POST)) {
        $poll = get_single_poll(12);
        if (isset($poll)) {
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

// Add short code.
function create_poll_shortcode($attrs) {
    $poll_id = isset($attrs['id']) ? $attrs['id'] : null;
    $poll = get_single_poll($poll_id)[0];
    // echo "<pre>";
    // print_r($poll);
    // return;
    ?>
    <script >


        // import {postData} from    '<?php echo SIMPLE_POLL_PLUGIN_DIR_URL; ?>Admin/js/block/utilities.js'




         function submitVote(e) {
		// e.stopPropagation();
		// e.target.checked = true;
        console.log('answer')
		// let form = new FormData();
		// form.append('nonce', smpl_block.nonce);
		// form.append('smpl_qid', answer.smpl_qid);
		// form.append('smpl_aid', answer.smpl_aid);
		// form.append('smpl_votes', answer.smpl_votes);
		// form.append('totalvotes', totalvotes);
		// form.append('action', 'give_vote');
		// postData(smpl_block.ajax_url, form).then((res) => {
		// 	if (res.data) {
		// 		alert('Your vote is saved.');
		// 	}
		// });
	};

    </script>
    <div class='sample_poll_block' id="smpl_block_<?php echo $poll['id']; ?>">
			<h3><?php echo esc_html__($poll['question']) ?></h3>
            <div class='poll_answers'>
                <?php
if (($poll['answers'])) {
        foreach ($poll['answers'] as $answer) {
            ?>
                                <input
                                    type='radio'
                                    name='smpl_answers'
                                    value="<?php echo $answer->smpl_answers; ?>"
                                    checked=""
                                    onchange="submitVote(this)"
                                    id="smpl_answers_<?php echo $poll['id']; ?>"/>
                                        <label for={answer.smpl_answers}>
                                            <?php echo __($answer->smpl_answers) ?>;
                                        </label>
                                <?php
}
    }
    ?>

			</div>
		</div>
        <?php
}

add_shortcode('smpl_poll', 'create_poll_shortcode');