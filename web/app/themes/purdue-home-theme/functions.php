<?php

/**
 * Purdue Brand functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package purdue-home-theme
 * @since 1.0.0
 */

include_once(ABSPATH . 'wp-admin/includes/plugin.php');

require get_template_directory() . '/inc/navwalker.php';
require get_template_directory() . '/inc/helpers.php';
require get_template_directory() . '/inc/widgets.php';
require get_template_directory() . '/inc/blocks.php';
require get_template_directory() . '/inc/function-admin.php';
require get_template_directory() . '/inc/rest.php';
require get_template_directory() . '/inc/breadcrumb.php';
require get_template_directory() . '/inc/acf-fields.php';
require get_template_directory() . '/inc/block-templates.php';
require get_template_directory() . '/inc/content-filters.php';
require get_template_directory() . '/inc/paragraph-add-callout.php';

if (!function_exists('purdueBrand_setup')) :
    /**
     * Sets up theme defaults and registers support for various WordPress features.
     *
     * Note that this function is hooked into the after_setup_theme hook, which
     * runs before the init hook. The init hook is too late for some features, such
     * as indicating support for post thumbnails.
     */

    function purdueBrand_setup()
    {
        require get_template_directory() . '/inc/navigation.php';
        require get_template_directory() . '/inc/scripts-styles.php';
        add_theme_support('custom-logo', array(
            'height'      => 100,
            'width'       => 400,
            'flex-width' => true,
        ));
        add_theme_support( 'align-wide' );
    }
endif;
add_action('after_setup_theme', 'purdueBrand_setup');

