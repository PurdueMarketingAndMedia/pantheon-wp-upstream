<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
?>
<div <?= $id ?> class="purdue-home-canopy-hero <?= $attributes['className'] ?>">
    <?php if (sizeof($attributes['medias']) > 0): ?>
        <?php
        $halved = array_chunk($attributes['medias'], ceil(count($attributes['medias']) / 2));
        ?>
        <div class="purdue-home-canopy-hero__canopy">
            <div class="continuous-moving-slider">
                <div class="slide-track">
                    <?php foreach ($halved[0] as $media): ?>
                        <div class="slide">
                            <?php if ($media["mediaType"] == "image"): ?>
                                <img alt="<?= $media["mediaAlt"] ?>" src="<?= $media["mediaURL"] ?>"/>
                            <?php elseif ($media["mediaType"] == "video"): ?>
                                <video preload="metadata" title="<?= $media["mediaTitle"] ?>" autoplay playsinline muted loop>
                                    <source src="<?= $media["mediaURL"] ?>#t=0.1">
                                </video>
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                    <?php foreach ($halved[0] as $media): ?>
                        <div class="slide mobile-hidden">
                            <?php if ($media["mediaType"] == "image"): ?>
                                <img alt="<?= $media["mediaAlt"] ?>" src="<?= $media["mediaURL"] ?>"/>
                            <?php elseif ($media["mediaType"] == "video"): ?>
                                <video preload="metadata" title="<?= $media["mediaTitle"] ?>" autoplay playsinline muted loop>
                                    <source src="<?= $media["mediaURL"] ?>#t=0.1">
                                </video>
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
            <?php if ($halved[1] && sizeof($halved[1]) > 0): ?>
                <div class="continuous-moving-slider row-2">
                    <div class="slide-track">
                        <?php foreach ($halved[1] as $media): ?>
                            <div class="slide">
                                <?php if ($media["mediaType"] == "image"): ?>
                                    <img alt="<?= $media["mediaAlt"] ?>" src="<?= $media["mediaURL"] ?>"/>
                                <?php elseif ($media["mediaType"] == "video"): ?>
                                    <video preload="metadata" title="<?= $media["mediaTitle"] ?>" autoplay playsinline muted loop>
                                        <source src="<?= $media["mediaURL"] ?>#t=0.1">
                                    </video>
                                <?php endif; ?>
                            </div>
                        <?php endforeach; ?>
                        <?php foreach ($halved[1] as $media): ?>
                            <div class="slide mobile-hidden">
                                <?php if ($media["mediaType"] == "image"): ?>
                                    <img alt="<?= $media["mediaAlt"] ?>" src="<?= $media["mediaURL"] ?>"/>
                                <?php elseif ($media["mediaType"] == "video"): ?>
                                    <video preload="metadata" title="<?= $media["mediaTitle"] ?>" autoplay playsinline muted loop>
                                        <source src="<?= $media["mediaURL"] ?>#t=0.1">
                                    </video>
                                <?php endif; ?>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endif; ?>
            <button class="cta-btnctrl cta-pause" aria-label="Pause Slideshow" data-toggle-label="Start Slideshow">
                <i class="fa-regular fa-circle-pause cta-pause-icon"></i>
            </button>
        </div>
    <?php endif; ?>
    <div class="section">
        <div class="container">
            <?php if ($attributes['header'] != ""): ?>
                <h1 class="purdue-home-canopy-hero__header"><?= $attributes['header'] ?></h1>
            <?php endif; ?>

            <?php if ($attributes['links'] && sizeof($attributes['links']) > 0):
                $buttonList = sizeof($attributes['links']) > 1 ? "ul" : "div";
                $buttonWrapper = sizeof($attributes['links']) > 1 ? "li" : "div"; 
            ?>
                <div class="purdue-home-canopy-hero__links">
                    <span class="mobile-hidden">Quick Links:</span>
                    <<?= $buttonList ?> class="purdue-home-button-list">
                        <?php foreach ($attributes['links'] as $key => $link): ?>
                            <?php                             
                                $target = $link["external"] ? 'target="_blank"' : 'target="_self"'; 
                                $buttonCSS = isset($link['buttonCSS']) && $link['buttonCSS'] ? $link["buttonCSS"] : "";                            
                            ?>
                            <<?= $buttonWrapper ?>><a class="purdue-home-button <?= $buttonCSS ?>" href="<?= $link["linkURL"] ?>" <?= $target ?>><?= trim($link["linkText"]) ?></a></<?= $buttonWrapper ?>>
                        <?php endforeach; ?>
                    </<?= $buttonList ?>>
                </div>
            <?php endif; ?>

            <div class="purdue-home-canopy-hero__arrow hero-down-arrow" aria-hidden="true">
                <i class="fa-solid fa-chevron-down icon" aria-hidden="true"></i>
            </div>
        </div>
    </div>
</div>
