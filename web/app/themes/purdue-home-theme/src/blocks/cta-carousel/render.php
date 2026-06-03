<?php $id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : ""; ?>
<div <?= $id ?> class="purdue-home-cta-carousel <?= $attributes['className'] ?>">
    <?php
    $blockclass = 'section';
    $blockclass .= ' has-' . $attributes['background'] . '-background';
    if ($attributes['paddingTop']) {
        $blockclass .= ' ' . $attributes['paddingTop'];
    }
    if ($attributes['paddingBottom']) {
        $blockclass .= ' ' . $attributes['paddingBottom'];
    }
    $defaultURL = "";
    ?>
    <div class="<?= $blockclass ?>">
        <div class="container">
            <?php
            if ($attributes['header'] != "") {
                $headerClass = $attributes['background'] != "gold" ? " tagged-header--gold" : "";
                ?>
            <div class="tagged-header-container">
                <h2 class="tagged-header<?= $headerClass ?>"><?= $attributes['header'] ?></h2>
            </div>
            <?php
            }
            $iframes = [];
            if (sizeof($attributes['cards']) > 0) {
            ?>
            <div class="purdue-home-cta-carousel__cards" data-columns="<?= sizeof($attributes['cards']) ?>">
                <div class="glide">
                    <div class="glide__track" data-glide-el="track">
                        <div class="glide__slides">
                            <?php
                                foreach ($attributes['cards'] as $card) {
                                    $headingTag = $attributes['header'] ? "h3" : "h2";
                                    if ($card['youtube'] != "") {
                                        $cardClass = " purdue-home-cta-card__has-youtube";
                                        preg_match('%(?:youtube(?:-nocookie)?.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu.be/)([^"&?/ ]{11})%i', $card['youtube'], $match);
                                        if (isset($match[1])) {
                                            $videoId = print_r($match[1], TRUE);
                                        } else {
                                            $videoId = '';
                                        }
                                        $iframes[] = $videoId;
                                        $defaultURL = "https://img.youtube.com/vi/".$videoId."/maxresdefault.jpg";
                                    } else {
                                        $cardClass = "";
                                    }
                                    if ($card['backgroundType'] === "color"){
                                        $cardClass .= ' has-' . $card['backgroundColor'] . '-background';
                                    }
                                    $backgroundImage = $card["backgroundURL"] ? 'style="background-image:url( '.$card["backgroundURL"].')"': "";
                                ?>
                            <div class="glide__slide">
                                <div class="purdue-home-cta-card purdue-home-cta-card--horizontal<?= $cardClass ?> purdue-home-cta-card-carousel--<?= $card['type']?>"
                                    <?= $backgroundImage ?>>
                                    <div class="purdue-home-cta-carousel__card-image">
                                        <div class="image is-16by9">
                                            <?php
                                                        if ($card['mediaType'] == "image") {
                                                            $mediaURL = $card['mediaURL'] !="" ? $card['mediaURL']:$defaultURL;
                                                        ?>
                                            <img class="purdue-home-background-image" alt="<?= $card["mediaAlt"] ?>"
                                                src="<?= $mediaURL ?>" />
                                            <?php
                                                        } elseif ($card['mediaType'] == "video") {
                                                        ?>
                                            <video preload="metadata" class="purdue-home-background-image" muted
                                                playsinline="">
                                                <source src="<?=  $card['mediaURL'] ?>#t=0.1">
                                            </video>
                                            <?php
                                                    }
                                                    if ($card['youtube'] != "") {
                                                    ?>
                                            <div class="flex-container flex-container--align-center">
                                                <div class="modal-trigger" data-target="iframe-<?= $videoId ?>">
                                                    <span class="cta-link purdue-home-cta-card__link">Watch Video</span>
                                                    <img class="cta-icon cta-icon--play"
                                                        src="<?php echo get_template_directory_uri() ?>/imgs/play_icon_gold.svg"
                                                        alt="">
                                                </div>
                                            </div>
                                            <?php
                                                    }
                                                    ?>
                                        </div>
                                    </div>
                                    <div class="purdue-home-cta-carousel__card-content">
                                        <?php
                                                if (isset($card['type']) && $card['type'] == "quote") {
                                                ?>
                                        <div class="purdue-home-cta-carousel__card-tag">
                                            <?php
                                                        if ($card['citeName']) {
                                                        ?>
                                            <span
                                                class="purdue-home-cta-carousel__cite-name"><?= $card['citeName'] ?></span>
                                            <?php
                                                        }
                                                        if ($card['citeTitle']) {
                                                        ?>
                                            <span
                                                class="purdue-home-cta-carousel__cite-title"><?= $card['citeTitle'] ?></span>
                                            <?php
                                                        }
                                                        ?>
                                        </div>
                                        <<?= $headingTag ?> class="purdue-home-cta-carousel__quote-content"><?= $card['subtext'] ?></<?= $headingTag ?> >
                                        <?php
                                                } else if (isset($card['type']) && $card['type'] == "story") {
                                                    if ($card['tag']) {
                                                ?>
                                        <div class="purdue-home-cta-carousel__card-tag">
                                            <span class="purdue-home-cta-carousel__cite-name"><?= $card['tag'] ?></span>
                                        </div>
                                        <?php
                                                    }
                                                ?>
                                        <div class="purdue-home-cta-carousel__story-wrap">
                                            <<?= $headingTag ?> class="purdue-home-cta-carousel__story-title"><?= $card['title'] ?></<?= $headingTag ?>>
                                            <?php
                                                        if ($card['subtext']) {
                                                        ?>
                                            <p class="purdue-home-cta-carousel__story-content"><?= $card['subtext'] ?>
                                            </p>
                                            <?php
                                                        }
                                                        ?>
                                        </div>
                                        <?php
                                                }else{ 

                                                    //Is type profile 
                                                    
                                                    ?>

                                                    <div>

                                                        <div class="purdue-home-cta-carousel__story-wrap cta-profile">

                                                            <<?= $headingTag ?> class="purdue-home-cta-carousel__story-title"><?= $card['title'] ?></<?= $headingTag ?>>
                                                            <?php
                                                                        if ($card['subtext']) {
                                                                        ?>
                                                            <p class="purdue-home-cta-carousel__story-content"><?= $card['subtext'] ?>
                                                            </p>
                                                            <?php
                                                                        }
                                                                        ?>
                                                        </div>

                                                        <div class="purdue-home-cta-carousel__card-tag">
                                                            <?php
                                                                        if ($card['citeName']) {
                                                                        ?>
                                                            <span
                                                                class="purdue-home-cta-carousel__cite-name"><?= $card['citeName'] ?></span>
                                                            <?php
                                                                        }
                                                                        if ($card['citeTitle']) {
                                                                        ?>
                                                            <br>
                                                            <span
                                                                class="purdue-home-cta-carousel__cite-title"><?= $card['citeTitle'] ?></span>
                                                            <?php
                                                                        }
                                                                        ?>
                                                        </div>

                                                    </div>

                                                   
                                               <?php }
                                                if ($card['linkURL1'] && $card['youtube'] == "" && $card['type'] !== "profile") {
                                                    $target1 = $card["external1"] ? 'target="_blank"' : 'target="_self"';
                                                    $target2 = $card["external2"] ? 'target="_blank"' : 'target="_self"';
                                                    $color1 = $card["color1"] == "black" ? ' purdue-home-button--black' : '';
                                                    $color2 = $card["color2"] == "black" ? ' purdue-home-button--black' : '';
                                                ?>

                                    <?php if ($card['type'] != "profile") { 
                                        $buttonList = $card['linkURL2'] && $card['youtube'] == "" ? "ul" : "div";
                                        $buttonWrapper = $card['linkURL2'] && $card['youtube'] == ""  ? "li" : "div";
                                    ?>
                                        <<?= $buttonList ?> class="purdue-home-button-list">
                                            
                                            <<?= $buttonWrapper ?>><a class="purdue-home-button<?= $color1 ?>"
                                                    href="<?= $card["linkURL1"] ?>"
                                                    <?= $target1 ?>><?= trim($card["linkText1"]) ?></a></<?= $buttonWrapper ?>>
                                            <?php
                                                if ($card['linkURL2'] && $card['youtube'] == "") {
                                                        ?>
                                                <<?= $buttonWrapper ?>><a class="purdue-home-button<?= $color2 ?>"
                                                    href="<?= $card["linkURL2"] ?>"
                                                    <?= $target2 ?>><?= trim($card["linkText2"]) ?></a></<?= $buttonWrapper ?>>
                                            <?php
                                                }
                                                ?>
                                        </<?= $buttonList ?>>
                                        <?php }?>
                                        <?php
                                                }
                                                ?>
                                    </div>
                                </div>
                            </div>
                            <?php
                                }
                                ?>
                        </div>
                    </div>
                </div>
                <?php
                    $controlClass = $attributes['background'] == "black" ? " slider-controls--dark" : "";
                    ?>
                <div class="slider-controls<?= $controlClass ?>">
                    <button class="glide__arrow arrow--left">previous</button>
                    <div class="glide__bullets" data-glide-el="controls[nav]">
                        <?php
                            foreach ($attributes['cards'] as $key => $card) {
                                $num = $key + 1;
                            ?>
                        <button class="glide__bullet slider__bullet" data-glide-dir="=<?= $key ?>"
                            aria-label="slide <?= $num ?>"></button>
                        <?php
                            }
                            ?>
                    </div>
                    <button class="glide__arrow arrow--right">next</button>
                </div>
            </div>
            <?php
            }
            ?>
        </div>
    </div>
</div>
<?php
// Print iframes
if (sizeof($iframes) > 0) {
    foreach ($iframes as $iframe) {
        $protocol = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
        $origin = $protocol . $_SERVER['HTTP_HOST'];
        $youtubeurl = 'https://www.youtube.com/embed/' . $iframe . '?rel=0&enablejsapi=1&origin=' . $origin;
    ?>
<div id="iframe-<?= $iframe ?>" class="embed-video-modal modal">
    <div class="modal-background">
    </div>
    <div class="modal-close" aria-label="close"></div>
    <div class="modal-content">
        <div class="iframe-container">
            <div class="modal-youtube-video" id="<?= $iframe ?>" data-src="<?= $youtubeurl ?>"></div>
        </div>
    </div>
</div>
<?php
    }
}
?>