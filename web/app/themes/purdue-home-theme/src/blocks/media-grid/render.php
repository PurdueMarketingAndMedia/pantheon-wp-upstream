<?php
require_once __DIR__ . '/inc/functions.php';
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
?>
<div<?= $id ?> class="purdue-home-media-grid has-<?= $attributes['background'] ?>-background <?= $attributes['className'] ?>">
    <div class="section has-padding-top-large has-padding-bottom-large">
        <div class="container">
            <div class="columns">
                <div class="column is-three-fifths">
                    <?php
                    if (sizeof($attributes['medias']) > 0) {
                        foreach ($attributes['medias'] as $key => $media) {
                            if ($key < 2) {
                                $images = out_image($media);
                                echo $images;
                            }
                        }
                    }
                    ?>
                    <div class="purdue-home-media-grid__content-wrap">
                        <div class="purdue-home-media-grid__content">
                            <?php if ($attributes['header'] != "") : ?>
                                <h2 class="purdue-home-media-grid__header"><?= $attributes['header']; ?></h2>
                            <?php endif; ?>
                            <?php if ($attributes['subtext'] != ""): ?>
                                <p class="purdue-home-media-grid__subtext"><?= $attributes['subtext']; ?></p>
                            <?php endif; ?>
                            <?php if ($attributes['links'] && sizeof($attributes['links']) > 0 && $attributes['links'][0]["linkURL"] !== "") : ?>
                                <ul class="purdue-home-button-list">
                                <?php foreach ($attributes['links'] as $key => $link): ?>
                                    <?php 
                                        $target = $link["external"] ? 'target="_blank"' : 'target="_self"';
                                        $buttonClass = "purdue-home-button";
                                        if ($link["buttonColor"] == "black") {
                                            $buttonClass .= " purdue-home-button--black";
                                        }elseif ($link["buttonColor"] == "white") {
                                            $buttonClass .= " purdue-home-button--white";
                                        }
                                        $liClass = $link["fullWidth"] ? "purdue-home-button-wrap--full" : "";
                                    ?>
                                    <li class="<?= $liClass; ?>">
                                        <a class="<?= $buttonClass; ?>" href="<?= $link["linkURL"]; ?>" <?= $target; ?>><?= trim($link["linkText"]); ?></a>
                                    </li>
                                <?php endforeach; ?>
                                </ul>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
                <div class="column is-two-fifths">
                    <?php
                    if (sizeof($attributes['medias']) > 2) {
                        foreach ($attributes['medias'] as $key => $media) {
                            if ($key >= 2) {
                                $images = out_image($media);
                                echo $images;
                            }
                        }
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>
</div>
