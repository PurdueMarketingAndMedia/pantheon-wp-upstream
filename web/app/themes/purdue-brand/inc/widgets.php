  
<?php
/**
 * Widget Functions
 *
 * @package Purdue-brand
 */

// Add theme support for selective refresh for widgets.
add_theme_support( 'customize-selective-refresh-widgets' );

if ( ! function_exists( 'purdueBrand_widgets_init' ) ) {
	/**
	 * Register widget area.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
	 */
	function purdueBrand_widgets_init() {
		register_sidebar( array(
			'name'          => esc_html__( 'Sidebar', 'purdueBrand' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'purdueBrand' ),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h2>',
			'after_title'   => '</h2>',
			) );
	}
}
add_action( 'widgets_init', 'purdueBrand_widgets_init' );

if ( ! function_exists( 'register_relatedContent_widget' ) ) {
    function register_relatedContent_widget() { 
    register_widget( 'Related_Content' );
    }
}
add_action( 'widgets_init', 'register_relatedContent_widget' );

class Related_Content extends WP_Widget {
 
    /**
     * Constructs the new widget.
     *
     * @see WP_Widget::__construct()
     */
    function __construct() {
        // Instantiate the parent object.
        $widget_options = array( 
            'classname' => 'relatedContent_widget',
            'description' => 'This is a related content Widget',
          );
          parent::__construct( 'relatedContent_widget', 'Related content Widget', $widget_options );
        
    }
 
    /**
     * The widget's HTML output.
     *
     * @see WP_Widget::widget()
     *
     * @param array $args     Display arguments including before_title, after_title,
     *                        before_widget, and after_widget.
     * @param array $instance The settings for the particular instance of the widget.
     */
    function widget( $args, $instance ) {

                // Related Posts 
                $orig_post = $post;
                global $post;
                // By Tag
                // $tags = get_the_tags($post->ID);
                // if ($tags) {
                //     $tag_array = array();
                //     foreach($tags as $tabKey => $tag) {
                //         $tag_array[$tabKey] = $tag->slug;
                //     }
                // }

                //By Category
                $cats = get_the_category($post->ID);
                if ($cats) {
                    $cat_array = array();
                    foreach($cats as $catKey => $cat) {
                        $cat_array[$catKey] = $cat->slug;
                    }
                }
                
                $args=array(
                'post__not_in' => array($post->ID),
                'posts_per_page'=> 4, // Number of related posts that will be shown.
                'orderby' => 'date',
                'order'   => 'DESC',
                'tax_query' => array(
                    // 'relation' => 'OR',
                    array(
                        'taxonomy' => 'category',
                        'field' => 'slug',
                        'terms' => $cat_array,
                        'include_children' => false 
                    )
                    // ),
                    // array(
                    //     'taxonomy' => 'post_tag',
                    //     'field' => 'slug',
                    //     'terms' => $tag_array,
                    // )
                ));
                
                $my_query = new wp_query( $args );
                if( $my_query->have_posts() ) {
                
                echo '<h2>Related Content</h2>';
                while( $my_query->have_posts() ) {
                $my_query->the_post();

                echo '<a class="media" href="';
                echo the_permalink();
                echo '">';
                echo '<div class="media-left">';
                echo '<figure class="image is-1by1">';
                if( class_exists('Dynamic_Featured_Image') ) {
                    global $dynamic_featured_image;
                    $featured_images = $dynamic_featured_image->get_featured_images();
                    if($featured_images[0]['thumb']){
                        echo '<image src="';
                        echo $featured_images[0]['thumb'];
                        echo '" alt=""/>';
                     }else{
                         echo the_post_thumbnail();
                    }                   
                }                
                echo '</figure>';
                echo '</div>';
                echo '<div class="media-content">';
                
                echo the_title();
                echo '</div></a>';              
                
                }
                }
                $post = $orig_post;
                wp_reset_query(); 
    }
 
    /**
     * The widget update handler.
     *
     * @see WP_Widget::update()
     *
     * @param array $new_instance The new instance of the widget.
     * @param array $old_instance The old instance of the widget.
     * @return array The updated instance of the widget.
     */
    function update( $new_instance, $old_instance ) {
        return $new_instance;
    }
 
    /**
     * Output the admin widget options form HTML.
     *
     * @param array $instance The current widget settings.
     * @return string The HTML markup for the form.
     */
    function form( $instance ) {
        return '';
    }
}
