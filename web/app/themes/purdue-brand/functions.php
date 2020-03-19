<?php

/**
 * Purdue Brand functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Purdue-brand
 * @since 1.0.0
 */

update_option('template', 'purdue-brand');
require get_template_directory() . '/inc/navwalker.php';
require get_template_directory() . '/inc/helpers.php';
require get_template_directory() . '/inc/function-admin.php';

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
        require get_template_directory() . '/inc/widgets.php';
        require get_template_directory() . '/inc/scripts-styles.php';
        add_theme_support('custom-logo', array(
            'height'      => 100,
            'width'       => 400,
            'flex-width' => true,
        ));
    }
endif;
add_action('after_setup_theme', 'purdueBrand_setup');


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
            'name' => __('White', 'purdue-brand'),
            'slug' => 'white',
            'color' => '#ffffff',
        ),
        array(
            'name' => __('Black', 'purdue-brand'),
            'slug' => 'black',
            'color' => '#000000',
        )
    ));
}
add_action('after_setup_theme', 'purdueBrand_default_colors');


// add acf hero image upload field
if (function_exists('acf_add_local_field_group')) :

    acf_add_local_field_group(array(
        'key' => 'group_5e66af31dc189',
        'title' => 'Department Publications Hero Image',
        'fields' => array(
            array(
                'key' => 'field_5e66af3dad17a',
                'label' => 'Upload Hero Image',
                'name' => 'upload_hero_image',
                'type' => 'image',
                'instructions' => 'Upload a hero image to be used on the department publications page.',
                'required' => 1,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'return_format' => 'url',
                'preview_size' => 'medium',
                'library' => 'all',
                'min_width' => '',
                'min_height' => '',
                'min_size' => '',
                'max_width' => '',
                'max_height' => '',
                'max_size' => '',
                'mime_types' => '',
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'taxonomy',
                    'operator' => '==',
                    'value' => 'dept_tax',
                ),
            ),
        ),
        'menu_order' => 0,
        'position' => 'normal',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'hide_on_screen' => '',
        'active' => true,
        'description' => '',
    ));

    acf_add_local_field_group(array(
        'key' => 'group_5e6a5b79c154c',
        'title' => 'Department',
        'fields' => array(
            array(
                'key' => 'field_5e6a5b9fa23d0',
                'label' => 'Select Department',
                'name' => 'select_department',
                'type' => 'taxonomy',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'taxonomy' => 'dept_tax',
                'field_type' => 'select',
                'allow_null' => 1,
                'add_term' => 1,
                'save_terms' => 1,
                'load_terms' => 1,
                'return_format' => 'id',
                'multiple' => 0,
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'post',
                ),
            ),
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'pub_post',
                ),
            ),
        ),
        'menu_order' => 0,
        'position' => 'side',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'hide_on_screen' => '',
        'active' => true,
        'description' => '',
    ));

    acf_add_local_field_group(array(
        'key' => 'group_5e6a5e297920f',
        'title' => 'Publication',
        'fields' => array(
            array(
                'key' => 'field_5e6a5e297ee05',
                'label' => 'Select Publication',
                'name' => 'select_publication',
                'type' => 'taxonomy',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'taxonomy' => 'pub_tax',
                'field_type' => 'select',
                'allow_null' => 1,
                'add_term' => 1,
                'save_terms' => 1,
                'load_terms' => 1,
                'return_format' => 'id',
                'multiple' => 0,
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'post',
                ),
            ),
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'pub_post',
                ),
            ),
        ),
        'menu_order' => 0,
        'position' => 'side',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'hide_on_screen' => '',
        'active' => true,
        'description' => '',
    ));



endif;
