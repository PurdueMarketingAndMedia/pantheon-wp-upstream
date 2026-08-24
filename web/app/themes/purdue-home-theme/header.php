<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package purdue-home-theme
 */

 $customCSS = "";
 $secondnavClass="";
 $hasSecondMenu=[];
 if (function_exists('get_field')) {	
	 $post_id = get_the_ID();
	 $customCSS = wp_strip_all_tags(html_entity_decode(get_field('custom_styles', $post_id)));
	 $hasSecondMenu = get_field('add_second_menu', $post_id);	
	 $menuTitle=get_field('menu_title', $post_id)?get_field('menu_title', $post_id):"Additional Links";
	 $secondnavClass=get_field('make_it_sticky_at_the_top', $post_id)&&get_field('make_it_sticky_at_the_top', $post_id)[0]=="Yes"?" second-nav-sticky":"";
 }
 $headerSetting = "global";
 $blogName = get_bloginfo( 'name' );
 if(get_theme_mod( 'header_layout_settings' ) == "simple"){
	 $headerSetting = "simple";
 }else{
	 $headerSetting = "global";
	 if( !empty(get_theme_mod('header_site_name')) ){
		 $blogName = get_theme_mod('header_site_name');
	 } else {
		 $blogName = get_bloginfo('name');
	 }
 }
 if(get_theme_mod( 'header_button_new_tab')){
	$headerButtonTab = 'target="_blank"';
}

if ( !has_nav_menu( 'top-nav' ) ) { 
	$hideClass = 'is-hidden';
	$flexClass = 'is-flex';
}

?>

<!DOCTYPE html>
<html <?php language_attributes(); ?> class="is-fullheight<?php if ($headerSetting == 'global'){echo " has-global-header"; }?>">
<head>
	<title><?php is_front_page() ? bloginfo('name') : wp_title(''); ?></title>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php 
		 if($customCSS != ""){
			echo '<style type="text/css">' . $customCSS . '</style>';
		}
		wp_head(); 
	?>
</head>

<body <?php body_class(); ?>>

