<?php
/**
 * Render callback for sidebar-content-nav block.
 *
 * @var array $attributes Block attributes.
 */

$menu_ids      = $attributes['menuIds']        ?? [];
$contact_links = $attributes['contactLinks']   ?? [];
$show_contact  = $attributes['showContactBox'] ?? true;
$contact_label = $attributes['contactLabel']   ?? 'Contact';
$block_id      = $attributes['id']             ?? '';
$class_name    = $attributes['className']      ?? '';

$wrapper_id    = $block_id ? ' id="' . esc_attr( $block_id ) . '"' : '';
$wrapper_class = trim( 'scn-block ' . esc_attr( $class_name ) );

// Unique IDs per-render so multiple instances on one page don't collide.
$instance_uid   = wp_unique_id( 'scn-' );
$filter_input_id  = $instance_uid . '-filter-input';
$filter_status_id = $instance_uid . '-filter-status';

if ( ! function_exists( 'scn_current_request_path' ) ) {
	function scn_current_request_path() {
		if ( ! isset( $_SERVER['REQUEST_URI'] ) ) return '';
		$path = parse_url( wp_unslash( $_SERVER['REQUEST_URI'] ), PHP_URL_PATH );
		return untrailingslashit( (string) ( $path ?? '' ) );
	}
}

if ( ! function_exists( 'scn_is_current_item' ) ) {
	function scn_is_current_item( $item_url, $current_path ) {
		if ( ! $item_url ) return false;
		$parts = parse_url( $item_url );
		// External link — don't mark as current even if paths happen to match.
		if ( ! empty( $parts['host'] ) ) {
			$site_host = parse_url( home_url(), PHP_URL_HOST );
			if ( $site_host && strcasecmp( $parts['host'], $site_host ) !== 0 ) {
				return false;
			}
		}
		$item_path = untrailingslashit( (string) ( $parts['path'] ?? '' ) );
		return $item_path === $current_path;
	}
}

