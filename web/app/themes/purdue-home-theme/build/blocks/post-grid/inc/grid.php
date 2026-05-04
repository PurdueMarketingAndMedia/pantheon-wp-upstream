<div class="column is-half-tablet is-4-desktop">

    <?php
    $cardClass = "purdue-home-cta-card purdue-home-cta-card--stack";
    ?>
    <div class="<?= $cardClass ?>">
    <?php if(get_post_thumbnail_id($post->ID)){ ?>
        <figure class="image is-16by9">
            <img class="purdue-home-background-image" alt="<?= get_post_meta(get_post_thumbnail_id($post->ID), '_wp_attachment_image_alt', true) ?>" src="<?= wp_get_attachment_url(get_post_thumbnail_id($post->ID)) ?>"/>
        </figure>
    <?php } ?>
        <div class="flex-container flex-container--align-center">
            <?php
            if (purdue_post_tag( $post->ID, $attributes['selectedTax'] )) {
            ?>
                <p class="purdue-home-cta-grid__card-subtitle"><?php echo purdue_post_tag( $post->ID, $attributes['selectedTax'] );?></p>
            <?php
            }
            ?>
            <p class="purdue-home-cta-grid__card-title"><?= get_the_title() ?></p>

            <div class="purdue-home-cta-grid__card-subtext"><?php purdue_get_excerpt(); ?></div>

            <a class="purdue-home-button" href="<?= the_permalink() ?>"><?= $attributes['buttonText'] ?></a>

        </div>
    </div>
</div>
