<?php
/**
 * Template Name: Sidebar Nav
 *
 * @package Purdue-brand
 */
?>

<?php get_header('sidenav'); ?>
<aside class="side-nav">
	<h2 class="title is-5">Brand Style Guide</h2>
	<ul class="navbar-menu">
		<?php purdueBrand_sideNav();?>	
</ul>
</aside>

<main id="site-content" role="main" class="main-content">

	<?php

	if ( have_posts() ) {

		while ( have_posts() ) {
			the_post();

			get_template_part( 'template-parts/content-page', get_post_type() );
		}
	}

	?>

</main><!-- #site-content -->

<?php get_footer('sidenav'); ?>
