<?php
require_once __DIR__ . '/inc/func.php';

$id      = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : ""; // jump-link id.
$rand    = uniqid();
$post_id = get_the_ID();

$sectionclass = ['section'];
if ($attributes['paddingTop']) {
    $sectionclass[] = $attributes['paddingTop'];
}
if ($attributes['paddingBottom']) {
    $sectionclass[] = $attributes['paddingBottom'];
}

/*
 * Build the query + filter-section context in one place.
 * purdue_post_grid_get_filters() reads the active visitor selections out of
 * $_GET; purdue_build_post_grid_query() (in inc/func.php) turns the block
 * attributes + those selections into WP_Query args and the data the filter
 * UI below needs. The REST endpoint (rest.php) uses the same builder.
 */
$grid_filters = purdue_post_grid_get_filters($attributes);
$grid_build   = purdue_build_post_grid_query($attributes, $grid_filters);

$queryParams = $grid_build['args'];

// Unpack context into the variable names the markup below expects.
$ctx              = $grid_build['context'];
$queryArgs        = $ctx['queryArgs'];        // pre-merge args (for isset year/monthnum)
$allPostTypes     = $ctx['allPostTypes'];
$allowedPostTypes = $ctx['allowedPostTypes'];
$taxonomies       = $ctx['taxonomies'];
$taxQuery         = $ctx['taxQuery'];
$categories       = $ctx['categories'];
$validCatSlugs    = $ctx['validCatSlugs'];
$excluded_terms   = $ctx['excluded_terms'];
$validDates       = $ctx['validDates'];

/*
 * Payload consumed by frontend.js for "Load More" (infinite scroll) and search
 * autocomplete. It mirrors the shape purdue_get_posts() (rest.php) expects so
 * the JS can replay this exact query: Load More only bumps `paged`; autocomplete
 * adds the typed term with `autocomplete => true`. Built unconditionally so a
 * search-only grid (no infinite scroll) still has args for autocomplete. Keep
 * the keys in sync with purdue_post_grid_request_filters() in inc/func.php.
 *
 * Derived from the *resolved* query ($queryParams), not the raw visitor
 * selections, so block-author restrictions (selectedCatTerms, selectedTaxTerms,
 * default post types) are preserved. Keep only positive slug include-clauses;
 * the excludeCat NOT-IN clause is re-added by the builder on the REST side from
 * the `excludeCat` key below.
 */
$tax_query_payload = [];
foreach ((array) ($queryParams['tax_query'] ?? []) as $clause) {
    if (!is_array($clause)) {
        continue; // skips the leading 'relation' => 'AND'
    }
    if (empty($clause['taxonomy']) || empty($clause['terms'])) {
        continue;
    }
    if (($clause['operator'] ?? '') === 'NOT IN') {
        continue; // exclusion, carried via excludeCat
    }
    if (($clause['field'] ?? 'slug') !== 'slug') {
        continue; // only slug includes round-trip through the REST adapter
    }
    $tax_query_payload[] = [
            'taxonomy' => $clause['taxonomy'],
            'field'    => 'slug',
            'terms'    => array_values((array) $clause['terms']),
    ];
}


// Send month as a name so the REST adapter's strtotime() parse is reliable.
$month_payload = '';
if (!empty($queryParams['monthnum'])) {
    $month_payload = date('F', mktime(0, 0, 0, (int) $queryParams['monthnum'], 1));
}

$grid_data_args = [
        'post_type'       => array_values((array) ($queryParams['post_type'] ?? [])),
        'tax_query'       => $tax_query_payload,
        'excludeCat'      => array_values((array) ($attributes['excludeCat'] ?? [])),
        'search'          => $queryParams['s'] ?? '',
        'order'           => $queryParams['order'] ?? '',
        'orderby'         => $queryParams['orderby'] ?? 'date',
        'meta_key'        => $queryParams['meta_key'] ?? '',
        'post_status'     => $queryParams['post_status'] ?? 'publish',
        'year'            => $queryParams['year'] ?? '',
        'month'           => $month_payload,
        'alpha'           => $ctx['alpha'] ?? '',
        'paged'           => (int) ($queryParams['paged'] ?? 1),
        'posts_per_page'  => (int) ($queryParams['posts_per_page'] ?? 12),
        'addAutoComplete' => (bool) ($attributes['addAutoComplete'] ?? false),
];

