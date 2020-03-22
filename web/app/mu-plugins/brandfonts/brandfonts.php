<?php

/*
   Plugin Name: Purdue Brand Fonts
   Plugin URI: http://www.purdue.edu
   description: Add the Purdue Brand Fonts to WordPress Sites
   Version: 1.1.1
   Author: Marketing and Media
   Author URI: https://brand.purdue.edu
*/

if ( !defined('ABSPATH') ) {
	header( 'HTTP/1.0 403 Forbidden' );
	die;
}

if ( ! class_exists( 'PurdueBrandFonts' ) ) :
	/**
	 *
	 */
	class PurdueBrandFonts {

        public function __construct() {
			self::includes();
			self::hooks();
		}

		private static function includes() {
            
		}

		private static function hooks() {
            add_action( 'wp_enqueue_scripts', array( __CLASS__, 'adobeFonts' ) );
            add_action( 'wp_enqueue_scripts', array( __CLASS__, 'unitedsansFont' ) );
            add_action( 'wp_head', array( __CLASS__, 'add_header_icons' ) );
        }
        
        public static function adobeFonts() {
            wp_enqueue_style( 
                'brandfonts', 'https://use.typekit.net/hrz3oev.css'
            );
        }

        public static function unitedsansFont() {
            wp_enqueue_style( 
                'unitedsans', esc_url( plugins_url( 'unitedsans.css', __FILE__ ) )
            );
        }
        
        public static function add_header_icons() {
            ?>
            <link rel="shortcut icon" href="<?php echo esc_url( plugins_url( 'favicon/favicon.ico', __FILE__ ) ); ?>" type="image/x-icon" />
            <link rel="apple-touch-icon" sizes="57x57" href="<?php echo esc_url( plugins_url( 'favicon/apple-icon-57x57.png', __FILE__ ) );?>">
            <link rel="apple-touch-icon" sizes="60x60" href="<?php echo esc_url( plugins_url( 'favicon/apple-icon-60x60.png', __FILE__ ) );?>">
            <link rel="apple-touch-icon" sizes="72x72" href="<?php echo esc_url( plugins_url( 'favicon/apple-icon-72x72.png', __FILE__ ) );?>">
            <link rel="apple-touch-icon" sizes="76x76" href="<?php echo esc_url( plugins_url( 'favicon/apple-icon-76x76.png', __FILE__ ) );?>">
            <link rel="apple-touch-icon" sizes="114x114" href="<?php echo esc_url( plugins_url( 'favicon/apple-icon-114x114.png', __FILE__ ) );?>">
            <link rel="apple-touch-icon" sizes="120x120" href="<?php echo esc_url( plugins_url( 'favicon/apple-icon-120x120.png', __FILE__ ) );?>">
            <link rel="apple-touch-icon" sizes="144x144" href="<?php echo esc_url( plugins_url( 'favicon/apple-icon-144x144.png', __FILE__ ) );?>">
            <link rel="apple-touch-icon" sizes="152x152" href="<?php echo esc_url( plugins_url( 'favicon/apple-icon-152x152.png', __FILE__ ) );?>">
            <link rel="apple-touch-icon" sizes="180x180" href="<?php echo esc_url( plugins_url( 'favicon/apple-icon-180x180.png', __FILE__ ) );?>">
            <link rel="icon" type="image/png" sizes="192x192"  href="<?php echo esc_url( plugins_url( 'favicon/android-icon-192x192.png', __FILE__ ) );?>">
            <link rel="icon" type="image/png" sizes="32x32" href="<?php echo esc_url( plugins_url( 'favicon/favicon-32x32.png', __FILE__ ) );?>">
            <link rel="icon" type="image/png" sizes="96x96" href="<?php echo esc_url( plugins_url( 'favicon/favicon-96x96.png', __FILE__ ) );?>">
            <link rel="icon" type="image/png" sizes="16x16" href="<?php echo esc_url( plugins_url( 'favicon/favicon-16x16.png', __FILE__ ) );?>">
            <link rel="manifest" href="<?php echo esc_url( plugins_url( 'favicon/manifest.json', __FILE__ ) );?>">
            <meta name="msapplication-TileColor" content="#ffffff">
            <meta name="msapplication-TileImage" content="<?php echo esc_url( plugins_url( 'favicon/ms-icon-144x144.png', __FILE__ ) );?>">
            <meta name="theme-color" content="#ffffff">
            <?php
        }
    }

    new PurdueBrandFonts();
endif;