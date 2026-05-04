<?php
if (empty($attributes['title'])) {
    return;
}

$title = $attributes['title'];
$titleClass = '';
if( $attributes['titleSize'] === "small" ){
    $titleClass = ' purdue-accordion__title--small';
}else{
    $titleClass = '';
}
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
$blockclass = 'purdue-accordion-wrap';
$blockclass .= ' ' . $attributes['className'];
$blockclass .= ' purdue-accordion-wrap--'. $attributes['titleSize'];
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
$containerclass = 'container';
if ($attributes['isNarrow']) {
    $containerclass .= ' is-narrow';
}
$class = 'purdue-accordion';
if ($attributes['removeBottomBorder']) {
    $class .= ' has-no-bottomborder';
}
if ($attributes['removeTopBorder']) {
    $class .= ' has-no-topborder';
}
?>

<div class="<?= $blockclass ?>">
    <div class="<?= $sectionclass ?>">
        <div class="<?= $containerclass ?>">
            <div<?= $id ?> class="<?= $class ?>">
                <<?= $attributes['titleLevel'] ?> class="accordion__heading purdue-accordion__title <?= $titleClass; ?>" id="title-<?= $attributes['blockId'] ?>">
                    <button aria-controls="content-<?= $attributes['blockId'] ?>" aria-expanded="false"><?= $attributes['title'] ?></button>
                </<?= $attributes['titleLevel'] ?>>
                <div class="accordion__content purdue-accordion__content" id="content-<?= $attributes['blockId'] ?>">
                    <?= $content ?>
                </div>
            </div>
        </div>
    </div>
</div>
