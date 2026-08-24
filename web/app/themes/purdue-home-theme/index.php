<?php
/**
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package purdue-home-theme
 */
?>

<?php get_header(); ?>

<?php
if (function_exists('get_field')&&get_field('add_breadcrumb_to_this_page')) {	
	$breadCrumb = get_field('add_breadcrumb_to_this_page')[0];
	
} else {	
	$breadCrumb = "";
}
if(! is_home() &&$breadCrumb=="Yes"): 
	$breadCrumbClass = "breadcrumbs";
	if(get_field('breadcrumb_background_color')){
		$breadCrumbBackground = get_field('breadcrumb_background_color');
		$breadCrumbClass .= " ".$breadCrumbBackground;
	}
		?>
<div class="<?= $breadCrumbClass ?>" typeof="BreadcrumbList" vocab="https://schema.org/" role="navigation">
    <?php if(function_exists('bcn_display')){
			bcn_display(); //breadcrumb from NavXT
		}else{
			wpse_get_breadcrumbs(); //default breadcrumb
		}?>
</div>
<?php endif; ?>

<main id="site-content" role="main" class="main-content">
    <?php

	if ( have_posts() ) {

		while ( have_posts() ) {
			the_post();
			get_template_part( 'template-parts/content-page', get_post_type() );
		}
	}

	?>

    <button id="to-top" class="to-top-hidden" aria-label="Back to Top Button">
        <span class="icon"><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></span>
    </button>
</main><!-- #site-content -->

<?php get_footer(); ?>