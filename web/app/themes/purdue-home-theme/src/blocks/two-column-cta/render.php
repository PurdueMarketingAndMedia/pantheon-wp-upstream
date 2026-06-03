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
                $external = isset($card["external"]) && $card["external"] == 'target="_blank"' ? "(Opens in a new tab)" : "";
                $ariaLabel = "";
                if(isset($card["ariaLabel"]) && $card["ariaLabel"]!==""){
                    $ariaLabel = 'aria-label="'.$card["ariaLabel"].' '.$external.'"';
                }elseif(isset($external) && $external!==""){
                    $ariaLabel = isset($card["linkText"])? 'aria-label="'.trim($card["linkText"]).' '.$external.'"':'';
                }else{
                    $ariaLabel = "";
                }
                $buttonClass = isset($card["buttonCSS"]) ? "purdue-home-button " . $card["buttonCSS"] : "purdue-home-button";
            ?>
                <div class="<?= $cardClass ?>">
                    <figure class="image is-4by3">
                        <img class="purdue-home-background-image" alt="<?= $card["mediaAlt"] ?>" src="<?= $card["mediaURL"] ?>" />
                    </figure>
                    <div class="flex-container flex-container--align-center">
                        <h2 class="purdue-home-two-column-cta__card-title"><?= $card["title"] ?></h2>
                        <?php if ($card["subtext"]) { ?>
                            <p class="purdue-home-two-column-cta__card-subtext"><?= $card["subtext"] ?></p>
                        <?php } ?>
                        <?php if ($card["linkURL"]) { ?>
                            <a class="<?= $buttonClass ?>" href="<?= $card["linkURL"] ?>" target="<?= $target ?>" <?= $ariaLabel ?>><?= $card["linkText"] ?></a>
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
