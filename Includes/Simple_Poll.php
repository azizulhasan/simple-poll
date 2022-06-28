<?php

namespace WPSimplePoll;

use WPSimplePoll\Simple_Poll_i18n;
use WPSimplePoll\Simple_Poll_Loader;
use WPSimplePoll_Admin\Simple_Poll_Admin;

/**
 * The file that defines the core plugin class
 *
 * A class definition that Includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       http://azizulhasan.com
 * @since      1.0.0
 *
 * @package    Simple_Poll
 * @subpackage Simple_Poll/Includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Simple_Poll
 * @subpackage Simple_Poll/Includes
 * @author     Azizul Hasan <azizulhasan.cr@gmail.com>
 */

class Simple_Poll
{

    /**
     * The loader that's responsible for maintaining and registering all hooks that power
     * the plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      Simple_Poll_Loader    $loader    Maintains and registers all hooks for the plugin.
     */
    protected $loader;

    /**
     * The unique identifier of this plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      string    $plugin_name    The string used to uniquely identify this plugin.
     */
    protected $plugin_name;

    /**
     * The current version of the plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      string    $version    The current version of the plugin.
     */
    protected $version;

    /**
     * Define the core functionality of the plugin.
     *
     * Set the plugin name and the plugin version that can be used throughout the plugin.
     * Load the dependencies, define the locale, and set the hooks for the admin area and
     * the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function __construct()
    {
        if (defined('SIMPLE_POLL_VERSION')) {
            $this->version = SIMPLE_POLL_VERSION;
        } else {
            $this->version = '1.0.0';
        }
        $this->plugin_name = 'wp-simple-poll';

        $this->load_dependencies();
        $this->set_locale();
        $this->define_hooks();
    }

    /**
     * Load the required dependencies for this plugin.
     *
     * @since    1.0.0
     * @access   private
     */
    private function load_dependencies()
    {

        require_once plugin_dir_path(dirname(__FILE__)) . 'Includes/helpers.php';
        require_once plugin_dir_path(dirname(__FILE__)) . 'Includes/Simple_Poll_Hooks.php';
        new Simple_Poll_Hooks();
        $this->loader = new Simple_Poll_Loader();

    }

    /**
     * Define the locale for this plugin for internationalization.
     *
     * Uses the Simple_Poll_i18n class in order to set the domain and to register the hook
     * with WordPress.
     *
     * @since    1.0.0
     * @access   private
     */
    private function set_locale()
    {

        $plugin_i18n = new Simple_Poll_i18n();
        $this->loader->add_action('plugins_loaded', $plugin_i18n, 'load_plugin_textdomain');

    }

    /**
     * Register all of the hooks related to the admin area functionality
     * of the plugin.
     *
     * @since    1.0.0
     * @access   private
     */
    private function define_hooks()
    {

        $plugin_admin = new Simple_Poll_Admin($this->get_plugin_name(), $this->get_version());
        
        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_styles', 999999);
        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts', 99999);
        $this->loader->add_action('admin_menu', $plugin_admin, 'simple_poll_menu');
        $this->loader->add_action('wp_enqueue_scripts', $plugin_admin, 'enqueue_simple_poll', 99999);

    }

    /**
     * Run the loader to execute all of the hooks with WordPress.
     *
     * @since    1.0.0
     */
    public function run()
    {
        $this->loader->run();
    }

    /**
     * The name of the plugin used to uniquely identify it within the context of
     * WordPress and to define internationalization functionality.
     *
     * @since     1.0.0
     * @return    string    The name of the plugin.
     */
    public function get_plugin_name()
    {
        return $this->plugin_name;
    }

    /**
     * The reference to the class that orchestrates the hooks with the plugin.
     *
     * @since     1.0.0
     * @return    Simple_Poll_Loader    Orchestrates the hooks of the plugin.
     */
    public function get_loader()
    {
        return $this->loader;
    }

    /**
     * Retrieve the version number of the plugin.
     *
     * @since     1.0.0
     * @return    string    The version number of the plugin.
     */
    public function get_version()
    {
        return $this->version;
    }

}
