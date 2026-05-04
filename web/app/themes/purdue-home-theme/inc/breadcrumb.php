<?php
/**
 * Breadcrumb
 *
 * @package purdue-home-theme
 */

function wpse_get_breadcrumbs() {
    global $wp_query;
?>
    <ul><?php
        // Adding the Home Page  ?>
        <li><a href="<?php echo esc_url( home_url() ); ?>"><span>Home</span></a></li><?php
        if ( ! is_front_page() ) {
            // Check for categories, archives, search page, single posts, pages, the 404 page, and attachments
                $post = $wp_query->get_queried_object();
                if ( $post->post_parent == 0 ) { ?>
                    <li><?php the_title(); ?></li><?php
                } else {
                    $title = the_title( '','', false );
                    $ancestors = array_reverse( get_post_ancestors( $post->ID ) );
                    array_push( $ancestors, $post->ID );
                    foreach ( $ancestors as $ancestor ) {
                        if ( $ancestor != end( $ancestors ) ) { ?>
                            <li>
                                <a href="<?php echo esc_url( get_permalink( $ancestor ) ); ?>"> <span><?php echo strip_tags( apply_filters( 'single_post_title', get_the_title( $ancestor ) ) ); ?></span></a>
                            </li><?php
                        } else { ?>
                            <li>
                                <?php echo strip_tags( apply_filters( 'single_post_title', get_the_title( $ancestor ) ) ); ?>
                            </li><?php
                        }
                    }
                }
            
        } ?>
    </ul><?php
}