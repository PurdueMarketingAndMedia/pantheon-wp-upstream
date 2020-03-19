<?php
/**
 * Template part for displaying content
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Purdue-brand
 */
?>

<?php if (!has_block('bulma-blocks/site-hero')) { ?>
		<div class="section">
			<div class="container">
				<?php purdueBrand_the_title('is-1', False); ?>
			</div>
		</div>
		<div class="content">
			<?php the_content(); ?>
		</div>
<?php } else { ?>
		<div class="content">
			<?php the_content(); ?>
		</div>


<?php } ?>

