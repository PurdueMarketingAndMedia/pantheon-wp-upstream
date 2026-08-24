<?php

if (!function_exists('purdue_get_distinct_alpha_filters')) {
    /**
     * Return the distinct uppercase first letters of post titles matching $args.
     *
     * Reads post_status, post_type, meta_key and tax_query out of a WP_Query-style
     * args array and builds a single prepared $wpdb query. tax_query is treated as
     * relation AND — each clause becomes an (NOT) EXISTS subquery.
     *
     * @param array $args WP_Query-style args (the same array passed to the grid).
     * @return string[] Sorted distinct letters, e.g. ['A', 'C', 'D', ...].
     */
    function purdue_get_distinct_alpha_filters(array $args) {
        global $wpdb;

        // 2. Intercept SELECT and ORDER BY right before the database compile step
        $fields_callback = function($fields) use ($wpdb) {
            return "DISTINCT UPPER(LEFT({$wpdb->posts}.post_title, 1)) AS letter";
        };

        $orderby_callback = function($orderby) {
            return "1 ASC";
        };

        return purdueQueryHijack($args, $fields_callback, $orderby_callback);
    }
}

if (!function_exists('purdueQueryHijack')) {
    function purdueQueryHijack(array $args, $fieldsCallback, $orderCallback) {
        global $wpdb;

        $args['posts_per_page']         = -1;
        $args['nopaging']               = true;
        $args['no_found_rows']          = true; // Discards the costly SQL_CALC_FOUND_ROWS
        $args['update_post_meta_cache'] = false;
        $args['update_post_term_cache'] = false;

        add_filter('posts_fields', $fieldsCallback);
        add_filter('posts_orderby', $orderCallback);

        $query = new WP_Query();
        $query->parse_query($args);
        $query->get_posts(); // Compiles the full query structure into $query->request

        // 4. Detach filters immediately to avoid bleeding into other loops
        remove_filter('posts_fields', $fieldsCallback);
        remove_filter('posts_orderby', $orderCallback);

        if (empty($query->request)) {
            return [];
        }

        return $wpdb->get_col($query->request);
    }
}


if (!function_exists('purdue_get_distinct_year_filters')) {
    /**
     * Return the distinct publication years of posts matching $args.
     *
     * Reads post_status, post_type, meta_key and tax_query out of a WP_Query-style
     * args array and builds a single prepared $wpdb query.
     *
     * @param array $args WP_Query-style args (the same array passed to the grid).
     * @return int[] Sorted distinct years in descending order, e.g. [2026, 2025, 2024, ...].
     */
    function purdue_get_distinct_year_filters(array $args) {
        global $wpdb;
        $fields_callback = function($fields) use ($wpdb) {
            // Extracts only the 4-digit year from the post date string
            return "DISTINCT YEAR({$wpdb->posts}.post_date) AS post_year";
        };
        $orderby_callback = function($orderby) {
            return "1 DESC";
        };

        return array_map('intval', purdueQueryHijack($args, $fields_callback, $orderby_callback));
    }
}

if (!function_exists('purdue_query_by_first_letter')) {
    function purdue_query_by_first_letter($letter, array $args = [])
    {
        $letter = substr((string)$letter, 0, 1); // guard against more than one char

        $filter = function ($where) use ($letter) {
            global $wpdb;
            return $where . $wpdb->prepare(
                    " AND {$wpdb->posts}.post_title LIKE %s",
                    $wpdb->esc_like($letter) . '%'
                );
        };

        add_filter('posts_where', $filter);
        $query = new WP_Query($args);
        remove_filter('posts_where', $filter);

        return $query;
    }
}

/* -------------------------------------------------------------------------
 * Shared Post Grid query builder
 *
 * One place that turns block $attributes + a normalized $filters array into:
 *   - 'args'    : a ready-to-run WP_Query argument array, and
 *   - 'context' : the resolved data the filter UI needs (taxonomies,
 *                 categories, post types, valid years, etc).
 *
 * render.php and the REST endpoint (rest.php) both feed this builder through
 * a small adapter so the query is constructed identically in both places.
 * ---------------------------------------------------------------------- */

