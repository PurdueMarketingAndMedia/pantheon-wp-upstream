<?php
/**
 * Blocks Initializer
 *
 * @since   1.0.0
 * @package purdue-home-theme
 */
if (!function_exists('str_contains')) {
	function str_contains(string $haystack, string $needle): bool
	{
		return '' === $needle || false !== strpos($haystack, $needle);
	}
}
$current_site_url = get_site_url();

$purdueBlocks = array();
$purdueBlocks[] = '50-50-animated-header';
$purdueBlocks[] = 'accordion';
$purdueBlocks[] = 'alert-page';
$purdueBlocks[] = 'button-bar';
$purdueBlocks[] = 'color-hero';
$purdueBlocks[] = 'cta-banner';
$purdueBlocks[] = 'cta-card';
$purdueBlocks[] = 'cta-carousel';
$purdueBlocks[] = 'cta-grid';
$purdueBlocks[] = 'cta-hero';
$purdueBlocks[] = 'cta-stack';
$purdueBlocks[] = 'cta-strap';
$purdueBlocks[] = 'custom-container';
$purdueBlocks[] = 'diagonal-cta-hero';
$purdueBlocks[] = 'diagonal-hero';
$purdueBlocks[] = 'featured-story';
$purdueBlocks[] = 'hot-spot';
$purdueBlocks[] = 'image-slider';
$purdueBlocks[] = 'instagram-feed';
$purdueBlocks[] = 'intro-text';
$purdueBlocks[] = 'left-banner-layout';
$purdueBlocks[] = 'link-cards-new';
$purdueBlocks[] = 'link-cards-single';
$purdueBlocks[] = 'link-hero';
$purdueBlocks[] = 'media-grid';
$purdueBlocks[] = 'mixed-rtb';
$purdueBlocks[] = 'news-and-events';
$purdueBlocks[] = 'path-way';
$purdueBlocks[] = 'rtb-hero';
$purdueBlocks[] = 'rtb-row';
$purdueBlocks[] = 'search-block';
$purdueBlocks[] = 'tabs-block';
$purdueBlocks[] = 'tab-block';
$purdueBlocks[] = 'tabs-horizontal-block';
$purdueBlocks[] = 'tab-horizontal-block';
$purdueBlocks[] = 'two-column-cta';
$purdueBlocks[] = 'video-embed';
$purdueBlocks[] = 'post-grid';
$purdueBlocks[] = 'content-block';
$purdueBlocks[] = 'teritary-header';
$purdueBlocks[] = 'purdue-quote';
$purdueBlocks[] = 'quick-links';
$purdueBlocks[] = 'timeline-block';
$purdueBlocks[] = 'flipping-cards'; 

if (str_contains($current_site_url,"purdue-theme-test.lndo.site") || str_contains($current_site_url,"www.purdue.edu/home") ) {
	$purdueBlocks[] = 'canopy-hero';
}

if (str_contains($current_site_url,"research.purdue.edu")) {
	$purdueBlocks[] = 'category-link-panel';
	$purdueBlocks[] = 'sidebar-content-nav';
}

function register_layout_category( $categories ) {	
	$categories[] = array(
		'slug'  => 'purdue',
		'title' => 'Purdue'
	);
	return $categories;
}


if ( version_compare( get_bloginfo( 'version' ), '5.8', '>=' ) ) {
	add_filter( 'block_categories_all', 'register_layout_category' );
} else {
	add_filter( 'block_categories', 'register_layout_category' );
}

function purdue_load_block_init() {
	
	global $purdueBlocks;
    if (!is_array($purdueBlocks)) {
        return;
    }
	foreach($purdueBlocks as $block){
		register_block_type( get_template_directory() . '/build/blocks/' . $block);
	}
	
}
add_action( 'init', 'purdue_load_block_init' );

