<div class="modal-background"></div>
<div class="modal-close" aria-label="close"></div>
<?php 
    $class="";  
    if (array_key_exists('youtubeURL', $attributes) && $attributes['youtubeURL'] != ""){
        $class.=" alert-page__video";
    }
    if (array_key_exists('showOnce', $attributes) && !$attributes['showOnce']){
        $class.=" show-multiple-times";
    }
?>

<div class="modal-content <?= $class; ?>">
    <?php if (array_key_exists('youtubeURL', $attributes) && $attributes['youtubeURL'] != ""): 
        preg_match('%(?:youtube(?:-nocookie)?.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu.be/)([^"&?/ ]{11})%i', $attributes["youtubeURL"], $match);
        $videoId = print_r($match[1], TRUE);
        $protocol = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
        $origin = $protocol . $_SERVER['HTTP_HOST'];
        $youtubeurl = 'https://www.youtube.com/embed/' . $videoId . '?rel=0&enablejsapi=1&origin=' . $origin;
        ?>
        <div class="iframe-container">
            <div class="modal-youtube-video alert-video" id="<?= $videoId.'Alert'; ?>" data-id="<?= $videoId; ?>" data-src="<?= $youtubeurl; ?>"></div>
        </div>
    <?php elseif ($attributes['imgURL'] != ""): ?>
        <img class="alert-page__image" src="<?= $attributes['imgURL'] ?>" alt="<?= $attributes['imgAlt'] ?>"/>
    <?php endif; ?>
    <?php if ($attributes['tag'] != ""): ?>
        <p class="alert-page__tag"><?= $attributes['tag'] ?></p>
    <?php endif; ?>

    <?php if ($attributes['header'] != ""): ?>
        <h2 class="alert-page__header"><?= $attributes['header'] ?></h2>
    <?php endif; ?>

    <?php if ($attributes['subtext'] != ""): ?>
        <p class="alert-page__subtext"><?= $attributes['subtext'] ?></p>
    <?php endif; ?>

    <?php if ($attributes['linkURL'] != ""):
        $target = $attributes["external"] ? 'target="_blank"' : 'target="_self"';
    ?>
        <a class="alert-page__link purdue-home-button" href="<?= $attributes['linkURL'] ?>" <?= $target ?>><?= $attributes['linkText'] ?></a>
    <?php endif; ?>
</div>