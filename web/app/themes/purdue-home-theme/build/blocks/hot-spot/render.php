<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
$blockclass = 'purdue-home-hot-spot';
$blockclass .= ' ' . $attributes['className'];

// Start generating HTML
?>

<div<?= $id ?> class="<?= $blockclass ?>">
    <div class="section has-padding-top-small has-padding-bottom-none">
        <div class="container">
            <h2 class="tagged-header purdue-home-hot-spot--header"><?= $attributes['header'] ?></h2>
        </div>
    </div>

    <?php
    $linkCards = [];
    if (sizeof($attributes['slides']) > 0) {
    ?>

        <div class="glide purdue-home-slide__hot-spot-desktop">
            <div class="glide__track" data-glide-el="track">
                <div class="glide__slides">

                    <?php

                    
                    foreach ($attributes['slides'] as $slide) {
                        $ariaControlId1 = $slide["mediaId"] . '-' . mt_rand(1, 1000000000000) . '-link-1';
                        $ariaControlId2 = $slide["mediaId"] . '-' . mt_rand(1, 1000000000000) . '-link-2';
                    ?>
                        <div class="glide__slide">
                            <div class="purdue-home-cta-card purdue-home-cta-card--horizontal">
                                <figure class="image is-16by9">
                                    <img src="<?= $slide["mediaURL"] ?>" alt="<?= $slide["mediaAlt"] ?>" />
                                    <?php if( isset($slide["showCaption"] ) && isset($slide["mediaCaption"] )): ?>
                                        <figcaption><?= $slide["mediaCaption"] ?></figcaption>
                                    <?php endif; ?>
                                </figure>

                                <?php
                                if ($slide["link1_title"]) {
                                    $x = $slide["link1_X"];
                                    $y = $slide["link1_Y"];
                                ?>
                                    <div class="hot-spot" style="top: calc(<?= $y ?>% - 72px); left: calc(<?= $x ?>% - 72px);">
                                        <button class="hot-spot-button" aria-expanded="false" aria-controls="<?= $ariaControlId1 ?>" data-target="<?= $ariaControlId1 ?>"><span class="is-sr-only">Open</span></button>
                                        <?php
                                        $link = [
                                            'id' => $ariaControlId1,
                                            'linkText' => $slide["link1_linkText"],
                                            'linkURL' => $slide["link1_linkURL"],
                                            'external' => $slide["link1_external"],
                                            'mediaURL' => $slide["link1_mediaURL"],
                                            'mediaAlt' => $slide["link1_mediaAlt"],
                                            'tag' => $slide["link1_tag"],
                                            'title' => $slide["link1_title"],
                                            'content' => $slide["link1_content"],
                                            'left' => $x,
                                            'top' => $y,
                                        ];
                                        $linkCards[] = $link;
                                        ?>
                                    </div>
                                <?php
                                }

                                if ($slide["link2_title"]) {
                                    $x = $slide["link2_X"];
                                    $y = $slide["link2_Y"];
                                ?>
                                    <div class="hot-spot" style="top: calc(<?= $y ?>% - 72px); left: calc(<?= $x ?>% - 72px);">
                                        <button class="hot-spot-button" aria-expanded="false" aria-controls="<?= $ariaControlId2 ?>" data-target="<?= $ariaControlId2 ?>"><span class="is-sr-only">Open</span></button>
                                        <?php
                                        $link = [
                                            'id' =>  $ariaControlId2,
                                            'linkText' => $slide["link2_linkText"],
                                            'linkURL' => $slide["link2_linkURL"],
                                            'external' => $slide["link2_external"],
                                            'mediaURL' => $slide["link2_mediaURL"],
                                            'mediaAlt' => $slide["link2_mediaAlt"],
                                            'tag' => $slide["link2_tag"],
                                            'title' => $slide["link2_title"],
                                            'content' => $slide["link2_content"],
                                            'left' => $x,
                                            'top' => $y,
                                        ];
                                        $linkCards[] = $link;
                                        ?>
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

            <div class="slider-controls slider-controls--dark">
                <button class="glide__arrow arrow--left">prev</button>
                <div class="glide__bullets" data-glide-el="controls[nav]">
                    <?php
                    foreach ($attributes['slides'] as $key => $card) {
                        $num = $key + 1;
                    ?>
                        <button class="glide__bullet slider__bullet" data-glide-dir="=<?= $key ?>" aria-label="slide <?= $num ?>"></button>
                    <?php
                    }
                    ?>
                </div>
                <button class="glide__arrow arrow--right">next</button>
            </div>
        </div>
    <?php
    }

    if (sizeof($attributes['slides']) > 0) {
    ?>

        <div class="glide purdue-home-slide__hot-spot-mobile">
            <div class="glide__track" data-glide-el="track">
                <div class="glide__slides">

                    <?php
                    foreach ($attributes['slides'] as $slide) {
                        if ($slide["link1_title"]) {
                    ?>
                            <div class="glide__slide">
                                <div class="purdue-home-cta-card purdue-home-cta-card--horizontal">
                                    <figure class="image is-16by9">
                                        <img src="<?= $slide["mediaURL"] ?>" alt="<?= $slide["mediaAlt"] ?>" />
                                        <?php if( isset($slide["showCaption"] ) && isset($slide["mediaCaption"] )): ?>
                                         <figcaption><?= $slide["mediaCaption"] ?></figcaption>
                                        <?php endif; ?>
                                    </figure>
                                    <div class="hot-spot-content">
                                        <?php
                                        if ($slide["link1_linkURL"]) {
                                            $target = $slide["link1_external"] ? 'target="_blank"' : 'target="_self"';
                                        ?>
                                            <a class="purdue-home-cta-card purdue-home-cta-card--stack" href="<?= $slide["link1_linkURL"] ?>" <?= $target ?>>
                                        <?php
                                        } else {
                                        ?>
                                            <div class="purdue-home-cta-card purdue-home-cta-card--stack">
                                        <?php
                                        }
                                        ?>
                                        <figure class="image is-16by9">
                                            <img src="<?= $slide["link1_mediaURL"] ?>" alt="<?= $slide["link1_mediaAlt"] ?>">
                                        </figure>
                                        <div class="flex-container">
                                        <?php
                                            if ($slide["link1_tag"]) {
                                        ?>
                                            <p class="purdue-home-cta-card__tag"><?= $slide["link1_tag"] ?></p>
                                            <?php
                                            }
                                            if ($slide["link1_title"]) {
                                            ?>
                                            <p class="purdue-home-cta-card__title"><?= $slide["link1_title"] ?></p>
                                            <?php
                                            }
                                            if ($slide["link1_content"]) {
                                            ?>
                                            <p class="purdue-home-cta-card__content"><?= $slide["link1_content"] ?></p>
                                            <?php
                                            }
                                            ?>
                                            <?php
                                            if ($slide["link1_linkURL"]) {
                                            ?>
                                                <p class="cta-link"><?= $slide["link1_linkText"] ?></p>
                                            <?php
                                            }
                                            ?>
                                        </div>
                                        <?php
                                        if ($slide["link1_linkURL"]) {
                                        ?>
                                            </a>
                                        <?php
                                        } else {
                                        ?>
                                            </div>
                                        <?php
                                        }
                                        ?>
                                    </div>
                                </div>
                            </div>
                        <?php
                        }
                        if ($slide["link2_title"]) {
                        ?>
                            <div class="glide__slide">
                                <div class="purdue-home-cta-card purdue-home-cta-card--horizontal">
                                    <figure class="image is-16by9">
                                        <img src="<?= $slide["mediaURL"] ?>" alt="<?= $slide["mediaAlt"] ?>" />
                                        <?php if( isset($slide["showCaption"] ) && isset($slide["mediaCaption"] )): ?>
                                         <figcaption><?= $slide["mediaCaption"] ?></figcaption>
                                        <?php endif; ?>
                                    </figure>
                                    <div class="hot-spot-content">
                                        <?php
                                        if ($slide["link2_linkURL"]) {
                                            $target = $slide["link2_external"] ? 'target="_blank"' : 'target="_self"';
                                        ?>
                                            <a class="purdue-home-cta-card purdue-home-cta-card--stack" href="<?= $slide["link2_linkURL"] ?>" <?= $target ?>>
                                        <?php
                                        } else {
                                        ?>
                                            <div class="purdue-home-cta-card purdue-home-cta-card--stack">
                                        <?php
                                        }
                                        ?>
                                        <figure class="image is-16by9">
                                            <img src="<?= $slide["link2_mediaURL"] ?>" alt="<?= $slide["link2_mediaAlt"] ?>">
                                        </figure>
                                        <div class="flex-container">
                                        <?php
                                            if ($slide["link2_tag"]) {
                                        ?>
                                            <p class="purdue-home-cta-card__tag"><?= $slide["link2_tag"] ?></p>
                                            <?php
                                            }
                                            if ($slide["link2_title"]) {
                                            ?>
                                            <p class="purdue-home-cta-card__title"><?= $slide["link2_title"] ?></p>
                                            <?php
                                            }
                                            if ($slide["link2_content"]) {
                                            ?>
                                            <p class="purdue-home-cta-card__content"><?= $slide["link2_content"] ?></p>
                                            <?php
                                            }
                                            ?>
                                            <?php
                                            if ($slide["link2_linkURL"]) {
                                            ?>
                                                <p class="cta-link"><?= $slide["link2_linkText"] ?></p>
                                            <?php
                                            }
                                            ?>
                                        </div>
                                        <?php
                                        if ($slide["link2_linkURL"]) {
                                        ?>
                                            </a>
                                        <?php
                                        } else {
                                        ?>
                                            </div>
                                        <?php
                                        }
                                        ?>
                                    </div>
                                </div>
                            </div>
                    <?php
                        }
                        if (!$slide["link1_title"] && !$slide["link2_title"]) {
                    ?>
                            <div class="glide__slide">
                                <div class="purdue-home-cta-card purdue-home-cta-card--horizontal">
                                    <figure class="image is-16by9">
                                        <img src="<?= $slide["mediaURL"] ?>" alt="<?= $slide["mediaAlt"] ?>" />
                                        <?php if( isset($slide["showCaption"] ) && isset($slide["mediaCaption"] )): ?>
                                         <figcaption><?= $slide["mediaCaption"] ?></figcaption>
                                        <?php endif; ?>
                                    </figure>
                                </div>
                            </div>
                    <?php
                        }
                    }
                    ?>

                </div>
            </div>

            <div class="slider-controls slider-controls--dark">
                <button class="glide__arrow arrow--left">prev</button>
                <div class="glide__bullets" data-glide-el="controls[nav]">
                    <?php
                    $count = 0;
                    foreach ($attributes['slides'] as $key => $slide) {
                        $num = $count + 1;
                        ?>
                        <button class="glide__bullet slider__bullet" data-glide-dir="=<?= $count ?>" aria-label="slide <?= $num ?>"></button>
                        <?php
                        if ($slide["link2_title"]) {
                            $count = $count + 1;
                            $num = $count + 1;
                            ?>
                            <button class="glide__bullet slider__bullet" data-glide-dir="=<?= $count ?>" aria-label="slide <?= $num ?>"></button>
                        <?php
                        }
                        $count = $count + 1;
                    }
                    ?>
                </div>
                <button class="glide__arrow arrow--right">next</button>
            </div>
        </div>
    <?php
    }

    if (sizeof($linkCards) > 0) {
        foreach ($linkCards as $slide) {
            $content_x = $slide["left"] >= 50 ? 'calc(' . $slide["left"] . '% - 420px)' : 'calc(' . $slide["left"] . '% + 40px)';
            $content_y = $slide["top"] >= 50 ? 'calc(' . $slide["top"] . '% - 360px)' : 'calc(' . $slide["top"] . '% - 40px)';
    ?>
            <div class="hot-spot-content" id="<?= $slide["id"] ?>" style="top: <?= $content_y ?>; left: <?= $content_x ?>;">
                <?php
                if ($slide["linkURL"]) {
                    $target = $slide["external"] ? 'target="_blank"' : 'target="_self"';
                ?>
                    <a class="purdue-home-cta-card purdue-home-cta-card--stack" href="<?= $slide["linkURL"] ?>" <?= $target ?>>
                    <?php
                } else {
                    ?>
                    <div class="purdue-home-cta-card purdue-home-cta-card--stack">
                    <?php
                }
                ?>
                <figure class="image is-16by9">
                    <img src="<?= $slide["mediaURL"] ?>" alt="<?= $slide["mediaAlt"] ?>">
                </figure>
                <div class="flex-container">
                    <?php
                    if ($slide["tag"]) {
                    ?>
                        <p class="purdue-home-cta-card__tag"><?= $slide["tag"] ?></p>
                    <?php
                    }
                    ?>
                     <?php
                    if ($slide["title"]) {
                    ?>
                    <p class="purdue-home-cta-card__title"><?= $slide["title"] ?></p>
                    <?php
                    }
                    ?>
                    <?php
                    if ($slide["content"]) {
                    ?>
                    <p class="purdue-home-cta-card__content"><?= $slide["content"] ?></p>
                    <?php
                    }
                    ?>
                    <?php
                    if ($slide["linkURL"]) {
                    ?>
                        <p class="cta-link"><?= $slide["linkText"] ?></p>
                    <?php
                    }
                    ?>
                </div>
                <?php
                if ($slide["linkURL"]) {
                ?>
                    </a>
                <?php
                } else {
                ?>
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
} // Closing the main div
?> 
