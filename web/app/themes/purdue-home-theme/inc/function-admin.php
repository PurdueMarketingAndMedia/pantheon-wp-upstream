<?php

/* 
@package purdue-wp-theme
================
Admin page
=============
*/
function common_scripts() {
    $common = [
        'glide.esm',
    ];
    
    foreach($common as $c) {
        $build = '/build/common/';
        $cc = require get_template_directory() . $build . $c . '.asset.php';
        $filePath = glob( get_template_directory() . $build . $c .'.js' );
        $fileURI = get_template_directory_uri() . $build . basename($filePath[0]);
        wp_enqueue_script( $c, $fileURI, $cc['dependencies'], $cc['version'],  $in_footer = false);
    }
    wp_enqueue_script( $c, $fileURI, $cc['dependencies'], $cc['version'],  $in_footer = false);
}
function admin_scripts() {
    $x = require get_template_directory() . '/build/admin.asset.php';
    $jsFilePath = glob( get_template_directory() . '/build/admin.js' );
    $jsFileURI = get_template_directory_uri() . '/build/' . basename($jsFilePath[0]);
    wp_enqueue_script( 'admin-script', $jsFileURI, array( 'wp-blocks', 'wp-element', 'wp-components', 'wp-i18n', 'wp-block-editor' ), $x['version'],  $in_footer = false);
}
function admin_styles() {
    $x = require get_template_directory() . '/build/admin.asset.php';
    $cssFilePath = glob( get_template_directory() . '/build/admin.css' );
    $cssFileURI = get_template_directory_uri() . '/build/' . basename($cssFilePath[0]);
    wp_enqueue_style( 'admin-styles-home', $cssFileURI, array(),  $x['version'], false );
}
add_action('admin_enqueue_scripts', 'common_scripts');
add_action('admin_enqueue_scripts', 'admin_styles');
add_action( 'enqueue_block_editor_assets', 'admin_scripts', 1005 );
//fontawesome

function fontawesome() {
    wp_enqueue_style( 'load-fa', 'https://use.fontawesome.com/releases/v6.4.2/css/all.css' );
}
 
 add_action('admin_init', 'fontawesome');
 add_action( 'wp_enqueue_scripts', 'fontawesome' );