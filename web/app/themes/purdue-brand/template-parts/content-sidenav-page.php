<?php
/**
 * Template part for displaying content
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Purdue-brand
 */
?>

<section class="content">
	<!-- <div class="columns is-centered" >
        <div class="content column is-full"> -->
            <?php
				if (!is_front_page()) {
					purdueBrand_the_title('is-1', False);
				}
			?>
            <?php
                the_content();
            ?>
        <!-- </div>
	</div> -->
</section>
