<?php
/**
 * Widget Functions
 *
 * @package purdue-wp-theme
 */

include_once(ABSPATH . 'wp-admin/includes/plugin.php');


// Add theme support for selective refresh for widgets.
add_theme_support('customize-selective-refresh-widgets');

if (!function_exists('purdueBrand_widgets_init')) {
    /**
     * Register widget area.
     *
     * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
     */
    function purdueBrand_widgets_init()
    {
        register_sidebar(array(
            'name'          => esc_html__('Page Top Alert', 'purdue'),
            'id'            => 'top-alert',
            'description'   => esc_html__('Show alert at page top.', 'purdueBrand'),
            'before_widget' => '<div id="%1$s" class="widget alert-widget modal is-active notrap %2$s"><button class="modal-close" aria-label="close"></button>',
            'after_widget'  => '</div>',
            'before_title'  => '',
            'after_title'   => '',
        ));
        register_sidebar(array(
            'name'          => esc_html__('Alert Page', 'purdue'),
            'id'            => 'alert-page',
            'description'   => esc_html__('Show alert on page load.', 'purdueBrand'),
            'before_widget' => '<div id="%1$s" class="widget alert-page-widget modal %2$s">',
            'after_widget'  => '</div>',
            'before_title'  => '',
            'after_title'   => '',
        ));
        register_sidebar(array(
            'name'          => esc_html__('Footer signature', 'purdue'),
            'id'            => 'footer-signature',
            'description'   => esc_html__('Footer signature content', 'purdueBrand'),
            'before_widget' => '<div id="%1$s" class="container is-fullhd %2$s">',
            'after_widget'  => '</div>',
            'before_title'  => '',
            'after_title'   => '',
        ));
    }
}
add_action('widgets_init', 'purdueBrand_widgets_init');