// add search options
function purdue_search_options($wp_customize)
{
    //add new section
    $wp_customize->add_section('search_option', array(
        'title'       => __( 'Search Options' ), //Visible title of section
        'priority'    => 55, //Determines what order this appears in
        'capability'  => 'edit_theme_options', //Capability needed to tweak
        'description' => __('Choose to use Wordpress default search to search within the site or Google Custom Search to search all of Purdue. Please note if you select Google Custom Search, you will need to create an empty page on your site, name it Search and select the Search template as its template', 'purdue-home-theme'), //Descriptive tooltip
        ) 
    );   
    $wp_customize->add_setting('search_option_settings', array(
        'default'=>'google',
        'capability'=>'edit_theme_options',
        'transport'=>'refresh',
        'sanitize_callback'=>'purdue_header_radio_search'
    ));
    $wp_customize->add_control('search_option_radio', array(
        'type'=>'radio',
        'priority'=>'15',
        'section'=>'search_option',
        'settings'=>'search_option_settings',
        'Label'=>'Select search option',
        'choices'=>array(
            'wordpress'=>_('Wordpress Default'),
            'google'=>_('Google Custom Search'),
            'simple'=>_('Google Custom Search without trending searches')
        ),
        'description' => __( 'Popular search items will be set to default when Google custom search is selected.' ),
    ));
    $wp_customize->add_setting('google-search-id', array(
        'type'=>'theme_mod',
        'default'=>'',
        'capability'=>'edit_theme_options',
        'transport'=>'refresh',
        'sanitize_callback'=>'sanitize_text_field'
    ));
    $wp_customize->add_control('google-search-id', array(
        'type' => 'text',
        'priority'=>'16',
        'section' => 'search_option', // Add a default or your own section
        'label' => __( 'Google search ID' ),
        'description' => __( 'If left empty will use the default Purdue Google search engine ID.' ),
    ));
    $wp_customize->add_setting('quick_link_1_text', array(
        'type'=>'theme_mod',
        'default'=>'',
        'capability'=>'edit_theme_options',
        'transport'=>'refresh',
        'sanitize_callback'=>'sanitize_text_field'
    ));

    $wp_customize->add_control('quick_link_1_text', array(
        'type' => 'text',
        'priority'=>'16',
        'section' => 'search_option', // Add a default or your own section
        'label' => __( 'Popular Search Text #1' ),
        'description' => __( '' ),
    ));
    $wp_customize->add_setting('quick_link_1_link', array(
        'type'=>'theme_mod',
        'default'=>'',
        'capability'=>'edit_theme_options',
        'transport'=>'refresh',
        'sanitize_callback'=>'sanitize_text_field'
    ));

    $wp_customize->add_control('quick_link_1_link', array(
        'type' => 'text',
        'priority'=>'16',
        'section' => 'search_option', // Add a default or your own section
        'label' => __( 'Popular Search Link #1' ),
        'description' => __( 'This is the link to the popular search text #1' ),
    ));
    $wp_customize->add_setting('quick_link_2_text', array(
        'type'=>'theme_mod',
        'default'=>'',
        'capability'=>'edit_theme_options',
        'transport'=>'refresh',
        'sanitize_callback'=>'sanitize_text_field'
    ));

    $wp_customize->add_control('quick_link_2_text', array(
        'type' => 'text',
        'priority'=>'16',
        'section' => 'search_option', // Add a default or your own section
        'label' => __( 'Popular Search Text #2' ),
        'description' => __( '' ),
    ));
    $wp_customize->add_setting('quick_link_2_link', array(
        'type'=>'theme_mod',
        'default'=>'',
        'capability'=>'edit_theme_options',
        'transport'=>'refresh',
        'sanitize_callback'=>'sanitize_text_field'
    ));

    $wp_customize->add_control('quick_link_2_link', array(
        'type' => 'text',
        'priority'=>'16',
        'section' => 'search_option', // Add a default or your own section
        'label' => __( 'Popular Search Link #2' ),
        'description' => __( 'This is the link to the popular search text #2' ),
    ));
    $wp_customize->add_setting('quick_link_3_text', array(
        'type'=>'theme_mod',
        'default'=>'',
        'capability'=>'edit_theme_options',
        'transport'=>'refresh',
        'sanitize_callback'=>'sanitize_text_field'
    ));

    $wp_customize->add_control('quick_link_3_text', array(
        'type' => 'text',
        'priority'=>'16',
        'section' => 'search_option', // Add a default or your own section
        'label' => __( 'Popular Search Text #3' ),
        'description' => __( '' ),
    ));
    $wp_customize->add_setting('quick_link_3_link', array(
        'type'=>'theme_mod',
        'default'=>'',
        'capability'=>'edit_theme_options',
        'transport'=>'refresh',
        'sanitize_callback'=>'sanitize_text_field'
    ));

    $wp_customize->add_control('quick_link_3_link', array(
        'type' => 'text',
        'priority'=>'16',
        'section' => 'search_option', // Add a default or your own section
        'label' => __( 'Popular Search Link #3' ),
        'description' => __( 'This is the link to the popular search text #3' ),
    ));
    $wp_customize->add_setting('quick_link_4_text', array(
        'type'=>'theme_mod',
        'default'=>'',
        'capability'=>'edit_theme_options',
        'transport'=>'refresh',
        'sanitize_callback'=>'sanitize_text_field'
    ));

    $wp_customize->add_control('quick_link_4_text', array(
        'type' => 'text',
        'priority'=>'16',
        'section' => 'search_option', // Add a default or your own section
        'label' => __( 'Popular Search Text #4' ),
        'description' => __( '' ),
    ));
    $wp_customize->add_setting('quick_link_4_link', array(
        'type'=>'theme_mod',
        'default'=>'',
        'capability'=>'edit_theme_options',
        'transport'=>'refresh',
        'sanitize_callback'=>'sanitize_text_field'
    ));

    $wp_customize->add_control('quick_link_4_link', array(
        'type' => 'text',
        'priority'=>'16',
        'section' => 'search_option', // Add a default or your own section
        'label' => __( 'Popular Search Link #4' ),
        'description' => __( 'This is the link to the popular search text #4' ),
    ));
    $wp_customize->add_setting('quick_link_5_text', array(
        'type'=>'theme_mod',
        'default'=>'',
        'capability'=>'edit_theme_options',
        'transport'=>'refresh',
        'sanitize_callback'=>'sanitize_text_field'
    ));

    $wp_customize->add_control('quick_link_5_text', array(
        'type' => 'text',
        'priority'=>'16',
        'section' => 'search_option', // Add a default or your own section
        'label' => __( 'Popular Search Text #5' ),
        'description' => __( '' ),
    ));
    $wp_customize->add_setting('quick_link_5_link', array(
        'type'=>'theme_mod',
        'default'=>'',
        'capability'=>'edit_theme_options',
        'transport'=>'refresh',
        'sanitize_callback'=>'sanitize_text_field'
    ));

    $wp_customize->add_control('quick_link_5_link', array(
        'type' => 'text',
        'priority'=>'16',
        'section' => 'search_option', // Add a default or your own section
        'label' => __( 'Popular Search Link #5' ),
        'description' => __( 'This is the link to the popular search text #5' ),
    ));
}
add_action('customize_register', 'purdue_search_options');

