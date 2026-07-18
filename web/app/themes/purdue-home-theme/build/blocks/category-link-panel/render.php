<?php
$id = $attributes['id'] !== '' ? ' id="' . esc_attr( $attributes['id'] ) . '"' : '';

$sectionClass = 'section category-link-panel';
if ( $attributes['background'] !== 'none' ) {
	$sectionClass .= ' has-' . $attributes['background'] . '-background';
}
if ( $attributes['paddingTop'] !== '' ) {
	$sectionClass .= ' ' . $attributes['paddingTop'];
}
if ( $attributes['paddingBottom'] !== '' ) {
	$sectionClass .= ' ' . $attributes['paddingBottom'];
}
if ( $attributes['className'] !== '' ) {
	$sectionClass .= ' ' . $attributes['className'];
}

$layout = in_array( $attributes['layout'] ?? 'grid', [ 'grid', 'feature' ], true )
	? $attributes['layout']
	: 'grid';
if ( $layout === 'feature' ) {
	$sectionClass .= ' has-layout-feature';
}

$columns     = max( 1, intval( $attributes['columns'] ) );
$columnWidth = intval( 12 / $columns );
$columnClass = 'column is-' . $columnWidth . '-desktop is-6-tablet';

$headerLevel = in_array( $attributes['headerLevel'], [ 'h2', 'h3', 'h4' ], true )
	? $attributes['headerLevel']
	: 'h2';

$arrow_icon = '<svg class="clp-icon clp-icon--arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>';

$plus_icon  = '<svg class="clp-icon clp-icon--plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>';

$minus_icon = '<svg class="clp-icon clp-icon--minus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>';

/**
 * Return target/rel attributes for off-site links so external destinations open
 * in a new tab. Off-site = host differs from this site's own host; internal,
 * relative, and same-page links get nothing. Mirrors the origin rule used by the
 * sidebar-content-nav block.
 */
if ( ! function_exists( 'clp_external_link_attrs' ) ) :
function clp_external_link_attrs( $url ) {
	$host = wp_parse_url( (string) $url, PHP_URL_HOST );
	if ( ! $host ) {
		return '';
	}
	$home = wp_parse_url( home_url(), PHP_URL_HOST );
	if ( $home && strcasecmp( $host, $home ) === 0 ) {
		return '';
	}
	return ' target="_blank" rel="noopener noreferrer"';
}
endif;

/**
 * Render a WordPress nav menu as category-link-panel list items.
 * Top-level items with children become submenu triggers.
 * Top-level items without children become regular arrow links.
 */
if ( ! function_exists( 'clp_render_menu_links' ) ) :
function clp_render_menu_links( $menu_id, $arrow_icon, $plus_icon, $minus_icon ) {
	$items = wp_get_nav_menu_items( (int) $menu_id );
	if ( ! $items ) return '';

	$top_level = [];
	$children  = [];

	foreach ( $items as $item ) {
		if ( ! $item->menu_item_parent || '0' === $item->menu_item_parent ) {
			$top_level[] = $item;
		} else {
			$children[ $item->menu_item_parent ][] = $item;
		}
	}

	$output = '';

	$top_level = array_slice( $top_level, 0, 9 );

	foreach ( $top_level as $parent ) {
		$parent_id = $parent->ID;
		$kids      = $children[ $parent_id ] ?? [];
		$text      = esc_html( $parent->title );
		$url       = esc_url( $parent->url );

		if ( ! empty( $kids ) ) {
			$kids      = array_slice( $kids, 0, 15 );
			$submenu_id = 'clp-submenu-' . esc_attr( $parent_id );
			$output .= '<li class="category-link-panel__item has-submenu">';
			$output .= '<button class="category-link-panel__link-row category-link-panel__submenu-trigger" aria-expanded="false" aria-controls="' . $submenu_id . '">';
			$output .= '<span class="category-link-panel__link-text">' . $text . '</span>';
			$output .= '<span class="clp-icon-wrap">' . $plus_icon . $minus_icon . '</span>';
			$output .= '</button>';
			$output .= '<ul id="' . $submenu_id . '" class="category-link-panel__submenu" hidden>';

			// Auto "Overview" child: surface the parent's own page as the first child
			// link, since the toggle button no longer navigates anywhere. Only when the
			// parent points at a real page (not a bare category / '#'), and skipped if a
			// child already links to that URL (de-dupe against a manually-added overview).
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
				$output .= '<li class="category-link-panel__item">';
				$output .= '<a href="' . esc_url( $raw_parent_url ) . '"' . clp_external_link_attrs( $raw_parent_url ) . ' class="category-link-panel__link-row category-link-panel__sublink-row">';
				$output .= '<span class="category-link-panel__link-text">Overview</span>';
				$output .= '</a></li>';
			}

			foreach ( $kids as $child ) {
				$child_url  = esc_url( $child->url );
				$child_text = esc_html( $child->title );
				$output .= '<li class="category-link-panel__item">';
				$output .= '<a href="' . $child_url . '"' . clp_external_link_attrs( $child->url ) . ' class="category-link-panel__link-row category-link-panel__sublink-row">';
				$output .= '<span class="category-link-panel__link-text">' . $child_text . '</span>';
				$output .= '</a></li>';
			}
			$output .= '</ul></li>';
		} else {
			$output .= '<li class="category-link-panel__item">';
			$output .= '<a href="' . $url . '"' . clp_external_link_attrs( $parent->url ) . ' class="category-link-panel__link-row">';
			$output .= '<span class="category-link-panel__link-text">' . $text . '</span>';
			$output .= $arrow_icon;
			$output .= '</a></li>';
		}
	}

	return $output;
}
endif;

