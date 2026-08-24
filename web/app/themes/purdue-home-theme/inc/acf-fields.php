<?php
/**
 * ACF fields
 *
 * @package purdue-home-theme
 */

//acf fields
add_action( 'acf/include_fields', function() {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	acf_add_local_field_group( array(
		'key' => 'group_64fb44c9a828e',
		'title' => 'Breadcrumb Setting',
		'fields' => array(
			array(
				'key' => 'field_64fb44cab7344',
				'label' => 'Add Breadcrumb to this page?',
				'name' => 'add_breadcrumb_to_this_page',
				'aria-label' => '',
				'type' => 'checkbox',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'choices' => array(
					'Yes' => 'Yes',
				),
				'default_value' => array(
				),
				'return_format' => 'value',
				'allow_custom' => 0,
				'layout' => 'vertical',
				'toggle' => 0,
				'save_custom' => 0,
				'custom_choice_button_text' => 'Add new choice',
			),
			array(
				'key' => 'field_64fb44cab7345',
				'label' => 'Breadcrumb Background Color',
				'name' => 'breadcrumb_background_color',
				'aria-label' => '',
				'type' => 'select',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => [
                [
                    [
                        'field' => 'field_64fb44cab7344',
                        'operator' => '!=empty',
                    ],
                ],
				],
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'choices' => array(
					'has-white-background' => 'White',
					'has-black-background' => 'Black',
					'has-gold-background' => 'Gold',
					
				),
				'default_value' => array(
				),
				'return_format' => 'value',
				'allow_custom' => 0,
				'layout' => 'vertical',
				'toggle' => 0,
				'save_custom' => 0,
				'custom_choice_button_text' => 'Add new choice',
			),
		),
		'location' => array(
			array(
				array(
					'param' => 'post_type',
					'operator' => '==',
					'value' => 'page',
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
		'show_in_rest' => 0,
	) );

	acf_add_local_field_group( array(
		'key' => 'group_6851c758015d7',
		'title' => 'Featured Image Size',
		'fields' => array(
			array(
				'key' => 'field_6851c758015d7',
				'label' => 'Select image size',
				'name' => 'featured_image_size',
				'aria-label' => '',
				'type' => 'select',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'choices' => array(
					'wide' => 'Wide',
					'normal' => 'Normal',
				),
				'default_value' => 'wide',
				'allow_null' => false,
				'multiple' => false,
				'ui' => 0,
				'ajax' => 0,
				'return_format' => 'value',
			),
		),
		'location' => array(
			array(
				array(
					'param' => 'post_type',
					'operator' => '!=',
					'value' => 'page',
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
		'show_in_rest' => 0,
	) );

	acf_add_local_field_group( array(
		'key' => 'group_64fb45392438d',
		'title' => 'Byline Settings',
		'fields' => array(
			array(
				'key' => 'field_64fb4539afbce',
				'label' => 'Remove date/byline',
				'name' => 'show_byline_post',
				'aria-label' => '',
				'type' => 'checkbox',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'choices' => array(
					'Yes' => 'Yes',
				),
				'default_value' => array(
				),
				'return_format' => 'value',
				'allow_custom' => 0,
				'layout' => 'vertical',
				'toggle' => 0,
				'save_custom' => 0,
				'custom_choice_button_text' => 'Add new choice',
			),
			array(
				'key' => 'field_64fb45ab34lbcf',
				'label' => 'Remove author only on this post',
				'name' => 'remove_author_field',
				'aria-label' => '',
				'type' => 'checkbox',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'choices' => array(
					'Yes' => 'Yes',
				),
				'default_value' => array(
				),
				'return_format' => 'value',
				'allow_custom' => 0,
				'layout' => 'vertical',
				'toggle' => 0,
				'save_custom' => 0,
				'custom_choice_button_text' => 'Add new choice',
			),
			array(
				'key' => 'field_64fb45a0afbcf',
				'label' => 'Remove Share Buttons on this post',
				'name' => 'show_share_buttons_post',
				'aria-label' => '',
				'type' => 'checkbox',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'choices' => array(
					'Yes' => 'Yes',
				),
				'default_value' => array(
				),
				'return_format' => 'value',
				'allow_custom' => 0,
				'layout' => 'vertical',
				'toggle' => 0,
				'save_custom' => 0,
				'custom_choice_button_text' => 'Add new choice',
			),
		),
		'location' => array(
			array(
				array(
					'param' => 'post_type',
					'operator' => '!=',
					'value' => 'page',
				),
			),
		),
		'menu_order' => 3,
		'position' => 'side',
		'style' => 'default',
		'label_placement' => 'top',
		'instruction_placement' => 'label',
		'hide_on_screen' => '',
		'active' => true,
		'description' => '',
		'show_in_rest' => 0,
	) );

	acf_add_local_field_group( array(
		'key' => 'group_64fb47dc6e0b7',
		'title' => 'Post Subheadline',
		'fields' => array(
			array(
				'key' => 'field_64fb47ddfdcbf',
				'label' => 'Add a Subheadline',
				'name' => 'add_a_subheading',
				'aria-label' => '',
				'type' => 'textarea',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'maxlength' => '',
				'rows' => '',
				'placeholder' => '',
				'new_lines' => 'br',
			),
		),
		'location' => array(
			array(
				array(
					'param' => 'post_type',
					'operator' => '!=',
					'value' => 'page',
				),
			),
		),
		'menu_order' => 1,
		'position' => 'side',
		'style' => 'default',
		'label_placement' => 'top',
		'instruction_placement' => 'label',
		'hide_on_screen' => '',
		'active' => true,
		'description' => '',
		'show_in_rest' => 0,
	) );

    acf_add_local_field_group( array(
		'key' => 'group_64fb7db458dea',
		'title' => 'Story source',
		'fields' => array(
			array(
				'key' => 'field_64fb7db47e7ad',
				'label' => 'Add attributions',
				'name' => 'add_attributions',
				'aria-label' => '',
				'type' => 'wysiwyg',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'tabs' => 'all',
				'toolbar' => 'full',
				'media_upload' => 1,
				'delay' => 0,
			),
		),
		'location' => array(
			array(
				array(
					'param' => 'post_type',
					'operator' => '!=',
					'value' => 'page',
				),
			),
		),
		'menu_order' => 4,
		'position' => 'side',
		'style' => 'default',
		'label_placement' => 'top',
		'instruction_placement' => 'label',
		'hide_on_screen' => '',
		'active' => true,
		'description' => '',
		'show_in_rest' => 0,
	) );
	acf_add_local_field_group( array(
		'key' => 'group_650c89da745d9',
		'title' => 'Custom Styles and Scripts',
		'fields' => array(
			array(
				'key' => 'field_650c89dce9501',
				'label' => 'Custom Styles',
				'name' => 'custom_styles',
				'aria-label' => '',
				'type' => 'textarea',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'maxlength' => '',
				'rows' => '',
				'placeholder' => '',
				'new_lines' => '',
			),
			array(
				'key' => 'field_650c8a464395b',
				'label' => 'Custom Scripts',
				'name' => 'custom_scripts',
				'aria-label' => '',
				'type' => 'textarea',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'maxlength' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
			),
		),
		'location' => array(
			array(
				array(
					'param' => 'post_type',
					'operator' => '!=',
					'value' => 'alert',
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
		'show_in_rest' => 0,
	) );
	acf_add_local_field_group( array(
		'key' => 'group_650de777cef7b',
		'title' => 'Keep Exploring Section',
		'fields' => array(
			array(
				'key' => 'field_650de7784a437',
				'label' => 'Add Keep Exploring section at the bottom',
				'name' => 'add_related_stories_section_at_the_bottom',
				'aria-label' => '',
				'type' => 'checkbox',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'choices' => array(
					'Yes' => 'Yes',
				),
				'default_value' => array(
					0 => 'Yes',
				),
				'return_format' => 'value',
				'allow_custom' => 0,
				'layout' => 'vertical',
				'toggle' => 0,
				'save_custom' => 0,
				'custom_choice_button_text' => 'Add new choice',
			),
			array(
				'key' => 'field_6501cdba34497',
				'label' => 'Select related stories card type',
				'name' => 'select_card_type',
				'aria-label' => '',
				'type' => 'radio',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => array(
					array(
						array(
							'field' => 'field_650de7784a437',
							'operator' => '!=empty',
						),
					),
				),
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'choices' => array(
					'story' => 'Story',
					'faculty' => 'Faculty',
				),
				'default_value' => 'story',
				'return_format' => 'value',
				'multiple' => 0,
				'allow_null' => 1,
				'ui' => 0,
				'ajax' => 0,
				'placeholder' => '',
			),
			array(
				'key' => 'field_650de7e74b3540',
				'label' => 'Show excerpt on the card',
				'name' => 'show_excerpt_card',
				'aria-label' => '',
				'type' => 'checkbox',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => array(
					array(
						array(
							'field' => 'field_650de7784a437',
							'operator' => '!=empty',
						),
					),
				),
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'choices' => array(
					'Yes' => 'Yes',
				),
				'default_value' => array(
					0 => 'Yes',
				),
				'return_format' => 'value',
				'allow_custom' => 0,
				'layout' => 'vertical',
				'toggle' => 0,
				'save_custom' => 0,
				'custom_choice_button_text' => 'Add new choice',
			),
			array(
				'key' => 'field_650de7e74a440',
				'label' => 'Add a post type tag on the cards (optional)',
				'name' => 'add_a_post_type_tag_optional',
				'aria-label' => '',
				'type' => 'checkbox',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => array(
					array(
						array(
							'field' => 'field_650de7784a437',
							'operator' => '!=empty',
						),
						array(
							'field' => 'field_6501cdba34497',
							'operator' => '==',
							'value' => 'story',
						),
					),
				),
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'choices' => array(
					'Yes' => 'Yes',
				),
				'default_value' => array(
				),
				'return_format' => 'value',
				'allow_custom' => 0,
				'layout' => 'vertical',
				'toggle' => 0,
				'save_custom' => 0,
				'custom_choice_button_text' => 'Add new choice',
			),
			array(
				'key' => 'field_650de7e74a441',
				'label' => 'Add a taxonomy tag to the cards (optional)',
				'name' => 'add_a_tax_tag_cards_optional',
				'aria-label' => '',
				'type' => 'text',
				'instructions' => 'Add the taxonomy name in the box. Ex: category',
				'required' => 0,
				'conditional_logic' => array(
					array(
						array(
							'field' => 'field_650de7784a437',
							'operator' => '!=empty',
						),
						array(
							'field' => 'field_6501cdba34497',
							'operator' => '==',
							'value' => 'story',
						),
					),
				),
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'placeholder' => '',
			),
		),
		'location' => array(
			array(
				array(
					'param' => 'post_type',
					'operator' => '!=',
					'value' => 'page',
				),
			),
		),
		'menu_order' => 5,
		'position' => 'side',
		'style' => 'default',
		'label_placement' => 'top',
		'instruction_placement' => 'label',
		'hide_on_screen' => '',
		'active' => true,
		'description' => '',
		'show_in_rest' => 0,
	) );
	acf_add_local_field_group( array(
		'key' => 'group_6585aa7001382',
		'title' => 'Redirect',
		'fields' => array(
			array(
				'key' => 'field_6585aa70d49e6',
				'label' => 'Is this post an external link?',
				'name' => 'is_this_post_an_external_link',
				'aria-label' => '',
				'type' => 'checkbox',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'choices' => array(
					'Yes' => 'Yes',
				),
				'default_value' => array(
				),
				'return_format' => 'value',
				'allow_custom' => 0,
				'layout' => 'vertical',
				'toggle' => 0,
				'save_custom' => 0,
				'custom_choice_button_text' => 'Add new choice',
			),
		),
		'location' => array(
			array(
				array(
					'param' => 'post_type',
					'operator' => '!=',
					'value' => 'page',
				),
			),
		),
		'menu_order' => 6,
		'position' => 'side',
		'style' => 'default',
		'label_placement' => 'top',
		'instruction_placement' => 'label',
		'hide_on_screen' => '',
		'active' => true,
		'description' => '',
		'show_in_rest' => 0,
	) );
	acf_add_local_field_group( array(
		'key' => 'group_65b2bdc93007d',
		'title' => 'Featured Video',
		'fields' => array(
			array(
				'key' => 'field_65b2bdc91c2fd',
				'label' => 'Video host',
				'name' => 'video_host',
				'aria-label' => '',
				'type' => 'radio',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'choices' => array(
					'youtube' => 'YouTube',
					'vimeo' => 'Vimeo',
				),
				'default_value' => 'youtube',
				'return_format' => 'value',
				'allow_null' => 0,
				'other_choice' => 0,
				'layout' => 'vertical',
				'save_other_choice' => 0,
			),
			array(
				'key' => 'field_65b2bea1dec7c',
				'label' => 'YouTube URL',
				'name' => 'youtube_url',
				'aria-label' => '',
				'type' => 'url',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => array(
					array(
						array(
							'field' => 'field_65b2bdc91c2fd',
							'operator' => '==',
							'value' => 'youtube',
						),
					),
				),
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'placeholder' => '',
			),
			array(
				'key' => 'field_65b2bf20dec7d',
				'label' => 'Vimeo URL',
				'name' => 'vimeo_url',
				'aria-label' => '',
				'type' => 'url',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => array(
					array(
						array(
							'field' => 'field_65b2bdc91c2fd',
							'operator' => '==',
							'value' => 'vimeo',
						),
					),
				),
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'maxlength' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
			),
		),
		'location' => array(
			array(
				array(
					'param' => 'post_type',
					'operator' => '!=',
					'value' => 'page',
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
		'show_in_rest' => 0,
	) );
	acf_add_local_field_group( array(
		'key' => 'group_65baa0a4ef59e',
		'title' => 'Meta field for sorting on post archive block',
		'fields' => array(
			array(
				'key' => 'field_65baa0a56e6c3',
				'label' => 'Add content that can be used for sorting the posts',
				'name' => 'meta_for_sorting',
				'aria-label' => '',
				'type' => 'text',
				'instructions' => 'E.g. this is can the first name or last name if this is a bio post.',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'maxlength' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
			),
		),
		'location' => array(
			array(
				array(
					'param' => 'post_type',
					'operator' => '!=',
					'value' => 'page',
				),
			),
		),
		'menu_order' => 7,
		'position' => 'side',
		'style' => 'default',
		'label_placement' => 'top',
		'instruction_placement' => 'label',
		'hide_on_screen' => '',
		'active' => true,
		'description' => '',
		'show_in_rest' => 0,
	) );
	acf_add_local_field_group( array(
		'key' => 'group_65bbb8b74c6dd',
		'title' => 'Second Featured Image',
		'fields' => array(
			array(
				'key' => 'field_65bbb8b73697a',
				'label' => 'Image to be displayed as thumbnail on Post Archive block(optional, if empty it will use the featured image',
				'name' => 'secondary_featured_image',
				'aria-label' => '',
				'type' => 'image',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'return_format' => 'array',
				'library' => 'all',
				'min_width' => '',
				'min_height' => '',
				'min_size' => '',
				'max_width' => '',
				'max_height' => '',
				'max_size' => '',
				'mime_types' => '',
				'preview_size' => 'medium',
			),
		),
		'location' => array(
			array(
				array(
					'param' => 'post_type',
					'operator' => '!=',
					'value' => 'page',
				),
			),
		),
		'menu_order' => 8,
		'position' => 'side',
		'style' => 'default',
		'label_placement' => 'top',
		'instruction_placement' => 'label',
		'hide_on_screen' => '',
		'active' => true,
		'description' => '',
		'show_in_rest' => 0,
	) );

	if ( is_plugin_active( 'wordpress-post-modal/wp-post-modal.php' ) ) {

		acf_add_local_field_group( array(
			'key' => 'group_67e185cc5ca41',
			'title' => 'Open post in modal window on post archive block?',
			'fields' => array(
				array(
					'key' => 'field_67e185cc5ca41',
					'label' => 'This will open the post in a modal window on Post Archive block.',
					'name' => 'post_modal_window',
					'aria-label' => '',
					'type' => 'checkbox',
					'choices' => array(
						'modal-link'   => 'Yes'
					),
					'layout' => 'vertical',
					'allow_custom' => false,
					'save_custom' => false,
					'toggle' => false,
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'return_format' => 'value',
				),
			),
			'location' => array(
				array(
					array(
						'param' => 'post_type',
						'operator' => '!=',
						'value' => 'page',
					),
				),
			),
			'menu_order' => 8,
			'position' => 'side',
			'style' => 'default',
			'label_placement' => 'top',
			'instruction_placement' => 'label',
			'hide_on_screen' => '',
			'active' => true,
			'description' => '',
			'show_in_rest' => 0,
		) );
	} 
	
} );

//Second menu
add_filter( 'acf/load_field/key=field_6501cdba34496', 'purdue_load_select_values' );
function purdue_load_select_values( $field ) {
	$menus = wp_get_nav_menus();
	
	$field[ 'choices' ] = array();
	foreach( $menus as $menu ) {
		$field[ 'choices' ][ $menu->term_id ] = $menu->name;
	}
	
	return $field;
}

// Add the ACF field group with the select field type.
add_action( 'acf/init', 'purdue_add_menu_field_group' );
function purdue_add_menu_field_group() {
	if ( function_exists( 'acf_add_local_field_group' ) ) {
		acf_add_local_field_group( array(
			'key' => 'group_6501b9357489d',
			'title' => 'Second Menu Setting',
			'fields' => array(
				array(
					'key' => 'field_6501b93534495',
					'label' => 'Add Second Menu',
					'name' => 'add_second_menu',
					'aria-label' => '',
					'type' => 'checkbox',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array(
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'choices' => array(
						'Yes' => 'Yes',
					),
					'default_value' => array(
					),
					'return_format' => 'value',
					'allow_custom' => 0,
					'layout' => 'vertical',
					'toggle' => 0,
					'save_custom' => 0,
					'custom_choice_button_text' => 'Add new choice',
				),
				array(
					'key' => 'field_6501cdba34496',
					'label' => 'Second Menu',
					'name' => 'second_menu',
					'aria-label' => '',
					'type' => 'select',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => array(
						array(
							array(
								'field' => 'field_6501b93534495',
								'operator' => '!=empty',
							),
						),
					),
					'wrapper' => array(
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'choices' => array(
						'one' => 'One',
					),
					'default_value' => false,
					'return_format' => 'value',
					'multiple' => 0,
					'allow_null' => 1,
					'ui' => 0,
					'ajax' => 0,
					'placeholder' => '',
				),
				array(
					'key' => 'field_65021a73aaa46',
					'label' => 'Menu Title (Shown on mobile)',
					'name' => 'menu_title',
					'aria-label' => '',
					'type' => 'text',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => array(
						array(
							array(
								'field' => 'field_6501b93534495',
								'operator' => '!=empty',
							),
						),
					),
					'wrapper' => array(
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'default_value' => 'Additional Links',
					'maxlength' => '',
					'placeholder' => '',
					'prepend' => '',
					'append' => '',
				),
				array(
					'key' => 'field_65778d3040478',
					'label' => 'Make it sticky at the top?',
					'name' => 'make_it_sticky_at_the_top',
					'aria-label' => '',
					'type' => 'checkbox',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => array(
						array(
							array(
								'field' => 'field_6501b93534495',
								'operator' => '!=empty',
							),
						),
					),
					'wrapper' => array(
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'choices' => array(
						'Yes' => 'Yes',
					),
					'default_value' => array(
					),
					'return_format' => 'value',
					'allow_custom' => 0,
					'layout' => 'vertical',
					'toggle' => 0,
					'save_custom' => 0,
					'custom_choice_button_text' => 'Add new choice',
				),
			),

			'location' => array(
				array(
					array(
						'param' => 'post_type',
						'operator' => '==',
						'value' => 'page',
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
			'show_in_rest' => 0,
		) );
	}
}