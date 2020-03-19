<?php
/**
 * Template Name: Single Post
 *
 * @package Purdue-brand
 */
?>
<?php get_header(); ?>

<section class="breadcrumbs" typeof="BreadcrumbList" vocab="http://schema.org/">
<?php echo do_shortcode("[breadcrumb]"); ?>
</section>

<main id="site-content" role="main">
	<section class="container section-container">
		<?php if( is_active_sidebar( 'sidebar-1' ) ) : ?>
			<div class="columns is-multiline with-sideContent">
				<div class="column is-two-thirds-desktop is-full-tablet is-full-mobile">
				<?php purdueBrand_the_title('is-1', False); ?>
				<?php do_action( 'plugins/wp_subtitle/the_subtitle', array(
					'before' => '<p class="post__subheading">',
					'after' => '</p>',
					'default_value' => ''
				)) ?>
				<?php while ( have_posts() ) : the_post(); ?>
				<div class="post__date-line">
					<div class="post__date-line--date">
						<?php echo get_the_date("F j, Y"); ?>
					</div>
					<div class="post__date-line--share">
						<p>Share: </p>
						<div class="level is-mobile">
							<div class="level-left">
								<div class="level-item">
									<a class="icon is-medium" href="https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>"><i class="fab fa-lg fa-facebook-f"></i></a>
								</div>
								<div class="level-item">
									<a class="icon is-medium" href="https://twitter.com/intent/tweet?url=<?php the_permalink(); ?>"><i class="fab fa-lg fa-twitter"></i></a>
								</div>
								<div class="level-item">
									<a class="icon is-medium" href="https://www.linkedin.com/shareArticle?mini=true&url=<?php the_permalink(); ?>"><i class="fab fa-lg fa-linkedin-in"></i></a>
								</div>
								<div class="level-item">
									<a class="icon is-medium" href="mailto:placeholder@placeholder.com?body=<?php the_permalink(); ?>"><i class="fas fa-lg fa-envelope" ></i></a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="content">
					<?php the_content(); ?>
				</div>
				<?php endwhile; // end of the loop. ?>
			</div>
			<aside class="column is-one-quarter-desktop is-full-tablet is-full-mobile">
				<div class="side-content">
				<?php dynamic_sidebar( 'sidebar-1' ); ?>
				</div>
			</aside>
		<?php else : ?>
			<div class="columns is-centered">
				<div class="column is-two-thirds-desktop is-full-tablet is-full-mobile">
				<?php purdueBrand_the_title('is-1', False); ?>
				<?php do_action( 'plugins/wp_subtitle/the_subtitle', array(
					'before' => '<p class="post__subheading">',
					'after' => '</p>',
					'default_value' => ''
				)) ?>
				<?php while ( have_posts() ) : the_post(); ?>
				<div class="post__date-line">
					<div class="post__date-line--date">
						<?php echo get_the_date("F j, Y"); ?>
					</div>
					<div class="post__date-line--share">
						<p>Share: </p>
						<div class="level is-mobile">
							<div class="level-left">
								<div class="level-item">
									<a class="icon is-medium" href="https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>"><i class="fab fa-lg fa-facebook-f"></i></a>
								</div>
								<div class="level-item">
									<a class="icon is-medium" href="https://twitter.com/intent/tweet?url=<?php the_permalink(); ?>"><i class="fab fa-lg fa-twitter"></i></a>
								</div>
								<div class="level-item">
									<a class="icon is-medium" href="https://www.linkedin.com/shareArticle?mini=true&url=<?php the_permalink(); ?>"><i class="fab fa-lg fa-linkedin-in"></i></a>
								</div>
								<div class="level-item">
									<a class="icon is-medium" href="mailto:placeholder@placeholder.com?body=<?php the_permalink(); ?>"><i class="fas fa-lg fa-envelope" ></i></a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="content">
					<?php the_content(); ?>
				</div>
				<?php endwhile; // end of the loop. ?>
			</div>
		<?php endif; ?>
		</section>

</main><!-- #site-content -->

<?php get_footer(); ?>