if ( ! function_exists( 'scn_render_menu' ) ) {
	function scn_render_menu( $menu_id, $uid = 'scn' ) {
		$menu_obj = wp_get_nav_menu_object( $menu_id );
		if ( ! $menu_obj ) return '';

		$items = wp_get_nav_menu_items( $menu_id );
		if ( ! $items ) return '';

		$current_path = scn_current_request_path();

		// Build a flat parent → children map keyed by parent item ID,
		// plus an id → item index for ancestor walks.
		$children    = [];
		$top_level   = [];
		$items_by_id = [];
		$current_id  = 0;
		foreach ( $items as $item ) {
			$items_by_id[ (int) $item->ID ] = $item;
			$parent = (int) $item->menu_item_parent;
			if ( $parent === 0 ) {
				$top_level[] = $item;
			} else {
				$children[ $parent ][] = $item;
			}
			if ( ! $current_id && scn_is_current_item( $item->url, $current_path ) ) {
				$current_id = (int) $item->ID;
			}
		}

		// Walk up from the current item to collect ancestors that need to be
		// expanded on initial render so "you are here" is visible without JS.
		$ancestor_ids = [];
		if ( $current_id && isset( $items_by_id[ $current_id ] ) ) {
			$cursor = (int) $items_by_id[ $current_id ]->menu_item_parent;
			while ( $cursor && isset( $items_by_id[ $cursor ] ) ) {
				$ancestor_ids[ $cursor ] = true;
				$cursor = (int) $items_by_id[ $cursor ]->menu_item_parent;
			}
		}

		$plus_icon  = '<svg class="scn-nav__icon scn-nav__icon--plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>';
		$minus_icon = '<svg class="scn-nav__icon scn-nav__icon--minus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>';
		$chevron    = '<svg class="scn-nav__icon scn-nav__icon--chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';

		$output  = '<div class="scn-nav-group">';
		$output .= '<ul class="scn-nav">';

		foreach ( $top_level as $parent ) {
			$parent_id = (int) $parent->ID;
			$kids      = $children[ $parent_id ] ?? [];
			$text      = esc_html( $parent->title );
			$url       = esc_url( $parent->url );
			$is_current_l1   = ( $parent_id === $current_id );
			// Expand on load when this item is an ancestor of the current page OR is itself the current page.
			$is_expanded_l1  = isset( $ancestor_ids[ $parent_id ] ) || $is_current_l1;

			if ( ! empty( $kids ) ) {
				$controls_id     = $uid . '-l1-' . esc_attr( $parent_id );
				$l1_item_class   = 'scn-nav__item scn-nav__item--l1 scn-nav__item--expandable' . ( $is_expanded_l1 ? ' is-open' : '' ) . ( $is_current_l1 ? ' is-active' : '' );
				$l1_aria_expand  = $is_expanded_l1 ? 'true' : 'false';
				$l1_hidden_attr  = $is_expanded_l1 ? '' : ' hidden';

				// Expandable parents are toggle-only: the whole row is a single button that
				// expands/collapses the children (no link to a page). The visible label is
				// the button's accessible name, so no aria-label (it would override the name).
				$output .= '<li class="' . $l1_item_class . '">';
				$output .= '<button type="button" class="scn-nav__trigger scn-nav__trigger--l1" aria-expanded="' . $l1_aria_expand . '" aria-controls="' . $controls_id . '">';
				$output .= '<span class="scn-nav__label">' . $text . '</span>';
				$output .= $plus_icon . $minus_icon;
				$output .= '</button>';
				$output .= '<ul id="' . $controls_id . '" class="scn-nav__children"' . $l1_hidden_attr . '>';

				// Auto "Overview" child: surface the parent's own page as the first child
				// link, since the toggle no longer links to it. Only when the parent points
				// at a real page (not a bare category / '#'), and skipped if a real child
				// already links to that URL (de-dupe against a manually-added overview).
				$raw_parent_url = $parent->url;
				$has_overview   = $raw_parent_url && '#' !== $raw_parent_url;
				if ( $has_overview ) {
					foreach ( $kids as $maybe_dupe ) {
						if ( untrailingslashit( $maybe_dupe->url ) === untrailingslashit( $raw_parent_url ) ) {
							$has_overview = false;
							break;
						}
					}
				}
				if ( $has_overview ) {
					$ov_current      = scn_is_current_item( $raw_parent_url, $current_path );
					$ov_url          = esc_url( $raw_parent_url );
					$ov_item_class   = 'scn-nav__item scn-nav__item--l2' . ( $ov_current ? ' is-active' : '' );
					$ov_link_class   = 'scn-nav__link scn-nav__link--l2' . ( $ov_current ? ' is-active' : '' );
					$ov_aria_current = $ov_current ? ' aria-current="page"' : '';
					$output .= '<li class="' . $ov_item_class . '">';
					$output .= '<a href="' . $ov_url . '" class="' . $ov_link_class . '" data-href="' . $ov_url . '"' . $ov_aria_current . '>Overview</a>';
					$output .= '</li>';
				}

				foreach ( $kids as $child ) {
					$child_id   = (int) $child->ID;
					$grandkids  = $children[ $child_id ] ?? [];
					$child_text = esc_html( $child->title );
					$child_url  = esc_url( $child->url );
					$is_current_l2  = ( $child_id === $current_id );
					$is_expanded_l2 = isset( $ancestor_ids[ $child_id ] ) || $is_current_l2;

					if ( ! empty( $grandkids ) ) {
						$l2_controls      = $uid . '-l2-' . esc_attr( $child_id );
						$l2_item_class    = 'scn-nav__item scn-nav__item--l2 scn-nav__item--expandable' . ( $is_expanded_l2 ? ' is-open' : '' ) . ( $is_current_l2 ? ' is-active' : '' );
						$l2_aria_expand   = $is_expanded_l2 ? 'true' : 'false';
						$l2_hidden_attr   = $is_expanded_l2 ? '' : ' hidden';
						$l2_link_cls      = 'scn-nav__link scn-nav__link--l2' . ( $is_current_l2 ? ' is-active' : '' );
						$l2_aria_current  = $is_current_l2 ? ' aria-current="page"' : '';
						$l2_toggle_label  = esc_attr( 'Toggle ' . wp_strip_all_tags( $child->title ) . ' submenu' );

						$output .= '<li class="' . $l2_item_class . '">';
						$output .= '<a href="' . $child_url . '" class="' . $l2_link_cls . '"' . $l2_aria_current . '>' . $child_text . '</a>';
						$output .= '<button type="button" class="scn-nav__trigger scn-nav__trigger--l2" aria-expanded="' . $l2_aria_expand . '" aria-controls="' . $l2_controls . '" aria-label="' . $l2_toggle_label . '">';
						$output .= $chevron;
						$output .= '</button>';
						$output .= '<ul id="' . $l2_controls . '" class="scn-nav__children scn-nav__children--l3"' . $l2_hidden_attr . '>';
						foreach ( $grandkids as $grandchild ) {
							$gc_id    = (int) $grandchild->ID;
							$gc_url   = esc_url( $grandchild->url );
							$gc_text  = esc_html( $grandchild->title );
							$gc_is_current = ( $gc_id === $current_id );
							$gc_item_class = 'scn-nav__item scn-nav__item--l3' . ( $gc_is_current ? ' is-active' : '' );
							$gc_link_class = 'scn-nav__link scn-nav__link--l3' . ( $gc_is_current ? ' is-active' : '' );
							$gc_aria_current = $gc_is_current ? ' aria-current="page"' : '';

							$output .= '<li class="' . $gc_item_class . '">';
							$output .= '<a href="' . $gc_url . '" class="' . $gc_link_class . '" data-href="' . $gc_url . '"' . $gc_aria_current . '>' . $gc_text . '</a>';
							$output .= '</li>';
						}
						$output .= '</ul>';
						$output .= '</li>';
					} else {
						// L2 plain link.
						$l2_item_class   = 'scn-nav__item scn-nav__item--l2' . ( $is_current_l2 ? ' is-active' : '' );
						$l2_link_class   = 'scn-nav__link scn-nav__link--l2' . ( $is_current_l2 ? ' is-active' : '' );
						$l2_aria_current = $is_current_l2 ? ' aria-current="page"' : '';

						$output .= '<li class="' . $l2_item_class . '">';
						$output .= '<a href="' . $child_url . '" class="' . $l2_link_class . '" data-href="' . $child_url . '"' . $l2_aria_current . '>' . $child_text . '</a>';
						$output .= '</li>';
					}
				}

				$output .= '</ul>';
				$output .= '</li>';
			} else {
				// No children — plain link. External icon added by JS if needed.
				$l1_item_class   = 'scn-nav__item scn-nav__item--l1' . ( $is_current_l1 ? ' is-active' : '' );
				$l1_link_class   = 'scn-nav__link scn-nav__link--l1' . ( $is_current_l1 ? ' is-active' : '' );
				$l1_aria_current = $is_current_l1 ? ' aria-current="page"' : '';

				$output .= '<li class="' . $l1_item_class . '">';
				$output .= '<a href="' . $url . '" class="' . $l1_link_class . '" data-href="' . $url . '"' . $l1_aria_current . '>' . $text . '</a>';
				$output .= '</li>';
			}
		}

		$output .= '</ul>';
		$output .= '</div>';

		return $output;
	}
}
?>
<nav<?php echo $wrapper_id; ?> class="<?php echo $wrapper_class; ?>" aria-label="Section navigation">
	<div class="scn-filter" role="search">
		<label class="screen-reader-text" for="<?php echo esc_attr( $filter_input_id ); ?>">Filter navigation</label>
		<input
			id="<?php echo esc_attr( $filter_input_id ); ?>"
			type="search"
			class="scn-filter__input"
			placeholder="Filter menu&hellip;"
			autocomplete="off"
			aria-describedby="<?php echo esc_attr( $filter_status_id ); ?>"
		/>
		<svg class="scn-filter__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<circle cx="11" cy="11" r="7"/>
			<line x1="21" y1="21" x2="16.65" y2="16.65"/>
		</svg>
	</div>
	<p
		id="<?php echo esc_attr( $filter_status_id ); ?>"
		class="scn-filter__status screen-reader-text"
		role="status"
		aria-live="polite"
		aria-atomic="true"
	></p>
	<p class="scn-filter__empty" aria-hidden="true">No matches found.</p>

	<?php foreach ( $menu_ids as $menu_id ) : ?>
		<?php echo scn_render_menu( (int) $menu_id, $instance_uid ); ?>
	<?php endforeach; ?>

	<?php if ( $show_contact && ! empty( $contact_links ) ) : ?>
		<aside class="scn-contact-box" aria-label="Contact information">
			<span class="scn-contact-box__label" aria-hidden="true">
				<?php echo esc_html( $contact_label ); ?>
			</span>
			<ul class="scn-contact-box__links">
				<?php foreach ( $contact_links as $link ) : ?>
					<?php
					$link_url  = esc_url( $link['url']  ?? '' );
					$link_text = esc_html( $link['text'] ?? '' );
					if ( ! $link_text ) continue;
					?>
					<li>
						<a href="<?php echo $link_url; ?>" class="scn-contact-box__link">
							<?php echo $link_text; ?>
						</a>
					</li>
				<?php endforeach; ?>
			</ul>
		</aside>
	<?php endif; ?>
</nav>
