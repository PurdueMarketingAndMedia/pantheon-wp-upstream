<?php

if ( !defined('ABSPATH') ) {
	header( 'HTTP/1.0 403 Forbidden' );
	die;
}

# List Development Plugins
$plugins = array(
    'gravityformsdebug/debug.php',
    'pantheon-hud/pantheon-hud.php',
    'wp-reroute-email/wp-reroute-email.php'
    );

# Live-specific configs
if ( in_array( $_ENV['PANTHEON_ENVIRONMENT'], array( 'live','test' ) ) ) {

    # Disable Development Plugins
    require_once(ABSPATH . 'wp-admin/includes/plugin.php');
    foreach ($plugins as $plugin) {
        if(is_plugin_active($plugin)) {
            deactivate_plugins($plugin);
        }
    }

    # Disable jetpack_development_mode
    if ( is_plugin_active('jetpack/jetpack.php') ) {
        // the plugin is active
        add_filter( 'jetpack_development_mode', '__return_false' );
    }
}

# Configs for All environments but Live and Test
else {

    # Activate Development Plugins
    require_once(ABSPATH . 'wp-admin/includes/plugin.php');
    foreach ($plugins as $plugin) {
        if(is_plugin_inactive($plugin)) {
            activate_plugin($plugin);
        }
    }

    # Enable development mode for jetpack
    if ( is_plugin_active('jetpack/jetpack.php') ) {
        // the plugin is active
        add_filter( 'jetpack_development_mode', '__return_true' );
    }
}
