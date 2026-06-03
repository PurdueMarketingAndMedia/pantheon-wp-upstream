<?php
/**
 *
 * @package Purdue-brand
 */
?>
<?php get_header(); ?>

<?php if(function_exists('bcn_display')) : ?>
<div class="breadcrumbs" typeof="BreadcrumbList" vocab="https://schema.org/">
    <?php bcn_display(); //breadcrumb from NavXT, no default since it's complex to set parent page for the posts
	?>
</div>
<?php endif; 

if (function_exists('get_field')) {	
	$subheading = trim(wp_kses_post(get_field('add_a_subheading')));	
	$attr = trim(wp_kses_post(get_field('add_attributions')));	
	$hasRelated = get_field('add_related_stories_section_at_the_bottom');
	$relatedCardType = get_field("select_card_type");
} else {	
	$subheading = "";
	$attr = "";
	$hasRelated = "";
	$relatedCardType = "story";
}
$relatedTitle = "Keep Exploring";
$hideByline = get_post_meta(get_the_ID(), 'show_byline_post', true);
$hideShare = get_post_meta(get_the_ID(), 'show_share_buttons_post', true);
$hideAuthor = get_post_meta(get_the_ID(), 'remove_author_field', true);
$relatedCardPostTypeTag = get_post_meta(get_the_ID(), 'add_a_post_type_tag_optional', true);
$attributes['postTypeTag'] = !empty($relatedCardPostTypeTag) && $relatedCardPostTypeTag[0] == "Yes" ? true : false;
$attributes['selectedTax'] = get_post_meta(get_the_ID(), 'add_a_tax_tag_cards_optional', true);
$attributes['cardType'] = $relatedCardType;
$attributes['buttonText']="Learn More";
$attributes['showExcerpt'] = get_post_meta(get_the_ID(), 'show_excerpt_card', true);
$videoHost=get_post_meta(get_the_ID(), 'video_host', true);
$youtubeUrl=get_post_meta(get_the_ID(), 'youtube_url', true);
$vimeoUrl=get_post_meta(get_the_ID(), 'vimeo_url', true);
$author_id = $post->post_author;
$featuedImageSize = get_post_meta(get_the_ID(), 'featured_image_size', true);

if ( function_exists( 'get_coauthors' ) ) {
	// Get the coauthors.
	$coauthors = (array) get_coauthors();
	if ( count( $coauthors ) > 1 ) {
		$multipleAuthorClass = " has-multiple-author";
	}
	if ( count( $coauthors ) > 0 ) {
		foreach ( $coauthors as $key => $coauthor ) {
			if($coauthor->ID){
				$authorHeader.= '<a class="post-author-individual" href="'.get_author_posts_url( $coauthor->ID, $coauthor->user_nicename ).'" title="posts by '.$coauthor->display_name.'">
				'.$coauthor->display_name.'
				</a>';
				if($key < count( $coauthors ) - 1){
					$authorHeader.= ', ';
				}
			}
		}
	}
}else{
	$authorHeader.= '<a class="post-author-individual" href="'.esc_url( get_author_posts_url( $author_id ) ).'"
title="posts by '.get_the_author_meta( 'display_name', $author_id ).'">
'.get_the_author_meta( 'display_name', $author_id ).'
</a>';
}
?>

