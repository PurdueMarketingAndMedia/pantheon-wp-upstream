<?php
/**
 * Helper Functions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package purdue-wp-theme
 */

if ( ! function_exists( 'purdueBrand_home_link' ) ) {
	function purdueBrand_home_link($class)
	{
		if(function_exists( 'the_custom_logo' )){
			$custom_logo_id = get_theme_mod( 'custom_logo' );
			$image = wp_get_attachment_image_src( $custom_logo_id , 'full' );
			$output = '<a href="' . esc_url( home_url( '/' ) ) . '" class="' . $class . '" rel="home"><img src="'.$image[0].'" alt="Purdue Logo"></a>';
		}else{
			$output = '<a href="' . esc_url( home_url( '/' ) ) . '" class="' . $class . '" rel="home">' . get_bloginfo('name') . '</a>';
		}
		
		echo $output;
	}
}
if ( ! function_exists( 'purdue_get_excerpt' ) ) {
	function purdue_get_excerpt() {
		
		if(has_excerpt()){
			the_excerpt();
		}else{
			$output=preg_replace('/<figure[^>]*>.*?<\/figure>/i', ' ', get_the_content());			
			$output=strip_shortcodes($output);
			return wp_trim_words($output, 40, '...');	
		}
	}
}

if ( ! function_exists( 'purdueBrand_skip_link_screen_reader_text' ) ) {
	function purdueBrand_skip_link_screen_reader_text()
	{
		$output = '<a class="skip-link is-sr-only" href="#content">Skip to content</a>';
		echo $output;
	}
}