if (!function_exists('purdue_post_grid_default_filters')) {
    /**
     * Canonical shape of the "active visitor selections" array.
     *
     * @return array
     */
    function purdue_post_grid_default_filters() {
        return [
            'post_types'     => [],   // array of post-type slugs the visitor chose
            'categories'     => [],   // array of category slugs
            'taxes'          => [],   // [ taxonomy_slug => [term_slug, ...] ]
            'year'           => '',   // int-ish or ''
            'month'          => '',   // 1-12 or ''
            'order'          => '',   // 'ASC' | 'DESC' | ''
            'search'         => '',   // free-text search
            'alpha'          => '',   // single A-Z letter
            'paged'          => 1,
            'posts_per_page' => null, // null => derive from $attributes
            'autocomplete'   => false,
        ];
    }
}

if (!function_exists('purdue_build_post_grid_query')) {
    /**
     * Build the WP_Query args + filter-section context for the post grid.
     *
     * @param array $attributes Block attributes (the same array render.php receives).
     * @param array $filters    Normalized visitor selections (see default filters).
     * @return array{args: array, context: array}
     */
    function purdue_build_post_grid_query(array $attributes, array $filters = []) {
        $filters = array_merge(purdue_post_grid_default_filters(), $filters);

        // Attribute defaults so missing keys never throw notices.
        $a = wp_parse_args($attributes, [
            'blockType'           => 'all',
            'postsPerPage'        => '',
            'columns'             => '3',
            'rows'                => '4',
            'orderBy'             => 'date',
            'queryName'           => '',
            'selectedPostType'    => [],
            'excludeCat'          => [],
            'hasSelectedCatTerms' => false,
            'addCatFilter'        => false,
            'selectedCatTerms'    => [],
            'hasSelectedTax'      => false,
            'addTaxFilter'        => false,
            'selectedTaxTerms'    => [],
            'selectedTaxFilters'  => [],
            'addPostTypeFilter'   => false,
            'addYearFilter'       => false,
            'addSearch'           => false,
        ]);

        $queryArgsDefault = [
            'posts_per_page' => 16,
            'paged'          => max(1, (int) $filters['paged']),
            'orderby'        => 'date',
            'order'          => 'DESC',
            'post_status'    => 'publish',
            'tax_query'      => ['relation' => 'AND'],
            'post_type'      => ['post'],
        ];

        $queryArgs      = [];
        $taxonomies     = [];
        $taxQuery       = [];
        $categories     = [];
        $validCatSlugs  = [];
        $excluded_terms = [];
        $validDates     = [];

// ---- posts per page ----
        if ($filters['posts_per_page'] !== null && $filters['posts_per_page'] !== '') {
            // Explicit request value (REST replay). Infinite scroll restores
            // /page/N by requesting page 1 with N * per_page posts, and
            // autocomplete uses 20, so this must NOT be capped at the block's
            // 16 — just keep it within a sane ceiling.
            $queryArgs['posts_per_page'] = max(1, min(200, (int) $filters['posts_per_page']));
        } elseif ($a['blockType'] === 'recent' && $a['postsPerPage']) {
            $queryArgs['posts_per_page'] = max(1, min(16, (int) $a['postsPerPage']));
        } else {
            // Derive from grid dimensions for any column count (2, 3, 4, ...).
            $multi = $a['rows'] ? (int) $a['rows'] : 4;
            $cols  = max(1, (int) $a['columns']);
            $queryArgs['posts_per_page'] = max(1, min(16, $cols * $multi));
        }


        // ---- sort defined by the block ----
        if ($a['orderBy'] === 'meta') {
            $queryArgs['order']    = 'ASC';
            $queryArgs['meta_key'] = 'meta_for_sorting';
            $queryArgs['orderby']  = 'meta_value';
        } elseif ($a['orderBy'] === 'title') {
            $queryArgs['order']    = 'ASC';
            $queryArgs['meta_key'] = '';
            $queryArgs['orderby']  = 'title';
        }

        // pre_get_posts flag (e.g. a registered query var)
        if ($a['queryName'] !== '') {
            $queryArgs[$a['queryName']] = true;
        }

        // ---- post types ----
        // UI label list keeps the original behavior (public, non built-in).
        $allPostTypes = get_post_types(['public' => true, '_builtin' => false], 'objects');
        $allPostTypes['post'] = get_post_type_object('post');

        // Validation set includes built-ins so an explicitly selected 'post' still works.
        $publicTypeNames = get_post_types(['public' => true]);

        $selected = (array) $a['selectedPostType'];
        $allowedPostTypes = array_values(array_filter($selected, function ($type) use ($publicTypeNames) {
            return is_string($type) && isset($publicTypeNames[$type]);
        }));

        $queryArgs['post_type'] = $allowedPostTypes;

        // Visitor post-type filter, constrained to the block's allowed set.
        if ($a['addPostTypeFilter'] && !empty($filters['post_types'])) {
            $matched = array_values(array_intersect((array) $filters['post_types'], $allowedPostTypes));
            if (!empty($matched)) {
                $queryArgs['post_type'] = $matched;
            }
        }

        // ---- excluded categories (term IDs) ----
        if (!empty($a['excludeCat'])) {
            $excluded_terms = get_terms([
                'taxonomy' => 'category',
                'slug'     => $a['excludeCat'],
                'fields'   => 'ids',
            ]);
            if (is_wp_error($excluded_terms)) {
                $excluded_terms = [];
            }
        }

        // ---- categories ----
        // ---- categories ----
        // ---- categories ----
        if ($a['hasSelectedCatTerms'] || $a['addCatFilter']) {
            $catArgs = ['taxonomy' => 'category', 'hide_empty' => false];
            if (count((array) $a['selectedCatTerms'])) {
                $catArgs['slug'] = array_unique((array) $a['selectedCatTerms']);
            }

            if (!empty($excluded_terms)) {
                $catArgs['exclude'] = $excluded_terms;
            }

            $categories = get_terms($catArgs);
            if (is_wp_error($categories)) {
                $categories = [];
            }

            // $validCatSlugs is the full pool of selectable categories (used by the
            // filter UI). It is intentionally NOT narrowed to the visitor's pick.
            $validCatSlugs = array_map(fn($t) => $t->slug, $categories);

            // Compute the slugs to actually constrain the query by, kept separate
            // from the UI pool above (mirrors how the tax block handles this).
            if (!empty($filters['categories']) && $a['addCatFilter']) {
                // Visitor picked categories → their picks, limited to the valid pool.
                $catQuerySlugs = array_values(array_intersect((array) $filters['categories'], $validCatSlugs));
            } elseif (count($a['selectedCatTerms'])) {
                // No visitor pick, but the author restricted the set → use that set.
                $catQuerySlugs = $validCatSlugs;
            } else {
                // Open filter, nothing picked → no category constraint.
                $catQuerySlugs = [];
            }

            if (!empty($catQuerySlugs)) {
                $queryArgs['tax_query'][] = [
                    'taxonomy' => 'category',
                    'field'    => 'slug',
                    'terms'    => $catQuerySlugs,
                ];
            }
        }

        // ---- other taxonomies ----
        // Derive the flag from the data: some serialized blocks (older editor
        // saves) have selectedTaxTerms without hasSelectedTax, which silently
        // dropped the block author's tax restrictions.
        $hasSelectedTax = $a['hasSelectedTax'] || !empty($a['selectedTaxTerms']);


        if ($hasSelectedTax || $a['addTaxFilter']) {

            $tempTaxes = [];

            // Pre-filter "tax::term" pairs defined on the block.
            foreach ((array) $a['selectedTaxTerms'] as $selectedTaxTerm) {
                $taxTerm = explode('::', str_replace(' ', '', $selectedTaxTerm));
                if (count($taxTerm) === 2) {
                    $tempTaxes[$taxTerm[0]][] = $taxTerm[1];
                }
            }


            // Validate the pre-filtered terms actually exist.
            $taxClauses = []; // [ taxonomy => [term_slug, ...] ]
            foreach ($tempTaxes as $tax => $terms) {
                $taxonomy = get_terms([
                    'taxonomy'   => $tax,
                    'slug'       => array_unique($terms),
                    'hide_empty' => false,
                ]);
                if (!is_wp_error($taxonomy) && !empty($taxonomy)) {
                    $taxonomies[$tax] = $taxonomy;
                    $taxClauses[$tax] = array_values(array_unique($terms));
                }
            }


            // For each enabled tax filter, gather options + the visitor's choices.
            if ($a['addTaxFilter']) {

                foreach ((array) $a['selectedTaxFilters'] as $tax) {
                    if (empty($taxonomies[$tax])) {
                        $taxonomy = get_terms(['taxonomy' => $tax, 'hide_empty' => false]);
                        if (!is_wp_error($taxonomy)) {
                            $taxonomies[$tax] = $taxonomy;
                        }
                    }

                    if (!empty($filters['taxes'][$tax])) {
                        $allowedSlugs   = array_map(fn($x) => $x->slug, $taxonomies[$tax] ?? []);
                        $taxQuery[$tax] = array_values(array_intersect((array) $filters['taxes'][$tax], $allowedSlugs));
                    }
                }
            }

            foreach ($taxQuery as $key => $terms) {
                if (!empty($terms)) {
                    $taxClauses[$key] = array_values(array_unique($terms));
                }
            }

            foreach ($taxClauses as $tax => $terms) {
                $queryArgs['tax_query'][] = [
                    'taxonomy' => $tax,
                    'field'    => 'slug',
                    'terms'    => $terms,
                ];
            }
        }

        // ---- exclude categories from results ----
        if (!empty($excluded_terms)) {
            $queryArgs['tax_query'][] = [
                'taxonomy' => 'category',
                'field'    => 'term_id',
                'terms'    => $excluded_terms,
                'operator' => 'NOT IN',
            ];
        }

        // ---- visitor sort order ----
        if (!empty($filters['order'])) {
            $queryArgs['order'] = strtoupper(trim($filters['order'])) === 'ASC' ? 'ASC' : 'DESC';
        }

        // ---- search (the piece render.php was missing) ----
        $search = trim((string) $filters['search']);
        if ($search !== '' && !$filters['autocomplete']) {
            $queryArgs['s']       = $search;
            $queryArgs['orderby'] = 'relevance';
        }

        // ---- valid years (for the date filter UI) ----
        if ($a['addYearFilter']) {
            $validDates = purdue_get_distinct_year_filters(array_merge($queryArgsDefault, $queryArgs));
            if (!$validDates) {
                $validDates = [(int) date('Y')];
            }
        }

        // Apply year / month whenever provided (independent of the UI flag).
        $month = (int) $filters['month'];
        if ($month >= 1 && $month <= 12) {
            $queryArgs['monthnum'] = $month;
        }
        $year = (int) $filters['year'];
        if ($year >= 1986 && $year <= (int) date('Y')) {
            $queryArgs['year'] = $year;
        }

        $queryParams = array_merge($queryArgsDefault, $queryArgs);

        return [
            'args'    => $queryParams,
            'context' => [
                'queryArgs'        => $queryArgs,     // pre-merge, for isset() year/monthnum checks
                'allPostTypes'     => $allPostTypes,
                'allowedPostTypes' => $allowedPostTypes,
                'taxonomies'       => $taxonomies,
                'taxQuery'         => $taxQuery,
                'categories'       => $categories,
                'validCatSlugs'    => $validCatSlugs,
                'excluded_terms'   => $excluded_terms,
                'validDates'       => $validDates,
                'search'           => $search,
                'alpha'            => (string) $filters['alpha'],
            ],
        ];
    }
}

