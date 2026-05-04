<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
$blockClass = "purdue-home-cta-banner purdue-home-rtb-hero";
if ($attributes["type"] == "stack") {
    $blockClass .= " purdue-home-rtb-hero--stack";
}
$blockClass .= $attributes['className'];
?>

<div <?= $id ?> class="<?= $blockClass ?>">
    <div class="image">
        <?php if ($attributes['mediaType'] == "image" && $attributes["mediaURL"]) : ?>
            <img alt="<?= $attributes["mediaAlt"] ?>" src="<?= $attributes["mediaURL"] ?>"/>
        <?php elseif ($attributes['mediaType'] == "video" && $attributes["mediaURL"]) : ?>
            <video preload="metadata" title="<?= $attributes['mediaTitle'] ?>" muted playsinline="">
                <source src="<?= $attributes["mediaURL"] ?>#t=0.1">
            </video>
        <?php endif; ?>
    </div>
    <div class="section has-padding-top-large has-padding-bottom-large">
        <div class="container">
            <div class="purdue-home-rtb-hero__content-wrap">
                <?php if ($attributes['subheader'] != "") : ?>
                    <p class="purdue-home-hero__subheader tagged-header tagged-header--gold purdue-home-rtb-hero__subheader"><?= $attributes['subheader'] ?></p>
                <?php endif; ?>

                <?php if ($attributes['header'] != "") : ?>
                    <?php $class = 'second-level-page-heading purdue-home-rtb-hero__header '; ?>
                    <h1 class="<?= $class ?>"><?= $attributes['header'] ?></h1>
                <?php endif; ?>

                <?php if ($attributes['subtext'] != "") : ?>
                    <p class="purdue-home-rtb-hero__subtext"><?= $attributes['subtext'] ?></p>
                <?php endif; ?>

                <?php if ($attributes['links'] && sizeof($attributes['links']) > 0 && $attributes['links'][0]['linkURL']) : ?>
                    <ul class="purdue-home-button-list">
                        <?php foreach ($attributes['links'] as $key => $link) : ?>
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
                            <li class="<?= $liClass ?>">
                                <a class="<?= $buttonClass ?>" href="<?= $link["linkURL"] ?>" <?= $target ?>><?= trim($link["linkText"]) ?></a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                <?php endif; ?>
            </div>
        </div>

        <?php if ($attributes["type"] == "slider" && sizeof($attributes['sliderCards']) > 0) : ?>
            <div class="purdue-home-rtb-hero__slider-wrap container">
                <div class="glide purdue-home-slider--rtb-hero" data-number="<?= sizeof($attributes['sliderCards']) ?>">
                    <div class="glide__track" data-glide-el="track">
                        <div class="glide__slides">
                            <?php foreach ($attributes['sliderCards'] as $slide) : ?>
                                <div class="glide__slide">
                                    <?php if ($slide["type"] == "rtb") : ?>
                                        <div class="purdue-home-proofpoint--simple">
                                            <?php if ($slide['text']) : ?>
                                                <span class="purdue-home-proofpoint--simple__content"><?= $slide["text"] ?></span>
                                            <?php endif; ?>
                                            <?php if ($slide['source']) : ?>
                                                <?php if ($slide['linkURL']) : ?>
                                                    <?php $target = $slide["external"] ? 'target="_blank"' : 'target="_self"'; ?>
                                                    <a class="purdue-home-proofpoint__source purdue-home-proofpoint--simple__source" href="<?= $slide['linkURL'] ?>" <?= $target ?>><?= $slide["source"] ?></a>
                                                <?php else : ?>
                                                    <span class="purdue-home-proofpoint__source purdue-home-proofpoint--simple__source"><?= $slide["source"] ?></span>
                                                <?php endif; ?>
                                            <?php endif; ?>
                                        </div>
                                    <?php elseif ($slide["type"] == "plain") : ?>
                                        <div class="purdue-home-content-card">
                                            <?php if ($slide["title"]) : ?>
                                                <p class="purdue-home-content-card__title"><?= $slide["title"] ?></p>
                                            <?php endif; ?>
                                            <?php if ($slide["content"]) : ?>
                                                <p class="purdue-home-content-card__content"><?= $slide["content"] ?></p>
                                            <?php endif; ?>
                                        </div>
                                    <?php else : ?>
                                        <figure class="image">
                                            <img src="<?= $slide["mediaURL"] ?>" alt="<?= $slide["mediaAlt"] ?>"/>
                                        </figure>
                                    <?php endif; ?>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    <div class="slider-controls slider-controls--dark">
                        <button class="glide__arrow arrow--left">prev</button>
                        <div class="glide__bullets" data-glide-el="controls[nav]">
                            <?php foreach ($attributes['sliderCards'] as $key => $card) : ?>
                                <?php $num = $key + 1; ?>
                                <button class="glide__bullet slider__bullet" data-glide-dir="=<?= $key ?>" aria-label="slide <?= $num ?>"></button>
                            <?php endforeach; ?>
                        </div>
                        <button class="glide__arrow arrow--right">next</button>
                    </div>
                </div>
            </div>
        <?php elseif ($attributes["type"] == "stack" && sizeof($attributes['sliderCards']) > 0) : ?>
            <div class="purdue-home-rtb-hero__slider-wrap container">
                <div class="purdue-home-rtb-hero__stack-wrap">
                    <?php foreach ($attributes['sliderCards'] as $slide) : ?>
                        <?php if ($slide["type"] == "rtb") : ?>
                            <div class="purdue-home-proofpoint--simple">
                                <?php if ($slide['text']) : ?>
                                    <span class="purdue-home-proofpoint--simple__content"><?= $slide["text"] ?></span>
                                <?php endif; ?>
                                <?php if ($slide['source']) : ?>
                                    <?php if ($slide['linkURL']) : ?>
                                        <?php $target = $slide["external"] ? 'target="_blank"' : 'target="_self"'; ?>
                                        <a class="purdue-home-proofpoint__source purdue-home-proofpoint--simple__source" href="<?= $slide['linkURL'] ?>" <?= $target ?>><?= $slide["source"] ?></a>
                                    <?php else : ?>
                                        <span class="purdue-home-proofpoint__source purdue-home-proofpoint--simple__source"><?= $slide["source"] ?></span>
                                    <?php endif; ?>
                                <?php endif; ?>
                            </div>
                        <?php elseif ($slide["type"] == "plain") : ?>
                            <div class="purdue-home-content-card">
                                <?php if ($slide["title"]) : ?>
                                    <p class="purdue-home-content-card__title"><?= $slide["title"] ?></p>
                                <?php endif; ?>
                                <?php if ($slide["content"]) : ?>
                                    <p class="purdue-home-content-card__content"><?= $slide["content"] ?></p>
                                <?php endif; ?>
                            </div>
                        <?php else : ?>
                            <figure class="image">
                                <img src="<?= $slide["mediaURL"] ?>" alt="<?= $slide["mediaAlt"] ?>"/>
                            </figure>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endif; ?>
    </div>
</div>