if ( ! function_exists( 'purdueBrand_the_title' ) ) {
	function purdueBrand_the_title($class = 'is-3', $link = TRUE)
	{
		$heading = _purdueBrand_convert_heading($class);
		$title_before = '<' . $heading . ' class="title ' . $class . '">';
		$title_after = '</' . $heading . '>';
		if ($link === TRUE) {
			$output = the_title( sprintf( $title_before .'<a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a>' . $title_after );
		} else {
			$output = $title_before . get_the_title() . $title_after;
		}
		echo $output;
	}
}

if ( ! function_exists( 'purdueBrand_footer_links' ) ) {
	function purdueBrand_footer_links($file)
	{
		$directory = trailingslashit( get_template_directory_uri() ).'json/';
		$url = $directory . $file;
		$request = wp_remote_get( "$url" );
		$body = wp_remote_retrieve_body( $request );
		$data = json_decode( $body );
		$output='<div class="footer__links">';
		$output.='<h2>
					<button class="accordion__heading accordion__heading--footer" aria-expanded="true" aria-disabled="true" id="accordion'.$data->column.'id" aria-controls="sect'.$data->column.'">'.$data->header.'
					<svg aria-hidden="true" class="accordion__icon accordion__icon__plus" width="52px" height="52px" viewBox="0 0 52 52" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<title>plus_icon</title>
						<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g stroke="#cfb991" stroke-width="4">
								<circle cx="26" cy="26" r="24"></circle>
								<line x1="26.5" y1="14" x2="26.5" y2="38" stroke-linecap="round" stroke-linejoin="round"></line>
								<line x1="25.6896552" y1="14.5116279" x2="25.6896552" y2="38.6976744" stroke-linecap="round" stroke-linejoin="round" transform="translate(25.6897, 26.6047) rotate(-90) translate(-25.6897, -26.6047)"></line>
							</g>
						</g>
					</svg>
					</button>
				</h2>';
		$output.='<ul class="accordion__content--footer" id="sect'.$data->column.'" aria-labelledby="accordion'.$data->column.'id">';
		foreach ($data->links as $link) {  
			$output.='<li><a href="'.$link->link_url.'">'.$link->link_text.'</a></li>';
		}
		$output.='</ul>';
		$output.='</div>';
		echo $output;
	}
}

if ( ! function_exists( 'purdue_search_placeholder_google' ) ) {
	function purdue_search_placeholder_google()
	{	

		$body = file_get_contents(__DIR__ . '/../json/search-quick-links.json');
		$data = json_decode( $body );
		$output = '';
		foreach ($data->links as $key => $link) {  
			$output.=$link->link_text;
			if($key!=sizeof($data->links)-1){
				$output.=", ";
			}
		}

		return $output;
	}
}
if ( ! function_exists( 'purdue_search_placeholder_wordpress' ) ) {
	function purdue_search_placeholder_wordpress()
	{
		$placeholderText_1 = get_theme_mod('quick_link_1_text', '');	
		$placeholderText_2 = get_theme_mod('quick_link_2_text', '');
		$placeholderText_3 = get_theme_mod('quick_link_3_text', '');
		$placeholderText_4 = get_theme_mod('quick_link_4_text', '');
		$placeholderText_5 = get_theme_mod('quick_link_5_text', '');
		$placeholdertexts=[];
	
		if($placeholderText_1 !=""){
			$placeholdertexts[]=$placeholderText_1;
		}
		if($placeholderText_2 !=""){
			$placeholdertexts[]=$placeholderText_2;
		}
		if($placeholderText_3 !=""){
			$placeholdertexts[]=$placeholderText_3;
		}
		if($placeholderText_4 !=""){
			$placeholdertexts[]=$placeholderText_4;
		}
		if($placeholderText_5 !=""){
			$placeholdertexts[]=$placeholderText_5;
		}
		$placeholder=implode( ', ', $placeholdertexts ); 
		
		return $placeholder;
	}
}
if ( ! function_exists( 'purdue_search_popular_google' ) ) {
	function purdue_search_popular_google()
	{
		$body = file_get_contents(__DIR__ . '/../json/search-quick-links.json');
		$data = json_decode( $body );
		$output='<div class="purdue-home-search-bar__links"><span>Most Popular Searches:</span><ul>';
		foreach ($data->links as $key => $link) {  
			$output.='<li><a href="'.$link->link_url.'">'.$link->link_text.'</a>';
			if($key!=sizeof($data->links)-1){
				$output.=",";
			}
			$output.="</li>";
		}
		$output.="</ul></div>";
		return $output;
	}
}
if ( ! function_exists( 'purdue_search_popular_wordpress' ) ) {
	function purdue_search_popular_wordpress()
	{
		$placeholderText_1 = get_theme_mod('quick_link_1_text', '');	
		$placeholderText_2 = get_theme_mod('quick_link_2_text', '');
		$placeholderText_3 = get_theme_mod('quick_link_3_text', '');
		$placeholderText_4 = get_theme_mod('quick_link_4_text', '');
		$placeholderText_5 = get_theme_mod('quick_link_5_text', '');
		$link_1 = get_theme_mod('quick_link_1_text', '');	
		$link_2 = get_theme_mod('quick_link_2_text', '');
		$link_3 = get_theme_mod('quick_link_3_text', '');
		$link_4 = get_theme_mod('quick_link_4_text', '');
		$link_5 = get_theme_mod('quick_link_5_text', '');
		$links=[];
		if($link_1 !="" && $placeholderText_1 !=""){
			$link=array(
				"link_text" => $placeholderText_1,
				"link_URL" => $link_1,
			);
			array_push($links, $link);
		}
		if($link_2 !="" && $placeholderText_2 !=""){
			$link=array(
				"link_text" => $placeholderText_2,
				"link_URL" => $link_2,
			);
			array_push($links, $link);
		}
		if($link_3 !="" && $placeholderText_3!=""){
			$link=array(
				"link_text" => $placeholderText_3,
				"link_URL" => $link_3,
			);
			array_push($links, $link);

		}
		if($link_4 !="" && $placeholderText_4!=""){
			$link=array(
				"link_text" => $placeholderText_4,
				"link_URL" => $link_4,
			);
			array_push($links, $link);

		}
		if($link_5 !="" && $placeholderText_5!=""){
			$link=array(
				"link_text" => $placeholderText_5,
				"link_URL" => $link_5,
			);
			array_push($links, $link);

		}
	if(sizeof($links)>0){
		$output='<div class="purdue-home-search-bar__links"><span>Most Popular Searches:</span><ul>';
		foreach ($links as $key=>$link) {  
			$output.='<li><a href="'.$link['link_URL'].'">'.$link['link_text'].'</a>';
			if($key!=sizeof($links)-1){
				$output.=",";
			}
			$output.="</li>";
		}
		$output.="</ul></div>";
		return $output;
	}
	}
}
if ( ! function_exists( 'purdue_search_trending' ) ) {
	function purdue_search_trending()
	{
		$directory = trailingslashit( get_template_directory_uri() ).'json/';
		$url = $directory . 'trending-search-items.json';
		$request = wp_remote_get( "$url" );
		$body = wp_remote_retrieve_body( $request );
		$data = json_decode( $body );
		$output='<ul>';
		foreach ($data->links as $key => $link) {  
			$output.='<li><a href="'.$link->link_url.'">'.$link->link_text.'</a>';
			$output.="</li>";
		}
		$output.="</ul>";
		return $output;
	}
}
if ( ! function_exists( 'purdue_404_trending' ) ) {
	function purdue_404_trending()
	{
		$directory = trailingslashit( get_template_directory_uri() ).'json/';
		$url = $directory . 'trending-search-items.json';
		$request = wp_remote_get( "$url" );
		$body = wp_remote_retrieve_body( $request );
		$data = json_decode( $body );
		$output='<ul class="purdue-home-button-list">';
		foreach ($data->links as $key => $link) {  
			$output.='<li><a class="purdue-home-button" href="'.$link->link_url.'">'.$link->link_text.'</a>';
			$output.="</li>";
		}
		$output.="</ul>";
		return $output;
	}
}
if ( ! function_exists( 'purdue_header_helpful_links' ) ) {
	function purdue_header_helpful_links()
	{
		$directory = trailingslashit( get_template_directory_uri() ).'json/';
		$url = $directory . 'header-helpful-links.json';
		$request = wp_remote_get( "$url" );
		$body = wp_remote_retrieve_body( $request );
		$data = json_decode( $body );
		$output='<ul class="navbar-quick-links">';
		foreach ($data->links as $key => $link) {  
			$output.='<li class="menu-item"><a href="'.$link->link_url.'">'.$link->link_text.'</a>';
			$output.="</li>";
		}
		$output.="</ul>";
		echo $output;
	}
}
function purdue_post_tag( $postId, $tax ) {
	$id   = $postId;
	$theme_term= "";
    if ( function_exists( 'the_seo_framework' ) ) {
        // Get the primary term ID using The SEO Framework
        $term_id = the_seo_framework()->get_primary_term( $id, $tax );

        // Get the term object using the term ID
        $term = get_term( $term_id, $tax );

        // Check if the term object is valid
        if ( ! is_wp_error( $term ) && $term && property_exists( $term, 'name' )  &&
            has_term( $term->term_id, $tax, $id )) {
            $theme_term = $term->name;
        }
    }
	if(!$theme_term){
		$theme_terms = wp_get_object_terms( $id, array($tax), [
        'orderby' => 'term_order',
        'order'   => 'ASC',
        'fields'  => 'all',
        'number'  => 1,
        'hide_empty' => false,
    ] );
		if ( empty( $theme_terms ) ) {
			return false;
		}
		if (!empty($theme_terms) && !is_wp_error($theme_terms)) {
			$theme_term = $theme_terms[0]->name;
		}
	}
	if($theme_term){
		$output='<span class="purdue-tax-tag">'.$theme_term.'</span>';
	}else{
		$output='';
	}

	return $output;
}
function purdue_post_tag_simple( $postId, $tax ) {
	$id   = isset( $postId ) ? $postId : 0;
	$theme_term= "";
    if ( function_exists( 'the_seo_framework' ) ) {
        // Get the primary term ID using The SEO Framework
        $term_id = the_seo_framework()->get_primary_term( $id, $tax );

        // Get the term object using the term ID
        $term = get_term( $term_id, $tax );

        // Check if the term object is valid
        if ( ! is_wp_error( $term ) && $term && property_exists( $term, 'name' ) ) {
            $theme_term = $term->name;
        }
    }
	if(!$theme_term){
		$theme_terms = wp_get_object_terms( $id, $tax, [ 'number' => 1 ] );
		if ( empty( $theme_terms ) ) {
			return false;
		}
		if (!empty($theme_terms) && !is_wp_error($theme_terms)) {
			$theme_term = $theme_terms[0]->name;
		}
	}
	if($theme_term){
		$output=$theme_term;
	}else{
		$output='';
	}
	return $output;
}
if(! function_exists( 'purdue_get_vimeo_id' )){
	function purdue_get_vimeo_id($url){
		preg_match('%^https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)(?:[?]?.*)$%im', $url, $match);
		if (isset($match[3])) {
			$videoId = print_r($match[3], TRUE);
		} else {
			$videoId = '';
		}
		return $videoId;
	}
}
if(! function_exists( 'purdue_get_youtube_id' )){
	function purdue_get_youtube_id($url){
		preg_match('%(?:youtube(?:-nocookie)?.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu.be/)([^"&?/ ]{11})%i', $url, $match);
		if (isset($match[1])) {
			$videoId = print_r($match[1], TRUE);
		} else {
			$videoId = '';
		}
		return $videoId;
	}
}
//for supporting content hub rkv theme
function rkv_get_post_type( $post = null ) {
	$post = get_post( $post );
if ( $post ) {
	$base_post_type = $post->post_type;
	$media_terms    = wp_get_post_terms(
		$post->ID,
		'rkv-media',
		[
			'fields' => 'slugs',
			'number' => 1,
			'slug'   => 'video',
		]
	);
	if ( ! is_wp_error( $media_terms ) && is_array( $media_terms ) && ! empty( $media_terms ) ) {
		$media_term = $media_terms[0];
		// If there is a media term set, that is going to be our post type.
		return $media_term;
	}
	// Return the originally found post type.
	return $base_post_type;
}
	return false;
}