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
        global $wpdb;
        $wpdb->smpl_question = $wpdb->prefix . 'smpl_question';
        $wpdb->smpl_answer = $wpdb->prefix . 'smpl_answer';
        $wpdb->smpl_votes = $wpdb->prefix . 'smpl_votes';

        if (@is_file(ABSPATH . '/wp-admin/includes/upgrade.php')) {
            include_once ABSPATH . '/wp-admin/includes/upgrade.php';
        } elseif (@is_file(ABSPATH . '/wp-admin/upgrade-functions.php')) {
            include_once ABSPATH . '/wp-admin/upgrade-functions.php';
        } else {
            die('We have problem finding your \'/wp-admin/upgrade-functions.php\' and \'/wp-admin/includes/upgrade.php\'');
        }

        // Create Poll Tables (3 Tables)
        $charset_collate = $wpdb->get_charset_collate();

        $create_table = array();
        $create_table['smpl_question'] = "CREATE TABLE $wpdb->smpl_question (" .
            "smpl_qid int(10) NOT NULL auto_increment," .
            "smpl_question varchar(200) character set utf8 NOT NULL default ''," .
            "smpl_timestamp varchar(20) NOT NULL default ''," .
            "smpl_totalvotes int(10) NOT NULL default '0'," .
            "PRIMARY KEY  (smpl_qid)" .
            ") $charset_collate;";
        $create_table['smpl_answer'] = "CREATE TABLE $wpdb->smpl_answer (" .
            "smpl_aid int(10) NOT NULL auto_increment," .
            "smpl_qid int(10) NOT NULL default '0'," .
            "smpl_answers varchar(200) character set utf8 NOT NULL default ''," .
            "smpl_votes int(10) NOT NULL default '0'," .
            "PRIMARY KEY  (smpl_aid)" .
            ") $charset_collate;";

        $create_table['smpl_votes'] = "CREATE TABLE $wpdb->smpl_votes (" .
            "smpl_vid int(10) NOT NULL auto_increment," .
            "smpl_qid int(10) NOT NULL default '0'," .
            "smpl_aid int(10) NOT NULL default '0'," .
            "smpl_ip varchar(100) NOT NULL default ''," .
            "smpl_host VARCHAR(200) NOT NULL default ''," .
            "smpl_timestamp int(10) NOT NULL default '0'," .
            "smpl_user tinytext NOT NULL," .
            "smpl_userid int(10) NOT NULL default '0'," .
            "PRIMARY KEY  (smpl_vid)," .
            "KEY smpl_ip (smpl_ip)," .
            "KEY smpl_qid (smpl_qid)," .
            "KEY smpl_ip_qid (smpl_ip, smpl_qid)" .
            ") $charset_collate;";

        if (!in_array('smpl_question', $wpdb->tables)) {
            dbDelta($create_table['smpl_question']);

        }
        if (!in_array('smpl_answer', $wpdb->tables)) {
            dbDelta($create_table['smpl_answer']);

        }
        if (!in_array('smpl_votes', $wpdb->tables)) {
            dbDelta($create_table['smpl_votes']);
        }

        // Check Whether It is Install Or Upgrade
        $first_poll = $wpdb->get_var("SELECT smpl_qid FROM $wpdb->smpl_question LIMIT 1");
        // If Install, Insert 1st Poll Question With 5 Poll Answers
        if (empty($first_poll)) {
            // Insert Poll Question (1 Record)
            $insert_poll_qid = $wpdb->insert($wpdb->smpl_question, array('smpl_question' => __('How Is My Site?', 'simple-poll-for-wp'), 'smpl_timestamp' => current_time('timestamp')), array('%s', '%s'));
            if ($insert_poll_qid) {
                // Insert Poll Answers  (3 Records)
                $wpdb->insert($wpdb->smpl_answer, array('smpl_qid' => $insert_poll_qid, 'smpl_answers' => __('Good', 'simple-poll-for-wp')), array('%d', '%s'));
                $wpdb->insert($wpdb->smpl_answer, array('smpl_qid' => $insert_poll_qid, 'smpl_answers' => __('Excellent', 'simple-poll-for-wp')), array('%d', '%s'));
                $wpdb->insert($wpdb->smpl_answer, array('smpl_qid' => $insert_poll_qid, 'smpl_answers' => __('Bad', 'simple-poll-for-wp')), array('%d', '%s'));
            }
        }

    }

}
