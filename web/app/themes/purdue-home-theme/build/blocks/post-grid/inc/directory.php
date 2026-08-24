 <?php
    //$cardClass = "purdue-home-cta-card purdue-home-directory-card";
    $cardClass = "purdue-home-directory-card";
    $postID = get_the_ID();
?>

<aritcle class="<?= $cardClass ?>">
    <div class="columns">
        <?php if(get_post_thumbnail_id($postID)){ ?>
        <div class="column is-4-desktop py-0">
            <figure class="image is-4by5">
                <img class="purdue-home-background-image" alt="<?= get_post_meta(get_post_thumbnail_id($postID), '_wp_attachment_image_alt', true) ?>" src="<?= wp_get_attachment_url(get_post_thumbnail_id($postID)) ?>"/>
            </figure>
        </div>
        <?php } ?>
            <div class="flex-container flex-container--align-center column">
                
                <h2 class="purdue-home-directory__card-title"><?= get_the_title() ?></h2>

                <p class="purdue-home-directory__card-subtitle"><?= get_field('field_65b2bdc93007g', $postID) ?></p>

                <?php if(get_field('field_65b2bdc93007f', $postID)){ ?>
                    <p class="purdue-home-directory__card-email"><a href="mailto:<?php echo get_field('field_65b2bdc93007f', $postID); ?>"><?php echo get_field('field_65b2bdc93007f', $postID); ?></a></p>
                <?php } ?>

            </div>
    </div>
</article>