<?php
/**
 * rest api end points
 *
 * @since   1.0.0
 * @package purdue-home-theme
 */

// Shared post-grid query builder (also used by the block's render.php).
// Adjust this path if your build output lives elsewhere.
if ( ! function_exists( 'purdue_build_post_grid_query' ) ) {
    require_once __DIR__ . '../../build/blocks/post-grid/inc/func.php';
}

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

    // Presentation attributes consumed by story.php while rendering each card.
    $attributes['buttonText']    = $request['button_text'] ?: "Learn More";
    $attributes['postTypeTag']   = $request['postType_tag'] ?: false;
    $attributes['cardType']      = $request['cardType'] ?: "story";
    $attributes['selectedTax']   = $request['use_tag'];
    $attributes['showExcerpt']   = $request['showExcerpt'] ?: false;
    $attributes['showDate']      = $request['showDate'] ?: false;
    $attributes['showThumbnail'] = $request['showThumbnail'] ?: false;

    $columns      = $request['columns'] ?: "3";
    $authorName   = $request['author_name'] ?: "";
    $excludeCat   = $request['excludeCat'] ?: "";
    $alpha        = $request['alpha'] ?: "";
    $autoComplete = $request['autocomplete'] ?: false;
    $termIds      = '';

    /*
     * Build the query with the SAME builder render.php uses.
     * purdue_post_grid_request_filters() normalizes the REST payload into the
     * shared $filters shape and reconstructs the minimal $attributes the builder
     * needs; purdue_build_post_grid_query() (inc/func.php) returns the WP_Query
     * args plus resolved context.
     */
    $grid_filters = purdue_post_grid_request_filters( $request, $attributes );
    $grid_build   = purdue_build_post_grid_query( $attributes, $grid_filters );
    $args         = $grid_build['args'];

    // author_name is request-only, not a block attribute: layer it on.
    if ( $authorName !== "" ) {
        $args['author_name'] = $authorName;
    }

    // When the visitor selected no post types, keep the endpoint's old guard
    // (return nothing) rather than silently falling back to all posts.
    if ( empty( $args['post_type'] ) ) {
        $args['post_type'] = "nonexistent_post_type";
    }

    $terms     = $grid_build['context']['excluded_terms'];
    $exclusion = ! empty( $terms ) ? "true" : false;
    $year      = $grid_filters['year'];

    // ---- Canonical / shareable URL for the front end ----
    $url_parts = parse_url( $request['requestURL'] );
    $path      = $url_parts['path'] ?: '';
    if ( site_url( '', 'relative' ) ) {
        $path = str_replace( site_url( '', 'relative' ), '', $path ); // subdirectory site
    }
    if ( function_exists( 'get_blog_details' ) ) {
        $blog_details = get_blog_details();
        $path         = str_replace( $blog_details->path, '', $path ); // multisite
    }

    $urlParameters = array(
        'order'   => $grid_filters['order'] ?: 'DESC',
        'orderby' => $args['orderby'] ?? 'date',
        'paged'   => $grid_filters['paged'],
    );
    if ( $grid_filters['year'] ) {
        $urlParameters['filter_year'] = $grid_filters['year'];
    }
    if ( $grid_filters['month'] ) {
        $urlParameters['filter_month'] = $grid_filters['month'];
    }
    $urlParameters['custom_post_type'] = implode( ",", (array) $grid_filters['post_types'] );
    foreach ( (array) $grid_filters['taxes'] as $tax => $tax_terms ) {
        $urlParameters[ $tax ] = implode( ",", (array) $tax_terms );
    }
    if ( ! empty( $grid_filters['categories'] ) ) {
        $urlParameters['category'] = implode( ",", (array) $grid_filters['categories'] );
    }
    if ( ! empty( $args['s'] ) ) {
        $urlParameters['p']       = urlencode( $args['s'] );
        $urlParameters['orderby'] = 'relevance';
    }
    if ( $alpha ) {
        $urlParameters['alpha'] = $alpha;
    }

    $url = add_query_arg( $urlParameters, home_url( $path ) );

    // ---- Run the query ----
    // Autocomplete does a partial (LIKE %term%) title match via posts_where;
    // everything else (including the alpha first-letter filter) is handled by
    // the shared runner.
    global $post;
    $autocomplete_where = null;
    if ( $autoComplete && $grid_filters['search'] !== "" ) {
        $search_term        = $grid_filters['search'];
        $autocomplete_where = function ( $where, $wp_query ) use ( $search_term ) {
            global $wpdb;
            if ( ! empty( $search_term ) ) {
                $where .= $wpdb->prepare(
                    " AND {$wpdb->posts}.post_title LIKE %s",
                    '%' . $wpdb->esc_like( $search_term ) . '%'
                );
            }
            return $where;
        };
        add_filter( 'posts_where', $autocomplete_where, 10, 2 );
        $args['orderby'] = 'relevance';
    }

    $query = purdue_post_grid_run_query( $args, $alpha );

    if ( $autocomplete_where ) {
        remove_filter( 'posts_where', $autocomplete_where, 10 );
    }

    while ($query->have_posts()) {
        $query->the_post();
		if($columns==4){
			require __DIR__ . '../../build/blocks/post-grid/inc/story-grid-2.php';
		}elseif($columns==2){
			require __DIR__ . '../../build/blocks/post-grid/inc/story-grid-two-column.php';
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

function scn_nav_menus_endpoint() {
    register_rest_route( 'purdue-home/v1', '/nav-menus/', array(
        'methods'             => 'GET',
        'callback'            => 'scn_get_nav_menus',
        'permission_callback' => fn() => current_user_can( 'edit_posts' ),
    ) );
}
function scn_get_nav_menus() {
    $menus = get_terms( array( 'taxonomy' => 'nav_menu', 'hide_empty' => false ) );
    if ( is_wp_error( $menus ) ) return array();
    return array_map( fn( $m ) => array( 'id' => $m->term_id, 'name' => $m->name ), $menus );
}
add_action( 'rest_api_init', 'scn_nav_menus_endpoint' );