$grid_data_args = array_merge($grid_data_args, [
        'button_text'   => $attributes['buttonText'],
        'postType_tag'  => $attributes['postTypeTag'],
        'use_tag'       => $attributes['selectedTax'],
        'cardType'      => $attributes['cardType'],
        'showExcerpt'   => $attributes['showExcerpt'],
        'showDate'      => $attributes['showDate'],
        'showThumbnail' => $attributes['showThumbnail'],
        'columns'       => $attributes['columns'],
        'rows'          => $attributes['rows'],
        'infiniteScroll'=> $attributes['infiniteScroll'],
        'blockType'     => $attributes['blockType'],
]);

if ( is_singular() ) {
    $form_action = get_permalink();
} elseif ( is_post_type_archive() ) {
    $obj         = get_queried_object();
    $form_action = ( $obj instanceof WP_Post_Type ) ? get_post_type_archive_link( $obj->name ) : '';
} elseif ( is_tax() || is_category() || is_tag() ) {
    $form_action = get_term_link( get_queried_object() );
} elseif ( is_author() ) {
    $form_action = get_author_posts_url( get_queried_object_id() );
} elseif ( is_home() ) {
    $posts_page  = (int) get_option( 'page_for_posts' );
    $form_action = $posts_page ? get_permalink( $posts_page ) : home_url( '/' );
} else {
    $form_action = home_url( '/' );
}

// Guard against WP_Error / false from the *_link() helpers.
if ( empty( $form_action ) || is_wp_error( $form_action ) ) {
    $form_action = get_permalink() ?: home_url( '/' );
}

?>

