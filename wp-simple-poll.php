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

// smpl_log('asdfasdf');