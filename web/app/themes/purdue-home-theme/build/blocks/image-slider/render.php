<?php
$id = $attributes['id'] !== '' ? ' id="' . $attributes['id'] . '"' : '';
$blockclass = 'purdue-home-image-slider section';
$blockclass .= ' has-' . $attributes['background'] . '-background';

if (!empty($attributes['paddingTop'])) {
    $blockclass .= ' ' . $attributes['paddingTop'];
}
if (!empty($attributes['paddingBottom'])) {
    $blockclass .= ' ' . $attributes['paddingBottom'];
}
if (!empty($attributes['removeSidePadding'])) {
    $blockclass .= ' has-no-sidepadding';
}
if (!empty($attributes['type']) && $attributes['type'] === 'imageText') {
    $blockclass .= ' purdue-home-image-slider--has-text';
}
if (array_key_exists('loopSlider', $attributes) && $attributes['loopSlider'] === false) {
    $blockclass .= ' no-loop';
}
if (!empty($attributes['align'])) {
    $blockclass .= ' align' . $attributes['align'];
}
$blockclass .= ' ' . $attributes['className'];

// aspect ratio class (only if true)
$ratioClass = !empty($attributes['aspectRatio']) ? 'is-16by9' : '';
?>

<div <?= $id ?> class="<?= esc_attr($blockclass) ?>" data-columns="<?= esc_attr($attributes['columns']) ?>">
    <div class="container">
        <div class="glide">
            <div class="glide__track" data-glide-el="track">
                <div class="glide__slides">
                    <?php if (!empty($attributes['type']) && $attributes['type'] === 'image') : ?>
                        <?php foreach ($attributes['imgs'] as $img) : ?>
                            <?php if (!empty($attributes['linkImg'])) : ?>
                                <a class="glide__slide" href="<?= esc_url($img['url']) ?>" target="_blank" rel="noopener">
                                    <figure class="image">
                                        <img <?= $ratioClass ? 'class="' . esc_attr($ratioClass) . '"' : '' ?>
                                                src="<?= esc_url($img['url']) ?>"
                                                alt="<?= esc_attr($img['alt']) ?>" />
                                        <?php if (!empty($img['caption'])) : ?>
                                            <figcaption><?= esc_html($img['caption']) ?></figcaption>
                                        <?php endif; ?>
                                    </figure>
                                </a>
                            <?php else : ?>
                                <div class="glide__slide">
                                    <figure class="image">
                                        <img <?= $ratioClass ? 'class="' . esc_attr($ratioClass) . '"' : '' ?>
                                                src="<?= esc_url($img['url']) ?>"
                                                alt="<?= esc_attr($img['alt']) ?>" />
                                        <?php if (!empty($img['caption'])) : ?>
                                            <figcaption><?= esc_html($img['caption']) ?></figcaption>
                                        <?php endif; ?>
                                    </figure>
                                </div>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    <?php else : ?>
                        <?php foreach ($attributes['cards'] as $card) : ?>
                            <div class="glide__slide">
                                <div class="purdue-home-cta-card purdue-home-image-slider__card">
                                    <div class="purdue-home-image-slider__card-image">
                                        <figure class="image">
                                            <img <?= $ratioClass ? 'class="' . esc_attr($ratioClass) . '"' : '' ?>
                                                    src="<?= esc_url($card['mediaURL']) ?>"
                                                    alt="<?= esc_attr($card['mediaAlt']) ?>" />
                                        </figure>
                                    </div>
                                    <div class="flex-container flex-container--align-bottom">
                                        <?php if (!empty($card['title'])) : ?>
                                            <p class="purdue-home-image-slider__card-title"><?= esc_html($card['title']) ?></p>
                                        <?php endif; ?>
                                        <?php if (!empty($card['subtext'])) : ?>
                                            <p class="purdue-home-image-slider__card-subtext"><?= esc_html($card['subtext']) ?></p>
                                        <?php endif; ?>
                                        <?php if (!empty($card['linkURL'])) :
                                            $target = !empty($card['external']) ? '_blank' : '_self'; ?>
                                            <a class="purdue-home-button"
                                               href="<?= esc_url($card['linkURL']) ?>"
                                               target="<?= esc_attr($target) ?>"
                                                    <?= $target === '_blank' ? 'rel="noopener"' : '' ?>>
                                                <?= esc_html($card['linkText']) ?>
                                            </a>
                                        <?php endif; ?>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </div>
            <div class="slider-controls">
                <button class="glide__arrow arrow--left">prev</button>
                <div class="glide__bullets" data-glide-el="controls[nav]">
                    <?php if (!empty($attributes['type']) && $attributes['type'] === 'image') : ?>
                        <?php foreach ($attributes['imgs'] as $key => $img) :
                            $num = $key + 1; ?>
                            <button class="glide__bullet slider__bullet"
                                    data-glide-dir="=<?= esc_attr($key) ?>"
                                    aria-label="slide <?= esc_attr($num) ?>"></button>
                        <?php endforeach; ?>
                    <?php else : ?>
                        <?php foreach ($attributes['cards'] as $key => $card) :
                            $num = $key + 1; ?>
                            <button class="glide__bullet slider__bullet"
                                    data-glide-dir="=<?= esc_attr($key) ?>"
                                    aria-label="slide <?= esc_attr($num) ?>"></button>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
                <button class="glide__arrow arrow--right">next</button>
            </div>
        </div>
    </div>
</div>
