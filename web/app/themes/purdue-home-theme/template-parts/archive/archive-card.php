<?php
/**
 * Template part for displaying archive card
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package purdue-home-theme
 */
$target="_self";
if(get_post_meta( get_the_ID(), "is_this_post_an_external_link", true)){
	$target="_blank";
}

?>
<div class="column is-one-third-desktop is-half-tablet is-full-mobile">
<a class="purdue-home-cta-card purdue-home-cta-card--archive" aria-label="<?php the_title_attribute(); ?>" href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>" target="<?php echo $target; ?>">
	<?php if (has_post_thumbnail()) { ?>	
		<figure class="image is-16by9">
			<?php the_post_thumbnail( array( 712, 9999999 ), [ 'class' => 'post-content__thumbnail--image' ] ); ?>
		</figure>
	<?php } ?>
	<div class="flex-container flex-container--story">
		<p class="purdue-home-cta-grid__card-tag"><?php the_time('F j, Y'); ?></p>
		<p class="purdue-home-cta-grid__card-title"><?php the_title(); ?></p>
		<div class="purdue-home-cta-grid__card-subtext"><?php purdue_get_excerpt(); ?></div>
	</div>
</a>
</div>