if (!function_exists('purdue_post_grid_get_filters')) {
    /**
     * Adapter: read the active visitor selections out of $_GET (render.php path).
     *
     * @param array $attributes Block attributes (used to know which filters are enabled).
     * @return array Normalized filters array.
     */
    function purdue_post_grid_get_filters(array $attributes) {
        $a = wp_parse_args($attributes, [
            'addPostTypeFilter'  => false,
            'addCatFilter'       => false,
            'addTaxFilter'       => false,
            'addYearFilter'      => false,
            'addSearch'          => false,
            'selectedTaxFilters' => [],
        ]);

        $filters          = purdue_post_grid_default_filters();
        $filters['paged'] = max(1, (int) get_query_var('paged'));

        if ($a['addPostTypeFilter'] && isset($_GET['custom_post_type'])) {
            $val = $_GET['custom_post_type'];
            $filters['post_types'] = is_array($val) ? $val : explode(',', strtolower($val));
        }

        if ($a['addCatFilter'] && isset($_GET['category'])) {
            $val = $_GET['category'];
            $filters['categories'] = is_array($val) ? $val : explode(',', strtolower($val));
        }

        if ($a['addTaxFilter']) {
            foreach ((array) $a['selectedTaxFilters'] as $tax) {
                if (isset($_GET[$tax])) {
                    $val = $_GET[$tax];
                    $filters['taxes'][$tax] = is_array($val) ? $val : explode(',', $val);
                }
            }
        }

        if ($a['addYearFilter']) {
            $filters['year']  = $_GET['year-field']  ?? $_GET['filter_year']  ?? '';
            $filters['month'] = $_GET['month-field'] ?? $_GET['filter_month'] ?? '';
        }

        if (isset($_GET['order'])) {
            $filters['order'] = $_GET['order'];
        }

        if ($a['addSearch'] && isset($_GET['search'])) {
            $filters['search'] = str_replace('%20', ' ', wp_filter_nohtml_kses(sanitize_text_field($_GET['search'])));
        }

        if (isset($_GET['alpha'])) {
            $filters['alpha'] = substr((string) $_GET['alpha'], 0, 1);
        }

        return $filters;
    }
}

