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
class Simple_Poll_Hooks {

    public function __construct() {
        // Hooks.
        add_action('wp_ajax_create_poll', 'handle_create_poll');
        add_action('wp_ajax_get_polls', 'handle_get_polls');
        add_action('wp_ajax_get_poll', 'handle_get_poll');
        add_action('wp_ajax_delete_poll', 'handle_delete_poll');
        add_action('wp_ajax_get_last_poll', 'handle_get_last_poll');
        add_action('wp_ajax_give_vote', 'handle_give_vote');
        add_action('wp_ajax_give_block_vote', 'handle_give_block_vote');
        // add_action('add_meta_boxes', array($this, 'add_custom_meta_box'));
    }

    /**
     * Register MetaBox to add PDF Download Button
     */
    public function add_custom_meta_box() {

        $meta_box_arr = [
            "post",
            "product",
            "page",
        ];
        $settings = (array) get_option('smpl_settings_data');
        $settings['smpl__settings_allow_recording_for_post_type'] = isset($settings['smpl__settings_allow_recording_for_post_type']) ? $settings['smpl__settings_allow_recording_for_post_type'] : ['all'];
        if (isset($settings['smpl__settings_allow_recording_for_post_type'])
            && in_array(get_current_screen()->post_type, $settings['smpl__settings_allow_recording_for_post_type'])
            || (in_array('all', $settings['smpl__settings_allow_recording_for_post_type'])
                && in_array(get_current_screen()->post_type, $meta_box_arr))) {
            add_meta_box(
                'simle-poll-meta-box',
                'Simple Poll',
                array(
                    $this,
                    'smpl_meta_box',
                ),
                get_current_screen()->post_type,
                'side',
                'high',
                null
            );
        }

    }

    /**
     * Add meta box for record, re-record, listen content with loud.
     */
    public function smpl_meta_box() {

        $listening = (array) get_option('smpl_listening_settings');
        $listening = json_encode($listening);
        $customize = (array) get_option('smpl_customize_settings');

        // Button style.
        if (isset($customize) && count($customize)) {
            $btn_style = 'background-color:' . $customize['backgroundColor'] . ';color:' . $customize['color'] . ';border:0;';
        }
        $short_code = '[smpl_listen_btn]';
        if (isset($customize['smpl_play_btn_shortcode']) && '' != $customize['smpl_play_btn_shortcode']) {
            $short_code = $customize['smpl_play_btn_shortcode'];
        }
        ?>
        <div class="smpl_metabox">

            <button type="button" id="smpl__start__record"  style='<?php echo esc_attr($btn_style); ?>;cursor: pointer' onclick="startRecording()"><span class="dashicons dashicons-controls-volumeoff"></span>Start</button>
            <button type="button" id="smpl__listen_content" style='<?php echo esc_attr($btn_style); ?>;cursor: pointer' onclick='listenCotentInDashboard("smpl__listen_content","", <?php echo esc_js($listening); ?> )'><span class="dashicons dashicons-controls-play"></span> Play</button>
            <!-- Shortcode text -->
            <input
                type="text"
                name="smpl_play_btn_shortcode"
                id="smpl_play_btn_shortcode"
                value="<?php echo esc_attr($short_code) ?>"
                title="Short code"
            />

            <!-- Copy Button -->
            <button type="button" style='<?php echo esc_attr($btn_style); ?>;cursor: copy;margin-top:10px;padding:6px;' onclick="copyshortcode()">
            <span class="dashicons dashicons-admin-page"></span>
            </button>

            <script>
            /**
             * Copy short Code
             */
            function copyshortcode () {
                /* Get the text field */
                var copyText = document.getElementById("smpl_play_btn_shortcode");

                /* Copy the text inside the text field */
                navigator.clipboard.writeText(copyText.value);

                /* Alert the copied text */
                alert("Copied the text: " + copyText.value);
            };
            </script>
        </div>
        <?php
}

}
