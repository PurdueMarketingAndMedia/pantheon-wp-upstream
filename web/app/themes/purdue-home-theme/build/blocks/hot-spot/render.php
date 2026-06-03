<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
$blockclass = 'purdue-home-hot-spot';
$blockclass .= ' ' . $attributes['className'];
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
                        $ariaControlId1 = $slide["mediaId"] . '-' . uniqid();
                        $ariaControlId2 = $slide["mediaId"] . '-' . uniqid();
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
                                        <button class="hot-spot-button hot-spot-button--open" aria-haspopup="dialog" aria-controls="<?= $ariaControlId1 ?>" data-target="<?= $ariaControlId1 ?>"><span class="is-sr-only">Open <?= $slide["link1_title"] ?></span></button>
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
                                        <button class="hot-spot-button hot-spot-button--open" aria-haspopup="dialog" aria-controls="<?= $ariaControlId2 ?>" data-target="<?= $ariaControlId2 ?>"><span class="is-sr-only">Open <?= $slide["link2_title"] ?></span></button>
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

            <div class="slider-controls">
                <button class="glide__arrow arrow--left">previous</button>
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
                                        <div class="purdue-home-cta-card purdue-home-cta-card--stack">

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
                                            <h3 class="purdue-home-cta-card__title"><?= $slide["link1_title"] ?></h3>
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
                                                $target = $slide["link1_external"] ? 'target="_blank"' : 'target="_self"';
                                                $external = isset($slide["link1_external"]) && $slide["link1_external"] ? "(Opens in a new tab)" : "";
                                                $ariaLabel = "";
                                                if (isset($slide["link1_ariaLabel"]) && $slide["link1_ariaLabel"] != "") {
                                                    $ariaLabel = 'aria-label="' . $slide["link1_ariaLabel"] . ' ' . $external . '"';
                                                } elseif (isset($external) && $external != "") {                                                  
                                                    $ariaLabel = isset($slide["link1_linkText"]) ? 'aria-label="' . $slide["link1_linkText"] . ' ' . $external . '"' : '';
                                                   
                                                } else {
                                                    $ariaLabel = "";
                                                }
                                            ?>
                                                <p class="cta-link"><a class="cta-link-anchor" href="<?= $slide["link1_linkURL"] ?>" <?= $target ?> <?= $ariaLabel ?>><?= $slide["link1_linkText"] ?></a></p>
                                            <?php
                                            }
                                            ?>
                                        </div>
                                        <?php
                                        if ($slide["link1_linkURL"]) {
                                        ?>
                                            </div>
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
                                        <div class="purdue-home-cta-card purdue-home-cta-card--stack">

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
                                            <h3 class="purdue-home-cta-card__title"><?= $slide["link2_title"] ?></h3>
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
                                                $target = $slide["link2_external"] ? 'target="_blank"' : 'target="_self"';
                                                $external = isset($slide["link2_external"]) && $slide["link2_external"] ? "(Opens in a new tab)" : "";
                                                $ariaLabel = "";
                                                if (isset($slide["link2_ariaLabel"]) && $slide["link2_ariaLabel"] != "") {
                                                    $ariaLabel = 'aria-label="' . $slide["link2_ariaLabel"] . ' ' . $external . '"';
                                                } elseif (isset($external) && $external != "") {                                                  
                                                    $ariaLabel = isset($slide["link2_linkText"]) ? 'aria-label="' . $slide["link2_linkText"] . ' ' . $external . '"' : '';
                                                   
                                                } else {
                                                    $ariaLabel = "";
                                                }
                                            ?>
                                                <p class="cta-link"><a class="cta-link-anchor" href="<?= $slide["link2_linkURL"] ?>" <?= $target ?> <?= $ariaLabel ?>><?= $slide["link2_linkText"] ?></a></p>
                                            <?php
                                            }
                                            ?>
                                        </div>
                                       
                                        </div>
                                        
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

            <div class="slider-controls">
                <button class="glide__arrow arrow--left">previous</button>
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
            $button_top = $slide["top"] >= 50 ? 'calc(65% - 420px)' : '-83px';
            $button_left = $slide["left"] >= 50 ? '348px' : '-112px';
    ?>
            <div class="hot-spot-content" inert="true" role="dialog" id="<?= $slide["id"] ?>" style="top: <?= $content_y ?>; left: <?= $content_x ?>;">

                <div class="hot-spot" style="left: <?= $button_left ?>;">
                    <button class="hot-spot-button hot-spot-button--close"><span class="is-sr-only">Close - <?= $slide["title"] ?></span></button>      
                </div>
                            
              <div class="purdue-home-cta-card purdue-home-cta-card--stack">

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
                    <h3 class="purdue-home-cta-card__title"><?= $slide["title"] ?></h3>
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
                        $target = $slide["external"] ? 'target="_blank"' : 'target="_self"';
                        $external = isset($slide["external"]) && $slide["external"] ? "(Opens in a new tab)" : "";
                        $ariaLabel = "";
                        if (isset($slide["ariaLabel"]) && $slide["ariaLabel"] != "") {
                            $ariaLabel = 'aria-label="' . $slide["ariaLabel"] . ' ' . $external . '"';
                        } elseif (isset($external) && $external != "") {                                                  
                            $ariaLabel = isset($slide["linkText"]) ? 'aria-label="' . $slide["linkText"] . ' ' . $external . '"' : '';
                            
                        } else {
                            $ariaLabel = "";
                        }   
                    ?>
                        <p class="cta-link"> <a class="cta-link-anchor" href="<?= $slide["linkURL"] ?>" <?= $target ?> <?= $ariaLabel ?>><?= $slide["linkText"] ?></a></p>
                    <?php
                    }
                    ?>
                </div>
                <?php
                if ($slide["linkURL"]) {
                ?>
                    </div>
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
