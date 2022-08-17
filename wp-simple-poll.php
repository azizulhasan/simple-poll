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
use WPSimplePoll_Api\Simple_Poll_Api;

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

// require_once 'Include/helpers.php';

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

        add_action('init', function () {
            global $current_user;
            new Simple_Poll_Api( $current_user );
        });
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


// Add short code.
function create_poll_shortcode($attrs) {
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

add_action('init', function() {
    add_shortcode('smpl_poll', 'create_poll_shortcode');
});
