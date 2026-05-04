<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
?>
<div <?= $id ?> class="purdue-home-quote <?= $attributes['className'] ?>">
    <?php
    $blockclass = 'section';
    if ($attributes['paddingTop']) {
        $blockclass .= ' ' . $attributes['paddingTop'];
    }
    if ($attributes['paddingBottom']) {
        $blockclass .= ' ' . $attributes['paddingBottom'];
    }
    if ($attributes['removeSidePadding'] && $attributes['type']=="simple") {
        $blockclass .= ' has-no-sidepadding';
    }
    if ($attributes['alignment']=="center" && $attributes['type']=="simple") {
        $blockclass .= ' align-center';
    }
    if ($attributes['type']=="slider") {
        $blockclass .= ' has-slider';
    }
    if ($attributes['type']=="mark") {
        $blockclass .= ' has-quote-mark';
    }
    if ($attributes['type']=="image") {
        $blockclass .= ' has-feature-image';
        if ($attributes['contentAlign']=="right") {
            $blockclass .= ' has-feature-image--right';
        }
    }
    $blockclass .= ' has-'.$attributes['background'].'-background';
    ?>
    <div class="<?= $blockclass ?>">
        <div class="container">
            <?php 
            if($attributes['type']=="slider"){
            ?>
            <div class="purdue-home-quote-slider">
                <div class="glide">
                    <div class="glide__track" data-glide-el="track">
                        <div class="glide__slides">
                            <?php foreach ($attributes['quoteGroup'] as $quote) { ?>
                                <div class="glide__slide">
                                    <div class="purdue-home-quote-card">
                                        <div class="purdue-home-quote-content">
                                            <blockquote>
                                                <p><?= $quote['quoteContent']; ?></p>
                                            </blockquote>
                                            <?php if($quote['name']){
                                            ?>
                                            <p class="purdue-home-quote__name"><?= $quote['name']; ?></p>
                                            <?php
                                            }
                                            ?>
                                            <?php if($quote['nameTitle']){
                                            ?>
                                            <p class="purdue-home-quote__title"><?= $quote['nameTitle']; ?></p>
                                            <?php
                                            }
                                            ?>
                                        </div>
                                    </div>
                                </div>
                            <?php
                            }
                            ?>
                        </div>
                    </div>
                    <div class="slider-controls<?= ($attributes['background']=="black"?" slider-controls--dark":"") ?>">
                        <button class="glide__arrow arrow--left">prev</button>
                        <div class="glide__bullets" data-glide-el="controls[nav]">
                                <?php foreach ($attributes['quoteGroup'] as $key => $card) {
                                    $num = $key + 1;
                                ?>
                                    <button class="glide__bullet slider__bullet" data-glide-dir="=<?= $key ?>" aria-label="slide <?= $num ?>"></button>
                                <?php } ?>
                        </div>
                        <button class="glide__arrow arrow--right">next</button>
                    </div>
                </div>
            </div>
            <?php
            }else{
            ?>
            <div class="purdue-home-quote-card<?php echo $attributes['type']=="image"?" alignwide":""; ?>">
                <?php 
                if($attributes['type']=="image" && $attributes['imgURL']){
                ?>
                <figure class="image is-16by9">
                    <img src="<?= $attributes['imgURL'] ?>" alt="<?= $attributes['imgAlt'] ?>" />
                </figure>
                <?php
                }
                ?>
                 <div class="purdue-home-quote-content">
                    <blockquote>
                        <?= $content; ?>
                    </blockquote>
                    <?php if($attributes['citeName']){
                    ?>
                    <p class="purdue-home-quote__name"><?= $attributes['citeName']; ?></p>
                    <?php
                    }
                    ?>
                    <?php if($attributes['citeTitle']){
                    ?>
                    <p class="purdue-home-quote__title"><?= $attributes['citeTitle']; ?></p>
                    <?php
                    }
                    ?>
                </div>
             </div>
             <?php
                }
            ?>
        </div>
    </div>
</div>
