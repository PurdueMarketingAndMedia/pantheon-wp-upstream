<?php
    $id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
    $blockClass = "purdue-home-diagonal-hero";
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

?>

    <div <?= $id ?> class="<?= $blockClass ?>">
        <div class="section has-padding-top-large has-padding-bottom-large">
            <div class="purdue-home-diagonal-hero__content">
                <?php
                if ($attributes['subheader'] != ""):
                    if ($attributes['background'] != "gold"){
                        $subheaderClass="purdue-home-hero__subheader tagged-header tagged-header--gold purdue-home-diagonal-hero__subheader";
                    }else{
                        $subheaderClass="purdue-home-hero__subheader tagged-header purdue-home-diagonal-hero__subheader";
                    }
                    ?>
                    <p class="<?= $subheaderClass ?>"><?= $attributes['subheader'] ?></p>
                <?php endif; ?>

                <?php if ($attributes['header'] != ""): ?>
                    <?php $class = 'second-level-page-heading purdue-home-diagonal-hero__header'; ?>
                    <h1 class="<?= $class ?>"><?= $attributes['header'] ?></h1>
                <?php endif; ?>

                <?php if ($attributes['subtext'] != ""): ?>
                    <div class="purdue-home-diagonal-hero__subtext">

                        <?= do_blocks($attributes['subtext']) ?>

                    </div>
                <?php endif; ?>

                <?php if ($attributes['links'] && sizeof($attributes['links']) > 0 && $attributes['links'][0]['linkURL']): 
                    $buttonList = sizeof($attributes['links']) > 1 ? "ul" : "div";
                    $buttonWrapper = sizeof($attributes['links']) > 1 ? "li" : "div";
                ?>
                    <<?= $buttonList ?> class="purdue-home-button-list">
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
                            <<?= $buttonWrapper ?> class="<?= $liClass ?>"><a class="<?= $buttonClass ?>" href="<?= $link["linkURL"] ?>" <?= $target ?>><?= trim($link["linkText"]) ?></a></<?= $buttonWrapper ?>>
                        <?php endforeach; ?>
                    </<?= $buttonList ?>>
                <?php endif; ?>
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
                <button class="cta-btnctrl cta-pause" aria-label="Pause Video" data-toggle-label="Play Video">
                    <i class="fa-regular fa-circle-pause cta-pause-icon"></i>
                </button>
            <?php endif; ?>
        </div>
    </div>