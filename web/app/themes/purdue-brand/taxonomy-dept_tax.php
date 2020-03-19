<?php

/**
 * Template Name: Publication Post Archive Page
 *
 * @package Purdue-brand
 */
?>
<?php get_header(); ?>

<?php
// get the title and description from the taxonomy term settings for current post
$term = get_term_by('slug', get_query_var('term'), get_query_var('taxonomy'));
$title = $term->name;
$description = $term->description;

// get the image from the taxonomy term settings for current post.
$tax = $term->taxonomy;
$id = $tax . '_' . $term->term_id;
$imageUrl = get_field('upload_hero_image', $id);
?>

<main id="site-content" role="main">
	<div class="bulma-blocks-50-50-hero">
		<div class="columns is-mobile is-gapless">
			<div class="column is-half-desktop is-half-widescreen is-half-fullhd">
				<div class="section content">
					<h1><?php echo ($title); ?></h1>
					<p><?php echo ($description); ?></p>
				</div>
			</div>
			<div class="column is-half-desktop is-half-widescreen is-half-fullhd">
				<span class="background-image" role="img" style="background-image:url(<?php echo ($imageUrl); ?>)" aria-label=""></span>
			</div>
		</div>
	</div>
	<section class="post-container">
		<?php
		$queried_object = get_queried_object();
		$tax = $queried_object->taxonomy;
		$tax_name = $queried_object->name;
		$tax_term = $queried_object->slug;
		echo do_shortcode('[ajax_load_more theme_repeater="year-list.php" post_type="pub_post" taxonomy="' . $tax . '" taxonomy_terms="' . $tax_term . '" taxonomy_operator="IN" container_type="div" css_classes="container year-list" posts_per_page="6" transition_container_classes="columns is-multiline"]');
		?>
	</section>
</main><!-- #site-content -->

<?php get_footer(); ?>