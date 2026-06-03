<?php
require_once __DIR__ . '/inc/functions.php';

$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
$sectionclass = 'section';
$sectionclass .= ' has-' . $attributes['background'] . '-background';
if ($attributes['paddingTop']) {
    $sectionclass .= ' ' . $attributes['paddingTop'];
}
if ($attributes['paddingBottom']) {
    $sectionclass .= ' ' . $attributes['paddingBottom'];
}
if ($attributes['removeSidePadding']) {
    $sectionclass .= ' has-no-sidepadding';
}
$sliderclass = '';
$buttonClass = $attributes['background'] == "gold" ? " purdue-home-button--black" : "";
$target1 = $attributes["external"] ? 'target="_blank"' : 'target="_self"';
$sliderclass = '';

?>

<section <?= $id; ?> class="purdue-home-link-cards <?= $attributes['className']; ?>">

    <div class="<?= $sectionclass; ?>">
        <?php if ($attributes['header'] != "") : ?>
            <div class="container header-wrap">
                <div class="columns is-mulitline align-bottom">
                    <div class="column">
                        <?php
                        if ($attributes['header'] != "") {
                            if ($attributes['headerColor'] != "" && $attributes['background'] === "none") {
                                $headerClass = ' tagged-header--' . $attributes['headerColor'];
                                $taggedHeader = ' tagged-header-container--' . $attributes['headerColor'];
                            } else {
                                $headerClass = $attributes['background'] != "gold" ? " tagged-header--gold" : "";
                            }
                        ?>
                            <div class="tagged-header-container <?= $taggedHeader; ?>">
                                <h2 class="tagged-header<?= $headerClass; ?>"><?= $attributes['header']; ?></h2>
                            </div>
                        <?php } ?>
                    </div>
                    <div class="column is-narrow mobile-hidden">
                        <?php if ($attributes["linkURL"] != "") : ?>
                            <?php 
                                $ariaLabel = $target1 == 'target="_blank"' ? 'aria-label="' . $attributes["linkText"] . ' (Opens in a new tab)"' : '';?>
                            <a class="purdue-home-button <?= $buttonClass; ?>" href="<?= $attributes["linkURL"]; ?>" <?= $target1; ?> <?= $ariaLabel; ?>><?= trim($attributes["linkText"]); ?></a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        <?php endif; ?>

        <div class="container">
            <?php if ($attributes["cardType"] === "list") : ?>
                <div class="purdue-home-link-cards__cards">
                    <div class="columns is-multiline">
                        <?php echo $content; ?>
                    </div>
                </div>
            <?php endif;

            if ($attributes['type'] === "rss") {
                $results = rss_feed($attributes['feedURL']);
                if (!empty($results)) {
                    if ($attributes['layout'] == "grid") {
            ?>
                        <div class="purdue-home-link-cards__cards">
                            <div class="columns is-multiline">
                                <?php
                                foreach ($results as $card) {
                                    $columnClass = "column";
                                    if ($attributes['columns'] == 3) {
                                        $columnClass .= ' is-4-desktop is-4-widescreen is-3-fullhd';
                                    } else {
                                        $columnClass .= ' is-' . $attributes['columns'] . '-desktop';
                                    }
                                    if ($attributes['columns'] != 12) {
                                        $columnClass .= " is-half-tablet";
                                    } else {
                                        $columnClass .= " is-full-tablet";
                                    }
                                ?>
                                    <div class="<?= $columnClass; ?>">
                                        <?php
                                        if ($card["postType"] && $card["postType"] == "rkv_podcast") {
                                            $card["postType"] = "podcast";
                                        }
                                        if ($card["postType"] && $card["postType"] == "post") {
                                            $card["postType"] = "article";
                                        }
                                        ?>
                                        <?= card($card, $attributes["cardType"], $attributes["inculdeDesc"], $attributes["includeThumb"], $attributes["addPostTypeTag"], $attributes["addTaxTag"], $attributes["cardBackground"], $attributes["horizontal"], $attributes['header']); ?>
                                    </div>
                                <?php } ?>
                            </div>
                        </div>
                    <?php
                    } else {

                        if ($attributes['loop']) {
                            $sliderclass .= " purdue-home-link-cards__slider--loop";
                        }
                    ?>
                        <div class="purdue-home-link-cards__slider <?= $sliderclass; ?>">
                            <div class="glide">
                                <div class="glide__track" data-glide-el="track">
                                    <div class="glide__slides">
                                        <?php
                                        foreach ($results as $card) {
                                        ?>
                                            <div class="glide__slide">
                                                <?php
                                                if ($card["postType"] && $card["postType"] == "rkv_podcast") {
                                                    $card["postType"] = "podcast";
                                                }
                                                if ($card["postType"] && $card["postType"] == "post") {
                                                    $card["postType"] = "article";
                                                }
                                                ?>
                                                <?= card($card, $attributes["cardType"], $attributes["inculdeDesc"], $attributes["includeThumb"], $attributes["addPostTypeTag"], $attributes["addTaxTag"], $attributes["cardBackground"], $attributes["horizontal"],$attributes['header']); ?>
                                            </div>
                                        <?php } ?>
                                    </div>
                                </div>
                                <?php
                                $controlClass = $attributes['background'] == "black" ? " slider-controls--dark" : "";
                                ?>
                                <div class="slider-controls <?= $controlClass; ?>">
                                    <button class="glide__arrow arrow--left">previous</button>
                                    <div class="glide__bullets" data-glide-el="controls[nav]">
                                        <?php
                                        foreach ($results as $key => $card) {
                                            $num = $key + 1;
                                        ?>
                                            <button class="glide__bullet slider__bullet" data-glide-dir="=<?= $key; ?>" aria-label="slide <?= $num; ?>"></button>
                                        <?php } ?>
                                    </div>
                                    <button class="glide__arrow arrow--right">next</button>
                                </div>
                            </div>
                        </div>
            <?php
                    }
                }
            } else if (sizeof($attributes['cards']) > 0 && $attributes['cardType'] != "list") {
                if ($attributes['layout'] == "grid") {
            ?>
                    <div class="purdue-home-link-cards__cards">
                        <div class="columns is-multiline">
                            <?php
                            foreach ($attributes['cards'] as $card) {
                                $columnClass = "column";
                                if ($attributes['columns'] == 3) {
                                    $columnClass .= ' is-4-desktop is-4-widescreen is-3-fullhd';
                                } else {
                                    $columnClass .= ' is-' . $attributes['columns'] . '-desktop';
                                }
                                if ($attributes['columns'] != 12) {
                                    $columnClass .= " is-half-tablet";
                                } else {
                                    $columnClass .= " is-full-tablet";
                                }
                            ?>
                                <div class="<?= $columnClass; ?>">
                                    <?= card($card, $attributes["cardType"], $attributes["inculdeDesc"], $attributes["includeThumb"], true, true, $attributes["cardBackground"], $attributes["horizontal"], $attributes['header']); ?>
                                </div>
                            <?php } ?>
                        </div>
                    </div>
                <?php
                } else {
                    if ($attributes['loop']) {
                        $sliderclass .= " purdue-home-link-cards__slider--loop";
                    }
                ?>
                    <div class="purdue-home-link-cards__slider<?= $sliderclass; ?>">
                        <div class="glide">
                            <div class="glide__track" data-glide-el="track">
                                <div class="glide__slides">
                                    <?php
                                    foreach ($attributes['cards'] as $card) {
                                    ?>
                                        <div class="glide__slide">
                                            <?= card($card, $attributes["cardType"], $attributes["inculdeDesc"], $attributes["includeThumb"], true, true, $attributes["cardBackground"], $attributes["horizontal"],  $attributes['header']); ?>
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <?php
                            $controlClass = $attributes['background'] == "black" ? " slider-controls--dark" : "";
                            ?>
                            <div class="slider-controls<?= $controlClass; ?>">
                                <button class="glide__arrow arrow--left">previous</button>
                                <div class="glide__bullets" data-glide-el="controls[nav]">
                                    <?php
                                    foreach ($attributes['cards'] as $key => $card) {
                                        $num = $key + 1;
                                    ?>
                                        <button class="glide__bullet slider__bullet" data-glide-dir="=<?= $key; ?>" aria-label="slide <?= $num; ?>"></button>
                                    <?php } ?>
                                </div>
                                <button class="glide__arrow arrow--right">next</button>
                            </div>
                        </div>
                    </div>
            <?php }
            } ?>

            <?php if ($attributes["linkURL"] != "") : ?>
                <div class="button-container mobile-show">
                    <a class="purdue-home-button<?= $buttonClass; ?>" href="<?= $attributes["linkURL"]; ?>" <?= $target1; ?>><?= trim($attributes["linkText"]); ?></a>
                </div>
            <?php endif; ?>
        </div>
    </div>
</section>