if (!function_exists('purdue_post_grid_request_filters')) {
    /**
     * Adapter: read the active selections out of a REST request (rest.php path)
     * and reconstruct the minimal $attributes the builder needs. The incoming
     * tax_query / post_type / excludeCat are treated as the allowed set, so the
     * builder's validation passes them through unchanged.
     *
     * @param WP_REST_Request|array $request    Incoming REST request.
     * @param array                 $attributes Will be populated by reference.
     * @return array Normalized filters array.
     */
    function purdue_post_grid_request_filters($request, array &$attributes) {
        $filters = purdue_post_grid_default_filters();

        $post_type  = (isset($request['post_type']) && is_array($request['post_type']) && count($request['post_type']))
            ? $request['post_type'] : [];
        $excludeCat = !empty($request['excludeCat']) ? (array) $request['excludeCat'] : [];

        // Split the incoming tax_query into category vs. other taxonomy selections.
        $catSelections      = [];
        $taxSelections      = []; // [ taxonomy => [slug, ...] ]
        $selectedTaxFilters = [];

        if (!empty($request['tax_query']) && is_array($request['tax_query'])) {
            foreach ($request['tax_query'] as $clause) {
                if (empty($clause['taxonomy']) || empty($clause['terms'])) {
                    continue;
                }
                $tax   = $clause['taxonomy'];
                $terms = (array) $clause['terms'];

                if ($tax === 'category') {
                    $catSelections = array_merge($catSelections, $terms);
                } else {
                    $taxSelections[$tax]  = array_merge($taxSelections[$tax] ?? [], $terms);
                    $selectedTaxFilters[] = $tax;
                }
            }
        }

        // Rebuild "tax::term" pairs so the builder accepts them as valid options.
        $selectedTaxTerms = [];
        foreach ($taxSelections as $tax => $terms) {
            foreach ($terms as $t) {
                $selectedTaxTerms[] = $tax . '::' . $t;
            }
        }

        $obMap = [
            'meta'       => 'meta',
            'meta_value' => 'meta',
            'title'      => 'title',
        ];
        $ob = $obMap[$request['orderby'] ?? ''] ?? 'date';

        $attributes = array_merge((array) $attributes, [
            'blockType'           => 'all',
            'selectedPostType'    => $post_type,
            'addPostTypeFilter'   => true,
            'excludeCat'          => $excludeCat,
            'hasSelectedCatTerms' => !empty($catSelections),
            'addCatFilter'        => !empty($catSelections),
            'selectedCatTerms'    => $catSelections,
            'hasSelectedTax'      => !empty($taxSelections),
            'addTaxFilter'        => !empty($taxSelections),
            'selectedTaxFilters'  => array_values(array_unique($selectedTaxFilters)),
            'selectedTaxTerms'    => $selectedTaxTerms,
            'addYearFilter'       => false, // no UI to build on the REST path
            'addSearch'           => true,
            'orderBy'             => $ob,
        ]);

        $filters['post_types']     = $post_type;
        $filters['categories']     = $catSelections;
        $filters['taxes']          = $taxSelections;
        $filters['year']           = isset($request['year']) && $request['year'] ? $request['year'] : '';
        $filters['month']          = !empty($request['month']) ? (int) date('m', strtotime($request['month'])) : '';
        $filters['order']          = isset($request['order']) && $request['order'] ? $request['order'] : '';
        $filters['search']         = isset($request['search']) ? sanitize_text_field($request['search']) : '';
        $filters['alpha']          = isset($request['alpha']) && $request['alpha'] ? substr((string) $request['alpha'], 0, 1) : '';
        $filters['paged']          = !empty($request['paged']) ? (int) $request['paged'] : 1;
        $filters['autocomplete']   = !empty($request['autocomplete']);
        $filters['posts_per_page'] = $filters['autocomplete']
            ? 20
            : (!empty($request['posts_per_page']) ? (int) $request['posts_per_page'] : 12);

        return $filters;
    }
}

