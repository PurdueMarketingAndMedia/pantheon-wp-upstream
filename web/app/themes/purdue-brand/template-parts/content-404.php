<?php
/**
 * Template part for displaying content
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Purdue-brand
 */
?>


<div class="section">
	<div class="container">
		<div class="content">
			<h1><?php _e( 'Not Found', 'purdue-brand' ); ?></h1>
			<h2><?php _e( 'This is somewhat embarrassing, isn’t it?', 'purdue-brand' ); ?></h2>
			<p><?php _e( 'It looks like nothing was found at this location. Maybe try a search?', 'purdue-brand' ); ?></p>
			<div class="form-group search-box">
				<form action="<?php echo esc_url( home_url( '/' ) );?>/search" id="cse-search-box" method="get">
					<span class="sr-only">Search for:</span>
					<input type="search" class="search-field" placeholder="Google Custom Search" name="q" value='<?php echo $_GET['q']; ?>'>
					<button type="submit" class="search-button"><span class="sr-only">Submit</span>
						<i class="fas fa-search search-icon"></i>
					</button>
				</form>
			</div>
		</div>
	</div>
</div>


