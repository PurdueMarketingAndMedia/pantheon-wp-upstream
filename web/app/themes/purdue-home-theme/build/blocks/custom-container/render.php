<?php
$id = $attributes['id'] != '' ? ' id="' . $attributes['id'] . '"' : '';
$class = 'purdue-home-custom-container has-' . $attributes['background'] . '-background ' . $attributes['className'] . '';
$blockclass = 'section';
$blockclass .= ' has-' . $attributes['background'] . '-background';
if ($attributes['paddingTop']) {
    $blockclass .= ' ' . $attributes['paddingTop'];
}
if ($attributes['paddingBottom']) {
    $blockclass .= ' ' . $attributes['paddingBottom'];
}
$blockclass .= ' has-'.$attributes['sidePadding'].'-sidepadding';
?>

<div <?= $id; ?> class="<?php echo $class; ?>">
    <div class="<?php echo $blockclass; ?>">
            <?php echo $content; ?>
    </div>
</div>