<main id="site-content" role="main" class="main-content post-wrap">
    <section class="section">
        <div class="container">
            <div class="columns is-centered">
                <div class="column post-content">
                    <h1 id="main-heading"><?php the_title(); ?></h1>
                    <?php if($subheading != ""){ ?>
                    <p class="post-content__subheading">
                        <?php echo ($subheading); ?>
                    </p>
                    <?php } ?>
                    <?php
					if($videoHost == "youtube" && $youtubeUrl !=""){
						$videoId = purdue_get_youtube_id($youtubeUrl);
						if ($videoId) {
							$cardClass = "purdue-home-cta-card purdue-home-cta-card--video";
                            $attributes['aspectRatio'] = "is-16by9";
							$attributes['mediaType'] = "image";
							if ( has_post_thumbnail() ) {
								$featured_image_id = get_post_thumbnail_id();
								$mediaAlt = get_post_meta($featured_image_id, '_wp_attachment_image_alt', true);
								$mediaURL = wp_get_attachment_url($featured_image_id);								
							}else{
								$mediaURL = "https://img.youtube.com/vi/".$videoId."/maxresdefault.jpg";
								$mediaAlt = "";
							}
							$attributes['mediaTitle'] = "";
							$protocol = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
							$origin = $protocol . $_SERVER['HTTP_HOST'];
							$youtubeurl = 'https://www.youtube.com/embed/' . $videoId . '?rel=0&autoplay=1&enablejsapi=1&mute=1&origin=' . $origin;
						?>
                    <div class="post-content__video-hero <?php echo($featuedImageSize === "wide" ? 'alignwide' : ''); ?>">
                        <?php
							require __DIR__ . '/src/blocks/video-embed/inc/videoCard.php';	
						?>
                    </div>
                    <?php
						}
					}elseif($videoHost == "vimeo" && $vimeoUrl !=""){
						$videoId = purdue_get_vimeo_id($vimeoUrl);
						if ($videoId) {
							$cardClass = "purdue-home-cta-card purdue-home-cta-card--vimeo";
							if ( has_post_thumbnail() ) {
								$featured_image_id = get_post_thumbnail_id();
								$mediaAlt = get_post_meta($featured_image_id, '_wp_attachment_image_alt', true);
								$mediaURL = wp_get_attachment_url($featured_image_id);								
							}else{
								$mediaURL = "https://vumbnail.com/".$videoId.".jpg";
								$mediaAlt = "";
							}
						?>
                    <div class="post-content__video-hero <?php echo($featuedImageSize === "wide" ? 'alignwide' : ''); ?>">
                        <div class="<?= $cardClass ?>">
                            <div class="image is-16by9">
                                <img class="purdue-home-background-image" alt="<?= $mediaAlt ?>"
                                    src="<?= $mediaURL ?>" />
                            </div>
                            <div class="flex-container flex-container--align-center">
                                <span class="cta-link purdue-home-cta-card__link">Watch Video</span>
                                <img class="cta-icon cta-icon--play"
                                    src="<?php echo get_template_directory_uri() ?>/imgs/play_icon_gold.svg" alt="">
                            </div>
                            <div class="iframe-container is-sr-only">
                                <iframe class="vimeo-video-hero" id="<?= $videoId ?>"
                                    src="https://player.vimeo.com/video/<?= $videoId ?>?muted=1"></iframe>
                            </div>
                        </div>

                    </div>
                    <?php
						}
					}else{
						if ( has_post_thumbnail() ) {		
						
					?>
                    <div class="post-content__thumbnail <?php echo($featuedImageSize === "wide" ? 'alignwide' : ''); ?>">
                        <?php
						the_post_thumbnail( array( 1344, 9999999 ), [ 'class' => 'post-content__thumbnail--image' ] );
						$post_thumbnail_object      = get_post( get_post_thumbnail_id() );
						$post_thumbnail_caption     = $post_thumbnail_object->post_excerpt;
						if($post_thumbnail_caption != ""){
						?>
                        <p class="post-content__thumbnail--caption"><?= $post_thumbnail_caption ?></p>
                        <?php
						}
						?>
                    </div>
                    <?php
						}
					}
					?>
                    <?php while (have_posts()) : the_post(); ?>
                    <?php if((empty($hideShare) || $hideShare[0] !="Yes") || (empty($hideByline) || $hideByline[0] !== "Yes")){  ?>
                    <div class="level is-mobile post-content__byline">
                        <?php if(empty($hideByline) || $hideByline[0] !== "Yes"){  ?>
                        <div class="level-left post-content__byline--date">
                            <span class="level-item post-date"><?php echo get_the_date("F j, Y"); ?></span>
                            <?php if(empty($hideAuthor) || $hideAuthor[0] !== "Yes"){  ?>
                            <span class="level-item post-author"><?= $authorHeader ?></span>
                            <?php } ?>
                        </div>
                        <?php } ?>
                        <?php if(empty($hideShare) || $hideShare[0] !="Yes"){  ?>
                        <div class="level-right post-content__byline--share">
                            <span class="level-item">
                                Share
                            </span>
                            <span class="level-item">
                                <a class="icon is-medium"
                                    href="https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>"><span
                                        class="screen-reader-text">Facebook</span><svg
                                        xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                        <path
                                            d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" />
                                    </svg></a>
                            </span>
                            <span class="level-item">
                                <a class="icon is-medium"
                                    href="https://twitter.com/intent/tweet?url=<?php the_permalink(); ?>"><span
                                        class="screen-reader-text">Twitter</span><svg xmlns="http://www.w3.org/2000/svg"
                                        height="1em" viewBox="0 0 448 512">
                                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                        <path
                                            d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z" />
                                    </svg></a>
                            </span>
                            <span class="level-item">
                                <a class="icon is-medium"
                                    href="https://www.linkedin.com/shareArticle?mini=true&url=<?php the_permalink(); ?>"><span
                                        class="screen-reader-text">LinkedIn</span><svg
                                        xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                        <path
                                            d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                                    </svg></a>
                            </span>
                            <span class="level-item">
                                <a class="icon is-medium"
                                    href="mailto:placeholder@placeholder.com?body=<?php the_permalink(); ?>"><span
                                        class="screen-reader-text">Email</span><svg xmlns="http://www.w3.org/2000/svg"
                                        height="1em" viewBox="0 0 448 512">
                                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                        <path
                                            d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM218 271.7L64.2 172.4C66 156.4 79.5 144 96 144H352c16.5 0 30 12.4 31.8 28.4L230 271.7c-1.8 1.2-3.9 1.8-6 1.8s-4.2-.6-6-1.8zm29.4 26.9L384 210.4V336c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V210.4l136.6 88.2c7 4.5 15.1 6.9 23.4 6.9s16.4-2.4 23.4-6.9z" />
                                    </svg></a>
                            </span>
                        </div>
                        <?php } ?>
                    </div>
                    <?php } ?>
                    <div class="post-content__body">
                        <?php the_content(); ?>
                    </div>
                    <?php endwhile; // end of the loop. 
					if ( $attr ) {
					?>
                    <div class="post-content__attribution">
                        <?= $attr ?>
                    </div>
                    <?php
					}
					?>
                </div>
            </div>
        </div>
    </section>
    <?php
			if($hasRelated&&$hasRelated[0]=="Yes"){
	?>
    <section class="section has-gray-background post-related-stories">
        <div class="container">
            <h2 class="related-story-header"><?= $relatedTitle ?></h2>
            <div class="purdue-home-link-cards__slider purdue-home-link-cards__slider--loop">
                <div class="glide">
                    <div class="glide__track" data-glide-el="track">
                        <div class="glide__slides">
                            <?php
			 wp_reset_query();
				$current_post_type = get_post_type();
				$results=[];

				// Query related posts from all categories
				$args = array(
					'post_type'      => $current_post_type,
					'posts_per_page' => 9,
					'orderby' => 'date',
					'order'   => 'DESC',
					'post__not_in'   => array(get_the_ID()),
				);
				$my_query = new wp_query($args);
				if ($my_query->have_posts()) {
						while ($my_query->have_posts()) {
						$my_query->the_post();
						$results[]="post";
						?>
                            <div class="glide__slide">
                                <?php
						require __DIR__ . '/src/blocks/post-grid/inc/story.php';
						?>
                            </div>
                            <?php
					}
				}
				wp_reset_query();
				?>
                        </div>
                    </div>
                    <div class="slider-controls">
                        <button class="glide__arrow arrow--left">previous</button>
                        <div class="glide__bullets" data-glide-el="controls[nav]">
                            <?php
							foreach ( $results as $key => $card ) {  
								$num = $key + 1;
							?>
                            <button class="glide__bullet slider__bullet" data-glide-dir="=<?= $key; ?>"
                                aria-label="slide <?= $num; ?>"></button>
                            <?php }?>
                        </div>
                        <button class="glide__arrow arrow--right">next</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <?php
			}
	?>
    <button id="to-top" class="to-top-hidden" aria-label="Back to Top Button">
        <span class="icon"><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></span>
    </button>
</main><!-- #site-content -->
<?php get_footer(); ?>