function customizer_script() {
    $x = require get_template_directory() . '/build/customizer.asset.php';
    $jsFilePath = glob( get_template_directory() . '/build/customizer.js' );
    $jsFileURI = get_template_directory_uri() . '/build/' . basename($jsFilePath[0]);
    wp_enqueue_script( 'customizer', $jsFileURI, array( 'jquery', 'customize-controls' ), $x['version'], true );
}
add_action( 'customize_controls_enqueue_scripts', 'customizer_script' );

// add footer options
function purdue_contact_options($wp_customize)
{
    //add a new panel
    $wp_customize->add_panel( 'contact_details', 
        array(
            'priority'       => 54,
            'title'            => 'Footer',
            'description'      => 'Options for editing the footer'
        ) 
    );

    //add new section
    $wp_customize->add_section('contact_information', array(
        'title' => 'Footer Contact Information',
        'description' => 'Set custom contact information for the site. If the address fields are left blank they will default to the Purdue University default address.',
        'priority' => 2,
        'panel'         => 'contact_details'
    ));

    // Address Line 1
    $wp_customize->add_setting( 'address_line_1', array(
        'capability' => 'edit_theme_options',
        'default' => 'Purdue University',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
        
    $wp_customize->add_control( 'address_line_1', array(
        'type' => 'text',
        'section' => 'contact_information', // Add a default or your own section
        'label' => __( 'Address Line 1' ),
        'description' => __( '' ),
    ) );

    // Address Line 2
    $wp_customize->add_setting( 'address_line_2', array(
        'capability' => 'edit_theme_options',
        'default' => '610 Purdue Mall',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
        
    $wp_customize->add_control( 'address_line_2', array(
        'type' => 'text',
        'section' => 'contact_information', // Add a default or your own section
        'label' => __( 'Address Line 2' ),
        'description' => __( '' ),
    ) );
    // Address Line 3
    $wp_customize->add_setting( 'address_line_3', array(
        'capability' => 'edit_theme_options',
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
        
    $wp_customize->add_control( 'address_line_3', array(
        'type' => 'text',
        'section' => 'contact_information', // Add a default or your own section
        'label' => __( 'Address Line 3' ),
        'description' => __( '' ),
    ) );
    // City
    $wp_customize->add_setting( 'city', array(
        'capability' => 'edit_theme_options',
        'default' => 'West Lafayette',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
        
    $wp_customize->add_control( 'city', array(
        'type' => 'text',
        'section' => 'contact_information', // Add a default or your own section
        'label' => __( 'City' ),
        'description' => __( '' ),
    ) );

    // State
    $wp_customize->add_setting( 'state', array(
        'capability' => 'edit_theme_options',
        'default' => 'IN',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
        
    $wp_customize->add_control( 'state', array(
        'type' => 'text',
        'section' => 'contact_information', // Add a default or your own section
        'label' => __( 'State' ),
        'description' => __( '' ),
    ) );

    // Zipcode
    $wp_customize->add_setting( 'zipcode', array(
        'capability' => 'edit_theme_options',
        'default' => '47907',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
        
    $wp_customize->add_control( 'zipcode', array(
        'type' => 'text',
        'section' => 'contact_information', // Add a default or your own section
        'label' => __( 'Zipcode' ),
        'description' => __( '' ),
    ) );

    // Phone Number
    $wp_customize->add_setting( 'phone_number', array(
        'capability' => 'edit_theme_options',
        'default' => '765-494-4600',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
        
    $wp_customize->add_control( 'phone_number', array(
        'type' => 'text',
        'section' => 'contact_information', // Add a default or your own section
        'label' => __( 'Phone Number' ),
        'description' => __( '' ),
    ) );

    // Email Address
    $wp_customize->add_setting( 'email_address', array(
        'capability' => 'edit_theme_options',
        'default' => 'https://www.purdue.edu/purdue/contact-us/index.php',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
        
    $wp_customize->add_control( 'email_address', array(
        'type' => 'text',
        'section' => 'contact_information', // Add a default or your own section
        'label' => __( 'Contact Us' ),
        'description' => __( '' ),
    ) );

    //add new section
    $wp_customize->add_section('social_medias', array(
        'title' => 'Footer Social Media Link Options',
        'description' => 'Set custom Social Media URLs for the site.',
        'priority' => 33,
        'panel'         => 'contact_details'
    ));

    // Facebook
    $wp_customize->add_setting( 'facebook', array(
        'capability' => 'edit_theme_options',
        'default' => 'https://www.facebook.com/PurdueUniversity/',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
        
    $wp_customize->add_control( 'facebook', array(
        'type' => 'text',
        'section' => 'social_medias', // Add a default or your own section
        'label' => __( 'Facebook' ),
        'description' => __( '' ),
    ) );

    // Twitter
    $wp_customize->add_setting( 'twitter', array(
        'capability' => 'edit_theme_options',
        'default' => 'https://www.twitter.com/LifeAtPurdue',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
        
    $wp_customize->add_control( 'twitter', array(
        'type' => 'text',
        'section' => 'social_medias', // Add a default or your own section
        'label' => __( 'Twitter' ),
        'description' => __( '' ),
    ) );

    // Instagram
    $wp_customize->add_setting( 'instagram', array(
        'capability' => 'edit_theme_options',
        'default' => 'https://www.instagram.com/lifeatpurdue/',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
        
    $wp_customize->add_control( 'instagram', array(
        'type' => 'text',
        'section' => 'social_medias', // Add a default or your own section
        'label' => __( 'Instagram' ),
        'description' => __( '' ),
    ) );

    // Snapchat
    $wp_customize->add_setting( 'snapchat', array(
        'capability' => 'edit_theme_options',
        'default' => 'https://www.snapchat.com/add/lifeatpurdue',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
        
    $wp_customize->add_control( 'snapchat', array(
        'type' => 'text',
        'section' => 'social_medias', // Add a default or your own section
        'label' => __( 'Snapchat' ),
        'description' => __( '' ),
    ) );

    // LinkedIn
    $wp_customize->add_setting( 'linkedin', array(
        'capability' => 'edit_theme_options',
        'default' => 'https://www.linkedin.com/edu/purdue-university-18357',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
        
    $wp_customize->add_control( 'linkedin', array(
        'type' => 'text',
        'section' => 'social_medias', // Add a default or your own section
        'label' => __( 'LinkedIn' ),
        'description' => __( '' ),
    ) );

    // YouTube
    $wp_customize->add_setting( 'youtube', array(
        'capability' => 'edit_theme_options',
        'default' => 'https://www.youtube.com/purdueuniversity',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
        
    $wp_customize->add_control( 'youtube', array(
        'type' => 'text',
        'section' => 'social_medias', // Add a default or your own section
        'label' => __( 'YouTube' ),
        'description' => __( '' ),
    ) );

     //add new section
     $wp_customize->add_section('foot_background', array(
        'title' => 'Footer Background Image',
        'description' => '',
        'priority' => 34,
        'panel'         => 'contact_details'
    ));
    $wp_customize->add_setting('footer_image', array(
        'default' => '',
        'type' => 'theme_mod',
        'sanitize_callback' => 'my_customize_sanitize_footer_image',
    ));

    $wp_customize->add_control(
        new WP_Customize_Image_Control(
            $wp_customize, 'footer_image', array(
                'label'    => 'Footer Background Image',
                'settings' => 'footer_image',
                'section'  => 'foot_background',
                'priority' => 50,
            )
        )
    );
    
}
add_action('customize_register', 'purdue_contact_options');
function my_customize_sanitize_footer_image($input)
{
    error_log(attachment_url_to_postid($input));//debug
    return attachment_url_to_postid($input);
}
//Header options
function purdue_layout_options($wp_customize){

    $wp_customize->add_section('layout', array(
        'title' => 'Header',
        'description' => '',
        'priority' => 30
    ));
    //add header layout section
    $wp_customize->add_setting('header_layout_settings', array(
        'type'=>'theme_mod',
        'default'=>'global',
        'capability'=>'edit_theme_options',
        'transport'=>'refresh',
        'sanitize_callback'=>'purdue_header_radio_select'
    ));
        //add controls to header options section
    $wp_customize->add_control('header_layout_radio', array(
        'type'=>'radio',
        'priority'=>'10',
        'section'=>'layout',
        'settings'=>'header_layout_settings',
        'label'=>'Header Layout',
        'choices'=>array(
            'simple'=>_('Simple'),
            'global'=>_('Global with department name'),
        )
    ));

    $wp_customize->add_setting('header_site_name', array(
        'type'=>'theme_mod',
        'default'=> get_bloginfo('name'),
        'capability'=>'edit_theme_options',
        'transport'=>'refresh',
        'sanitize_callback'=>'sanitize_text_field'
    ));

    $wp_customize->add_control('header_site_name', array(
        'type' => 'text',
        'priority'=>'11',
        'section' => 'layout', // Add a default or your own section
        'label' => __( 'Site Name' ),
        'description' => __( 'This is the name of the site that will be displayed in the header.' ),
        'active_callback' => 'display_header_button_option_callback'
    ));

}
add_action('customize_register', 'purdue_layout_options');
function purdue_header_radio_select($input, $setting)
{
    // list of valid choices
    $valid = array(
        'simple'=>_('Simple with fully customizable footer'),
        'global'=>_('Global with fixed first two columns of links on footer'),
        'global2'=>_('Global with fully customizable footer')
    );
    // Ensure input is a slug.
    $input = sanitize_key($input);

    // If the input is a valid key, return it; otherwise, return the default.
    return (array_key_exists($input, $valid) ? $input : 'global');
}
function purdue_header_radio_search($input, $setting)
{
    // list of valid choices
    $valid = array(
        'wordpress'=>_('Wordpress Default'),
        'google'=>_('Google Custom Search'),
        'simple'=>_('Google Custom Search without trending searches')
    );
    // Ensure input is a slug.
    $input = sanitize_key($input);

    // If the input is a valid key, return it; otherwise, return the default.
    return (array_key_exists($input, $valid) ? $input : 'wordpress');
}
function header_button_register($wp_customize) {

    // Add settings and controls for Header Button
    $wp_customize->add_setting('header_button_label', array(
		'capability' => 'edit_theme_options',
        'default'           => '',
        'sanitize_callback' => 'sanitize_text_field',
		'transport' => 'refresh'
    ));

    $wp_customize->add_control('header_button_label', array(
        'label'    => __('Optional Header Button Label', 'purdue-home-theme'),
        'section'  => 'layout',
        'type'     => 'text',
		'priority' => 30,
		'active_callback' => 'display_header_button_option_callback',
        'description'  => 'Recommend for use with small menus only'

    ));

	$wp_customize->add_setting('header_button_link', array(
		'capability' => 'edit_theme_options',
        'default'           => '',
        'sanitize_callback' => 'sanitize_text_field',
		'transport' => 'refresh'
    ));

    $wp_customize->add_control('header_button_link', array(
        'label'    => __('Optional Header Button Link', 'purdue-home-theme'),
        'section'  => 'layout',
        'type'     => 'text',
		'priority' => 30,
		'active_callback' => 'display_header_button_option_callback'
    ));

    $wp_customize->add_setting('header_button_new_tab', array(
		'capability' => 'edit_theme_options',
        'default'           => '',
        'sanitize_callback' => 'sanitize_text_field',
		'transport' => 'refresh'
    ));     

    $wp_customize->add_control('header_button_new_tab', array(
        'label' => __('Open link in new tab?', 'purdue-home-theme'),
        'section' => 'layout',
        'type' => 'checkbox',
        'priority' => 30,
		'active_callback' => 'display_header_button_option_callback'
    ));

}

function display_header_button_option_callback($control) {
    // Get the value of the 'display_option' setting
    $display_option = get_theme_mod('header_layout_settings', 'simple');

    // Return true if 'display_option' is set to 'global', false otherwise
    return $display_option === 'global';
}

// Hook into the customize_register action
add_action('customize_register', 'header_button_register');

// Changing excerpt length
function new_excerpt_length($length)
{
    return 40;
}
add_filter('excerpt_length', 'new_excerpt_length');
//Remove ellipsis from excerp
add_filter('excerpt_more', '__return_false');
add_theme_support('post-thumbnails');
function purdueBrand_default_colors()
{
    add_theme_support('disable-custom-colors');
    add_theme_support('editor-color-palette', array(
        array(
            'name' => __('Black', 'purdue-home-theme'),
            'slug' => 'black',
            'color' => '#000000',
        ),
        array(
            'name' => __('Boiler Gold', 'purdue-home-theme'),
            'slug' => 'boiler-gold',
            'color' => '#cfb991',
        ),
        array(
            'name' => __('Aged Gold', 'purdue-home-theme'),
            'slug' => 'aged-gold',
            'color' => '#8e6f3e',
        ),
        array(
            'name' => __('White', 'purdue-home-theme'),
            'slug' => 'white',
            'color' => '#ffffff',
        ),
        array(
            'name' => __('Dust Gold', 'purdue-home-theme'),
            'slug' => 'dust-gold',
            'color' => '#EBD99F',
        ),
        array(
            'name' => __('Field Gold', 'purdue-home-theme'),
            'slug' => 'field-gold',
            'color' => '#DDB945',
        ),
        array(
            'name' => __('Rush Gold', 'purdue-home-theme'),
            'slug' => 'rush-gold',
            'color' => '#DAAA00',
        ),
        array(
            'name' => __('Steel Gray', 'purdue-home-theme'),
            'slug' => 'steel-gray',
            'color' => '#555960',
        ),
        array(
            'name' => __('Cool Gray', 'purdue-home-theme'),
            'slug' => 'cool-gray',
            'color' => '#6F727B',
        ),
        array(
            'name' => __('Railway Gray', 'purdue-home-theme'),
            'slug' => 'railway-gray',
            'color' => '#9D9795',
        ),
        array(
            'name' => __('Steam Gray', 'purdue-home-theme'),
            'slug' => 'steam-gray',
            'color' => '#C4BFC0',
        ),
        array(
            'name' => __('Opaque', 'purdue-home-theme'),
            'slug' => 'opaque',
            'color' => 'rgba(0,0,0,0.65',
        ),
        array(
            'name' => __('Transparent', 'purdue-home-theme'),
            'slug' => 'transparent',
            'color' => 'rgba(0,0,0,0',
        )
    ));
}
add_action('after_setup_theme', 'purdueBrand_default_colors');

//image in rss feed
function rss_post_thumbnail($content) {
    global $post;
    if(has_post_thumbnail($post->ID)) {
    $content = '<figure>' . get_the_post_thumbnail($post->ID, 'large') .
    '</figure>' . get_the_excerpt();
    }
    return $content;
}
add_filter('the_excerpt_rss', 'rss_post_thumbnail');
add_filter('the_content_feed', 'rss_post_thumbnail');

add_filter( 'should_load_separate_core_block_assets', '__return_true' );
add_filter( 'styles_inline_size_limit', '__return_zero');


function youtube_future_to_publish_only( $new_status, $old_status, $post ) {
	// Check if post is transitioning from future (scheduled) to publish
	if ( ( 'publish' === $new_status && 'future' === $old_status ) ) {
		global $wpdb;
		$post_meta_table	= $wpdb->prefix . "postmeta";
		$wpdb->query( $wpdb->prepare( "DELETE FROM " . $post_meta_table . " 
			WHERE post_id = '%d' 
			AND meta_key LIKE '_oembed_%' 
			AND meta_value LIKE '{{unknown}}';", 
			absint( $post->ID ) 
		) );
	}
}
add_action( 'transition_post_status', 'youtube_future_to_publish_only', 10, 3 );

// Include post type in feed,
add_action('rss2_ns', 'my_rss2_ns');
function my_rss2_ns(){
    echo 'xmlns:mycustomfields="'.  get_bloginfo('wpurl').'"'."\n";
}
/*  add elements    */
add_action('rss2_item', 'yoursite_rss2_item');
function yoursite_rss2_item() {
	$value = rkv_get_post_type();
	echo "<mycustomfields:posttype>{$value}</mycustomfields:posttype>\n";
}

//Add iframe shortcode compiler
add_shortcode( 'iframe' , 'mycustom_shortcode_iframe' );
function mycustom_shortcode_iframe($args, $content) {
    $keys = array("id", "src", "title", "frameborder", "allow");
    $arguments = mycustom_extract_shortcode_arguments($args, $keys);
    return '<iframe ' . $arguments . '></iframe>';
}
//Add script shortcode compiler
add_shortcode( 'custom-script' , 'mycustom_shortcode_script' );
function mycustom_shortcode_script($args, $content) {
    $keys = array("defer", "src");
    $arguments = mycustom_extract_shortcode_arguments($args, $keys);
    return '<script ' . $arguments . '></script>';
}

function mycustom_extract_shortcode_arguments($args, $keys) {
    $result = "";
    foreach ($keys as $key) {
        if ($key === "defer"){
            $result .= $key." ";
        }elseif (isset($args[$key])) {
            $result .= $key . '="' . $args[$key] . '" ';
        }
    }
    return $result;
}


function clear_transient_on_post_save($post_id) {

    // Avoid clearing transient during autosave or revision
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( wp_is_post_revision( $post_id ) ) return;

    global $wpdb;

    $transients = $wpdb->get_results(
        "SELECT option_name, option_value 
         FROM $wpdb->options 
         WHERE option_name LIKE '\_transient\_%'"
    );
    
    $pattern = '/filtered_posts/';

    foreach($transients as $transient){

        $transient_name = $transient->option_name;

        if ( strpos( $transient_name, '_transient_' ) === 0 ) {
            $transient_key = substr( $transient_name, strlen('_transient_') );

            if(preg_match($pattern, $transient_key)){    
                
                delete_transient( $transient_key );
    
            }
        }
    }
}
add_action( 'save_post', 'clear_transient_on_post_save', 20 );
add_action( 'publish_future_post', 'clear_transient_on_post_save' );


add_filter( 'block_editor_rest_api_preload_paths', function( $paths ) {
    // Disable block serialization cache
    remove_filter( 'render_block', 'wp_render_block', 10 );
    return $paths;
} );


$oldPlugins = array(
    'purdue-blocks/purdue-blocks.php',
    'bulma-blocks/bulma-blocks.php',
);

foreach ( $oldPlugins as $plugin ) {
    
    if ( is_plugin_active( $plugin ) ) {

       deactivate_plugins( $plugin );

        $plugin_name = ( $plugin === 'purdue-blocks/purdue-blocks.php' ) ? 'Purdue Blocks' : 'Bulma Blocks';

        add_action( 'admin_notices', function() use ( $plugin_name ) {
                
            echo '<div class="notice notice-error"><p>' . sprintf( __( 'The %s plugin is not compatible with the Purdue New Theme and has been deactivated. Please remove it from your plugins list.', 'purdue-home-theme' ), esc_html( $plugin_name ) ) . '</p></div>';
        } );
    }
}
