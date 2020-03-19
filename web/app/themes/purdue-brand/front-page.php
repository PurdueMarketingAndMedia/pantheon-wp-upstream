<?php
/**
 * Template Name: Front Page
 *
 * @package Purdue-brand
 */
?>
<?php get_header(); ?>

<main id="site-content" role="main">
	<?php while ( have_posts() ) : the_post(); 
		get_template_part( 'template-parts/content-page', get_post_type() );
	endwhile; // end of the loop. ?>

	<section class="container filter-container">
		<?php echo do_shortcode('[ajax_load_more_filters id="category" target="my_alm_filters"]');?>
	</section>

	<section class="post-container">
		<?php 
			echo do_shortcode('[ajax_load_more theme_repeater="post-list.php" id="my_alm_filters" target="category" filters="true" filters_url="false" filters_paging="false" container_type="div" css_classes="container post-list" post_type="post" posts_per_page="6" transition_container_classes="columns is-multiline"]');
		?>
	</section>
</main><!-- #site-content -->

<?php get_footer(); ?>
