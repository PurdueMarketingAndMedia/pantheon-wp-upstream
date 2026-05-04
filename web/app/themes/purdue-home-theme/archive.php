<?php

/**
 * Default archive page
 *
 * @package purdue-wp-theme
 */
?>
<?php get_header(); 
	$attributes['cardType'] = "story";
	$attributes['buttonText']="Read More";
	$attributes['showExcerpt']=true;
?>

<main id="site-content" role="main" class="main-content">
	<section class="section">
		<div class="container">
			<?php the_archive_title( '<h1 class="purdue-archive-title">', '</h1>' ); ?>
		</div>
	</section>
	<div class="section post-archive-container">
		<div class="container">
		<div class="columns is-multiline">
                <?php
                if (have_posts()) :
                    while (have_posts()) : the_post();
                        require __DIR__ . '/src/blocks/post-grid/inc/story-grid.php';
                    endwhile;

                    the_posts_pagination(array(
                        'mid_size'  => 2,
                        'prev_text' => __('Prev', 'textdomain'),
                        'next_text' => __('Next', 'textdomain'),
                    ));
                else :
                    ?>
                    <p><?php esc_html_e('No posts found.', 'textdomain'); ?></p>
                <?php
                endif;
                ?>
            </div>
		</div>
	</div>

	<button id="to-top" class="to-top-hidden" aria-label="Back to Top Button">
		<i class="fas fa-chevron-up" aria-hidden="true"></i>
	</button>
</main><!-- #site-content -->

<?php get_footer(); ?>