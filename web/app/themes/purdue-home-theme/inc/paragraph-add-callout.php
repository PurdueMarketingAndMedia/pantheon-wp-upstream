<?php
/**
 * Add Call out to paragraph block
 *
 * @since   1.0.0
 * @package purdue-home-theme
 */
function rkv_paragraph_wrapper( $block_content, $block ) {
	/* phpcs:disable */
	//if block is paragraph and has callout set to true.
	if ( 'core/paragraph' === $block['blockName']) {
		if(isset( $block['attrs']['showCallout'] ) && $block['attrs']['showCallout'] == 1  && !is_page()){
		$isButton = array_key_exists('isButton',$block['attrs'])?$block['attrs']['isButton']:false;
		$link     = array_key_exists('linkText', $block['attrs'])?$block['attrs']['linkText']:"";
		$external = array_key_exists('external', $block['attrs'])?$block['attrs']['external']:false;
		$text     = $block['innerHTML'];
		$target   = ( $external == 1 ) ? '_blank' : '_self';
		$button = '';
		$output = '';
		if ( $isButton && $block["attrs"]["mediaUrl"]) {
			$output .= "<a class='callout-wrapper has-link' href='" . $link . "' target='" . $target . "'>";
		}else{
			$output .= "<div class='callout-wrapper'>";
		}
		if($block['attrs']['mediaUrl']){
			$output .= '<figure><img src="'.$block["attrs"]["mediaUrl"].'" alt="'.(isset($block["attrs"]["mediaAlt"]) ? $block["attrs"]["mediaAlt"] : '').'" /></figure>';
		}else if(isset($block['attrs']['vimeoURL']) && $block['attrs']['vimeoURL'] && wp_http_validate_url($block['attrs']['vimeoURL']) && $block['attrs']['media']=="vimeo"){
			$output .= '<div class="iframe-container vimeo-video-container is-'.$block["attrs"]["vimeoRatio"].'">
				'.vimeo_lite_embed_oembed_html( '', $block['attrs']['vimeoURL'] ).'	
			</div>'; 
		}else if($block['attrs']['youtubeURL'] && wp_http_validate_url($block['attrs']['youtubeURL'])){
			$output .= '<div class="iframe-container">'.
			youtube_lite_embed_oembed_html( '', $block['attrs']['youtubeURL'] ).'						
			</div>'; 
		}

		if(isset($block['attrs']['calloutText']) && $block['attrs']['calloutText']){
			$output .= '<p class="callout__text">'.trim($block["attrs"]["calloutText"]).'</p>';
		}
		if($isButton){
			if($block["attrs"]["mediaUrl"]){
				$output .= '<p class="cta-link">
				'.$block["attrs"]["buttonText"].'
				</p>';
			}else{
				$output .= '<a class="purdue-home-button" href="' . $link .'" target="'. $target .'">
				'.$block["attrs"]["buttonText"].'
				</a>';
			}
			

		}
		if ( $isButton && $block["attrs"]["mediaUrl"]) {
			$output .= "</a>";
		}else{
			$output .= "</div>";
		}
	
			return '<div class="purdue-home-callout">'
			. $output .$text.
			'</div>';
	}elseif(isset( $block['attrs']['addInitialWords'] ) && $block['attrs']['addInitialWords'] == true ){
		$text     = $block['innerHTML'];
		$initial     = $block['attrs']['initialWords']??"WEST LAFAYETTE, Ind.";

			return '<div class="purdue-initial-words-wrap"><p class="purdue-initial-words">'
			. $initial . ' &mdash;</p> '. $text .
			'</div>';
	}
		};
	/* phpcs:enable */

	return $block_content;
}

	add_filter( 'render_block', 'rkv_paragraph_wrapper', 10, 2 );