<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : '';
?>
<div <?= $id ?> class="purdue-home-two-column-cta <?= $attributes['className'] ?>">
    <?php
    if (sizeof($attributes['cards']) > 0) {
    ?>
        <div class="purdue-home-two-column-cta__cards">
            <?php
            foreach ($attributes['cards'] as $card) {
                $cardClass = "purdue-home-cta-card purdue-home-cta-card--vertical";
                $target = $card["external"] ? "_blank" : "_self";
            ?>
                <div class="<?= $cardClass ?>" href="<?= $card["linkURL"] ?>" <?= $target ?>>
                    <figure class="image is-4by3">
                        <img class="purdue-home-background-image" alt="<?= $card["mediaAlt"] ?>" src="<?= $card["mediaURL"] ?>" />
                    </figure>
                    <div class="flex-container flex-container--align-center">
                        <h2 class="purdue-home-two-column-cta__card-title"><?= $card["title"] ?></h2>
                        <?php if ($card["subtext"]) { ?>
                            <p class="purdue-home-two-column-cta__card-subtext"><?= $card["subtext"] ?></p>
                        <?php } ?>
                        <?php if ($card["linkURL"]) { ?>
                            <a class="purdue-home-button" href="<?= $card["linkURL"] ?>" target="<?= $target ?>"><?= $card["linkText"] ?></a>
                        <?php } ?>
                    </div>
                </div>
            <?php
            }
            ?>
        </div>
    <?php
    }
    ?>
</div>
