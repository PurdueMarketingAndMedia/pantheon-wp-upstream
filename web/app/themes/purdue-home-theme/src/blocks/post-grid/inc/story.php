 <?php
    $cardClass = "purdue-home-cta-card";
    $figClass = "image";
    $containerClass = "flex-container";
    if($attributes['cardType'] == "faculty"){
        $cardClass .= " purdue-home-cta-card--faculty";
        $figClass .= " is-square";
        $containerClass .= " flex-container--align-bottom";
    }else{
        $cardClass .= " purdue-home-cta-card--story";
        $figClass .= " is-16by9";
        $containerClass .= " flex-container--align-center";
    }
    if(!$attributes['showExcerpt']){
        $containerClass .= " has-no-excerpt";
    }
    $postType = rkv_get_post_type();
    if($postType == "post"){
        $postType = "article";
    }
    if($postType == "podcast" || $postType == "rkv_podcast"){
        $postType = "podcast";
    }
    if($postType == "rkv_video" || $postType == "video"){
        $postType = "video";
    }
    $cardClass.=" post-type-".$postType;

    $postID = get_the_ID();

    $postModal = '';
    if(function_exists('get_field') && get_field('post_modal_window')){
        $postModal = get_field('post_modal_window')[0];
    }

    $cardClass .= " ".$postModal;
    $external = function_exists('get_field') ? get_field('is_this_post_an_external_link'):null;
    $external2 = get_post_meta( get_the_ID(), "external_post_new_tab", true);
    $target = ($external != null && $external[0]=="Yes") || ($external2) ? 'target="_blank"' : 'target="_self"';
    $image_url = "";
    $image_alt = "";
    if (function_exists('get_field')) {	
        $image_field = get_field('secondary_featured_image');
        if ($image_field) {
            // Get the image URL and alt text
            $image_url = $image_field['url'];
            $image_alt = $image_field['alt'];
        }
    }
    if($image_url == "" && get_post_thumbnail_id($post->ID)){
        $image_url = wp_get_attachment_url(get_post_thumbnail_id($post->ID));
        $image_alt = get_post_meta(get_post_thumbnail_id($post->ID), '_wp_attachment_image_alt', true);
    }
    ?>

 <a class="<?= $cardClass ?>" href="<?= the_permalink() ?>" <?= $target; ?>>
    <?php if($image_url != "" && (isset($attributes['showThumbnail']) && $attributes['showThumbnail'] == true) || !isset($attributes['showThumbnail'])){ ?>
     <figure class="<?= $figClass ?>">
         <img class="purdue-home-background-image" alt="<?= $image_alt ?>" src="<?= $image_url ?>" />
     </figure>
     <?php } ?>
     <div class="<?= $containerClass ?>">
        
        
         <?php
      
            if ((purdue_post_tag( $postID, $attributes['selectedTax'] ) || $attributes['postTypeTag']) && $attributes['cardType'] != "faculty") {
            ?>
         <p class="purdue-home-cta-grid__card-subtitle">
             <?php if($attributes['postTypeTag']){ ?>
             <span class="purdue-posttype-tag"><?php echo $postType; ?></span>
             <?php
               }
                if($attributes['postTypeTag'] && purdue_post_tag( $postID, $attributes['selectedTax'] )){ 
                    echo " | ";
                }
            ?>
             <?php echo purdue_post_tag( $postID, $attributes['selectedTax'] );?>

         </p>
         <?php
            }
            ?>
         <p class="purdue-home-cta-grid__card-title"><?= get_the_title() ?></p>
         <?php
            if ($attributes['cardType'] != "faculty") {
            ?>
         <?php 
            if($attributes['showExcerpt']){
            ?>
         <div class="purdue-home-cta-grid__card-subtext"><?php echo purdue_get_excerpt(); ?></div>
         <?php 
            }
            ?>
        <?php 
            if(isset($attributes['showDate']) && $attributes['showDate']){
        ?>
        <p class="purdue-home-cta-grid__card-subtitle">
            <span class="purdue-date-tag"><?php echo get_the_date(); ?></span>
        </p>
         <?php 
            }
            ?>


         <button class="purdue-home-button"><?= $attributes['buttonText'] ?></button>
         <?php
            }else{
                $tax_terms = wp_get_object_terms( $post->ID, $attributes['selectedTax'] );
            ?>
         <?php 
            if($attributes['showExcerpt']){
            ?>
         <div class="purdue-home-cta-grid__card-subtext"><?php echo purdue_get_excerpt(); ?></div>
         <?php 
            }
            if(sizeof($tax_terms)>0){
            ?>
         <div class="purdue-home-cta-grid__tags">
             <?php 
                foreach ($tax_terms as $key => $tax_term) {
                    echo $tax_term -> name;
                    if($key < sizeof($tax_terms) -1){
                        echo ", ";
                    }
                }
                ?>
         </div>
         <?php
                }
            }
            ?>
     </div>
 </a>