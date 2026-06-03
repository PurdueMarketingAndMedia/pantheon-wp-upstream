<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
$blockClass = "purdue-home-featured-story";
$blockClass .= " " . $attributes['className'];
?>

<div <?= $id ?> class="<?= $blockClass ?>">
    <div class="section has-<?= $attributes['background'] ?>-background<?= $attributes['paddingTop'] ? ' ' . $attributes['paddingTop'] : '' ?><?= $attributes['paddingBottom'] ? ' ' . $attributes['paddingBottom'] : '' ?>">
        <div class="container">

            <?php if ($attributes['subheader'] != ""): ?>
                <?php
                $subheaderclass = "tagged-header";
                if ($attributes['background'] != "gold") {
                    $subheaderclass .= " tagged-header--gold";
                }
                ?>
                <div class="tagged-header-container">
                    <h2 class="<?= $subheaderclass ?>"><?= $attributes["subheader"] ?></h2>
                </div>
            <?php endif; ?>

            <div class="columns purdue-home-featured-story__container<?= $attributes["contentAlign"] === "left" ? " purdue-home-featured-story__container--reversed" : "" ?><?= $attributes["layout"] && $attributes["layout"] === "50-50" ? " purdue-home-featured-story__container--50" : "" ?>">
                <div class="column purdue-home-featured-story__image-container">

                    <?php if ($attributes['youtubeLink']): ?>
                        <?php
                        preg_match('%(?:youtube(?:-nocookie)?.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu.be/)([^"&?/ ]{11})%i', $attributes["youtubeLink"], $match);
                        $videoId = print_r($match[1], TRUE);
                        ?>

                        <?php if ($videoId): ?>
                            <?php
                            $cardClass = "purdue-home-cta-card purdue-home-cta-card--horizontal";
                            $cardClass .= " purdue-home-cta-card--video";
                            ?>
                            <div class="<?= $cardClass ?>">
                                <figure class="image is-16by9">
                                    <?php if ($attributes['mediaType'] == "image"): ?>
                                        <img class="purdue-home-background-image" alt="<?= $attributes["mediaAlt"] ?>" src="<?= $attributes["mediaURL"] ?>"/>
                                    <?php elseif ($attributes['mediaType'] == "video"): ?>
                                        <video preload="metadata" class="purdue-home-background-image" title="<?= $attributes['mediaTitle'] ?>" muted playsinline="">
                                            <source src="<?= $attributes["mediaURL"] ?>#t=0.1">
                                        </video>
                                    <?php endif; ?>
                                </figure>
                                <div class="flex-container flex-container--align-center">
                                    <span class="cta-link purdue-home-cta-card__link">Watch Video</span>
                                    <img class="cta-icon cta-icon--play" src="<?php echo get_template_directory_uri() ?>/imgs/play_icon_gold.svg" alt="">                                       
                                </div>
                                <?php
                                $protocol = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
                                $origin = $protocol . $_SERVER['HTTP_HOST'];
                                $youtubeurl = 'https://www.youtube.com/embed/' . $videoId . '?rel=0&autoplay=1&enablejsapi=1&mute=1&origin=' . $origin;
                                ?>
                                <div class="iframe-container is-sr-only">
                                    <div class="youtube-video" id="<?= $videoId ?>" data-title="<?= $attributes['mediaTitle'] ?>" data-src="<?= $youtubeurl ?>"></div>
                                </div>
                            </div>
                        <?php else: ?>
                            <p>Please enter a valid Youtube URL.</p>
                        <?php endif; ?>

                    <?php else: ?>
                        <figure class="image is-16by9">
                            <?php if ($attributes['mediaType'] == "image"): ?>
                                <img class="purdue-home-background-image" alt="<?= $attributes["mediaAlt"] ?>" src="<?= $attributes["mediaURL"] ?>"/>
                            <?php elseif ($attributes['mediaType'] == "video"): ?>
                                <video preload="metadata" class="purdue-home-background-image" title="<?= $attributes['mediaTitle'] ?>" controls playsinline="">
                                    <source src="<?= $attributes["mediaURL"] ?>#t=0.1">
                                </video>
                            <?php endif; ?>
                        </figure>
                    <?php endif; ?>

                </div>
                <div class="column purdue-home-featured-story__content-container">
                    <?php if ($attributes['header'] != ""): ?>
                        <?php 
                        $class = 'purdue-home-featured-story__header'; 
                        if ($attributes['subheader'] == ""):
                        ?>
                        <h2 class="<?= $class ?>"><?= $attributes['header'] ?></h2>
                        <?php 
                        elseif ($attributes['subheader'] != ""):
                        ?>
                        <h3 class="<?= $class ?>"><?= $attributes['header'] ?></h3>
                    <?php 
                        endif; 
                    endif; 
                    ?>

                    <?= $content ?>

                    <?php if ($attributes['links'] && sizeof($attributes['links']) > 0 && $attributes['links'][0]['linkURL']): 
                        $buttonList = sizeof($attributes['links']) > 1 ? "ul" : "div";
                        $buttonWrapper = sizeof($attributes['links']) > 1 ? "li" : "div";
                    ?>
                        <<?= $buttonList ?> class="purdue-home-button-list">
                            <?php foreach ($attributes['links'] as $key => $link): ?>
                                <?php
                                $target = $link["external"] ? 'target="_blank"' : 'target="_self"';
                                $external = isset($link["external"]) && $link["external"] == 'target="_blank"' ? "(Opens in a new tab)" : "";
                                $ariaLabel = "";
                                if(isset($link["ariaLabel"]) && $link["ariaLabel"]!==""){
                                    $ariaLabel = 'aria-label="'.$link["ariaLabel"].' '.$external.'"';
                                }elseif(isset($external) && $external!==""){
                                    $ariaLabel = isset($link["linkText"])? 'aria-label="'.trim($link["linkText"]).' '.$external.'"':'';
                                }else{
                                    $ariaLabel = "";
                                }
                                $buttonClass = isset($link["buttonCSS"]) ? "purdue-home-button " . $link["buttonCSS"] : "purdue-home-button";
                                if ($link["buttonColor"] == "black") {
                                    $buttonClass .= " purdue-home-button--black";
                                }elseif($link["buttonColor"] == "white") {
                                    $buttonClass .= " purdue-home-button--white";
                                }
                                $liClass = $link["fullWidth"] ? "purdue-home-button-wrap--full" : "";
                                ?>
                                <<?= $buttonWrapper ?> class="<?= $liClass ?>">
                                    <a class="<?= $buttonClass ?>" href="<?= $link["linkURL"] ?>" <?= $target ?> <?= $ariaLabel ?>><?= trim($link["linkText"]) ?></a>
                                </<?= $buttonWrapper ?>>
                            <?php endforeach; ?>
                        </<?= $buttonList ?>>
                    <?php endif; ?>

                </div>
            </div>

        </div>
    </div>
</div>
