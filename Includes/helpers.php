<?php

function smpl_log( $data ) {
    error_log( print_r( $data, true) ); 
}