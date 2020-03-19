<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Purdue-brand
 */
?>

</div><!-- #content -->

<footer id="colophon" role="contentinfo" class="narrow-footer">
	<div class="footer footer__resources">
		<div class="container is-fullhd">
			<div class="columns is-desktop is-multiline">
				<div class="column is-three-quarters-desktop footer__links">
					<div class="columns is-multiline">
						<?php purdueBrand_footerColumn1(); ?>	
						<?php purdueBrand_footerColumn2(); ?>	
						<?php purdueBrand_footerColumn3(); ?>	
						<?php purdueBrand_footerColumn4(); ?>	

					</div>
				</div>
				<div class="column is-one-quarter-desktop footer__social">
					<div class="footer__motto">
						<a href="/" rel="home"><img class="horizontal" src="https://www.purdue.edu/purdue/images/PU-H.svg" alt="Purdue University Logo"></a>
						<a href="/" rel="home"><img class="vertical" src="https://www.purdue.edu/purdue/images/PU-V.svg" alt="Purdue University Logo"></a>	
					</div>
					<div class="footer__socialLinks">
						<?php purdueBrand_get_footerSocialLinks(); ?>
					</div>
				</div> 
			</div>
		</div><!-- .container -->
	</div>
	<div class="footer footer__signature">
		<div class="container is-fullhd">
		<a href="http://www.purdue.edu/purdue/about/integrity_statement.html" target="_blank" rel="noopener">Integrity Statement</a> | <a href="https://www.purdue.edu/securepurdue/security-programs/copyright-policies/reporting-alleged-copyright-infringement.php" target="_blank" rel="noopener">Copyright Complaints</a> |@2020 Purdue University
		</div>
	</div>
</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>