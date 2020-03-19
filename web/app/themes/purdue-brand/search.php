<?php
/**
 * Template Name: Search page
 *
 * @package Purdue-brand
 */
?>

<?php get_header(); ?>

<main id="site-content" role="main" class="main-content">
	<section class="section container">
		<div class="content">
			<h1>Search Results</h1>
			<script>
				(function() {
					var cx = '017690826183710227054:mjxnqnpskjk';
					var gcse = document.createElement('script');
					gcse.type = 'text/javascript';
					gcse.async = true;
					gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
					var s = document.getElementsByTagName('script')[0];
					s.parentNode.insertBefore(gcse, s);
				})();
			</script>
			<gcse:searchresults-only></gcse:searchresults-only>
		</div>
	</section>

</main><!-- #site-content -->

<?php get_footer(); ?>