function remove_block_assets() {
    global $purdueBlocks;
    if (!is_array($purdueBlocks)) {
        return;
    }
    foreach ($purdueBlocks as $block) {
        // Deregister block script
        $view_script_handle = 'purdue-' . $block . '-view-script';
        $view_script_handle_1 = 'purdue-' . $block . '-script';
        $style_handle = 'purdue-' . $block . '-style';
        if (wp_script_is($view_script_handle, 'enqueued') || wp_script_is($view_script_handle, 'registered') ) {
            wp_deregister_script($view_script_handle);
        }
        if (wp_script_is($view_script_handle_1, 'enqueued') || wp_script_is($view_script_handle_1, 'registered') ) {
            wp_deregister_script($view_script_handle_1);
        }
        if (wp_style_is($style_handle, 'enqueued') || wp_style_is($style_handle, 'registered')) {
            wp_deregister_style($style_handle);
        }
    }
}

function remove_admin_block_assets() {
    global $purdueBlocks;
    if (!is_array($purdueBlocks)) {
        return;
    }
    foreach ($purdueBlocks as $block) {
        // Deregister block script
        $editor_script_handle = 'purdue-' . $block . '-editor-script';
        $editor_style_handle = 'purdue-' . $block . '-editor-style';

        if (wp_script_is($editor_script_handle, 'enqueued') || wp_script_is($editor_script_handle, 'registered') ) {
            wp_dequeue_script($editor_script_handle);
        }

        if (wp_style_is($editor_style_handle, 'enqueued') || wp_style_is($editor_style_handle, 'registered')) {
            wp_dequeue_style($editor_style_handle);
        }
        $view_script_handle = 'purdue-' . $block . '-script';
        $style_handle = 'purdue-' . $block . '-style';
        if (wp_script_is($view_script_handle, 'enqueued') || wp_script_is($view_script_handle, 'registered') ) {
            wp_dequeue_script($view_script_handle);
        }

        if (wp_style_is($style_handle, 'enqueued') || wp_style_is($style_handle, 'registered')) {
            wp_dequeue_style($style_handle);
        }
    }
}

add_action('wp_enqueue_scripts', 'remove_block_assets', 999);
add_action('admin_enqueue_scripts', 'remove_admin_block_assets', 999);


function enqueue_admin_block_assets() {
    global $purdueBlocks;
    if (!is_array($purdueBlocks)) {
        return;
    }
    foreach ($purdueBlocks as $block) {
            $version = require get_template_directory() . '/build/app.asset.php';

            if (!wp_script_is('purdue-' . $block . '-editor-script-js', 'enqueued')) {
                wp_enqueue_script('purdue-' . $block . '-editor-script-js', get_template_directory_uri() . '/build/blocks/' . $block . '/index.js', $version['dependencies'], $version['version'], true);
            }

            if (!wp_script_is('purdue-' . $block . '-editor-style-css', 'enqueued') && file_exists(get_template_directory() . '/build/blocks/' . $block . '/index.css')) {
				wp_enqueue_style('purdue-' . $block . '-editor-style-css', get_template_directory_uri() . '/build/blocks/' . $block . '/index.css', array(), $version['version']);
            }
            if (file_exists(get_template_directory() . '/build/blocks/' . $block . '/style-index.css')) {

                 wp_enqueue_style('purdue-' . $block . '-style-css', wp_normalize_path(get_template_directory_uri() . '/build/blocks/' . $block . '/style-index.css'), array(), $version['version']);
            }
        }
}

function enqueue_block_assets() {
    global $purdueBlocks;
    if (!is_array($purdueBlocks)) {
        return;
    }
    foreach ($purdueBlocks as $block) {
       if (has_block('purdue/' . $block) || (is_active_sidebar('alert-page') && $block == "alert-page")) {
            $version = require get_template_directory() . '/build/app.asset.php';

            if (file_exists(get_template_directory() . '/build/blocks/' . $block . '/style-index.css')) {
                $cssFileURI = wp_normalize_path(get_template_directory_uri() . '/build/blocks/' . $block . '/style-index.css');
                wp_enqueue_style('purdue-' . $block . '-style-css', $cssFileURI, array(), $version['version']);
            }

            if (file_exists(get_template_directory() . '/build/blocks/' . $block . '/frontend.js')) {
                wp_enqueue_script('purdue-' . $block . '-view-script-js', get_template_directory_uri() . '/build/blocks/' . $block . '/frontend.js', $version['dependencies'], $version['version'], true);
            }
        }
    }
}
add_action('enqueue_block_editor_assets', 'enqueue_admin_block_assets',1000);
add_action('wp_enqueue_scripts', 'enqueue_block_assets',1000);