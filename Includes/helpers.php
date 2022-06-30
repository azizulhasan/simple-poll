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