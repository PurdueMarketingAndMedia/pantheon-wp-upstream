<?php
/**
 * Template Name: Top Navigation
 *
 * @package Purdue-brand
 */
?>

<?php get_header(); ?>

<main id="site-content" role="main">

	<?php

	if ( have_posts() ) {

		while ( have_posts() ) {
			the_post();

			get_template_part( 'template-parts/content-page', get_post_type() );
		}
	}

	?>

</main><!-- #site-content -->

<?php get_footer(); ?>