<?php if (function_exists('gtm4wp_the_gtm_tag')) {
    gtm4wp_the_gtm_tag();
} ?>
		<?php if ($headerSetting == 'global') {dynamic_sidebar('top-alert');} ?>
	<div id="page" class="site">
		<?php purdueBrand_skip_link_screen_reader_text(); ?>
		<?php dynamic_sidebar('alert-page'); ?>
		<header id="header" class="header--global<?php if ( is_active_sidebar( 'top-alert' ) ) {echo " has-top-alert";} if ($headerSetting == 'global'){echo " header--two-rows"; } echo $secondnavClass; ?>">
		<?php if ($headerSetting == 'simple') {dynamic_sidebar('top-alert');} ?>
		<nav class="navbar is-transparent purdue-top-nav<?php if ($headerSetting == 'global'){echo " purdue-top-nav__first-row"; }?>" role="navigation">
			<?php if ($headerSetting == 'simple'){ ?>	
				<div class="navbar-brand">
					<a href="https://www.purdue.edu/" class="navbar-item" rel="home"><img src="<?php echo get_template_directory_uri() ?>/imgs/PU-H-light.svg" alt="Purdue University Home"></a>
					
					<button class="icon is-large navbar-burger navbar-open" data-target="navbar-find-info" aria-haspopup="dialog" aria-label="Search and menu">
						<span>MENU</span>
						<img src="<?php echo get_template_directory_uri() ?>/icons/search-menu-icon.png" aria-hidden="true" alt="" class="burger-icon">
					</button>
				</div>
				<div class="navbar-menu">
					<ul class="navbar-end menu-items">
						<?php purdueHome_navigation(); ?>
					</ul>
					<button class="icon is-large navbar-open" data-target="navbar-find-info" aria-haspopup="dialog" aria-label="search and menu">
						<img src="<?php echo get_template_directory_uri() ?>/icons/search-menu-icon.png" aria-hidden="true" alt="" class="burger-icon">
					</button>
				</div>
				<?php }else{ ?>
					<div class="navbar-brand">
						<div class="navbar-logo">
							<a href="https://www.purdue.edu/" class="navbar-item" rel="home"><img src="<?php echo get_template_directory_uri() ?>/imgs/PU-H-light.svg" alt="Purdue University Home"></a>
							<a href="<?php echo get_bloginfo( 'url' ); ?>" class="navbar-site-name" rel="home"><?php echo $blogName; ?></a>
						</div>
						<div class="navbar-buttons <?= $flexClass; ?>">
							<?php if ( !has_nav_menu( 'top-nav' ) ) { 
									if(get_theme_mod("header_button_link") && get_theme_mod("header_button_label")){ ?>
									 <a class="purdue-home-button purdue-home-button--black purdue-header-cta-button is-hidden-touch" href="<?php echo get_theme_mod("header_button_link"); ?>" <?php echo $headerButtonTab; ?>><?php  echo get_theme_mod("header_button_label"); ?></a>
							<?php	
									}
								}
							?>
							<button class="icon is-large navbar-burger navbar-open is-active" data-target="navbar-find-info" aria-haspopup="dialog" aria-label="Search and menu">
								<img src="<?php echo get_template_directory_uri() ?>/icons/search-menu-icon.png" aria-hidden="true" alt="" class="burger-icon">
							</button>
							<button class="icon is-large navbar-close is-hidden" data-target="navbar-find-info" aria-label="close search and menu">	
								<img src="<?php echo get_template_directory_uri() ?>/imgs/close_icon_black.svg" aria-hidden="true" alt="" class="close-icon">
							</button>
						</div>
					</div>
				<?php } ?>
			</nav>
			<?php if ($headerSetting == 'global'){ ?>	
			<nav id="top-nav" class="navbar navbar-menu purdue-top-nav__second-row <?= $hideClass ;?>" role="navigation">					
				<ul class="navbar-start menu-items">
					<?php purdueHome_navigation(); ?>
					<?php  if ( has_nav_menu( 'top-nav' ) ) { 
							if(get_theme_mod("header_button_link") && get_theme_mod("header_button_label")){ ?>
								<li class="purdue-header-cta-button-wrap navbar-item"><a class="purdue-home-button purdue-home-button--black purdue-header-cta-button" href="<?php echo get_theme_mod("header_button_link"); ?>" <?php echo $headerButtonTab; ?>><?php  echo get_theme_mod("header_button_label"); ?></a></li>
					<?php } 
						}?>
					</ul>				
			</nav>
			<?php } ?>
			<?php if ($headerSetting == 'global'){ ?>	
			<div class="navbar-find-info is-hidden is-global"  data-menu="navbar-find-info">
				<button class="icon is-large navbar-close" data-target="navbar-find-info" aria-label="close search and menu">	
					<span>CLOSE</span>
					<img src="<?php echo get_template_directory_uri() ?>/imgs/close_icon.svg" aria-hidden="true" alt="" class="close-icon">
				</button>
				<div class="navbar-find-info__items">
					<div class="nav-brand">
						<?php echo $blogName; ?>
					</div>
					<div class="form-group search-box">
						<?php get_search_form(); ?>
					</div>	
					<div class="navbar-find-info__menu">
						<ul class="menu-items">
							<?php purdueHome_navigation(); ?>
							<?php if(get_theme_mod("header_button_link") && get_theme_mod("header_button_label")){ ?>
								<li class="purdue-header-cta-button-wrap navbar-item"><a class="purdue-home-button purdue-home-button--black purdue-header-cta-button" href="<?php echo get_theme_mod("header_button_link"); ?>" <?php echo $headerButtonTab; ?>><?php  echo get_theme_mod("header_button_label"); ?></a></li>
							<?php } ?>
						</ul>
					</div>
					<div class="navbar-find-info__quicklinks">
						<span class="navbar-links-description">Helpful links</span>
						<?php if(array_key_exists("quick-links", get_nav_menu_locations()) && wp_get_nav_menu_items(get_nav_menu_locations()['quick-links'])){
									purdueHome_quicklinks();
								}else{
									purdue_header_helpful_links();
								}
								
							?>
					</div>
					<?php if(array_key_exists("other-links", get_nav_menu_locations()) && wp_get_nav_menu_items(get_nav_menu_locations()['other-links'])){
					?>
					<div class="navbar-other-links-wrapper">
						<span class="navbar-links-description">Quick links</span>
						<?php purdueHome_otherlinks(); ?>
					</div>
					<?php } ?>
				</div>
			</div>
			<?php }else{ ?>
				<div class="navbar-find-info is-hidden"  data-menu="navbar-find-info">
				<button class="icon is-large navbar-close" data-target="navbar-find-info" aria-label="close search and menu">	
					<span>CLOSE</span>
					<img src="<?php echo get_template_directory_uri() ?>/imgs/close_icon.svg" aria-hidden="true" alt="" class="close-icon">
				</button>
				<div class="navbar-find-info__items">
					<div class="nav-brand">
						<img src="<?php echo get_template_directory_uri() ?>/imgs/PU-H.svg" alt="Purdue University Home">
					</div>
					<div class="form-group search-box">
						<?php get_search_form(); ?>
					</div>	
					<div class="columns is-multiline">
						<div class="column">
							<ul class="menu-items">
								<?php purdueHome_navigation(); ?>
							</ul>
						</div>
						<div class="column is-narrow">
							<span class="navbar-links-description">Helpful links</span>
							<?php if(array_key_exists("quick-links", get_nav_menu_locations()) && wp_get_nav_menu_items(get_nav_menu_locations()['quick-links'])){
									purdueHome_quicklinks();
								}else{
									purdue_header_helpful_links();
								}
								
							?>
						</div>
					</div>
					<?php if(array_key_exists("other-links", get_nav_menu_locations()) && wp_get_nav_menu_items(get_nav_menu_locations()['other-links'])){
					?>
					<div class="navbar-other-links-wrapper">
						<span class="navbar-links-description">Quick links</span>
						<?php purdueHome_otherlinks(); ?>
					</div>
					<?php } ?>
				</div>
			</div>
			<?php } ?>
			<?php
				if (function_exists('get_field')) {	
					if($hasSecondMenu&&$hasSecondMenu[0]=="Yes"){


				if (function_exists('get_field')) {	
					if($hasSecondMenu && $hasSecondMenu[0] == "Yes"){
						if (function_exists('get_field')) {	
							$menu_obj = get_field("second_menu", $post_id);
							if (!$menu_obj && isset($post->post_parent)) {
								$menu_obj = get_field("second_menu", $post->post_parent);
							}
							$menu_item_count = 0;
							if ($menu_obj) {
								$menu_items = wp_get_nav_menu_items($menu_obj);
								if (is_array($menu_items)) {
									$menu_item_count = count($menu_items);
								}
							}
						}
					}
				}
				if ($menu_item_count > 8) {
					$secondnavClassDesktop = " is-large-menu";
					$secondnavClassMobile = " is-large-menu-mobile is-hidden-widescreen";
				} else {
					$secondnavClassDesktop = " tablet-hidden";
					$secondnavClassMobile = " desktop-hidden";
				}
			?>
			<nav class="navbar is-black purdue-second-nav <?php echo $secondnavClassDesktop; ?>" role="navigation">
				<p class="menu-title"><?php echo $menuTitle; ?></p>
				<ul class="menu-items">
					<?php purdueHome_secondNav(); ?>
				</ul>
			</nav>
			<nav class="navbar is-black purdue-second-nav <?php echo $secondnavClassMobile; ?>" role="navigation">
				<button class="accordion__heading accordion__heading--footer" aria-expanded="true" aria-disabled="true" id="top-second-menu-title" aria-controls="top-second-menu">
				<?php echo $menuTitle; ?>
				</button>
				<ul class="menu-items" id="top-second-menu" aria-labelledby="top-second-menu-title">
					<?php purdueHome_secondNav(); ?>
				</ul>
			</nav>
			<?php
				}
			}
			?>
		</header>

		<div id="content" class="site-content<?php if ($headerSetting == 'global'){echo " has-global-header"; }?>" tabindex="-1">