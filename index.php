<?php


$on = 1;

if ($on == 1) {
    $iPod    = stripos($_SERVER['HTTP_USER_AGENT'],"iPod");
    $iPhone  = stripos($_SERVER['HTTP_USER_AGENT'],"iPhone");
    $iPad    = stripos($_SERVER['HTTP_USER_AGENT'],"iPad");
    $Android = stripos($_SERVER['HTTP_USER_AGENT'],"Android");
    $webOS   = stripos($_SERVER['HTTP_USER_AGENT'],"webOS");

    if ($iPhone || $Android=9) {
        include('./functions.php');

        head('Abdulaziz Alswaji');

        body();

        footer();
    }
    
}





?>