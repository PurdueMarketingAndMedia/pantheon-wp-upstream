<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function purdue_blocks_cgb_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	$styleFilePath =glob( plugin_dir_path(  __DIR__ ) . 'build/style.*.css',GLOB_BRACE );
	$styleFileURI = plugin_dir_url(  __DIR__ ). 'build/' . basename($styleFilePath[0]);

	$editorFilePath = glob( plugin_dir_path( __DIR__ ) . '/build/editor.*.css',GLOB_BRACE );
	$editorFileURI = plugin_dir_url(  __DIR__ ). 'build/' . basename($editorFilePath[0]);

	$blockFilePath = glob( plugin_dir_path( __DIR__ ) . '/build/block.*.js',GLOB_BRACE );
	$blockFileURI = plugin_dir_url(  __DIR__ ). 'build/' . basename($blockFilePath[0]);

	$frontFilePath = glob( plugin_dir_path( __DIR__ ) . '/build/frontend.*.js',GLOB_BRACE );
	$frontFileURI = plugin_dir_url(  __DIR__ ). 'build/' . basename($frontFilePath[0]);

	wp_register_style(
		'purdue_blocks-cgb-style-css', // Handle.
		$styleFileURI, // Block style CSS.
		null, // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'purdue_blocks-cgb-block-js', // Handle.
		$blockFileURI, // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);
	// Register block editor script for frontend.
	wp_register_script(
		'purdue_blocks-cgb-frontend-js', // Handle.
		$frontFileURI, // Block.build.js: We register the block here. Built with Webpack.
		'',
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);
	// Register block editor styles for backend.
	wp_register_style(
		'purdue_blocks-cgb-block-editor-css', // Handle.
		$editorFileURI, // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
		wp_localize_script(
			'purdue_blocks-cgb-block-js',
			'file_data',
			array(
				'fabric_url' => plugins_url( 'img/fabric.png', __FILE__ ),
				'concrete_url' => plugins_url( 'img/concrete.png', __FILE__ ),
				'concreteDark_url' => plugins_url( 'img/concreteDark.png', __FILE__ )
			)
		);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'purdue-blocks/site-hero', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'script'         => 'purdue_blocks-cgb-frontend-js',
			'style'         => 'purdue_blocks-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'purdue_blocks-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'purdue_blocks-cgb-block-editor-css',
		)
	);
}

// Hook: Block assets.
add_action( 'init', 'purdue_blocks_cgb_block_assets' );

add_theme_support( 'post-thumbnails' );

add_image_size( 'hero_mobile', 768, 384);

add_filter( 'image_size_names_choose', 'hero_image_sizes' );

function hero_image_sizes( $sizes ) {
    return array_merge( $sizes, array(
        'hero_mobile' => __( 'Hero mobile' ),
    ) );
}
