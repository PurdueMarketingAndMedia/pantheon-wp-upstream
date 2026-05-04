<?php
/**
 * Add Initial words to paragraph block
 *
 * @since   1.0.0
 * @package purdue-home-theme
 */
function purdue_paragraph_wrapper( $block_content, $block ) {
	/* phpcs:disable */
	//if block is paragraph and has callout set to true.
	if ( 'core/paragraph' === $block['blockName'] && isset( $block['attrs']['addInitialWords'] ) && $block['attrs']['addInitialWords'] == "true" ) {
		$text     = $block['innerHTML'];
		$initial     = $block['attrs']['initialWords'];
		
			return '<div class="purdue-initial-words-wrap"><p class="purdue-initial-words">'
			. $initial . ' -</p> '. $text .
			'</div>';
			};
	/* phpcs:enable */

	return $block_content;
}

	add_filter( 'render_block', 'purdue_paragraph_wrapper', 10, 2 );