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

add_action('wp_ajax_create_poll', 'handle_create_poll');
add_action('wp_ajax_get_polls', 'handle_get_polls');
add_action('wp_ajax_delete_poll', 'handle_delete_poll');

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
        $response['data'] = 'Nonce verified request';
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
        $response['data'] = 'Nonce verified request';
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
        $response['data'] = 'Nonce verified request';
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