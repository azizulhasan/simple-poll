<?php
namespace WPSimplePoll;

/**
 * Fired during plugin activation
 *
 * @link       http://azizulhasan.com
 * @since      1.0.0
 *
 * @package    Simple_Poll
 * @subpackage Simple_Poll/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Simple_Poll
 * @subpackage Simple_Poll/includes
 * @author     Azizul Hasan <azizulhasan.cr@gmail.com>
 */
class Simple_Poll_Activator {

    /**
     * Short Description. (use period)
     *
     * Long Description.
     *
     * @since    1.0.0
     */
    public static function activate() {
        /**
         * Customization settings.
         */
        update_option('wps_customize_settings', array
            (
                "backgroundColor" => "#184c53",
                "color" => "#ffffff",
                "width" => "100",
                'custom_css' => '',
                'wps_play_btn_shortcode' => '[wps_listen_btn]',
            ));

        /**
         * WP Speech settings.
         */
        update_option('wps_settings_data', array
            (
                "wps__settings_allow_recording_for_post_type" => ["all"],
                "wps__settings_display_btn_in_single_page" => '',
            ));

        /**
         * Listening settings.
         */
        update_option('wps_listening_settings', array
            (
                "wps__listening_voice" => "Microsoft Mark - English (United States)",
                "wps__listening_pitch" => 1,
                "wps__listening_rate" => 1,
                "wps__listening_volume" => 1,
                "wps__listening_lang" => "en-AU",
            ));

        /**
         * Recording settings.
         */
        update_option('wps_record_settings', array
            (
                "is_record_continously" => true,
                "wps__recording__lang" => "en-AU",
                "wps__sentence_delimiter" => ".",
            ));

    }

}
