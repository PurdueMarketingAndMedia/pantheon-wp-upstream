<?php $id = $attributes['id'] != "" ? 'id="' . $attributes['id'] . '"' : "" ;?>
<div <?= $id ?> class="purdue-home-cta-hero <?= $attributes['className'] ?>">
    <div class="section has-padding-top-large has-padding-bottom-large">
        <div class="container">
            <?php if ($attributes['subheader'] != "") : ?>
                <p class="purdue-home-hero__subheader tagged-header tagged-header--gold"><?= $attributes['subheader'] ?></p>
            <?php endif; ?>
            <?php if (!$attributes['addHeaderAnimation']) : ?>
            <h1 class="second-level-page-heading purdue-home-cta-hero__header"><?= $attributes['header'] ?></h1>
            <?php else : 
                $headerAnimate = explode(",", $attributes['headerAnimation']);
            ?>
                <h1 class="second-level-page-heading purdue-home-cta-hero__header">
                    <?php 
                    if(trim($attributes['headerStatic1']) !=""){
                    ?>
                    <span class="purdue-home-cta-hero__header-static"><?= trim($attributes['headerStatic1']) ?></span>
                    <?php 
                } 
                if(sizeof($headerAnimate)>0){
                ?>
                    <span class="purdue-home-cta-hero__header-animate">
                    <?php                    
                     foreach ($headerAnimate as $key=>$item) {
                        if($item != ""){
                           ?>
                           <span class="purdue-home-cta-hero__header-animate-item
                           <?php if($key != 0){echo ' hide';} ?>"><?= trim($item) ?></span>
                           <?php 
                        }
                     }
                    ?>
                    </span>
                    <?php 
                }
                    if(trim($attributes['headerStatic2']) !=""){
                    ?>
                    <span class="purdue-home-cta-hero__header-static"><?= trim($attributes['headerStatic2']) ?></span>
                    <?php } ?>
                </h1>

                <?php if(sizeof($headerAnimate)>0) { ?>
                    <div class="controls">
                        <button class="cta-btnctrl cta-pause" aria-label="Pause Animation" data-toggle-label="Play Animation">
                            <i class="fa-regular fa-circle-pause cta-pause-icon"></i>
                        </button>
                    </div>

                <?php } ?>
            <?php endif; ?>
            <div class="purdue-home-cta-hero__content">
                <?= $content ?>
            </div>
            <?php if ($attributes['links'] && sizeof($attributes['links']) > 0 && $attributes['links'][0]['linkURL']): 
                 $buttonList = sizeof($attributes['links']) > 1 ? "ul" : "div";
                 $buttonWrapper = sizeof($attributes['links']) > 1 ? "li" : "div";
            ?>
                <<?= $buttonList ?> class="purdue-home-button-list">
                    <?php foreach ($attributes['links'] as $key => $link): ?>
                        <?php
                        $target = $link["external"] ? 'target="_blank"' : 'target="_self"';
                        $buttonClass = "purdue-home-button";
                        $external = isset($link["external"]) && $link["external"] == 'target="_blank"' ? "(Opens in a new tab)" : "";
                        $ariaLabel = "";
                        if(isset($link["ariaLabel"]) && $link["ariaLabel"]!==""){
                            $ariaLabel = 'aria-label="'.$link["ariaLabel"].' '.$external.'"';
                        }elseif(isset($external) && $external!==""){
                            $ariaLabel = isset($link["linkText"])? 'aria-label="'.trim($link["linkText"]).' '.$external.'"':'';
                        }else{
                            $ariaLabel = "";
                        }
                        if ($link["buttonColor"] == "black") {
                            $buttonClass .= " purdue-home-button--black";
                        }elseif($link["buttonColor"] == "white") {
                            $buttonClass .= " purdue-home-button--white";
                        }
                        $liClass = $link["fullWidth"] ? "purdue-home-button-wrap--full" : "";
                        ?>
                        <<?= $buttonWrapper ?> class="<?= $liClass; ?>">
                            <a class="<?= $buttonClass; ?>" href="<?= $link["linkURL"]; ?>" <?= $target; ?> <?= $ariaLabel; ?>>
                                <?= trim($link["linkText"]); ?>
                            </a>
                        </<?= $buttonWrapper ?>>
                    <?php endforeach; ?>
                </<?= $buttonList ?>>
            <?php endif; ?>
            
            <?php 

            $cardList = sizeof($attributes['cards']);
            $cards = true;


            if ( $cardList === 1){
                $arrayEmptyTest = $attributes['cards'];
                unset($arrayEmptyTest[0]["external"]);
                unset($arrayEmptyTest[0]["id"]);
                if (empty(array_filter($arrayEmptyTest[0], function ($value) {
                    return !empty($value);
                }))) {
                    $cards = false;
                }else{
                    $cards = true;
                }
            }else{
                    $cards = true;
            }

            if ($cards) : ?>
                <div class="purdue-home-cta-hero__cards">
                    <div class="columns">
                        <?php foreach ($attributes['cards'] as $card) : ?>
                            <div class="column">
                                <?php $cardClass = "purdue-home-cta-card purdue-home-cta-card--horizontal has-content-bottom"; ?>
                                <?php 
                                    
                                    $target = $card["external"] ? 'target="_blank"' : 'target="_self"';     
                                    $external = isset($card["external"]) && $card["external"] == 'target="_blank"' ? "(Opens in a new tab)" : "";
                                    $ariaLabel = "";
                                    if(isset($card["ariaLabel"]) && $card["ariaLabel"]!==""){
                                        $ariaLabel = 'aria-label="'.$card["ariaLabel"].' '.$external.'"';
                                    }elseif(isset($external) && $external!=""){
                                        $ariaLabel = isset($card["title"])? 'aria-label="'.trim($card["title"]).' '.$external.'"':'';
                                    }else{
                                        $ariaLabel = "";
                                    }
                                ?>
                                <div class="<?= $cardClass ?>">
                                    
                                        <div class="image is-16by9">
                                            <img class="purdue-home-background-image" alt="" src="<?= $card["mediaURL"] ?>" />
                                        </div>
                                        <div class="flex-container flex-container--align-bottom">
                                            <a class="purdue-home-cta-hero__card-title" href="<?= $card["linkURL"] ?>" <?= $target ?> <?= $ariaLabel ?>><p class=""><?= $card["title"] ?></p></a>
                                            <p class="purdue-home-cta-hero__card-subtext"><?= $card["subtext"] ?></p>
                                        </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>
