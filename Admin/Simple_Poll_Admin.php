<?php
namespace WPSimplePoll_Admin;

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://azizulhasan.com
 * @since      1.0.0
 *
 * @package    Simple_Poll
 * @subpackage Simple_Poll/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Simple_Poll
 * @subpackage Simple_Poll/admin
 * @author     Azizul Hasan <azizulhasan.cr@gmail.com>
 */
class Simple_Poll_Admin {

    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $plugin_name    The ID of this plugin.
     */
    private $plugin_name;

    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $version    The current version of this plugin.
     */
    private $version;

    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     * @param      string    $plugin_name       The name of this plugin.
     * @param      string    $version    The version of this plugin.
     */
    public function __construct($plugin_name, $version) {

        $this->plugin_name = $plugin_name;
        $this->version = $version;

    }

    /**
     * Register the stylesheets for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_styles() {
        /* Dashicons */
        wp_enqueue_style('dashicons');
        if (isset($_REQUEST['page']) && (SIMPLE_POLL_TEXT_DOMAIN == $_REQUEST['page'])) {
            wp_enqueue_style('wp-smpl-bootstrap', plugin_dir_url(__FILE__) . 'css/bootstrap.css', [], false, 'all');
        }
        wp_enqueue_style('wp-smpl-css', plugin_dir_url(__FILE__) . 'css/simple-poll.css', [], false, 'all');

    }

    public function engueue_block_scripts() {

        wp_enqueue_script('smpl-poll-block', plugin_dir_url(dirname(__FILE__)) . 'build/smpl-block.js', array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'), true, true);
        wp_localize_script('smpl-poll-block', 'smpl_block', [
            'admin_url' => admin_url('/'),
            'ajax_url' => admin_url('admin-ajax.php'),
            'image_url' => WP_PLUGIN_URL . '/simple-poll/admin/images',
            'plugin_url' => WP_PLUGIN_URL . '/simple-poll',
            'nonce' => wp_create_nonce(SIMPLE_POLL_NONCE),
            'post_types' => get_post_types(),
            'is_logged_in' => is_user_logged_in(),
            'is_admin' => current_user_can('administrator'),
        ]);

        wp_register_script('simple-poll', plugin_dir_url(__FILE__) . 'js/simple-poll.js', array(), true, true);
        wp_enqueue_script('simple-poll');
        register_block_type('smpl/poll', [
            'script' => 'simple-poll',
            'render_callback' => [$this, 'render_poll'],
        ]);
        wp_localize_script('simple-poll', 'smpl', [
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce(SIMPLE_POLL_NONCE),
        ]);

    }

    /**
     * Register the JavaScript for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts() {

        if (isset($_REQUEST['page']) && (SIMPLE_POLL_TEXT_DOMAIN == $_REQUEST['page'])) {
            //Load react js.
            wp_enqueue_script('simple-poll-dashboard', plugin_dir_url(__FILE__) . 'js/simple-poll-dashboard.js', array(), $this->version, true);
            wp_localize_script('simple-poll-dashboard', 'smpl', [
                'admin_url' => admin_url('/'),
                'ajax_url' => admin_url('admin-ajax.php'),
                'image_url' => WP_PLUGIN_URL . '/simple-poll/admin/images',
                'plugin_url' => WP_PLUGIN_URL . '/simple-poll',
                'nonce' => wp_create_nonce(SIMPLE_POLL_NONCE),
                'post_types' => get_post_types(),
                'is_logged_in' => is_user_logged_in(),
                'is_admin' => current_user_can('administrator'),
            ]);

        }

    }

    public function render_poll($attrs) {
         return  get_shorcode_content( $attrs );
    }

    /**
     * Add Menu and Submenu page
     */

    public function simple_poll_menu() {
        add_menu_page(
            __('Simple Poll', SIMPLE_POLL_TEXT_DOMAIN),
            __('Simple Poll', SIMPLE_POLL_TEXT_DOMAIN),
            'manage_options',
            SIMPLE_POLL_TEXT_DOMAIN,
            array($this, "simple_poll_settings"),
            'dashicons-chart-bar',
            20
        );
    }

    public function simple_poll_settings() {
        echo "<div class='wpwrap'><div id='app'></div></div>";
    }

}
