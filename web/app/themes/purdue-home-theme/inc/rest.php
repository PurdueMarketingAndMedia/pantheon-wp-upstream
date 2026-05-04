<?php
/**
 * rest api end points
 *
 * @since   1.0.0
 * @package purdue-home-theme
 */

 function post_list_endpoint() {
	$namespace = 'purdue-home/v1';
	$rest_base = '/post-select/';
    register_rest_route($namespace, $rest_base, array(
        'methods' => 'POST',
        'callback' => 'purdue_get_posts',
		'permission_callback' => '__return_true',
    ));
}
function purdue_get_posts($request) {

	$taxonomies = $request['tax_query'];
    $post_type = is_array($request['post_type'])&&sizeof($request['post_type'])>0 ?$request['post_type']:"nonexistent_post_type";
    $search_query = sanitize_text_field($request['p']);
    $page = $request['paged']?$request['paged']:1;
	$order = $request['order']?$request['order']:"DESC";
	$year = $request['year'] ?: "";
	$month = $request['month']?date('m', strtotime($request['month'])):"";
	$columns = $request['columns']?$request['columns']:"3";
	$orderBy = $request['orderby']?$request['orderby']:"date";
	$metaKey = $request['meta_key']?$request['meta_key']:"";
	$excludeCat = $request['excludeCat']?$request['excludeCat']:"";
	$attributes['buttonText'] = $request['button_text']?$request['button_text']:"Learn More";
	$attributes['postTypeTag'] = $request['postType_tag']?$request['postType_tag']:false;
	$attributes['cardType'] = $request['cardType']?$request['cardType']:"story";
	$attributes['selectedTax'] = $request['use_tag'];
	$url_parts = parse_url( $request['requestURL'] );
	$attributes['showExcerpt'] = $request['showExcerpt']?$request['showExcerpt']:false;
	$attributes['showDate'] = $request['showDate']?$request['showDate']:false;
	$attributes['showThumbnail'] = $request['showThumbnail']?$request['showThumbnail']:false;
	$path      = $url_parts['path'] ?: '';
	$alpha = $request['alpha'] ?: $request['alpha'] = "";
	$autoComplete = $request['autocomplete'] ? $request['autocomplete']: false;
	$authorName = $request['author_name'] ? $request['author_name']: "";

	if(site_url( '', 'relative')){
		$path         = str_replace( site_url( '', 'relative'), '', $path );
	}//subdirectory site
	if ( function_exists( 'get_blog_details' ) ) {
		$blog_details = get_blog_details();
		$path         = str_replace( $blog_details->path, '', $path );
	}//multisite
	
	if($autoComplete){
		$posts_per_page = 20;
	}else{
		$posts_per_page = $request['posts_per_page']?$request['posts_per_page']:"12";; // Number of posts per page
	}
	


	$args = array(
        'post_type' => $post_type,
        'posts_per_page' => $posts_per_page,
		'order' => $order,
		'meta_key' => $metaKey,
		'orderby' => $orderBy,
		'paged' => $page,
		'author_name' => $authorName,
		'showExcerpt' => $request['showExcerpt'],
		'showDate' => $request['showDate'],
		'showThumbnail' => $request['showThumbnail'],

    );

	$urlParameters=array(
		'order' => $order,
		'orderby' => $orderBy,
		'paged' => $page,
    );
	if($year){
		$args['year'] = $year;
		$urlParameters['filter_year']=$year;
	}
	if($month){
		$args['monthnum'] = $month;
		$urlParameters['filter_month']=$month;
	}
	$urlParameters['custom_post_type']=implode(",", (array) $post_type);

	$args['tax_query'] = [
		'relation' => 'AND'
	];

	if ( $taxonomies) {
		foreach ( $taxonomies as $taxonomy ) {
			$tax_field = $taxonomy['taxonomy'] ?? '';
			$query_var = $taxonomy['terms'] ?? '';

			if ( empty( $tax_field ) ) {
				continue;
			}

			if ( empty( $query_var )) {
				continue;
			}

			$field = $taxonomy['field'] ?? 'slug';
			$tax = array(
					'taxonomy' => $tax_field,
					'field' => $field,
					'terms' => $query_var,
			);
			array_push($args['tax_query'], $tax);

			$urlParameters[$taxonomy['taxonomy']]=implode(",", (array) $query_var);

		}
	}	


	if ($excludeCat) {

		$terms = [];

		foreach ($excludeCat as $cat){
			$term = get_term_by('slug', $cat, 'category');
			array_push($terms, $term->term_id);
		}

		//$termIds = $terms;
		
		if (count($terms) > 0) {

			$exclusion = "true";
			$exclude = array(
				'taxonomy' => 'category',
				'field' => 'term_id',
				'terms' => $terms, 
				'operator' => 'NOT IN',
			);
			$args['tax_query'][] = $exclude; // Append $exclude to the tax_query array 
		}

	}else{
		$exclusion = false;
	}

	if ( empty( $search_query ) ) {
		unset( $args['s'] );
	}else{
		$args['s'] = $search_query;
		$urlParameters["p"] = urlencode($search_query);
		$urlParameters["orderby"] = 'relevance';
		$args["orderby"] = 'relevance';
	}

	if ($alpha ){		
		add_filter('posts_where', function ($where) use ($alpha) {
			global $wpdb;
			return $where . $wpdb->prepare(" AND {$wpdb->posts}.post_title LIKE %s", $alpha . '%');
		});
		$urlParameters["alpha"] = $alpha;
	}

	$search_term = $request['p'];

	if ($autoComplete && $search_term != ""){	

		add_filter('posts_where', function ($where, $wp_query) use ($search_term) {
			global $wpdb;
	
			if (!empty($search_term)) {
				$where .= $wpdb->prepare(" AND {$wpdb->posts}.post_title LIKE %s", '%' . $search_term . '%');
			}
	
			return $where;

			
		}, 10, 2);

		$urlParameters["orderby"] = 'relevance';
		$args["orderby"] = 'relevance';
		
		
	}


	$url = add_query_arg( $urlParameters, home_url( $path ) );

	global $post;
    $query = new WP_Query($args);

	if($alpha || $autoComplete){
		remove_filter('posts_where', 'filter_posts_by_first_letter');
	}

	

	ob_start();

    while ($query->have_posts()) {
        $query->the_post();
		if($columns==4){
			require __DIR__ . '../../build/blocks/post-grid/inc/story-grid-2.php';
		}else{
			require __DIR__ . '../../build/blocks/post-grid/inc/story-grid.php';
		}

		
    }

	wp_reset_postdata();

	 // Format results

	 if($autoComplete){
		$autoCompleteResponse = [];
	 if ($query->have_posts()) {
		 while ($query->have_posts()) {
			 $query->the_post();
			 $autoCompleteResponse[] = [				
				 'title' => html_entity_decode( get_the_title() ),			
			 ];
		 }
		 
	 	}
		 $autoCompleteResponse[] = [				
			'total' => $query->found_posts,		
		];
		
	 }
	 
	 wp_reset_postdata();
	
	
    $pagination = array(
        'current_page' => intval($query->query_vars['paged']),
        'max_pages' => $query->max_num_pages,
    );
	$big = 999999999;
	$pagination = paginate_links(
		array(
			'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
			'format' => '?paged=%#%',
			'current' => max(
				1,
				intval($query->query_vars['paged'])
			),
			'prev_text' => __( 'Prev', 'textdomain' ),
			'next_text' => __( 'Next', 'textdomain' ),
			'total' => $query->max_num_pages
		)
	);

    $response = array(
        'html' => ob_get_clean(),
        'pagination' => $pagination,
		'url' => $url,
		'test'=>$request['year'],
		'test2'=>$year,
		'exclude'=>$excludeCat,
		'exclusion'=>$exclusion,
		'count' => $termIds,
		'terms' => $terms,
		'args' => $args,
		'pages' => $query->max_num_pages,
		'total' => $query->found_posts,
		'current' => max(
			1,
			intval($query->query_vars['paged'])
		),
		'alpha' => $alpha,
    );
	$filter_url = home_url( '/wp-json/purdue-home/v1/post-select/' );

	$response['pagination'] = preg_replace(
		'#(' . $filter_url . ')(page/[\d]+/?)?#',
		"#",
		$response['pagination']
	);	

	if($autoComplete){
		return rest_ensure_response($autoCompleteResponse);
	}else{
		return rest_ensure_response($response);
	}
    
}
function get_items_permission_check( $request ) {
	return current_user_can( 'edit_posts' );
}

add_action('rest_api_init', 'post_list_endpoint');