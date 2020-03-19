<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 * 
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 * 
 * @package Purdue-brand
 */

?>

<!DOCTYPE html>
<html <?php language_attributes(); ?> class="is-fullheight">
<head>
	<title><?php wp_title(''); ?></title>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<!-- Font Awesome -->
	<script defer src="https://use.fontawesome.com/releases/v5.8.1/js/all.js" crossorigin="anonymous"></script>
	<script defer src="https://use.fontawesome.com/releases/v5.8.1/js/v4-shims.js" crossorigin="anonymous"></script>
	<no-script>
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" crossorigin="anonymous">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/v4-shims.css" crossorigin="anonymous">
	</no-script>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php if ( function_exists( 'gtm4wp_the_gtm_tag' ) ) { gtm4wp_the_gtm_tag(); } ?>
	<div id="page" class="site">
		<?php purdueBrand_skip_link_screen_reader_text(); ?>
		<header id="header">
			<nav class="navbar is-black purdue-navbar-black" role="navigation">
				<div class="navbar-brand">
					<?php echo '<a href="' . esc_url( home_url( '/' ) ) . '" class="navbar-item" rel="home"><img src="https://www.purdue.edu/purdue/images/PU-H.svg" alt="Purdue Logo"></a>'; ?>
					<?php purdueBrand_menu_toggle(); ?>
				</div>

				<div class="navbar-end">
					<ul>
						<li><a href="#" target="_blank">Apply</a></li>
						<li><a href="#" target="_blank">Visit</a></li>
						<li><a href="#" target="_blank">Give</a></li>
					</ul>
					<div class="form-group search-box">
						<form action="<?php echo esc_url( home_url( '/' ) );?>/search" id="cse-search-box" method="get">
							<span class="sr-only">Search for:</span>
							<input type="search" class="search-field" placeholder="Google Custom Search" name="q" value='<?php echo $_GET['q']; ?>'>
							<button type="submit" class="search-button"><span class="sr-only">Submit</span>
								<i class="fas fa-search search-icon"></i>
							</button>
						</form>
					</div>								
				</div>

			</nav>
			<nav id="site-navigation" class="navbar has-shadow purdue-navbar-white" role="navigation">
				<div class="navbar-menu" id="navMenu">
					<ul class="navbar-start">
						<?php purdueBrand_navigation(); ?>					
					</ul>
					</div>
				</div>
			</nav>
		</header>

		<div id="content" class="site-content">