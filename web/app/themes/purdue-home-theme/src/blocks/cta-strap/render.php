<?php
$id = $attributes['id'] != '' ? ' id="' . $attributes['id'] . '"' : '';
$blockClass = "purdue-home-cta-strap";
if ($attributes['type'] == 'narrow') :
    $blockClass .= ' purdue-home-cta-strap--narrow';
endif;
if ($attributes['type'] == 'image') :
    $blockClass .= ' purdue-home-cta-strap--image';
endif;
$blockClass .= ' ' . $attributes['className'];
$buttons = $attributes['buttons'];

$sub_header = $attributes['subHeader'];
$title = $attributes['text'];
$containerClass = 'purdue-home-cta-strap__container';

// No header, don't display
if (empty($title)) {
    return;
}

if ($attributes['type'] == 'regular') :
    require __DIR__ . '/templates/cta-strap.php';
elseif ($attributes['type'] == 'image'):
    require __DIR__ . '/templates/cta-image.php';
else:
    require __DIR__ . '/templates/cta-container.php';
endif;
?>