/**
 * Render a single category card (heading + optional nav menu).
 * Shared by the grid panels and the feature-layout sidebar panel.
 * Returns '' when there is nothing to show.
 */
if ( ! function_exists( 'clp_render_card' ) ) :
function clp_render_card( $heading, $headingURL, $menuId, $arrow_icon, $plus_icon, $minus_icon, $plain_heading = false ) {
	$heading = (string) $heading;
	$menuId  = intval( $menuId );
	if ( $heading === '' && $menuId === 0 ) return '';

	$heading_arrow = '<svg class="clp-icon clp-icon--heading-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>';

	$out = '<nav class="category-link-panel__card" aria-label="' . esc_attr( $heading ) . '">';

	if ( $heading !== '' ) {
		$out .= '<h3 class="category-link-panel__card-heading">';
		// $plain_heading: render the heading as plain text only — no link, no
		// arrow icon (used by the feature layout per design).
		if ( ! $plain_heading && ! empty( $headingURL ) ) {
			$out .= '<a href="' . esc_url( $headingURL ) . '"' . clp_external_link_attrs( $headingURL ) . '>' . esc_html( $heading ) . $heading_arrow . '</a>';
		} else {
			$out .= esc_html( $heading );
		}
		$out .= '</h3>';
	}

	if ( $menuId > 0 ) {
		$out .= '<ul class="category-link-panel__links">';
		$out .= clp_render_menu_links( $menuId, $arrow_icon, $plus_icon, $minus_icon );
		$out .= '</ul>';
	}

	$out .= '</nav>';

	return $out;
}
endif;
?>
<section<?= $id; ?> class="<?= esc_attr( $sectionClass ); ?>">
	<div class="container">
		<?php if ( $attributes['header'] !== '' ) : ?>
			<div class="category-link-panel__header">
				<<?= $headerLevel; ?> class="category-link-panel__section-heading tagged-header tagged-header--gold">
					<?= esc_html( $attributes['header'] ); ?>
				</<?= $headerLevel; ?>>
			</div>
		<?php endif; ?>

		<?php
		// The feature layout renders plain headings (no link, no arrow) per design.
		$plain_heading = ( $layout === 'feature' );

		// Build the panels grid once; both layouts reuse it.
		ob_start();
		?>
		<div class="columns is-multiline category-link-panel__grid">
			<?php foreach ( $attributes['panels'] as $panel ) :
				$card = clp_render_card( $panel['heading'] ?? '', $panel['headingURL'] ?? '', $panel['menuId'] ?? 0, $arrow_icon, $plus_icon, $minus_icon, $plain_heading );
				if ( $card === '' ) continue;
			?>
			<div class="<?= esc_attr( $columnClass ); ?> category-link-panel__column">
				<?= $card; ?>
			</div>
			<?php endforeach; ?>
		</div>
		<?php
		$grid_html = ob_get_clean();

		if ( $layout === 'feature' ) :
			$ctaHeading     = $attributes['ctaHeading'] ?? '';
			$ctaText        = $attributes['ctaText'] ?? '';
			$ctaButtonLabel = $attributes['ctaButtonLabel'] ?? '';
			$ctaButtonURL   = $attributes['ctaButtonURL'] ?? '';
			$hasCta         = $ctaHeading !== '' || $ctaText !== '' || ( $ctaButtonLabel !== '' && $ctaButtonURL !== '' );
		?>
		<div class="columns category-link-panel__feature">
			<div class="column is-6-desktop category-link-panel__feature-main">
				<?= $grid_html; ?>
			</div>
			<div class="column is-6-desktop category-link-panel__feature-aside">
				<?= clp_render_card( $attributes['sidebarHeading'] ?? '', $attributes['sidebarHeadingURL'] ?? '', $attributes['sidebarMenuId'] ?? 0, $arrow_icon, $plus_icon, $minus_icon, $plain_heading ); ?>
				<?php if ( $hasCta ) : ?>
				<div class="category-link-panel__cta">
					<?php if ( $ctaHeading !== '' ) : ?>
						<h3 class="category-link-panel__cta-heading"><?= esc_html( $ctaHeading ); ?></h3>
					<?php endif; ?>
					<?php if ( $ctaText !== '' ) : ?>
						<div class="category-link-panel__cta-text"><?= wp_kses_post( $ctaText ); ?></div>
					<?php endif; ?>
					<?php if ( $ctaButtonLabel !== '' && $ctaButtonURL !== '' ) : ?>
						<a class="purdue-home-button purdue-home-button--black" href="<?= esc_url( $ctaButtonURL ); ?>"<?= clp_external_link_attrs( $ctaButtonURL ); ?>><?= esc_html( $ctaButtonLabel ); ?></a>
					<?php endif; ?>
				</div>
				<?php endif; ?>
			</div>
		</div>
		<?php else : ?>
		<?= $grid_html; ?>
		<?php endif; ?>
	</div>
</section>
