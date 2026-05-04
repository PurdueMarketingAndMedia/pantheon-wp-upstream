<?php
/**
 * Scripts & Styles
 *
 * @package purdue-wp-theme
 */

if ( ! function_exists( 'purdueBrand_scripts' ) ) {
	/**
	 * Enqueue scripts and styles.
	 */
	function purdueBrand_scripts() {
		$x = require get_template_directory() . '/build/app.asset.php';
		wp_enqueue_style( 'purdueBrand-style', get_stylesheet_uri() );
		
		// include the css file
		$cssFilePath = glob( get_template_directory() . '/build/app.css' );
		$cssFileURI = get_template_directory_uri() . '/build/' . basename($cssFilePath[0]);
		wp_enqueue_style( 'purdueBrand-brand-style', $cssFileURI, array(), $x['version'], false );
		
		$jsFilePath = glob( get_template_directory() . '/build/app.js' );
		$jsFileURI = get_template_directory_uri() . '/build/' . basename($jsFilePath[0]);
		wp_enqueue_script( 'purdueBrand-mainscript', $jsFileURI, $x['dependencies'], $x['version'], true );

		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}

		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}

		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}

		$common = [
			'glide.esm',
		];
	
		foreach($common as $c) {
			$build = '/build/common/';
			$cc = require get_template_directory() . $build . $c . '.asset.php';
			$filePath = glob( get_template_directory() . $build . $c .'.js' );
			$fileURI = get_template_directory_uri() . $build . basename($filePath[0]);
			wp_enqueue_script( $c, $fileURI, $cc['dependencies'], $cc['version'], true );	
		}
		wp_add_inline_script( 'purdueBrand-mainscript', 'var siteHomeURL = ' . wp_json_encode( home_url() ), 'before' );

	}
}
add_action( 'wp_enqueue_scripts', 'purdueBrand_scripts', 10 );

function enqueue_vimeo_tracking($content = ""){

	if(has_block('purdue/timeline-block') || has_block('embed')){
		wp_enqueue_script('vimeo-tracking','https://extend.vimeocdn.com/ga4/130817696.js', array(), null, array('strategy' => 'defer', 'in_footer' => true));
	}

}

add_action( 'wp_enqueue_scripts', 'enqueue_vimeo_tracking');