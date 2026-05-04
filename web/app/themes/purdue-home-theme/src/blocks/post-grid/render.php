<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
$rand=rand();
global $post; //phpcs:ignore.
$post_id = get_the_ID();

$cached_ids = null;
$currentPage = null;

?>

<div <?= $id ?>
    class="purdue-home-cta-grid purdue-home-post-grid has-<?= $attributes['background'] ?>-background <?= $attributes['className'] ?>">
    <?php
    $sectionclass = 'section';
    if ($attributes['paddingTop']) {
        $sectionclass .= ' ' . $attributes['paddingTop'];
    }
    if ($attributes['paddingBottom']) {
        $sectionclass .= ' ' . $attributes['paddingBottom'];
    }  
    if($attributes['blockType'] == "recent")  {
        $paged = 1;
        if($attributes['postsPerPage'] == "9"){
            $posts_per_page=9;
        }elseif($attributes['postsPerPage'] == "6"){
            $posts_per_page=6;
        }else{
            $posts_per_page=3;
        }
        
    }else{
        if($attributes['columns'] == "3"){
            if($attributes['rows'] == "4"){
                $posts_per_page=12;
            }elseif($attributes['rows'] == "5"){
                $posts_per_page=15;
            }elseif($attributes['rows'] == "6"){
                $posts_per_page=18;
            }else{
                $posts_per_page=12;
            }
            
        }else{
            $posts_per_page=16; 
        }
        $paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
    }         
    if($attributes['orderBy'] == "meta")  {
        $orderBy="meta_value";
        $metaKey="meta_for_sorting";
        $order = 'ASC';
    }elseif($attributes['orderBy'] == "title"){
        $orderBy="title";
        $metaKey="";
        $order = 'ASC';
    }else{
        $orderBy="date";
        $metaKey="";
        $order = 'DESC';
    }

    $args = array(
        'posts_per_page' => $posts_per_page,
        'paged' => $paged,
        'meta_key' => $metaKey,
        'orderby' => $orderBy,
        'order'   => $order,
        'post_status' => 'publish',
    );
    $args['use_tag'] = $attributes['selectedTax'];
    $args['button_text'] = $attributes['buttonText'];
    $args['postType_tag'] = $attributes['postTypeTag'];
    $args['cardType'] = $attributes['cardType'];
    $args['showExcerpt'] = $attributes['showExcerpt'];
    $args['showDate'] = $attributes['showDate'];
    $args['showThumbnail'] = $attributes['showThumbnail'];
    $args['columns'] = $attributes['columns'];
    $args['rows'] = $attributes['rows'];
    $args['excludeCat'] = $attributes['excludeCat'];
    $args['infiniteScroll'] = $attributes['infiniteScroll'];
    $args['addAutoComplete'] = $attributes['addAutoComplete'];

    if($attributes['queryName'] != ""){
        $args[$attributes['queryName']] = true;
    }


    if($attributes['hasSelectedPostType'] && sizeof($attributes['selectedPostType'])>0){
        $args['post_type'] = $attributes['selectedPostType'];
    }else{
        $ptargs = array(
            'public'   => true,
            '_builtin' => false,
         );
        $allPostTypes=get_post_types( $ptargs, 'names' );
        foreach ( $allPostTypes  as $post_type ) {
            $args['post_type'][] = $post_type; 
         }           
        $args['post_type'][]="post";
    }
    $args['tax_query'] = [
        'relation' => 'AND'
    ];
   
    if($attributes['hasSelectedCatTerms'] && sizeof($attributes['selectedCatTerms'])>0){
        $cat = array(
                'taxonomy' => 'category',
                'field' => 'slug',
                'terms' => $attributes['selectedCatTerms'],
        );
        array_push($args['tax_query'], $cat);
    }
    if($attributes['hasSelectedTax'] && sizeof($attributes['selectedTaxTerms'])>0){
        $taxTerms=[];
        $taxes=[];
        foreach($attributes['selectedTaxTerms'] as $selectedTaxTerm){
            $taxTerm=explode( '::', str_replace( ' ', '', $selectedTaxTerm ) );
            $taxTerms[]=$taxTerm;
            $taxes[]=$taxTerm[0];
        }
        $taxes=array_unique($taxes);
        
        foreach($taxes as $taxo){
            $taxTermTemp=[];
            foreach($taxTerms as $taxTerm){
                if($taxTerm[0]==$taxo){
                    $taxTermTemp[]=$taxTerm[1];
                }
            }
            $tax_query = array(
                    'taxonomy' => $taxo,
                    'field' => 'slug',
                    'terms' => $taxTermTemp,
              );
            array_push($args['tax_query'], $tax_query);

        }
    }

    ?>
    <!-- section class -->
    <div class="<?= $sectionclass ?>">
        <div class="container">
            <?php
            if ($attributes['header']) {
            ?>
            <div class="purdue-home-cta-grid__intro">
                <?php
                    if ($attributes['header'] && $attributes['headerStyle'] == "simple") {
                    ?>
                <h2 class="purdue-home-intro-text__header header-font-united purdue-home-cta-grid__header">
                    <?= $attributes['header'] ?></h2>
                <?php
                    }else{
                        $headerClass=$attributes['background']=="black"?" tagged-header--gold":"";

                ?>
                <div class="columns is-mulitline">
                    <div class="column">
                        <div class="tagged-header-container">
                            <h2 class="tagged-header<?= $headerClass; ?>"><?= $attributes['header'] ?></h2>
                        </div>
                    </div>
                    <?php
                            if($attributes["linkURL"] && $attributes["linkText"] && $attributes['blockType']=="recent"){
                                $target1 = $attributes["external"] ? 'target="_blank"' : 'target="_self"';
                                $buttonClass=$attributes['background']!="black"?" purdue-home-button--black":"";
                            ?>
                    <div class="column is-narrow mobile-hidden">
                        <a class="purdue-home-button <?= $buttonClass;?>" href="<?= $attributes["linkURL"]; ?>"
                            <?= $target1; ?>><?= trim($attributes["linkText"]); ?></a>
                    </div>
                    <?php
                            }
                    ?>
                </div>
                <?php
                    }
                ?>
            </div>
            <?php
                }
            ?>
            <!-- grid container -->
            <div class="purdue-home-cta-grid__grid" data-args='<?php echo wp_json_encode($args); ?>'>

            <?php
                if ($attributes['excludeCat']) {

                    
                    $excludeCat = $attributes['excludeCat'];

                    $terms = [];

                    foreach( $excludeCat as $exclude){
                        $exclude =  get_term_by('slug', $exclude, 'category');
                        array_push($terms, $exclude->term_id);
                    }

                    if ($terms) {
                        $exclude = array(
                            'taxonomy' => 'category',
                            'field' => 'term_id',
                            'terms' => $terms, 
                            'operator' => 'NOT IN',
                        );
                        
                        $args['tax_query'][] = $exclude; // Append $exclude to the tax_query array
                    }
                }            


            if (($attributes['addTaxFilter']||$attributes['addCatFilter']||$attributes['addPostTypeFilter'] || $attributes['addYearFilter']) && $attributes['blockType']=="all") {
            ?>
                <div class="purdue-home-cta-grid__grid__filters purdue-home-cta-grid__grid__filters-checkbox">
                    <form class="purdue-home-post-grid__filter" onSubmit="return false;">
                        <div id="purdue-home-post-grid__filter-content-<?php echo $rand; ?>"
                            class="purdue-home-post-grid__filter-content">
                            <div class="purdue-home-post-grid__filter-fields">
                                <?php

                    if($attributes['addTaxFilter']){

                        $taxes=$attributes['selectedTaxFilters'];
                        $taxesFilterNames = $attributes['taxFilterName'];
                        $taxesFilterOrder = $attributes['filterOrder'];
                        $taxesPanelCollapse = $attributes['taxPanelCollapse'];
                        $taxesDropDown = $attributes['taxIsDropdown'];                     
                        $names = array_column($taxesFilterOrder, 'slug');
                        

                        if(sizeof($taxes)>0){
                            foreach ( $taxes as $tax ){

                                if($taxesFilterNames[$tax] != ""){
                                    $label = $taxesFilterNames[$tax];
                                }else{
                                    $label = get_taxonomy( $tax )->label;
                                };

                                $index = array_search($tax, $names);
                                $collapse = array_key_exists($tax, $taxesPanelCollapse );
                                $dropdown = array_key_exists($tax, $taxesDropDown );
                               
                                $query_terms=[];
                                $terms=[];
                                if($attributes['hasSelectedTax'] && sizeof($attributes['selectedTaxTerms'])>0 && !empty($args['tax_query'])){
                                    foreach ( $args['tax_query'] as $query_tax ){
                                        if(is_array($query_tax) && $query_tax['taxonomy'] == $tax){
                                            $query_terms=$query_tax['terms'];
                                        }
                                    }
                                }
                                if(sizeof($query_terms)>0){
                                    foreach ( $query_terms as $query_tax_term ){
                                        $terms[] = get_term_by('slug', $query_tax_term, $tax);
                                    }
                                }else{
                                    $terms=get_terms([
                                        'taxonomy' => $tax,
                                        'hide_empty' => false,
                                        'parent'        => 0,
                                    ]);
                                }
                            ?>
                                <fieldset style="order: <?php echo $index +1;?>">
                                    <button class="field-title field-control <?php echo $collapse ? 'collapse' : 'collapse is-open';?>" aria-disabled="false"
                                        aria-controls="<?php echo esc_attr( $tax ); ?>-field-<?php echo $rand; ?>"
                                        aria-expanded="<?php echo $collapse ? 'false' : 'true'; ?>"><span>Filter by: </span>
                                        <?php echo esc_attr( $label ); ?></button>
                                    <div id="<?php echo esc_attr( $tax ); ?>-field-<?php echo $rand; ?>"
                                        class="field-content <?= $dropdown ? 'year-month-filter' : '';?> ">
                                    <?php
                                        if($dropdown){?>
                                            <select name="<?php echo esc_attr( $tax ); ?>" class="purdue-home-post-grid__filter-field tax-field">
                                            <option value="" selected="selected">Select <?php echo esc_attr( $label ); ?></option>
                                    <?php
                                        }
                                    foreach ($terms as $term){
                                        if($dropdown):?>
                                            <option name="" value="<?php echo esc_attr( $term->slug ); ?>"><?php echo esc_html( $term->name ); ?></option>
                                       <?php else:
                                    ?>
                                        <div>
                                            <div class="field-wrap">
                                                <input type="checkbox"
                                                    class="purdue-home-post-grid__filter-field tax-field"
                                                    name="<?php echo esc_attr( $tax ); ?>"
                                                    value="<?php echo esc_attr( $term->slug ); ?>" />
                                                
                                                <label class="checkmark"><?php echo esc_html( $term->name ); ?></label>
                                            </div>
                                        </div>
                                        <?php endif;
                                    }
                                    if($dropdown){?>
                                            </select>
                                    <?php
                                        }
                                    ?>
                                    </div>
                                </fieldset>
                                <?php
                        }
                    }
                    }
                    if($attributes['addCatFilter']){  

                        $cats=[]; 

                        $excludedCategories = [];

                        $categoryOrder = $attributes['filterOrder'];
                        $catNames = array_column($categoryOrder, 'type');
                        $index = array_search("category", $catNames);

                        foreach ($attributes['excludeCat'] as $excludedCat){
                            $term = get_term_by('slug', $excludedCat, 'category');
                            array_push($excludedCategories, $term->term_id);
                        }                        

                        $allCats=get_categories([
                            'exclude' => $excludedCategories
                        ]);  


                        if($attributes['hasSelectedCatTerms'] && sizeof($attributes['selectedCatTerms'])>0){ 

                            $selectedCatTerms = array_diff($attributes['selectedCatTerms'], $attributes['excludeCat']);

                            foreach ($selectedCatTerms as $value) {
                                foreach ($allCats as $term) {
                                    if( $term->slug == $value){
                                        $cats[]=$term; 
                                    }
                                }                            
                            }


                        }else{

                            $cats = $allCats;                           

                        }

                        ?>
                                <fieldset style="order: <?php echo $index +1;?>">
                                    <button class="field-title field-control <?php echo $attributes['catPanelCollapse'] ? 'collapse' : 'collapse is-open';?>" aria-disabled="false"
                                        aria-controls="category-field-<?php echo $rand; ?>"
                                        aria-expanded="<?php echo $attributes['catPanelCollapse'] ? 'false' : 'true'; ?>"><span>Filter by: </span>
                                        <?php echo esc_attr( $attributes['catFilterName']?$attributes['catFilterName']:"Category" ); ?>
                                    </button>
                                    <div id="category-field-<?php echo $rand; ?>" class="field-content">
                                        <?php
                                foreach ($cats as $term){
                                ?>
                                        <div>
                                            <div class="field-wrap">
                                                <input type="checkbox"
                                                    class="purdue-home-post-grid__filter-field tax-field"
                                                    name="category" value="<?php echo esc_attr( $term->slug ); ?>" />
                                                
                                                <label class="checkmark"><?php echo esc_html( $term->name ); ?></label>
                                            </div>
                                        </div>
                                        <?php
                                }
                                ?>
                                    </div>
                                </fieldset>
                                <?php
                    }
                    if($attributes['addPostTypeFilter']){

                        $postTypeOrder = $attributes['filterOrder'];
                        $names = array_column($postTypeOrder, 'type');
                        $index = array_search("postType", $names);

                        $ptargs = array(
                            'public'   => true,
                            '_builtin' => false,
                        );
                        $allPostTypes=get_post_types( $ptargs, 'objects', 'and' );
                        $postTypes=[];
                        if($attributes['hasSelectedPostType'] && sizeof($attributes['selectedPostType'])>0){                        
                            foreach ($attributes['selectedPostType'] as $value) {
                                if($value=="post"){
                                    $temp=['label'=>"Post", 'name'=>'post'];
                                    $postTypes[]=$temp;
                                }else{
                                    foreach ($allPostTypes as $term) {  
                                        if( $term->name == $value){
                                            $temp=['label'=>$term->label, 'name'=>$term->name];
                                            $postTypes[]=$temp;
                                        }
                                    }
                                }                            
                            }
                        }else{
                            $temp=['label'=>"Post", 'name'=>'post'];
                            $postTypes[]=$temp;
                            foreach ($allPostTypes as $term) {  
                                    $temp=['label'=>$term->label, 'name'=>$term->name];
                                    $postTypes[]=$temp;
                            }

                        }
                        ?>
                                 <fieldset style="order: <?php echo $index +1;?>">
                                    <button class="field-title field-control <?php echo $attributes['postPanelCollapse'] ? 'collapse' : 'collapse is-open';?>" aria-disabled="true"
                                        aria-controls="post-type-field-<?php echo $rand; ?>"
                                        aria-expanded="<?php echo $attributes['postPanelCollapse'] ? 'false' : 'true'; ?>"><span>Filter by: </span>
                                        <?php echo esc_attr( $attributes['postTypeFilterName']?$attributes['postTypeFilterName']:"Post Types" ); ?>
                                    </button>
                                    <div id="post-type-field-<?php echo $rand; ?>" class="field-content">
                                        <?php
                                foreach ($postTypes as $term){
                                ?>
                                        <div>
                                            <div class="field-wrap">
                                                <input type="checkbox"
                                                    class="purdue-home-post-grid__filter-field postType-field"
                                                    name="post-type" value="<?php echo esc_attr( $term['name'] ); ?>" />                                                
                                                <label class="checkmark"><?php echo esc_html( $term['label'] ); ?></label>
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

                if($attributes['addYearFilter']){
                    //Get years and months
                    $args['posts_per_page'] = 100;
                    $newPaged = 1;
                    $args['paged'] =  $newPaged;

                    $query = new WP_Query($args);

                    $publish_years = [];
                    $publish_months = [];

                    do {
                        // Create a new query for the current batch
                        $args['paged'] = $newPaged;
                        $query = new WP_Query($args);

                        // Loop through the posts in the current batch
                        while ($query->have_posts()) {
                            $query->the_post();

                            $publish_year = get_the_date('Y');
                            $publish_month = get_the_date('F');

                            // Collect unique years
                            if (!in_array($publish_year, $publish_years)) {
                                $publish_years[] = $publish_year;
                            }

                            // Collect unique months
                            if (!in_array($publish_month, $publish_months)) {
                                $publish_months[] = $publish_month;
                            }
                        }

                        // Move to the next batch
                        $newPaged++;

                        // Check if there are more posts to process
                    } while ($query->have_posts());
                    
                    // Sort the months array
                    $months_order = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    usort($publish_months, function($a, $b) use ($months_order) {
                        return array_search($a, $months_order) - array_search($b, $months_order);
                    });
                    
                    wp_reset_postdata();
                ?>
                  <?php
                  


                        $args['posts_per_page'] = $posts_per_page;
                        $args['paged'] = $paged;

                        $query = new WP_Query($args);

                        $dateFieldOrder = count($attributes['filterOrder']) + 1;

                ?>
                                <fieldset style="order: <?= $dateFieldOrder; ?>">
                                    <button class="field-title field-control <?php echo $attributes['datePanelCollapse'] ? 'collapse' : 'collapse is-open';?>" aria-disabled="false"
                                        aria-controls="year-month-field-<?php echo $rand; ?>"
                                        aria-expanded="<?php echo $attributes['datePanelCollapse'] ? 'false' : 'true'; ?>"><span>Filter by: </span>
                                        Date
                                    </button>
                                    <div id="year-month-field-<?php echo $rand; ?>" class="year-month-filter field-content">
                                        <select name="year-field" class="purdue-home-post-grid__filter-field year-field">
                                            <option value="" selected="selected">Year</option>
                                            <?php
                                            foreach ($publish_years as $year) {
                                            ?>
                                                <option value="<?= $year; ?>"><?= $year; ?></option>
                                        
                                            <?php
                                            }
                                            ?>
                                        </select>
                                        <select name="month-field" class="purdue-home-post-grid__filter-field month-field">
                                            <option value="" selected="selected">Month</option>
                                            <?php
                                            foreach ($publish_months as $month) {
                                            ?>
                                                <option value="<?= $month; ?>"><?= $month; ?></option>
                                        
                                            <?php
                                            }
                                            ?>
                                        </select>
                                    </div>
                                </fieldset>
                <?php } ?>
                            </div>
                            <div class="purdue-home-post-grid__filter-button hide">
                                <button type="button" class="purdue-home-button">Filter</button>
                                <button type="button"
                                    class="purdue-home-button purdue-home-button--black form-clear-button">
                                    Clear All
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <?php } ?>
                <?php
                    if (($attributes['addSearch']||$attributes['addOrderFilter']) && $attributes['blockType']=="all") {
                ?>
                <div class="purdue-home-cta-grid__grid__filters purdue-home-cta-grid__grid__filters-search">
                    <form class="purdue-home-post-grid__filter purdue-home-post-grid__filter-search"
                        onSubmit="return false;">
                        <?php 
                        if($attributes['addSearch']){

                            if ( isset($_GET['p']) ){

                                $value = wp_filter_nohtml_kses(sanitize_text_field($_GET['p']));
                                $value = str_replace("%20", " ", $value);

                            }else{
                                $value = "";
                            }

                        ?>
                        <div class="search-box">
                            <div class="search-form">
                                <i class="fas fa-search search-icon"></i>
                                <input type="search" title="search"
                                    class="search-field purdue-home-post-grid__filter-field" placeholder="Search..."
                                    name="p" value="<?php echo esc_attr($value); ?>">
                                <button type="submit" class="search-button">Search
                                </button>
                                <button type="button" class="clear-button">
                                    <i class="fa-regular fa-circle-xmark" aria-label="Clear"></i>
                                </button>
                            </div>
                        </div>
                        <?php 
                }
                    if($attributes['addOrderFilter']){
                        ?>
                        <fieldset>
                            <span>Sort by:</span>
                            <div class="field-wrap radio-field">
                                <input type="radio" class="purdue-home-post-grid__filter-field order-field" name="order"
                                    value="DESC" <?= $attributes['orderBy']=="date"?'checked="checked"':"" ?> />
                                
                                <label class="checkmark"><?= $attributes['orderBy']=="date"?"Newest":"DESC" ?></label>
                            </div>
                            <div class="field-wrap radio-field">
                                <input type="radio" class="purdue-home-post-grid__filter-field order-field" name="order"
                                    value="ASC" <?= $attributes['orderBy']!="date"?'checked="checked"':"" ?> />
                                
                                <label class="checkmark"><?= $attributes['orderBy']=="date"?"Oldest":"ASC" ?></label>
                            </div>

                        </fieldset>
                        <?php
                    }
                    ?>
                    </form>
                   
                    
                </div>
                <?php
                }

                
                ?>

                <?php if ($attributes['sortAlpha']){

                        $allArgs = $args;
                        
                        $allArgs['posts_per_page'] = -1;                        
                        $allQuery = new WP_Query($allArgs);

                    $result = array();

                    if ( $allQuery->posts){

                        foreach($allQuery->posts as $key => $post){
                        
                            $first_letter = substr($post->post_title, 0, 1);

                            $post = get_post($post->ID);
                            
                            $result[$first_letter][] = array(
                                $post
                            );
                        }  

                        
                    }            

                    $first_letter = array_keys($result);
                    $letters = range('A', 'Z');

                    echo '<div class="purdue-home-cta-grid__grid__letters filter-letter-links">
                            <ul>';
                    foreach ($letters as $letter) {

                        if (in_array($letter, $first_letter)){
                            echo '<li><a class="filter-letter" role="button" data-alpha="' . $letter . '">' . $letter . '</a></li>';
                        }else{
                            echo '<li class="filter-letter is-disabled">' . $letter . '</li> ';
                        }
                        
                    }
                    echo '</ul></div>';    
                    
                }
                wp_reset_postdata();

               
                
                $query = new WP_Query($args);

                ?>
                
                <div class="purdue-home-cta-grid__grid__filters-right">
                    <div class="columns">
                        <?php  if (($attributes['addTaxFilter']||$attributes['addCatFilter']||$attributes['addPostTypeFilter'] || $attributes['addYearFilter'])&&$attributes['blockType']=="all") {?>
                            <div class="purdue-home-cta-grid__grid__filters-selected column is-three-quarters p-0"> </div>
                        <?php  } ?>

                        <?php $total =  $query->found_posts;?>
                        <?php if($attributes['addPostTotal']): ?>
                            <div class="purdue-home-cta-grid__grid__total column is-one-quarter">Showing <span class="post-total"><?= $total;?></span> <?= $attributes['postTotalType']; ?> </div>
                        <?php endif;?>
                    </div>
                    

                    <p class="purdue-home-cta-grid__message hide"><?= $attributes['resultsMessage'] ? $attributes['resultsMessage'] : 'No results found!'?></p>

                </div>

                

                <div class="purdue-home-cta-grid__grid__content">

               
                
                    <div class="purdue-home-cta-grid__cards">
                        
                        <div class="columns is-multiline">
                       

           <?php



    if($attributes['blockId'] !== ""){

        $cache_key = 'filtered_posts_'.$attributes['blockId'].'_'.$post_id;


        //delete_transient($cache_key);
        $cached_ids = get_transient($cache_key);

        if ($cached_ids === false) {
            // Only runs if cache is empty or expired

            $args['posts_per_page'] = $posts_per_page;
            $args['fields'] = 'ids';
            $args['nopaging' ] = false;

            $custom_query = new WP_Query($args);
           
            $post_ids = $custom_query->posts;

           $posts = get_posts([
            'post__in'  => $post_ids,
            'orderby' => $orderBy,
            'order'   => $order,
            'numberposts' => $posts_per_page, // Don't limit again, you're already slicing
        ]);
           
            set_transient($cache_key, $post_ids, 24 * HOUR_IN_SECONDS);
        }
    }
                        

                      /*  while ($query->have_posts()) {
                            $query->the_post();  
                            if($attributes['columns'] == "3"){
                                require __DIR__ . '/inc/story-grid.php';
                            }else{
                                require __DIR__ . '/inc/story-grid-2.php';
                            }
                        }
                        wp_reset_postdata();*/
                      
                       if(!$cached_ids){


                            while ($query->have_posts()) {
                                $query->the_post();  
                                if($attributes['columns'] == "3"){
                                    require __DIR__ . '/inc/story-grid.php';
                                }else{
                                    require __DIR__ . '/inc/story-grid-2.php';
                                }
                            }
                            wp_reset_postdata();

                        }else{


                            $posts = $cached_ids;

                            foreach ($posts as $post) {
                                setup_postdata($post);
                                if($attributes['columns'] == "3"){
                                    require __DIR__ . '/inc/story-grid.php';
                                }else{
                                    require __DIR__ . '/inc/story-grid-2.php';
                                }
                            }

                          /* while ($cached_ids->have_posts()) {
                            $cached_ids->the_post();  
                                if($attributes['columns'] == "3"){
                                    require __DIR__ . '/inc/story-grid.php';
                                }else{
                                    require __DIR__ . '/inc/story-grid-2.php';
                                }
                            }*/
                          //  wp_reset_postdata();

                        }
                      

                        

                        ?>
                        </div>
                    </div>
                    

                    <?php
                        if($attributes['infiniteScroll']){
                            
                            if($total <= $posts_per_page){
                                $hideButton = "hide";
                            }else{
                                $hideButton = "";
                            }
                            
                            echo '<div class="container">
                                    <div class="section is-flex is-justify-content-center">
                                        <button class="load purdue-home-button purdue-home-button--white ' . $hideButton .'">Load More</button>                                        
                                                                           
                                    </div>
                                </div>';
                        }

                    if($attributes['blockType']=="all" && !$attributes['infiniteScroll']){
                     ?>
                    <nav class="pagination purdue-home-pagination">
                        <h2 class="screen-reader-text">Posts navigation</h2>
                        <div class="nav-links">
                            <?php
                        $big = 999999999; // need an unlikely integer
                        $current = $currentPage ? (int) get_query_var( 'paged' ) : 1;
                        echo paginate_links(
                            array(
                                'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
                                'format' => '?paged=%#%',
                                'current' => $current,
                                'prev_text' => __( 'Prev', 'textdomain' ),
                                'next_text' => __( 'Next', 'textdomain' ),
                                'total' => $query->max_num_pages,
                            )
                        );
                    ?>
                        </div>
                    </nav>
                    <?php 
                    }else{
                        if($attributes["linkURL"] && $attributes["linkText"]){
                     ?>
                    <div
                        class="purdue-home-button-storylink <?php echo($attributes['headerStyle'] != "simple" ? " mobile-show" :""); ?>">
                        <a class=" purdue-home-button purdue-home-button--storylink <?= $buttonClass;?>"
                            href="<?= $attributes["linkURL"]; ?>"
                            <?= $target1; ?>><?= trim($attributes["linkText"]); ?></a>
                    </div>
                    <?php
                        }
                    }
                     ?>
                </div>
            </div>
            <!-- end of grid container -->
        </div>
        <!-- end of container -->
    </div>
    <!-- end of section -->
</div>