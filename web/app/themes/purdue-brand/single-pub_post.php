<?php

/**
 * Template Name: Print Publication
 *
 * @package Purdue-brand
 */
?>

<?php get_header(); ?>

<?php
// get publication taxonomy term for alm shortcode post list
$terms = get_the_terms($post, 'pub_tax');
$filter_terms = $terms[0]->slug;
?>

<main id="site-content" role="main">

	<?php

	if (have_posts()) {

		while (have_posts()) {
			the_post();

			get_template_part('template-parts/content-page', get_post_type());
		}
	}

	?>

	<section class="section print-publication-articles">
		<div class="container articles-heading">
			<h2 class="has-black-color has-text-color"><?php echo (get_the_title()) ?> Articles</h2>
			<div class="category-filter">
				<?php
				echo do_shortcode('[ajax_load_more_filters id="category2" target="ajax_load"]');
				?>
			</div>
		</div>
		<div class="container">
			<?php
			echo do_shortcode('[ajax_load_more id="ajax_load" theme_repeater="post-list.php" target="category2" filters="true" filters_url="false" taxonomy="pub_tax" taxonomy_terms="' . $filter_terms . '" taxonomy_operator="IN" filters_paging="false" container_type="div" css_classes="post-list" post_type="post" posts_per_page="6" transition_container_classes="columns is-multiline"]')
			?>
		</div>
	</section>

</main><!-- #site-content -->

<?php get_footer(); ?>