<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
?>
<div<?= $id ?> class="purdue-home-video-embed <?= $attributes['className'] ?>">
    <?php
    $blockclass = 'section';
    $blockclass .= ' has-' . $attributes['background'] . '-background';

    if ($attributes['paddingTop']) {
        $blockclass .= ' ' . $attributes['paddingTop'];
    }
    if ($attributes['paddingBottom']) {
        $blockclass .= ' ' . $attributes['paddingBottom'];
    }
    if ($attributes['removeSidePadding']) {
        $blockclass .= ' has-no-sidepadding';
    }
    ?>
    <div class="<?= $blockclass ?>">
        <div class="container <?= $attributes['aspectRatio']; ?>">
            <?php if ($attributes['header'] != "") : ?>
            <div class="tagged-header-container">
                <h2 class="tagged-header purdue-home-video-embed__header"><?= $attributes["header"] ?></h2>
            </div>
            <?php endif; ?>

            <?php
            preg_match('%(?:youtube(?:-nocookie)?.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu.be/)([^"&?/ ]{11})%i', $attributes["youtubeLink"], $match);
            if (isset($match[1])) {
                $videoId = print_r($match[1], TRUE);
            } else {
                $videoId = '';
            }

            if ($videoId){
                $cardClass = "purdue-home-cta-card purdue-home-cta-card--horizontal";
                $cardClass .= " purdue-home-cta-card--video";
                if($attributes["mediaURL"] && $attributes["mediaURL"] != ""){
                    $mediaURL = $attributes["mediaURL"];
                    $mediaAlt = $attributes["mediaAlt"];
                }else{
                    $mediaURL = "https://img.youtube.com/vi/".$videoId."/maxresdefault.jpg";
                    $mediaAlt = "";
                }
                $protocol = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
                $origin = $protocol . $_SERVER['HTTP_HOST'];
                $youtubeurl = 'https://www.youtube.com/embed/' . $videoId . '?rel=0&autoplay=1&enablejsapi=1&mute=1&origin=' . $origin;
                require __DIR__ . '/inc/videoCard.php';
            }
            else { ?>
            <p>Please enter a valid Youtube URL.</p>
            <?php } ?>
        </div>
    </div>
    </div>