<div <?= $id ?>
        class="purdue-home-cta-grid purdue-home-post-grid has-<?= $attributes['background'] ?>-background <?= $attributes['className'] ?>">

    <!-- section class -->
    <div class="<?= implode(' ', $sectionclass) ?>">
        <div class="container">
            <?php
            if ($attributes['header']): ?>
                <div class="purdue-home-cta-grid__intro">
                    <?php
                    if ($attributes['header'] && $attributes['headerStyle'] == "simple"): ?>
                        <h2 class="purdue-home-intro-text__header header-font-united purdue-home-cta-grid__header"><?= $attributes['header'] ?></h2>
                    <?php else: ?>
                        <?php $headerClass = $attributes['background'] == "black" ? " tagged-header--gold" : ""; ?>
                        <div class="columns is-mulitline">
                            <div class="column">
                                <div class="tagged-header-container">
                                    <h2 class="tagged-header<?= $headerClass; ?>"><?= $attributes['header'] ?></h2>
                                </div>
                            </div>
                            <?php
                            if ($attributes["linkURL"] && $attributes["linkText"] && $attributes['blockType'] == "recent"): ?>
                                <?php
                                $target1 = $attributes["external"] ? 'target="_blank"' : 'target="_self"';
                                $buttonClass = $attributes['background'] != "black" ? " purdue-home-button--black" : "";
                                ?>
                                <div class="column is-narrow mobile-hidden">
                                    <a class="purdue-home-button <?= $buttonClass; ?>"
                                       href="<?= $attributes["linkURL"]; ?>"
                                            <?= $target1; ?>><?= trim($attributes["linkText"]); ?></a>
                                </div>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
            <!-- grid container -->
            <form method="GET" action="<?= esc_url( $form_action ); ?>">
                <div class="purdue-home-cta-grid__grid" data-args='<?= esc_attr(wp_json_encode($grid_data_args)); ?>'>
                    <?php
                    if (($attributes['addTaxFilter'] || $attributes['addCatFilter'] || $attributes['addPostTypeFilter'] || $attributes['addYearFilter']) && $attributes['blockType'] == "all") {
                        ?>
                        <div class="purdue-home-cta-grid__grid__filters purdue-home-cta-grid__grid__filters-checkbox">
                            <div class="purdue-home-post-grid__filter">
                                <div id="purdue-home-post-grid__filter-content-<?php echo $rand; ?>"
                                     class="purdue-home-post-grid__filter-content">
                                    <div class="purdue-home-post-grid__filter-fields">
                                        <?php

                                        if ($attributes['addTaxFilter']) {
                                            $taxesFilterNames = $attributes['taxFilterName']; //label for tax in accord
                                            $taxesPanelCollapse = $attributes['taxPanelCollapse']; //Should the accord be open?
                                            $taxesDropDown = $attributes['taxIsDropdown']; // Should this drop a select box
                                            $names = array_column($attributes['filterOrder'], 'slug');

                                            foreach ($taxonomies as $key=> $terms) {

                                                if ($taxesFilterNames && $taxesFilterNames[$key] != "") {
                                                    $label = $taxesFilterNames[$key];
                                                } else {
                                                    $label = get_taxonomy($key)->label;
                                                }

                                                $index = array_search($key, $names);

                                                $collapse = (bool)($taxesPanelCollapse[$key] ?? false);
                                                $dropdown = (bool)($taxesDropDown[$key] ?? false);

                                                if (!empty($terms)) {
                                                    //This is for sorting tax/cats that start with numbers. without this, things will order like so 1, 10, 2, 21, 3, etc.
                                                    usort($terms, function ($a, $b) {
                                                        return (int)$a->name <=> (int)$b->name;
                                                    });
                                                }

                                                ?>
                                                <fieldset style="order: <?php echo $index + 1; ?>">
                                                    <legend class="is-sr-only">Filter by <?= $label; ?></legend>
                                                    <button type="button" class="field-title field-control <?php echo $collapse ? 'collapse' : 'collapse is-open'; ?>"
                                                            aria-disabled="false"
                                                            aria-controls="<?php echo esc_attr($key); ?>-field-<?php echo $rand; ?>"
                                                            aria-expanded="<?php echo $collapse ? 'false' : 'true'; ?>">
                                                        <span>Filter by: </span>
                                                        <?php echo esc_html($label); ?></button>
                                                    <div id="<?php echo esc_attr($key); ?>-field-<?php echo $rand; ?>"
                                                         class="field-content <?= $dropdown ? 'year-month-filter' : ''; ?> ">
                                                        <?php if ($dropdown): ?>
                                                        <?php $lbl = 'id-' . esc_attr(str_replace(' ', '-', strtolower($label))); ?>
                                                        <label class="is-sr-only" for="<?= $lbl; ?>">Filter by: <?= $label; ?></label>
                                                        <select id="<?= $lbl; ?>" name="<?php echo esc_attr($key); ?>"
                                                                class="purdue-home-post-grid__filter-field tax-field"
                                                                data-label="<?= esc_attr($label); ?>">
                                                            <option value="" selected="selected">
                                                                Select <?php echo esc_html($label); ?></option>
                                                            <?php endif; ?>
                                                            <?php foreach ($terms as $term): ?>
                                                                <?php if ($dropdown): ?>
                                                                    <option name=""
                                                                        value="<?php echo esc_attr($term->slug); ?>"
                                                                        <?= (is_array($taxQuery[$key]) && in_array($term->slug, $taxQuery[$key])) ? 'selected' : ''; ?>
                                                                    ><?php echo esc_html($term->name); ?>

                                                                    </option>
                                                                <?php else: ?>
                                                                    <div>
                                                                        <?php $labelid = 'lbl-' . uniqid(); ?>
                                                                        <div class="field-wrap">
                                                                            <input type="checkbox"
                                                                                   id="<?= $labelid; ?>"
                                                                                   class="purdue-home-post-grid__filter-field tax-field"
                                                                                   name="<?php echo esc_attr($key); ?>[]"
                                                                                   value="<?php echo esc_attr($term->slug); ?>"
                                                                                   data-label="<?= esc_attr($label); ?>"
                                                                                    <?= (is_array($taxQuery[$key]) && in_array($term->slug, $taxQuery[$key])) ? 'checked' : ''; ?>
                                                                            />
                                                                            <label class="checkmark"
                                                                                   for="<?= $labelid; ?>"><?php echo esc_html($term->name); ?></label>
                                                                        </div>
                                                                    </div>
                                                                <?php endif; ?>
                                                            <?php endforeach; ?>
                                                            <?php if ($dropdown): ?>
                                                        </select>
                                                    <?php endif; ?>
                                                    </div>
                                                </fieldset>
                                                <?php
                                            }
                                        }
                                        if ($attributes['addCatFilter']) {
                                            $doChecked = true;
                                            if(!isset($_GET['category']) || count($_GET['category']) === count($validCatSlugs)) {
                                                $doChecked = false;
                                            }


                                            $label = $attributes['catFilterName'] ? $attributes['catFilterName'] : "Category";
                                            ?>
                                            <fieldset style="order: <?php echo $index + 1; ?>">
                                                <legend class="is-sr-only">Filter by <?= $label; ?></legend>
                                                <button type="button" class="field-title field-control <?php echo $attributes['catPanelCollapse'] ? 'collapse' : 'collapse is-open'; ?>"
                                                        aria-disabled="false"
                                                        aria-controls="category-field-<?php echo $rand; ?>"
                                                        aria-expanded="<?php echo $attributes['catPanelCollapse'] ? 'false' : 'true'; ?>">
                                                    <span>Filter by: </span>
                                                    <?php echo esc_html($label); ?>
                                                </button>
                                                <div id="category-field-<?php echo $rand; ?>" class="field-content">
                                                    <?php foreach ($categories as $term): ?>
                                                        <?php $labelid = 'lbl-' . uniqid(); ?>
                                                        <div>
                                                            <div class="field-wrap">
                                                                <input type="checkbox"
                                                                       id="<?= $labelid; ?>"
                                                                       class="purdue-home-post-grid__filter-field tax-field"
                                                                       data-label="Category"
                                                                       name="category[]"
                                                                       value="<?php echo esc_attr($term->slug); ?>"
                                                                        <?= (in_array($term->slug, $validCatSlugs) && in_array($term->slug, $_GET['category'] ?? []) && $doChecked) ? 'checked' : ''; ?>
                                                                />

                                                                <label class="checkmark"
                                                                       for="<?= $labelid; ?>"><?php echo esc_html($term->name); ?></label>
                                                            </div>
                                                        </div>
                                                    <?php endforeach; ?>
                                                </div>
                                            </fieldset>
                                            <?php
                                        }
                                        if ($attributes['addPostTypeFilter']) {

                                            $names = array_column($attributes['filterOrder'], 'type');
                                            $index = array_search("postType", $names);

                                            $postTypes = array_values(array_filter($allPostTypes, function ($p) use ($allowedPostTypes) {
                                                return in_array($p->name, $allowedPostTypes);
                                            }));

                                            //By default, don't check anything if they don't have it set in the URL params or if all items are checked.
                                            $doChecked = true;
                                            if(!isset($_GET['custom_post_type']) && count($queryParams['post_type']) === count($allowedPostTypes)) {
                                                $doChecked = false;
                                            }


                                            $postTypes = array_map(fn($type) => ['label' => $type->label, 'name' => $type->name], $postTypes);
                                            //array_unshift($postTypes, ['label' => "Post", 'name' => 'post']);

                                            $label = $attributes['postTypeFilterName'] ? $attributes['postTypeFilterName'] : "Post Types";

                                            ?>
                                            <fieldset style="order: <?php echo $index + 1; ?>">
                                                <legend class="is-sr-only">Filter by <?= $label; ?></legend>
                                                <button type="button" class="field-title field-control <?php echo $attributes['postPanelCollapse'] ? 'collapse' : 'collapse is-open'; ?>"
                                                        aria-disabled="true"
                                                        aria-controls="post-type-field-<?php echo $rand; ?>"
                                                        aria-expanded="<?php echo $attributes['postPanelCollapse'] ? 'false' : 'true'; ?>">
                                                    <span>Filter by: </span>
                                                    <?= $label ?>
                                                </button>
                                                <div id="post-type-field-<?php echo $rand; ?>" class="field-content">
                                                    <?php
                                                    foreach ($postTypes as $term) {
                                                        $labelid = 'lbl-' . uniqid();
                                                        ?>
                                                        <div>
                                                            <div class="field-wrap">
                                                                <input type="checkbox"
                                                                       id="<?= $labelid; ?>"
                                                                       class="purdue-home-post-grid__filter-field postType-field"
                                                                       name="custom_post_type[]"
                                                                       value="<?php echo esc_attr($term['name']); ?>"
                                                                       data-label="<?= $label; ?>"
                                                                        <?= (in_array($term['name'], $queryParams['post_type']) && $doChecked) ? 'checked' : '';  ?>
                                                                />
                                                                <label class="checkmark"
                                                                       for="<?= $labelid; ?>"><?php echo esc_html($term['label']); ?></label>
                                                            </div>
                                                        </div>
                                                        <?php
                                                    }
                                                    ?>
                                                </div>
                                            </fieldset>
                                            <?php
                                        }
                                        ?>
                                        <?php

                                        if ($attributes['addYearFilter']) {

                                            $dateFieldOrder = count($attributes['filterOrder']) + 1;
                                            $publish_months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                                            ?>
                                            <fieldset style="order: <?= $dateFieldOrder; ?>">
                                                <legend class="is-sr-only"><?= $label; ?></legend>
                                                <?php $label = 'Date'; ?>
                                                <button type="button" class="field-title field-control <?php echo $attributes['datePanelCollapse'] ? 'collapse' : 'collapse is-open'; ?>"
                                                        aria-disabled="false"
                                                        aria-controls="year-month-field-<?php echo $rand; ?>"
                                                        aria-expanded="<?php echo $attributes['datePanelCollapse'] ? 'false' : 'true'; ?>">
                                                    <span>Filter by: </span>
                                                    <?= $label; ?>
                                                </button>
                                                <?php $label = 'Year'; ?>
                                                <div id="year-month-field-<?php echo $rand; ?>"
                                                     class="year-month-filter field-content">
                                                    <label for="year-field" class="is-sr-only date-label">Filter
                                                        by <?= $label; ?></label>
                                                    <select id="year-field" name="filter_year"
                                                            class="purdue-home-post-grid__filter-field year-field"
                                                            data-label="<?= $label; ?>">
                                                        <option value="" <?= (!isset($queryArgs['year'])) ? 'selected="selected"' : ''; ?>><?= $label; ?></option>
                                                        <?php
                                                        foreach ($validDates as $year) {
                                                            ?>
                                                            <option value="<?= $year; ?>" <?= (isset($queryArgs['year']) && $queryArgs['year'] == $year) ? 'selected="selected"' : ''; ?>><?= $year; ?></option>

                                                            <?php
                                                        }
                                                        ?>
                                                    </select>
                                                    <?php $label = 'Month'; ?>
                                                    <label for="month-field" class="is-sr-only date-label">Filter
                                                        by <?= $label; ?></label>
                                                    <select id="month-field" name="filter_month"
                                                            class="purdue-home-post-grid__filter-field month-field"
                                                            data-label="<?= $label; ?>">
                                                        <option value="" <?= (!isset($queryArgs['monthnum'])) ? 'selected="selected"' : ''; ?>><?= $label; ?></option>
                                                        <?php
                                                        foreach ($publish_months as $month) {
                                                            $monthnum = date( 'm', strtotime($month));
                                                            ?>
                                                            <option <?= (isset($queryArgs['monthnum']) && $queryArgs['monthnum'] == $monthnum) ? 'selected="selected"' : ''; ?> value="<?= $monthnum ?>"><?= $month; ?></option>

                                                            <?php
                                                        }
                                                        ?>
                                                    </select>
                                                </div>
                                            </fieldset>
                                        <?php } ?>
                                    </div>
                                    <div class="purdue-home-post-grid__filter-button <?= empty($_GET) ? 'hide' : '';?>">
                                        <button type="submit" class="purdue-home-button">Filter</button>
                                        <a class="purdue-home-button purdue-home-button--black form-clear-button"
                                           aria-label="Clear all filters"
                                           href="<?= get_permalink(); ?>"
                                        >
                                            Clear All
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php } ?>
                    <?php
                    if (($attributes['addSearch'] || $attributes['addOrderFilter']) && $attributes['blockType'] == "all") {
                        ?>
                        <div class="purdue-home-cta-grid__grid__filters purdue-home-cta-grid__grid__filters-search">
                            <div class="purdue-home-post-grid__filter purdue-home-post-grid__filter-search">
                                <?php
                                if ($attributes['addSearch']) {
                                    if (isset($_GET['search'])) {
                                        $value = wp_filter_nohtml_kses(sanitize_text_field($_GET['search']));
                                        $value = str_replace("%20", " ", $value);
                                    } else {
                                        $value = "";
                                    }
                                    ?>
                                    <div class="search-box">
                                        <div class="search-form">
                                            <i class="fas fa-search search-icon"></i>
                                            <input type="search" title="search"
                                                   class="search-field purdue-home-post-grid__filter-field"
                                                   placeholder="Search..."
                                                   name="search"
                                                   value="<?php echo esc_attr($value); ?>"
                                                   autocomplete="off"
                                                   role="combobox"
                                                   aria-autocomplete="list"
                                                   aria-expanded="false"
                                                   aria-haspopup="listbox"
                                                   aria-controls="autocomplete-results"
                                            >
                                            <button type="submit" class="search-button">Search
                                            </button>
                                            <button type="button" class="clear-button">
                                                <i class="fa-regular fa-circle-xmark" aria-label="Clear"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <?php
                                }
                                if ($attributes['addOrderFilter']) {
                                    ?>
                                    <fieldset>
                                        <legend class="is-sr-only">Sort by</legend>
                                        <span>Sort by:</span>
                                        <div class="field-wrap radio-field">
                                            <?php $chkboxId = 'radio-' . uniqid(); ?>
                                            <input id="<?= $chkboxId; ?>" type="radio"
                                                   class="purdue-home-post-grid__filter-field order-field" name="order"
                                                   value="DESC" <?= ($queryParams['order'] == "DESC" || !isset($queryParams['order'])) ? 'checked="checked"' : "" ?> />

                                            <label class="checkmark"
                                                   for="<?= $chkboxId; ?>"><?= $attributes['orderBy'] == "date" ? "Newest" : "DESC" ?></label>
                                        </div>
                                        <div class="field-wrap radio-field">
                                            <?php $chkboxId = 'radio-' . uniqid(); ?>
                                            <input id="<?= $chkboxId; ?>" type="radio"
                                                   class="purdue-home-post-grid__filter-field order-field" name="order"
                                                   value="ASC" <?= $queryParams['order'] == "ASC" ? 'checked="checked"' : "" ?> />

                                            <label class="checkmark"
                                                   for="<?= $chkboxId; ?>"><?= $attributes['orderBy'] == "date" ? "Oldest" : "ASC" ?></label>
                                        </div>
                                    </fieldset>
                                    <?php
                                }
                                ?>
                            </div>
                        </div>
                        <?php
                    }


                    ?>

                    <?php if ($attributes['sortAlpha']) {

                        $results = purdue_get_distinct_alpha_filters($queryParams);
                        $letters = range('A', 'Z');

                        echo '<div class="purdue-home-cta-grid__grid__letters filter-letter-links">
                                    <ul>';
                        foreach ($letters as $letter) {
                            if (in_array($letter, $results)) {
                                echo '<li><a class="filter-letter" href="' . esc_url( add_query_arg( 'alpha', $letter ) ) . '">' . $letter . '</a></li>';
                            } else {
                                echo '<li class="filter-letter is-disabled">' . $letter . '</li> ';
                            }
                        }
                        echo '</ul></div>';

                        if($_GET['alpha'] && strlen($_GET['alpha']) === 1) {
                            echo '<input name="alpha" value="'. esc_attr($_GET['alpha']) .'" type="hidden">';
                        }

                    }

                    $query = purdue_post_grid_run_query( $queryParams, $ctx['alpha'] );

                    ?>

                    <div class="purdue-home-cta-grid__grid__filters-right">
                        <div class="columns">
                            <?php if (($attributes['addTaxFilter'] || $attributes['addCatFilter'] || $attributes['addPostTypeFilter'] || $attributes['addYearFilter']) && $attributes['blockType'] == "all") { ?>
                                <div class="purdue-home-cta-grid__grid__filters-selected column is-three-quarters p-0">
                                    <?php
                                        if(isset($_GET['category'])) {
                                            foreach($_GET['category'] as $category) {
                                                $cat = array_values(array_filter(
                                                        $categories,
                                                        fn($c) => $c->slug === $category
                                                ))[0] ?? null;

                                                ?>
                                                <button class="filter-elected-term" value="<?= esc_attr($cat->slug); ?>" data-category="category" aria-label="Clear filter Category - <?= esc_attr($cat->name) ?>">
                                                    <?= $cat->name ?>
                                                </button>

                                                <?php
                                            }
                                        }
                                    foreach ($taxonomies as $taxKey => $taxTerms) {
                                        if (!isset($_GET[$taxKey])) {
                                            continue;
                                        }

                                        // Dropdown selects submit a string; checkboxes submit an array.
                                        // Normalize to an array and drop empty values (the "Select..." option).
                                        $selectedSlugs = array_filter((array) $_GET[$taxKey], function ($slug) {
                                            return $slug !== '';
                                        });

                                        if (empty($selectedSlugs)) {
                                            continue;
                                        }

                                        $taxLabel = get_taxonomy($taxKey)->label;
                                        foreach ($selectedSlugs as $termSlug) {
                                            $term = array_values(array_filter(
                                                    $taxTerms,
                                                    fn($t) => $t->slug === $termSlug
                                            ))[0] ?? null;
                                            if (!$term) {
                                                continue;
                                            }
                                            ?>
                                            <button class="filter-elected-term" value="<?= esc_attr($term->slug); ?>" data-category="<?= esc_attr($taxKey); ?>" aria-label="Clear filter <?= esc_attr($taxLabel); ?> - <?= esc_attr($term->name); ?>">
                                                <?= $term->name ?>
                                            </button>
                                            <?php
                                        }
                                    }

                                    if (isset($_GET['custom_post_type']) && is_array($_GET['custom_post_type'])) {
                                        foreach ($_GET['custom_post_type'] as $ptName) {
                                            $pt = array_values(array_filter(
                                                    $allPostTypes,
                                                    fn($p) => $p->name === $ptName
                                            ))[0] ?? null;
                                            if (!$pt) {
                                                continue;
                                            }
                                            ?>
                                            <button class="filter-elected-term" value="<?= esc_attr($pt->name); ?>" data-category="custom_post_type" aria-label="Clear filter Post Type - <?= esc_attr($pt->label); ?>">
                                                <?= $pt->label ?>
                                            </button>
                                            <?php
                                        }
                                    }

                                    if (isset($_GET['alpha']) && strlen($_GET['alpha']) === 1) {
                                        $alphaLetter = strtoupper(sanitize_text_field($_GET['alpha']));
                                        ?>
                                        <button class="filter-elected-term" value="<?= esc_attr($alphaLetter); ?>" data-category="alpha" aria-label="Clear filter Starts with - <?= esc_attr($alphaLetter); ?>">
                                            <?= $alphaLetter ?>
                                        </button>
                                        <?php
                                    }

                                    if (isset($_GET['filter_year']) && $_GET['filter_year'] !== '') {
                                        $filterYear = (int) $_GET['filter_year'];
                                        ?>
                                        <button class="filter-elected-term" value="<?= esc_attr($filterYear); ?>" data-category="filter_year" aria-label="Clear filter Year - <?= esc_attr($filterYear); ?>">
                                            <?= $filterYear ?>
                                        </button>
                                        <?php
                                    }

                                    if (isset($_GET['filter_month']) && $_GET['filter_month'] !== '') {
                                        $monthNum = (int) $_GET['filter_month'];
                                        if ($monthNum >= 1 && $monthNum <= 12) {
                                            $monthName = date('F', mktime(0, 0, 0, $monthNum, 1));
                                            ?>
                                            <button class="filter-elected-term" value="<?= esc_attr($_GET['filter_month']); ?>" data-category="filter_month" aria-label="Clear filter Month - <?= esc_attr($monthName); ?>">
                                                <?= $monthName ?>
                                            </button>
                                            <?php
                                        }
                                    }


                                    ?>
                                </div>
                            <?php } ?>

                            <?php $total = $query->found_posts; ?>
                            <?php if ($attributes['addPostTotal']): ?>
                                <div class="purdue-home-cta-grid__grid__total column is-one-quarter" role="status">Showing
                                    <span class="post-total"><?= $total; ?></span> <?= $attributes['postTotalType']; ?>
                                </div>
                            <?php endif; ?>
                        </div>
                        <p class="purdue-home-cta-grid__message <?= ($total > 0) ? 'hide' : '' ?>"><?= $attributes['resultsMessage'] ? $attributes['resultsMessage'] : 'No results found!' ?></p>
                    </div>
                    <div class="purdue-home-cta-grid__grid__content">
                        <div class="purdue-home-cta-grid__cards <?php echo $attributes['cardType'] == "directory" ? "purdue-home-cta-grid__cards--directory" : ""; ?>">
                            <div class="columns is-multiline">
                                <?php
                                if ($query->have_posts()) {
                                    while ($query->have_posts()) {
                                        $query->the_post();
                                        $postIds[] = get_the_ID();
                                        if ($attributes['columns'] == "3") {
                                            require __DIR__ . '/inc/story-grid.php';
                                        } elseif ($attributes['columns'] == "2") {
                                            require __DIR__ . '/inc/story-grid-two-column.php';
                                        } else {
                                            require __DIR__ . '/inc/story-grid-2.php';
                                        }
                                    }
                                    wp_reset_postdata();
                                }
                                ?>
                            </div>
                        </div>


                        <?php
                        if ($attributes['infiniteScroll']) {

                            if ($total <= $queryParams['posts_per_page']) {
                                $hideButton = "hide";
                            } else {
                                $hideButton = "";
                            }

                            echo '<div class="container">
                                        <div class="section is-flex is-justify-content-center">
                                            <button class="load purdue-home-button purdue-home-button--white ' . $hideButton . '">Load More</button>                                        
                                                                               
                                        </div>
                                    </div>';
                        }

                        if ($attributes['blockType'] == "all" && !$attributes['infiniteScroll']) {
                            ?>
                            <nav class="pagination purdue-home-pagination">
                                <h2 class="screen-reader-text">Posts navigation</h2>
                                <div class="nav-links">
                                    <?php

                                    $big = 999999999; // need an unlikely integer

                                    echo paginate_links(
                                            array(
                                                    'format' => '?paged=%#%',
                                                    'current' => $queryParams['paged'],
                                                    'prev_text' => __('Prev', 'textdomain'),
                                                    'next_text' => __('Next', 'textdomain'),
                                                    'total' => $query->max_num_pages,
                                            )
                                    );
                                    ?>
                                </div>
                            </nav>
                            <?php
                        } else {
                            if ($attributes["linkURL"] && $attributes["linkText"]) {
                                ?>
                                <div class="purdue-home-button-storylink <?php echo($attributes['headerStyle'] != "simple" ? " mobile-show" : ""); ?>">
                                    <a class=" purdue-home-button purdue-home-button--storylink <?= $buttonClass; ?>"
                                       href="<?= $attributes["linkURL"]; ?>"
                                            <?= $target1; ?>><?= trim($attributes["linkText"]); ?></a>
                                </div>
                                <?php
                            }
                        }
                        ?>
                    </div>
                </div>
            </form>
            <!-- end of grid container -->
        </div>
        <!-- end of container -->
    </div>
    <!-- end of section -->
</div>