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
                        <button class="cta-btnctrl cta-pause" aria-label="Pause Animation">
                            <i class="fa-regular fa-circle-pause cta-pause-icon"></i>
                        </button>
                    </div>

                <?php } ?>
            <?php endif; ?>
            <div class="purdue-home-cta-hero__content">
                <?= $content ?>
            </div>
             <?php if ($attributes['links'] && sizeof($attributes['links']) > 0 && $attributes['links'][0]['linkURL']): ?>
                <ul class="purdue-home-button-list">
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
                        <li class="<?= $liClass; ?>">
                            <a class="<?= $buttonClass; ?>" href="<?= $link["linkURL"]; ?>" <?= $target; ?>>
                                <?= trim($link["linkText"]); ?>
                            </a>
                        </li>
                    <?php endforeach; ?>
                </ul>
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
                                <?php $target = $card["external"] ? 'target="_blank"' : 'target="_self"'; ?>
                                <a class="<?= $cardClass ?>" href="<?= $card["linkURL"] ?>" <?= $target ?>>
                                    <div class="image is-16by9">
                                        <img class="purdue-home-background-image" alt="" src="<?= $card["mediaURL"] ?>" />
                                    </div>
                                    <div class="flex-container flex-container--align-bottom">
                                        <p class="purdue-home-cta-hero__card-title"><?= $card["title"] ?></p>
                                        <p class="purdue-home-cta-hero__card-subtext"><?= $card["subtext"] ?></p>
                                    </div>
                                </a>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>
