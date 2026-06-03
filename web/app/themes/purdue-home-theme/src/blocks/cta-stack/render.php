<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
?>
<div <?= $id ?> class="purdue-home-cta-stack has-<?= $attributes['background'] ?>-background <?= $attributes['className'] ?>">
    <div class="section has-padding-top-large has-padding-bottom-large">
        <div class="container">
            <?php if (($content && strlen($content) > 0) || $attributes['header']) : ?>
                <div class="purdue-home-cta-stack__intro">
                    <?php if ($attributes['header']) { ?>
                        <h2 class="purdue-home-intro-text__header header-font-united purdue-home-cta-stack__header"><?= $attributes['header'] ?></h2>
                    <?php } ?>
                    <?php if ($content && strlen($content) > 0) : ?>
                        <div class="purdue-home-cta-stack__content">
                            <?= $content ?>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
            <?php if (sizeof($attributes['cards']) > 0) : ?>
                <div class="purdue-home-cta-stack__cards">
                    <div class="columns">
                        <?php foreach ($attributes['cards'] as $card) : 
                            $headingLevel = $attributes['header'] ? 'h3' : 'h2';
                        ?>
                            <div class="column">
                                <?php
                                $cardClass = "purdue-home-cta-card purdue-home-cta-card--horizontal";
                                $target = $card["external"] ? 'target="_blank"' : 'target="_self"';
                                ?>
                                <a class="<?= $cardClass ?>" href="<?= $card["linkURL"] ?>" <?= $target ?>>
                                    <figure class="image">
                                        <img class="purdue-home-background-image" alt="<?= $card["mediaAlt"] ?>" src="<?= $card["mediaURL"] ?>" />
                                    </figure>
                                    <div class="flex-container flex-container--align-center">
                                        <<?= $headingLevel ?> class="purdue-home-cta-stack__card-title"><?= $card["title"] ?></<?= $headingLevel ?>>
                                        <p class="purdue-home-cta-stack__card-subtext"><?= $card["subtext"] ?></p>
                                    </div>
                                </a>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>
