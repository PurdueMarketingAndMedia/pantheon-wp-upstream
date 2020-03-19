<?php
/**
 * Navigation Functions
 *
 * @package Purdue-brand
 */

if ( function_exists( 'register_nav_menus' ) ) {
	register_nav_menus( array(
		'top-nav' => esc_html__( 'Primary', 'purdue-brand' ),
		'side-nav' => esc_html__( 'Side Nav', 'purdue-brand' ),
		'footer-column-1' => esc_html__( 'Footer Column 1', 'purdue-brand' ),
		'footer-column-2' => esc_html__( 'Footer Column 2', 'purdue-brand' ),
		'footer-column-3' => esc_html__( 'Footer Column 3', 'purdue-brand' ),
		'footer-column-4' => esc_html__( 'Footer Column 4', 'purdue-brand' ),		
		) );
}

// main navigation
if ( ! function_exists( 'purdueBrand_navigation' ) ) {
	function purdueBrand_navigation()
	{
		wp_nav_menu( array(
			'theme_location'    => 'top-nav',
			'depth'             => 4,
			'container'         => false,
			'items_wrap'    	=> '%3$s',
			'menu_class'        => '',
			'fallback_cb'       => 'purdueBrand_nav_primary::fallback',
			'walker'            => new purdueBrand_nav_primary()
			)
		);
	}
}

//side navigation
if ( ! function_exists( 'purdueBrand_sideNav' ) ) {
	function purdueBrand_sideNav()
	{
		$location = 'side-nav';
		if (has_nav_menu($location)) :
			$menu_obj = purdue_get_menu_by_location($location); 
			wp_nav_menu( array( 
				'theme_location'  => $location,
				'depth'             => 4,
				'container'         => false,
				'items_wrap'    	=> '%3$s',
				'menu_class'        => '',
				'fallback_cb'       => 'purdueBrand_nav_sidenav::fallback',
				'walker'            => new purdueBrand_nav_sidenav()
				)); 
		endif;
	}
}
//footer column 1

if ( ! function_exists( 'purdueBrand_footerColumn1' ) ) {
	function purdueBrand_footerColumn1()
	{
		$location = 'footer-column-1';
		if (has_nav_menu($location)) :
			$menu_obj = purdue_get_menu_by_location($location); 
			wp_nav_menu( array( 
				'theme_location'  => $location,
				'container'         => 'div',
				'container_class' => 'column is-one-quarter-desktop is-half-tablet links__column',
				'items_wrap'=> '<h3><button class="accordion__heading accordion__heading--footer" aria-expanded="true" aria-disabled="true" id="accordion1id" aria-controls="sect1">'.esc_html($menu_obj->name).'<i aria-hidden="true" class="fas fa-plus accordion__icon accordion__icon__plus"></i><i aria-hidden="true" class="fas fa-minus accordion__icon accordion__icon__minus"></i></button></h3>
				<ul role="list" class="accordion__content--footer" id="sect1" aria-labelledby="accordion1id">%3$s</ul>'
			)); 
		endif;
	}
}

//footer column 2

if ( ! function_exists( 'purdueBrand_footerColumn2' ) ) {
	function purdueBrand_footerColumn2()
	{
		$location = 'footer-column-2';
		if (has_nav_menu($location)) :
			$menu_obj = purdue_get_menu_by_location($location); 
			wp_nav_menu( array( 
				'theme_location'  => $location,
				'container'         => 'div',
				'container_class' => 'column is-one-quarter-desktop is-half-tablet links__column',
				'items_wrap'=> '<h3><button class="accordion__heading accordion__heading--footer" aria-expanded="true" aria-disabled="true" id="accordion2id" aria-controls="sect2">'.esc_html($menu_obj->name).'<i aria-hidden="true" class="fas fa-plus accordion__icon accordion__icon__plus"></i><i aria-hidden="true" class="fas fa-minus accordion__icon accordion__icon__minus"></i></button></h3>
				<ul role="list" class="accordion__content--footer" id="sect2" aria-labelledby="accordion2id">%3$s</ul>'
			)); 
		endif;
	}
}
//footer column 3

if ( ! function_exists( 'purdueBrand_footerColumn3' ) ) {
	function purdueBrand_footerColumn3()
	{
		$location = 'footer-column-3';
		if (has_nav_menu($location)) :
			$menu_obj = purdue_get_menu_by_location($location); 
			wp_nav_menu( array( 
				'theme_location'  => $location,
				'container'         => 'div',
				'container_class' => 'column is-one-quarter-desktop is-half-tablet links__column',
				'items_wrap'=> '<h3><button class="accordion__heading accordion__heading--footer" aria-expanded="true" aria-disabled="true" id="accordion3id" aria-controls="sect3">'.esc_html($menu_obj->name).'<i aria-hidden="true" class="fas fa-plus accordion__icon accordion__icon__plus"></i><i aria-hidden="true" class="fas fa-minus accordion__icon accordion__icon__minus"></i></button></h3>
				<ul role="list" class="accordion__content--footer" id="sect3" aria-labelledby="accordion3id">%3$s</ul>'
			)); 
		endif;
	}
}
//footer column 4

if ( ! function_exists( 'purdueBrand_footerColumn4' ) ) {
	function purdueBrand_footerColumn4()
	{
		$location = 'footer-column-4';
		if (has_nav_menu($location)) :
			$menu_obj = purdue_get_menu_by_location($location); 
			wp_nav_menu( array( 
				'theme_location'  => $location,
				'container'         => 'div',
				'container_class' => 'column is-one-quarter-desktop is-half-tablet links__column',
				'items_wrap'=> '<h3><button class="accordion__heading accordion__heading--footer" aria-expanded="true" aria-disabled="true" id="accordion4id" aria-controls="sect4">'.esc_html($menu_obj->name).'<i aria-hidden="true" class="fas fa-plus accordion__icon accordion__icon__plus"></i><i aria-hidden="true" class="fas fa-minus accordion__icon accordion__icon__minus"></i></button></h3>
				<ul role="list" class="accordion__content--footer" id="sect4" aria-labelledby="accordion4id">%3$s</ul>'
			)); 
		endif;
	}
}
if ( ! function_exists( 'purdue_get_menu_by_location' ) ) {
	function purdue_get_menu_by_location( $location ) {
		if( empty($location) ) return false;

		$locations = get_nav_menu_locations();
		if( ! isset( $locations[$location] ) ) return false;

		$menu_obj = get_term( $locations[$location], 'nav_menu' );

		return $menu_obj;
	}
}
