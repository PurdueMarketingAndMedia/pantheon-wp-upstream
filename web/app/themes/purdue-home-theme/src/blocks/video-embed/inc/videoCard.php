<div class="<?= $cardClass ?>">
    <div class="image <?= $attributes['aspectRatio'] ?>">
        <?php if ($attributes['mediaType'] == "image") : ?>
            <img class="purdue-home-background-image" alt="<?= $mediaAlt ?>" src="<?= $mediaURL ?>" />
        <?php elseif ($attributes['mediaType'] == "video") : ?>
            <video preload="metadata" class="purdue-home-background-image" title="<?= $attributes['mediaTitle'] ?>" muted playsinline="">
                <source src="<?= $attributes["mediaURL"] ?>#t=0.1">
            </video>
        <?php endif; ?>
    </div>
    <div class="flex-container flex-container--align-center lyt-playbtn">
        <button class="playbtn">
            <span class="cta-link purdue-home-cta-card__link"><?= isset($attributes['buttonText']) && $attributes['buttonText']? $attributes['buttonText']:"Watch Video" ?></span>
            <img class="cta-icon cta-icon--play" src="<?php echo get_template_directory_uri() ?>/imgs/play_icon_gold.svg" alt="">
        </button>                                       
    </div>
    <div class="iframe-container is-sr-only">
        <div class="youtube-video" id="<?= $videoId ?>" data-title="<?= $attributes['mediaTitle'] ?>" data-src="<?= $youtubeurl ?>"></div>
    </div>
</div>