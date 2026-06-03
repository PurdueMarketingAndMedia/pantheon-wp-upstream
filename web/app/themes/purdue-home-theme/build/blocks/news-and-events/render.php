<?php
require_once __DIR__ . '/inc/functions.php';
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
$sectionclass = 'section';
if ($attributes['paddingTop']) {
    $sectionclass .= ' ' . $attributes['paddingTop'];
}
if ($attributes['paddingBottom']) {
    $sectionclass .= ' ' . $attributes['paddingBottom'];
}
if ($attributes['type']=="50-50") {
    $sectionclass .= ' purdue-home-news-and-events--plain';
}
$type = $attributes['type']==="50-50-post" || $attributes['type']==="50-50" ? 'post-50-50' : '';
$featuredHeading = $attributes['heading'] ? 'h3' : 'h2';
$articleHeading = "";
?>

<div <?= $id; ?> class="purdue-home-news-and-events <?= $attributes['className']; ?> <?= $type; ?>">
    <div class="<?= $sectionclass; ?>">
        <?php 
            if($attributes['heading'] || $attributes["linkURL"]){
        ?>
        <div class="container">
            <?php 
            if($attributes['type']==="60-40"){               
                
        ?>

            <div class="columns is-multiline align-bottom">
                <div class="column">
                    <h2 class="purdue-home-news-events__header"><?= trim($attributes['heading']); ?></h2>
                </div>
                <div class="column is-narrow">
                    <?php
                    if($attributes["linkURL"]){
                    $target1 = $attributes["external"] ? 'target="_blank"' : 'target="_self"';
                    ?>
                    <a class="purdue-home-button" href="<?= $attributes["linkURL"]; ?>"
                        <?= $target1; ?>><?= trim($attributes["linkText"]); ?></a>
                    <?php } ?>
                </div>
            </div>
            <?php 
        }else{
            if($attributes['heading']):
            ?>
            <div class="tagged-header-container">
                <h2 class="tagged-header purdue-home-news-events__header--tagged"><?= trim($attributes["heading"]); ?>
                </h2>
            </div>
            <?php
            endif;
        }
            ?>
        </div>
        <?php
    }
        ?>
        <div class="container">
            <div class="columns is-multiline">
                <?php
                $iframes = [];
                $results=[];
                if($attributes['source']=="rss"){
                    $results=rss_feed_news($attributes['feedURLFeatured']);
                    // var_dump($results);
                    if(!empty($results)&&is_array($results)){
                        $attributes['sliderCards']=array_slice($results, 0, 1);
                    }
                }elseif($attributes['source']=="auto"){
                    //For auto populated content
                    $posts_per_page=4;
                    $paged=1;
                    $orderBy="date";
                    $order = 'DESC';
                    $args = array(
                        'posts_per_page' => $posts_per_page,
                        'paged' => $paged,
                        'orderby' => $orderBy,
                        'order'   => $order,
                    );
                    $ptargs = array(
                        'public'   => true,
                        '_builtin' => false,
                     );
                    $allPostTypes=get_post_types( $ptargs, 'names' );
                    foreach ( $allPostTypes  as $post_type ) {
                        if($post_type != "page" &&
                        $post_type != "attachment" &&
                        $post_type != "nav_menu_item" &&
                        $post_type != "wp_block" &&
                        $post_type != "wp_template" &&
                        $post_type != "wp_template_part" &&
                        $post_type != "wp_font_family" &&
                        $post_type != "wp_font_face" &&
                        $post_type != "guest-author" &&
                        $post_type != "wp_navigation"){
                        $args['post_type'][] = $post_type; 
                        }
                     }           
                    $args['post_type'][]="post";
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
                    $query = new WP_Query($args);

                    $posts_data = array();
                    
                    if ($query->have_posts()) {
                        while ($query->have_posts()) {
                            $query->the_post();
                            $tag = "";
                            if (taxonomy_exists('_theme')) {
                                $tag = purdue_post_tag_simple( get_the_ID(), '_theme');
                            } else {
                                $tag = purdue_post_tag_simple( get_the_ID(), 'category');
                            }
                             // Get the ID of the post thumbnail (featured image)
                            $thumbnail_id = get_post_thumbnail_id();
                            
                            // Get the URL of the post thumbnail
                            $imgURL = get_the_post_thumbnail_url();
                            
                            // Get the alt text of the post thumbnail
                            $imgALT = get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true);

                            $posts_data[] = array(
                                'linkType'=>"story",
                                'mediaType'=>"image",
                                'title'=>get_the_title(),
                                'linkURL'=>get_permalink(),
                                'date'=>get_the_date('F j, Y'),
                                'mediaURL'=>$imgURL,
                                'mediaAlt'=>$imgALT,
                                "tag"=>$tag,
                                "postType"=>get_post_type(),
                                "external"=>false,
                                'time'=>"",
                            );
                        }
                    }
                    wp_reset_postdata();
                    $attributes['sliderCards'] = array();
                    $attributes['sliderCards']=array_slice($posts_data, 0, 1);
                }
                $leftColumnClass=$attributes['type']=="60-40"?" is-two-thirds-desktop is-half-tablet is-full-mobile":"";
                if (sizeof($attributes['sliderCards']) > 0) {
                    ?>
                <div class="column<?= $leftColumnClass; ?>">
                    <?php
                        if ($attributes['type']=="60-40"&&$attributes['featuredHeading']) {
                            ?>
                    <div class="tagged-header-container">
                        <<?= $featuredHeading ?> class="tagged-header"><?= $attributes["featuredHeading"]; ?></<?= $featuredHeading ?>>
                    </div>
                    <?php
                        }
                        ?>
                    <div class="glide purdue-home-slider--news">
                        <div class="glide__track" data-glide-el="track">
                            <div class="glide__slides">
                                <?php
                                    foreach ($attributes['sliderCards'] as $key=>$slide) {
                                        if(isset($slide["postType"])){
                                             if($slide["postType"] == "rkv_podcast"){
                                                    $slide["postType"] = "podcast";
                                                }elseif($slide["postType"] == "post"){
                                                    $slide["postType"] = "article";
                                                }elseif(($slide["postType"] == "video" || $slide["postType"] == "rkv_video")){
                                                    $slide["postType"] = "video";
                                                }else{
                                                    $slide["postType"] = "article";
                                                }
                                        }else{
                                            $slide["postType"] = "";
                                        }
                                       
                                        ?>
                                <div class="glide__slide">
                                    <?php
                                            $slideClass = 'purdue-home-cta-card purdue-home-cta-card--news';
                                            if ($slide['linkType'] == "story") {
                                                $slideClass .= " purdue-home-cta-card--story";
                                            }
                                            if ($attributes['type']=="50-50") {
                                                $slideClass .= " purdue-home-cta-card--news--plain";
                                            }
                                            ?>
                                    <div class="<?= $slideClass; ?>">
                                        <div class="image is-16by9">
                                            <?php
                                                    if ($slide['mediaType'] == "image") {
                                                        if($slide["mediaURL"] == ""){
                                                            $slide["mediaURL"]="https://marcom.purdue.edu/app/uploads/2021/09/cropped-cropped-DW540158-HDR.jpg";
                                                        }
                                                        ?>
                                            <img class="purdue-home-background-image" alt="<?= $slide["mediaAlt"]; ?>"
                                                src="<?= $slide["mediaURL"]; ?>" />
                                            <?php
                                                    } elseif ($slide['mediaType'] == "video") {
                                                        ?>
                                            <video preload="metadata" class="purdue-home-background-image" muted
                                                playsinline="">
                                                <source src="<?= $slide["mediaURL"]; ?>#t=0.1">
                                            </video>
                                            <?php
                                                    }
                                                    ?>
                                        </div>
                                        <?php
                                    if ($slide['linkType'] == "story") {
                                                    $target = $slide["external"] ? 'target="_blank"' : 'target="_self"';

                                     if($attributes['type']==="50-50-post"){
                                        $articleHeading = $attributes['heading']  ? 'h3' : 'h2';
                                                    ?>
                                        <div
                                            class="flex-container flex-container--align-vertical-bottom <?= 'post-type-'.strtolower(str_replace(' ', '-', $slide["postType"])) ?>">
                                            <a class="purdue-home-news-events__content" href="<?= $slide["linkURL"]; ?>"
                                                <?= $target; ?>>
                                                <<?= $articleHeading ?> class="purdue-home-news-events__title"><?= $slide["title"]; ?></<?= $articleHeading ?>>
                                                <?php if($attributes["showTag"] || $attributes["showPostType"]){?>
                                                <p class="purdue-home-news-events__date">
                                                    <?= $attributes["showPostType"]? '<span class="purdue-posttype-tag">'.$slide["postType"].'</span>' : "";?>
                                                    <?= ($attributes["showTag"] && $slide["tag"]) && ($attributes["showPostType"] && $slide["postType"])? " | " : "";?>
                                                    <?= $attributes["showTag"]? '<span class="purdue-tax-tag">'. $slide["tag"].'</span>' : "";?>
                                                </p>
                                                <?php } ?>
                                            </a>
                                        </div>

                                        <?php }else{ ?>
                                       
                                        <?php
                                        
                                        if($attributes['type']==="60-40"){
                                            if($attributes['heading'] && $attributes["featuredHeading"]){
                                                $articleHeading = 'h4';
                                            }else if($attributes['heading'] || $attributes["featuredHeading"]){
                                                $articleHeading = 'h3';
                                            }else{
                                                $articleHeading = 'h2';
                                            }  
                                        }else{
                                            $articleHeading = $attributes['heading'] ? 'h3' : 'h2';
                                        }
                                        ?>    

                                        <div class="flex-container flex-container--align-vertical-bottom">
                                            <a class="purdue-home-news-events__content" href="<?= $slide["linkURL"]; ?>"
                                                <?= $target; ?>>
                                                <?php if($attributes["showTag"]&&$slide["tag"]){?>
                                                <p class="purdue-home-news-events__tag"><?= $slide["tag"]; ?></p>
                                                <?php } ?>
                                                <<?= $articleHeading ?> class="purdue-home-news-events__title"><?= $slide["title"]; ?></<?= $articleHeading ?>>
                                                <?php if($attributes["showDate"]){?>
                                                <p class="purdue-home-news-events__date">
                                                    <?php
                                                    if ($slide["date"]) {
                                                    ?>
                                                    <span class="date"><?= $slide["date"]; ?></span>
                                                    <?php
                                                    }
                                                    if($slide["date"] && $slide["time"]){
                                                        echo " | ";
                                                    
                                                    }
                                                    if ($slide["time"]) {
                                                     ?>
                                                    <span class="time"><?= $slide["time"]; ?></span>
                                                    <?php
                                                    }
                                                    ?>
                                                </p>
                                                <?php } ?>
                                            </a>
                                        </div>
                                        <?php
                                                    }
                                                } else {
                                                    preg_match('%(?:youtube(?:-nocookie)?.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu.be/)([^"&?/ ]{11})%i', $slide["linkURL"], $match);
                                                    if (isset($match[1])) {
                                                        $videoId = print_r($match[1], TRUE);
                                                    } else {
                                                        $videoId = '';
                                                    }
                                                    $iframes[] = $videoId;
                                                    ?>
                                        <div class="flex-container flex-container--align-center">
                                            <div class="modal-trigger" data-target="iframe-<?= $videoId; ?>">
                                                <span
                                                    class="cta-link purdue-home-cta-card__link"><?= $slide["title"]; ?></span>
                                                <img class="cta-icon cta-icon--play"
                                                    src="<?php echo get_template_directory_uri() ?>/imgs/play_icon_gold.svg"
                                                    alt="">
                                            </div>
                                        </div>
                                        <?php
                                                }
                                                ?>
                                    </div>
                                </div>
                                <?php
                                    }
                                    ?>
                            </div>
                        </div>
                        <?php
                            if (sizeof($attributes['sliderCards']) > 1) {
                            ?>
                        <div class="slider-controls">
                            <button class="glide__arrow arrow--left">previous</button>
                            <div class="glide__bullets" data-glide-el="controls[nav]">
                                <?php
                                    foreach ($attributes['sliderCards'] as $key => $card) {
                                        $num = $key + 1;
                                        ?>
                                <button class="glide__bullet slider__bullet" data-glide-dir="=<?= $key; ?>"
                                    aria-label="slide <?= $num; ?>"></button>
                                <?php
                                    }
                                    ?>
                            </div>
                            <button class="glide__arrow arrow--right">next</button>
                        </div>
                        <?php
                            }
                            ?>
                    </div>
                </div>
                <?php
                }
                if($attributes['source']=="rss"){
                    if($attributes['feedURLList'] !=""){
                        $results=rss_feed_news($attributes['feedURLList']);
                        if(!empty($results) && is_array($results)){
                            $attributes['smallCards']=$results;
                        }
                    }else{
                        if(!empty($results) && is_array($results)){
                            array_shift($results);
                            $attributes['smallCards']=$results;
                        }
                    }
  
                }elseif($attributes['source']=="auto"){
                    $attributes['smallCards'] = array();
                    $attributes['smallCards']=array_slice($posts_data, 1, 3);
                }
                $rightColumnClass=$attributes['type']=="60-40"?" is-one-third-desktop is-half-tablet is-full-mobile":"";

                if (sizeof($attributes['smallCards']) > 0) {

                    ?>
                <div class="column<?= $rightColumnClass; ?>">
                    <?php
                        if ($attributes['type']=="60-40"&&$attributes['listHeading']) {
                            ?>
                    <div class="tagged-header-container">
                        <<?= $featuredHeading ?> class="tagged-header"><?= $attributes["listHeading"]; ?></<?= $featuredHeading ?>>
                    </div>
                    <?php
                        }                       
                        foreach ($attributes['smallCards'] as $key=>$card) {
                            if($key<3){
                                $cardClass = "purdue-home-news-events__list ";
                                if ($attributes['type']=="50-50") {
                                    $cardClass .= " purdue-home-news-events__list";
                                }
                                require __DIR__ . '/inc/news_list.php';
                            }
                        }
                    $target1 = $attributes["external"] ? 'target="_blank"' : 'target="_self"';
                    if($attributes['type']=="50-50" || $attributes['type']==="50-50-post"){
                        $buttonClass="";
                        if($attributes['buttonColor'] && $attributes['buttonColor']=="black"){
                            $buttonClass=" purdue-home-button--black";
                        }
                        if($attributes["linkURL"] != '' && $attributes['linkText'] != "" ){
                    ?>
                            <a class="purdue-home-button purdue-home-news-events__list-button<?= $buttonClass ?>"
                                href="<?= $attributes["linkURL"]; ?>" <?= $target1; ?>><?= trim($attributes["linkText"]); ?></a>
                            <?php
                        }
                    }
                
                ?>
                </div>
                <?php
                    
                }
                ?>
            </div>
        </div>
    </div>
</div>
<!-- Print iframes -->
<?php
if (sizeof($iframes) > 0) :
    foreach ($iframes as $iframe):
        $protocol = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
        $origin = $protocol . $_SERVER['HTTP_HOST'];
        $youtubeurl = 'https://www.youtube.com/embed/' . $iframe . '?rel=0&enablejsapi=1&origin=' . $origin;
?>
<div id="iframe-<?= $iframe; ?>" class="embed-video-modal modal">
    <div class="modal-background">
    </div>
    <div class="modal-close" aria-label="close"></div>
    <div class="modal-content">
        <div class="iframe-container">
            <div class="modal-youtube-video" id="<?= $iframe ?>" data-src="<?= $youtubeurl ?>"></div>
        </div>
    </div>
</div>
<?php
    endforeach;
endif;
?>