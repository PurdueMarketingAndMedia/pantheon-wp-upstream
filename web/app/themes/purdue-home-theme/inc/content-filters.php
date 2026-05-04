<?php

/**
 * Change the oembed HTML for youtube to use youtube-lite.
 *
 * @param string $html The HTML.
 * @param string $url  The URL.
 * @return string
 */
function youtube_lite_embed_oembed_html( $html, $url ) {
	if ( ! empty($url) ) {
		if ( 1 === preg_match( '/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/', $url, $matches ) ) {
			$html = sprintf(
				'<lite-youtube class="youtube-lite" videoid="%s" params="rel=0"></lite-youtube>',
				$matches[1] ?: $matches[2]
			);
		}
	}
	return $html;
}

function check_youtube_lite_status() {
	add_filter( 'embed_oembed_html','youtube_lite_embed_oembed_html', 11, 2 );
}
add_action( 'init', 'check_youtube_lite_status' );

function vimeo_lite_embed_oembed_html( $html, $url ) {
	if ( ! empty($url) ) {

		//check if vimeo is unlisted
		$queryCheck = parse_url($url, PHP_URL_QUERY);

		if ($queryCheck){

			parse_str($queryCheck, $queryParams);
			
			if(isset($queryParams['h'])){
				$html = sprintf(
					'<lite-vimeo class="vimeo-lite" videoid="%s" h="%s"></lite-vimeo>',
					purdue_get_vimeo_id($url), $queryParams['h']
				);
			}
		} else{

			if(purdue_get_vimeo_id($url)){
				$html = sprintf(
					'<lite-vimeo class="vimeo-lite" videoid="%s"></lite-vimeo>',
					purdue_get_vimeo_id($url)
				);
			}

		}

		
	}
	return $html;
}

function check_vimeolite_status() {
	add_filter( 'embed_oembed_html','vimeo_lite_embed_oembed_html', 11, 2 );
}
add_action( 'init', 'check_vimeolite_status' );