if (!function_exists('purdue_post_grid_run_query')) {
    /**
     * Run the grid query, applying the alpha (first-letter) filter when present.
     *
     * @param array  $args  WP_Query args from purdue_build_post_grid_query().
     * @param string $alpha Optional single starting letter.
     * @return WP_Query
     */
    function purdue_post_grid_run_query(array $args, $alpha = '') {
        $alpha = (string) $alpha;
        if ($alpha !== '') {
            return purdue_query_by_first_letter($alpha, $args);
        }
        return new WP_Query($args);
    }
}

if (!function_exists('purdue_post_grid_hidden_fields')) {
    /**
     * Echo hidden <input>s mirroring the current $_GET state so that separate
     * no-JS <form>s (search form, filter form) preserve each other's selections.
     *
     * @param array $only   If non-empty, only emit these top-level keys.
     * @param array $except Keys to skip (ignored when $only is provided).
     */
    function purdue_post_grid_hidden_fields(array $only = [], array $except = []) {
        $emit = function ($name, $value) use (&$emit) {
            if (is_array($value)) {
                foreach ($value as $v) {
                    $emit($name . '[]', $v);
                }
                return;
            }
            printf(
                '<input type="hidden" name="%s" value="%s" />',
                esc_attr($name),
                esc_attr($value)
            );
        };

        foreach ($_GET as $key => $value) {
            if (!empty($only)) {
                if (!in_array($key, $only, true)) {
                    continue;
                }
            } elseif (in_array($key, $except, true)) {
                continue;
            }
            $emit($key, wp_unslash($value));
        }
    }
}