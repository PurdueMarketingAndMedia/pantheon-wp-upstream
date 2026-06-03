<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
$blockclass = 'purdue-home-mixed-rtb has-' . $attributes['background'] . '-background';
if ($attributes['paddingTop']) {
    $blockclass .= ' ' . $attributes['paddingTop'];
}
if ($attributes['paddingBottom']) {
    $blockclass .= ' ' . $attributes['paddingBottom'];
}
$blockclass .= ' ' . $attributes['className'];
$iframes = [];
?>

    <div <?= $id ?> class="<?= $blockclass ?>">
        <div class="section">
            <div class="container">
                <div class="columns is-multiline">
                    <?php if (sizeof($attributes['smallCards']) > 0 && ($attributes['smallCards'][0]["mediaURL"] != "" || $attributes['smallCards'][0]["linkURL"] != "")): ?>
                        <div class="column is-one-quarter-desktop is-half-tablet is-full-mobile">
                            <?php foreach ($attributes['smallCards'] as $card): ?>
                                <?php
                                    $cardClass = "purdue-home-cta-card purdue-home-cta-card--horizontal";
                                    $cardClass .= isset($card["rtbCSS"]) ? " " . $card["rtbCSS"] : "";

                                    if ($card['linkType'] == "video") {
                                        $cardClass .= " purdue-home-cta-card--video";
                                        echo '<div class="' . $cardClass . '">';
                                    } elseif ($card['linkType'] == "story") {
                                        $target = $card["external"] ? 'target="_blank"' : 'target="_self"';
                                        $ariaLabel = "";
                                        if ($card["external"] == true) {
                                            $ariaLabel = 'aria-label="' . $card["linkText"] . 'Opens in a new tab"';
                                        }
                                        echo '<a class="' . $cardClass . '" href="' . $card["linkURL"] . '" ' . $target . ' ' . $ariaLabel . '>';
                                    } else {
                                        $cardClass .= " purdue-home-cta-card--nolink";
                                        echo '<div class="' . $cardClass . '">';
                                    }
                                ?>


                                <div class="image is-16by9">
                                    <?php if ($card['mediaType'] == "image"): ?>
                                        <img class="purdue-home-background-image" alt="<?= $card["mediaAlt"] ?>"
                                             src="<?= $card["mediaURL"] ?>"/>
                                    <?php elseif ($card['mediaType'] == "video"): ?>
                                        <video preload="metadata" class="purdue-home-background-image"
                                               title="<?= $card['mediaTitle'] ?>" loop muted playsinline="">
                                            <source src="<?= $card["mediaURL"] ?>#t=0.1">
                                        </video>
                                    <?php endif; ?>
                                </div>

                                <?php if ($card['linkType'] != "none"): ?>
                                    <?php if ($card['linkType'] == "video"):
                                        preg_match('%(?:youtube(?:-nocookie)?.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu.be/)([^"&?/ ]{11})%i', $card["linkURL"], $match);
                                        $videoId = print_r($match[1], TRUE);
                                        $iframes[$card["linkText"]] = $videoId;
                                        ?>
                                        <button class="flex-container flex-container--align-center dialog-trigger"
                                            data-target="iframe-<?= $videoId; ?>"
                                            tabindex="0"
                                            aria-haspopup="dialog"
                                            aria-expanded="false"
                                            aria-controls="iframe-<?= $videoId; ?>"
                                        >
                                    <?php elseif ($card['linkType'] == "story"): ?>
                                        <div class="flex-container flex-container--align-center">
                                    <?php endif; ?>
                                        <span class="cta-link purdue-home-cta-card__link"><?= $card["linkText"] ?></span>
                                        <?php if ($card['linkType'] == "story"): ?>
                                            <img class="cta-icon cta-icon--arrow"
                                                 src="<?php echo get_template_directory_uri() ?>/imgs/arrow_circle_icon_gold.svg"
                                                 alt="">
                                        <?php elseif ($card['linkType'] == "video"): ?>
                                            <img class="cta-icon cta-icon--play"
                                                 src="<?php echo get_template_directory_uri() ?>/imgs/play_icon_gold.svg"
                                                 alt="">
                                        <?php endif; ?>

                                    <?php if ($card['linkType'] !== "video"): ?>
                                        </div>
                                    <?php else: ?>
                                        </button>
                                    <?php endif; ?>
                                <?php endif; ?>

                                <?php if ($card['linkType'] == "video" || $card['linkType'] == "none"): ?>
                                    </div>
                                <?php else: ?>
                                    </a>
                                <?php endif; ?>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>

                    <?php if (sizeof($attributes['sliderCards']) > 0): ?>
                        <?php foreach ($attributes['sliderCards'] as $slide): ?>

                            <?php
                            $rtbClass = isset($slide["rtbCSS"]) ? " " . $slide["rtbCSS"] : "";
                            $class = "purdue-home-proofpoint";
                            $class .= " has-" . $slide['background'] . "-background";
                            $class .= $rtbClass;
                            $target = $slide["external"] ? 'target="_blank"' : 'target="_self"';
                            $ariaLabel = "";
                            ?>

                            <div class="column is-one-quarter-desktop is-half-tablet is-full-mobile mobile-hidden">
                                <?php if ($slide['type'] == "rtb"): ?>
                                    <?php
                                    if ($slide["external"] == true) {
                                        if ($slide['source']) {
                                            $ariaLabel = 'aria-label="' . $slide["source"] . ' (Opens in a new tab)"';
                                        }
                                    }
                                    ?>
                                    <div class="<?= $class ?>">
                                        <div class="flex-container flex-container--align-center">
                                            <?php if ($slide['lead']): ?>
                                                <span class="purdue-home-proofpoint__lead"><?= $slide['lead'] ?></span>
                                            <?php endif; ?>
                                            <?php if ($slide['title']): ?>
                                                <span class="purdue-home-proofpoint__highlighted"><?= $slide['title'] ?></span>
                                            <?php endif; ?>
                                            <?php if ($slide['smallText']): ?>
                                                <span class="purdue-home-proofpoint__content"><?= $slide['smallText'] ?></span>
                                            <?php endif; ?>
                                            <?php if ($slide['source'] && $slide['linkURL']): ?>
                                                <a class="purdue-home-proofpoint__source"
                                                   href="<?= $slide['linkURL'] ?>"
                                                        <?= $target ?> <?= $ariaLabel ?>><?= $slide['source'] ?></a>
                                            <?php elseif ($slide['source'] && $slide['linkURL'] == ""): ?>
                                                <span class="purdue-home-proofpoint__source"><?= $slide['source'] ?></span>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                <?php elseif ($slide['type'] == "story"): ?>
                                    <?php
                                    if ($slide["external"] == true) {
                                        if ($slide["title"]) {
                                            $ariaLabel = 'aria-label="' . $slide["title"] . ' (Opens in a new tab)"';
                                        } elseif ($slide["ctaText"]) {
                                            $ariaLabel = 'aria-label="' . $slide["ctaText"] . ' (Opens in a new tab)"';
                                        } else {
                                            $ariaLabel = 'aria-label="Opens in a new tab"';
                                        }
                                    }

                                    $imageClass = isset($slide['reverseShade']) && $slide['reverseShade'] ? " has-reverse-shade" : "";
                                    ?>
                                    <a class="purdue-home-cta-card purdue-home-cta-card--vertical<?= $imageClass ?> <?= $rtbClass; ?>"
                                       href="<?= $slide["linkURL"] ?>" <?= $target ?>>
                                        <div class="image is-4by5">
                                            <?php if ($slide['mediaType'] == "image"): ?>
                                                <img class="purdue-home-background-image"
                                                     alt="<?= $slide["mediaAlt"] ?>"
                                                     src="<?= $slide["mediaURL"] ?>"/>
                                            <?php elseif ($slide['mediaType'] == "video"): ?>
                                                <video preload="metadata" class="purdue-home-background-image" muted
                                                       playsinline="">
                                                    <source src="<?= $slide["mediaURL"] ?>#t=0.1">
                                                </video>
                                            <?php endif; ?>
                                        </div>
                                        <div class="flex-container flex-container--align-vertical-between">
                                            <?php if ($slide["ctaText"]): ?>
                                                <p class="purdue-home-cta-card__cta-text"><?= $slide["ctaText"] ?></p>
                                            <?php endif; ?>
                                            <p class="cta-link purdue-home-cta-card__link"><?= $slide["title"] ?></p>
                                        </div>
                                    </a>
                                <?php elseif ($slide['type'] == "image"): ?>
                                    <div class="purdue-home-cta-card purdue-home-cta-card--vertical purdue-home-cta-card--nolink <?= $rtbClass; ?>">
                                        <div class="image is-4by5">
                                            <?php if ($slide['mediaType'] == "image"): ?>
                                                <img class="purdue-home-background-image"
                                                     alt="<?= $slide["mediaAlt"] ?>"
                                                     src="<?= $slide["mediaURL"] ?>"/>
                                            <?php elseif ($slide['mediaType'] == "video"): ?>
                                                <video preload="metadata" class="purdue-home-background-image" muted
                                                       playsinline="">
                                                    <source src="<?= $slide["mediaURL"] ?>#t=0.1">
                                                </video>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                <?php elseif ($slide['type'] == "video"): ?>
                                    <div class="purdue-home-cta-card purdue-home-cta-card--horizontal purdue-home-cta-card--video <?= $rtbClass; ?>"
                                         tabindex="0">
                                        <div class="image is-4by5">
                                            <?php if ($slide['mediaType'] == "image"): ?>
                                                <img class="purdue-home-background-image"
                                                     alt="<?= $slide["mediaAlt"] ?>"
                                                     src="<?= $slide["mediaURL"] ?>"/>
                                            <?php elseif ($slide['mediaType'] == "video"): ?>
                                                <video preload="metadata" class="purdue-home-background-image" muted
                                                       playsinline="">
                                                    <source src="<?= $slide["mediaURL"] ?>#t=0.1">
                                                </video>
                                            <?php endif; ?>
                                        </div>
                                        <?php
                                        preg_match('%(?:youtube(?:-nocookie)?.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu.be/)([^"&?/ ]{11})%i', $slide["linkURL"], $match);
                                        $videoId = print_r($match[1], TRUE);
                                        $iframes[] = $videoId;
                                        ?>
                                        <div class="flex-container flex-container--align-center modal-trigger"
                                             data-target="iframe-<?= $videoId; ?>">
                                            <span class="cta-link purdue-home-cta-card__link"><?= $slide["title"] ?></span>
                                            <img class="cta-icon cta-icon--play"
                                                 src="<?php echo get_template_directory_uri() ?>/imgs/play_icon_gold.svg"
                                                 alt="">
                                        </div>
                                    </div>
                                <?php else: ?>
                                    <div class="purdue-home-content-card has-<?= $slide['background'] ?>-background">
                                        <?php if ($slide["title"]): ?>
                                            <p class="purdue-home-content-card__title"><?= $slide["title"] ?></p>
                                        <?php endif; ?>
                                        <?php if ($slide["content"]): ?>
                                            <p class="purdue-home-content-card__content"><?= $slide["content"] ?></p>
                                        <?php endif; ?>
                                    </div>
                                <?php endif; ?>
                            </div>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <?php if (sizeof($attributes['sliderCards']) > 0): ?>
            <div class="glide purdue-home-slider--rtb mobile-show">
                <div class="glide__track" data-glide-el="track">
                    <div class="glide__slides">
                        <?php foreach ($attributes['sliderCards'] as $slide): ?>
                            <div class="glide__slide">
                                <?php
                                $rtbClass = isset($slide["rtbCSS"]) ? " " . $slide["rtbCSS"] : "";
                                $class = "purdue-home-proofpoint";
                                $class .= " has-" . $slide['background'] . "-background";
                                $class .= $rtbClass;
                                $target = $slide["external"] ? 'target="_blank"' : 'target="_self"';
                                $ariaLabel = "";
                                ?>

                                <?php if ($slide['type'] == "rtb"): ?>
                                    <?php
                                    if ($slide["external"] == true) {
                                        if ($slide['source']) {
                                            $ariaLabel = 'aria-label="' . $slide["source"] . ' (Opens in a new tab)"';
                                        }
                                    }
                                    ?>
                                    <div class="<?= $class ?>">
                                        <div class="flex-container flex-container--align-center">
                                            <?php if ($slide['lead']): ?>
                                                <span class="purdue-home-proofpoint__lead"><?= $slide['lead'] ?></span>
                                            <?php endif; ?>
                                            <?php if ($slide['title']): ?>
                                                <span class="purdue-home-proofpoint__highlighted"><?= $slide['title'] ?></span>
                                            <?php endif; ?>
                                            <?php if ($slide['smallText']): ?>
                                                <span class="purdue-home-proofpoint__content"><?= $slide['smallText'] ?></span>
                                            <?php endif; ?>
                                            <?php if ($slide['source'] && $slide['linkURL']): ?>
                                                <a class="purdue-home-proofpoint__source"
                                                   href="<?= $slide['linkURL'] ?>"
                                                        <?= $target ?> <?= $ariaLabel; ?>><?= $slide['source'] ?></a>
                                            <?php elseif ($slide['source'] && $slide['linkURL'] == ""): ?>
                                                <span class="purdue-home-proofpoint__source"><?= $slide['source'] ?></span>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                <?php elseif ($slide['type'] == "story"): ?>
                                    <?php
                                    $imageClass = isset($slide['reverseShade']) && $slide['reverseShade'] ? " has-reverse-shade" : "";

                                    if ($slide["external"] == true) {
                                        if ($slide["title"]) {
                                            $ariaLabel = 'aria-label="' . $slide["title"] . ' (Opens in a new tab)"';
                                        } elseif ($slide["ctaText"]) {
                                            $ariaLabel = 'aria-label="' . $slide["ctaText"] . ' (Opens in a new tab)"';
                                        } else {
                                            $ariaLabel = 'aria-label="Opens in a new tab"';
                                        }
                                    }
                                    ?>
                                    <div class="purdue-home-cta-card purdue-home-cta-card--vertical<?= $imageClass ?> <?= $rtbClass; ?>">
                                        <div class="image is-4by5">
                                            <?php if ($slide['mediaType'] == "image"): ?>
                                                <img class="purdue-home-background-image"
                                                     alt="<?= $slide["mediaAlt"] ?>"
                                                     src="<?= $slide["mediaURL"] ?>"/>
                                            <?php elseif ($slide['mediaType'] == "video"): ?>
                                                <video preload="metadata" class="purdue-home-background-image" muted
                                                       playsinline="">
                                                    <source src="<?= $slide["mediaURL"] ?>#t=0.1">
                                                </video>
                                            <?php endif; ?>
                                        </div>
                                        <div class="flex-container flex-container--align-vertical-between">
                                            <?php if ($slide["ctaText"]): ?>
                                                <p class="purdue-home-cta-card__cta-text"><?= $slide["ctaText"] ?></p>
                                            <?php endif; ?>
                                            <a class="cta-link purdue-home-cta-card__link"
                                               href="<?= $slide["linkURL"] ?>"
                                                    <?= $target ?> <?= $ariaLabel; ?>><?= $slide["title"] ?></a>
                                        </div>
                                    </div>
                                <?php elseif ($slide['type'] == "image"): ?>
                                    <div class="purdue-home-cta-card purdue-home-cta-card--vertical purdue-home-cta-card--nolink <?= $rtbClass; ?>">
                                        <div class="image is-4by5">
                                            <?php if ($slide['mediaType'] == "image"): ?>
                                                <img class="purdue-home-background-image"
                                                     alt="<?= $slide["mediaAlt"] ?>"
                                                     src="<?= $slide["mediaURL"] ?>"/>
                                            <?php elseif ($slide['mediaType'] == "video"): ?>
                                                <video preload="metadata" class="purdue-home-background-image" muted
                                                       playsinline="">
                                                    <source src="<?= $slide["mediaURL"] ?>#t=0.1">
                                                </video>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                <?php elseif ($slide['type'] == "video"): ?>
                                    <div class="purdue-home-cta-card purdue-home-cta-card--horizontal purdue-home-cta-card--video <?= $rtbClass; ?>"
                                         tabindex="0">
                                        <div class="image is-4by5">
                                            <?php if ($slide['mediaType'] == "image"): ?>
                                                <img class="purdue-home-background-image"
                                                     alt="<?= $slide["mediaAlt"] ?>"
                                                     src="<?= $slide["mediaURL"] ?>"/>
                                            <?php elseif ($slide['mediaType'] == "video"): ?>
                                                <video preload="metadata" class="purdue-home-background-image" muted
                                                       playsinline="">
                                                    <source src="<?= $slide["mediaURL"] ?>#t=0.1">
                                                </video>
                                            <?php endif; ?>
                                        </div>
                                        <?php
                                        preg_match('%(?:youtube(?:-nocookie)?.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu.be/)([^"&?/ ]{11})%i', $slide["linkURL"], $match);
                                        if (isset($match[1])) {
                                            $videoId = print_r($match[1], TRUE);
                                        } else {
                                            $videoId = '';
                                        }
                                        ?>
                                        <div class="flex-container flex-container--align-center modal-trigger"
                                             data-target="iframe-<?= $videoId; ?>">
                                            <span class="cta-link purdue-home-cta-card__link"><?= $slide["title"] ?></span>
                                            <img class="cta-icon cta-icon--play"
                                                 src="<?php echo get_template_directory_uri() ?>/imgs/play_icon_gold.svg"
                                                 alt="">
                                        </div>
                                    </div>
                                <?php else: ?>
                                    <div class="purdue-home-content-card has-<?= $slide['background'] ?>-background">
                                        <?php if ($slide["title"]): ?>
                                            <p class="purdue-home-content-card__title"><?= $slide["title"] ?></p>
                                        <?php endif; ?>
                                        <?php if ($slide["content"]): ?>
                                            <p class="purdue-home-content-card__content"><?= $slide["content"] ?></p>
                                        <?php endif; ?>
                                    </div>
                                <?php endif; ?>
                            </div>
                        <?php endforeach; ?>
                    </div>
                    <?php
                    $controlClass = $attributes['background'] == "black" ? "slider-controls slider-controls--dark" : "slider-controls";
                    ?>
                    <div class="<?= $controlClass; ?>">
                        <button class="glide__arrow arrow--left">previous</button>
                        <div class="glide__bullets" data-glide-el="controls[nav]">
                            <?php foreach ($attributes['sliderCards'] as $key => $card): ?>
                                <?php $num = $key + 1; ?>
                                <button class="glide__bullet slider__bullet" data-glide-dir="=<?= $key ?>"
                                        aria-label="slide <?= $num ?>"></button>
                            <?php endforeach; ?>
                        </div>
                        <button class="glide__arrow arrow--right">next</button>
                    </div>
                </div>
            </div>
        <?php endif; ?>
    </div>

    <!-- Print iframes -->
<?php
if (sizeof($iframes) > 0) :
    foreach ($iframes as $iframe => $value) :
        $protocol = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
        $origin = $protocol . $_SERVER['HTTP_HOST'];
        $youtubeurl = 'https://www.youtube.com/embed/' . $value . '?rel=0&enablejsapi=1&origin=' . $origin;
        ?>
        <dialog id="iframe-<?= $value; ?>" class="embed-video-modal dialog modal">
            <div class="modal-background">
            </div>
            <button class="modal-close" aria-label="Close <?php echo $iframe; ?> dialog"></button>
            <div class="modal-content">
                <div class="iframe-container">
                    <div class="modal-youtube-video" id="<?= $value; ?>" data-src="<?= $youtubeurl; ?>"></div>
                </div>
            </div>
        </dialog>
    <?php
    endforeach;
endif;
?>