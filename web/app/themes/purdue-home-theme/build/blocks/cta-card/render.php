<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
$blockClass = "purdue-home-cta-card-block";
$blockClass .= " " . $attributes['className'];?>

<div <?= $id ?> class="<?= $blockClass ?>">
    <div class="section has-<?= $attributes['background'] ?>-background<?= $attributes['paddingTop'] ? ' ' . $attributes['paddingTop'] : '' ?><?= $attributes['paddingBottom'] ? ' ' . $attributes['paddingBottom'] : '' ?>">
        <div class="container">
            <div class="purdue-home-cta-card-block__container<?= $attributes["contentAlign"] === "left" ? " purdue-home-cta-card-block__container--reversed" : "" ?>">
                <div class="purdue-home-cta-card-block__image-container">
                    <?php if (sizeof($attributes['imgs']) > 1) : ?>
                        <button class="cta-play" aria-label="play"><i class="fa-regular fa-circle-play cta-play-icon"></i></button>
                        <button class="cta-pause is-active" aria-label="pause"><i class="fa-regular fa-circle-pause cta-pause-icon"></i></button>
                    <?php endif; ?>
                    <div class="glide purdue-home-cta-card-block__image-slider">
                        <div class="glide__track" data-glide-el="track">
                            <div class="glide__slides">
                                <?php
                                foreach ($attributes['imgs'] as $img):
                                    $imageClass = "image";
                                    if ($img["caption"] || sizeof($attributes['imgs']) > 1) {
                                        $imageClass .= " has-caption";
                                    }
                                ?>
                                    <div class="glide__slide">
                                        <figure class="<?= $imageClass; ?>">
                                            <img src="<?= $img["url"]; ?>" alt="<?= $img["alt"]; ?>" />
                                            <?php if ($img["caption"]): ?>
                                                <figcaption><?= $img["caption"]; ?></figcaption>
                                            <?php endif; ?>
                                        </figure>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="purdue-home-cta-card-block__content-container">
                    <?php if ($attributes['subheader'] != ""): ?>
                        <h2 class="purdue-home-cta-card-block__subheader"><?= $attributes['subheader'] ?></h2>
                    <?php endif; ?>
                    <?php if ($attributes['header'] != ""): 
                        if ($attributes['subheader'] == ""):
                        ?>
                        <h2 class="purdue-home-cta-card-block__header"><?= $attributes['header'];?></h2>
                        <?php elseif ($attributes['subheader'] != ""):?>
                            <h3 class="purdue-home-cta-card-block__header"><?= $attributes['header'];?></h3>
                    <?php 
                        endif; 
                    endif;
                    ?>
                    <?= $content ?>
                    <?php if ($attributes['links'] && sizeof($attributes['links']) > 0 && $attributes['links'][0]['linkURL']): ?>
                        <ul class="purdue-home-button-list">
                            <?php foreach ($attributes['links'] as $key => $link): 
                                $target = $link["external"] ? 'target="_blank"' : 'target="_self"';
                                $buttonClass = "purdue-home-button";
                                if ($link["buttonColor"] == "black") {
                                    $buttonClass .= " purdue-home-button--black";
                                }
                                $liClass = $link["fullWidth"] ? "purdue-home-button-wrap--full" : "";
                                ?>
                                <li class="<?= $liClass ?>"><a class="<?= $buttonClass ?>" href="<?= $link["linkURL"] ?>" <?= $target ?>><?= trim($link["linkText"]) ?></a></li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</div>