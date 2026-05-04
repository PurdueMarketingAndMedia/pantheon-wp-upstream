<?php 
    $id = $attributes['id'] != "" ? 'id="' . $attributes['id'] . '"' : "" ;
    $blockclass = 'section';
    $blockclass .= ' has-' . $attributes['background'] . '-background';
    $blockclass .= ' has-padding-top-large has-padding-bottom-large'
?>
<div <?= $id ?> class="purdue-home-cta-banner purdue-home-teritary-hero <?= $attributes['className'] ?>">
    <?php 
    if($attributes['background']=="image"){
    ?>
        <div class="image">
            <?php if ($attributes['mediaType'] == "image"): ?>
                <img alt="<?= $attributes["mediaAlt"]; ?>" src="<?= $attributes["mediaURL"]; ?>"/>
            <?php elseif ($attributes['mediaType'] == "video"): ?>
                <video preload="metadata" title="<?= $attributes['mediaTitle']; ?>" muted playsinline="">
                    <source src="<?= $attributes["mediaURL"]; ?>#t=0.1">
                </video>
            <?php endif; ?>
        </div>
    <?php
    }
    ?>
    <div class="<?= $blockclass ?> ">
        <div class="container">
            <h1 class="second-level-page-heading purdue-home-teritary-hero__header"><?= $attributes['header'] ?></h1>
            <div class="purdue-home-teritary-hero__content">
                <?= $content ?>
            </div>
            <?php if ($attributes['links'] && sizeof($attributes['links']) > 0 && $attributes['links'][0]['linkURL']): ?>
                <ul class="purdue-home-button-list">
                    <?php foreach ($attributes['links'] as $key => $link): ?>
                        <?php
                        $target = $link["external"] ? 'target="_blank"' : 'target="_self"';
                        $buttonClass = "purdue-home-button";
                        if ($link["buttonColor"] == "black") {
                            $buttonClass .= " purdue-home-button--black";
                        }elseif($link["buttonColor"] == "white") {
                            $buttonClass .= " purdue-home-button--white";
                        }
                        $liClass = $link["fullWidth"] ? "purdue-home-button-wrap--full" : "";
                        ?>
                        <li class="<?= $liClass; ?>">
                            <a class="<?= $buttonClass; ?>" href="<?= $link["linkURL"]; ?>" <?= $target; ?>>
                                <?= trim($link["linkText"]); ?>
                            </a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>
        </div>
    </div>
</div>
