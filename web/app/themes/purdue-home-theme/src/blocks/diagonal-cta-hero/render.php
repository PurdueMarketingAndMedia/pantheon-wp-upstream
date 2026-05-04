<?php
    $id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
    $blockClass = "purdue-home-diagonal-cta-hero";
    $blockClass .= " has-".$attributes['background']."-background";
    if($attributes['imageAlignDesktop'] == "left"){
        $blockClass .= " image-align-left-desktop";
    }
    if($attributes['imageAlignMobile'] == "top"){
        $blockClass .= " image-align-top-mobile";
    }
    if($attributes['noDiagonal']){
        $blockClass .= " no-diagonal";
    }
    if($attributes['minHeight'] != "0"){
        $blockClass .= " minheight-".$attributes['minHeight'];
    }
    if($attributes['className'] != ""){
        $blockClass .= " ".$attributes['className'];
    }
   // $subtext = isset( $attributes['subtext'] ) ? $attributes['subtext'] : $content;

?>

<div <?= $id ?> class="<?= $blockClass ?>">
    <div class="section has-padding-top-small has-padding-bottom-small">
        <div class="container">
            <div class="purdue-home-diagonal-cta-hero__content">

                <!-- breadcrumbs include -->
                <div class="purdue home-diagonal-cta-hero__breadcrumbs">
                    <?php if(function_exists('bcn_display')) : ?>
                        <div class="breadcrumbs " typeof="BreadcrumbList" vocab="https://schema.org/">
                            <?php bcn_display(); 
                            ?>
                        </div>
                    <?php endif; ?>
                </div>
                <!-- /breadcrumbs include -->

                <?php
                /*
                <?php 
                    if ($attributes['subheader'] != ""): 
                        if ($attributes['background'] != "gold"){
                            $subheaderClass="purdue-home-hero__subheader tagged-header tagged-header--gold purdue-home-diagonal-cta-hero__subheader";
                        }else{
                            $subheaderClass="purdue-home-hero__subheader tagged-header purdue-home-diagonal-cta-hero__subheader"; 
                        }
                ?>
                    <p class="<?= $subheaderClass ?>"><?= $attributes['subheader'] ?></p>
                <?php endif; ?>
                */ 
                ?>


                <?php if ($attributes['header'] != ""): ?>
                    <?php $class = 'third-level-page-heading purdue-home-diagonal-cta-hero__header'; ?>
                    <h1 class="<?= $class ?>"><?= $attributes['header'] ?></h1>
                <?php endif; ?>

                <?php 
                if ($attributes['subtext'] != ""): ?>
                    <div class="purdue-home-diagonal-cta-hero__subtext">
                        <?= $content; ?>
                    </div>
                <?php endif; ?>



<?php
if ($attributes['links'] && sizeof($attributes['links']) > 0 && $attributes['links'][0]['linkURL']): ?>
    <div class="purdue-home-link-hero__list-container">
        <span class="purdue-home-link-hero__list-desc tablet-hidden">
            Jump to:
        </span>

        <ul class="purdue-home-link-hero__list--desktop">
            <?php foreach ($attributes['links'] as $key => $link): ?>
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
                <li><a class="<?= $buttonClass ?>" href="<?= $link["linkURL"] ?>" <?= $target ?>><?= trim($link["linkText"]) ?></a></li>
            <?php endforeach; ?>
        </ul>
        <form class="purdue-home-select purdue-home-link-hero__list--mobile">
            <label for="<?= $attributes['fieldId']; ?>" class="is-sr-only">Choose a link:</label>
            <select id="<?= $attributes['fieldId']; ?>" name="links">
                    <option value="" data-external="">Jump to:</option>
                <?php foreach ($attributes['links'] as $key => $link): ?>
                    <option value="<?= $link["linkURL"]; ?>" data-external="<?= $link["external"]; ?>">
                        <?= trim($link["linkText"]); ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </form>
    </div>
<?php endif; 
?>


<!-- ed -->
<!-- <div class="purdue-home-link-hero__list-container">
    <span class="purdue-home-link-hero__list-desc tablet-hidden">
        Jump to:
    </span>
    <ul class="purdue-home-link-hero__list--desktop">
        <li>
            <a class="purdue-home-button purdue-home-button--black" href="#" target="_self">Careers</a>
        </li>
        <li>
            <a class="purdue-home-button purdue-home-button--black" href="#" target="_self">Take action</a>
        </li>
        <li>
            <a class="purdue-home-button purdue-home-button--black" href="#" target="_self">Transfer</a>
        </li>
    </ul>
    <form class="purdue-home-select purdue-home-link-hero__list--mobile">
        <label for="8447dae6-f4a5-4633-bb0a-e171b5507d4a" class="is-sr-only">Choose a link:</label>
        <select id="8447dae6-f4a5-4633-bb0a-e171b5507d4a" name="links">
            <option value="" data-external="">Jump to:</option>
            <option value="#" data-external="">Careers</option>
            <option value="#" data-external="">Take action</option>
            <option value="#" data-external="">Transfer</option>
    </select>
    </form>
</div> -->
<!-- ed -->


            </div>
        </div>
    </div>

    <div class="image">
        <?php if ($attributes['mediaType'] == "image"): ?>
            <img alt="<?= $attributes["mediaAlt"] ?>" src="<?= $attributes["mediaURL"] ?>"/>
        <?php 
            elseif ($attributes['mediaType'] == "video"): 
            $loop = "";
            $videoClass = "";
                if ($attributes['loopVideo']): 
                    $loop = "loop";
                elseif (!$attributes['loopVideo']):
                    $videoClass = "no-loop";
                endif;
        ?>
            <video class="<?= $videoClass ?>" autoplay preload="metadata" title="<?= $attributes['mediaTitle'] ?>" <?= $loop ?> muted playsinline="">
                <source src="<?= $attributes["mediaURL"] ?>#t=0.1">
            </video>
            <button class="cta-play" aria-label="play"><i class="fa-regular fa-circle-play cta-play-icon"></i></button>
            <?php if ($attributes['loopVideo']): ?>
            <button class="cta-pause is-active" aria-label="pause"><i class="fa-regular fa-circle-pause cta-pause-icon"></i></button>
            <?php endif; ?>
        <?php endif; ?>
    </div>
</div>
