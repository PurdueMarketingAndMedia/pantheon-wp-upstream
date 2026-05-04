<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
?>
<div<?= $id ?> class="purdue-home-cta-grid has-<?= $attributes['background'] ?>-background <?= $attributes['className'] ?>">
    <?php
    $sectionclass = 'section';
    if ($attributes['paddingTop']) {
        $sectionclass .= ' ' . $attributes['paddingTop'];
    }
    if ($attributes['paddingBottom']) {
        $sectionclass .= ' ' . $attributes['paddingBottom'];
    }
    ?>
    <div class="<?= $sectionclass ?>">
        <div class="container">
            <?php
            if ($attributes['hasIntro']) {
            ?>
                <div class="purdue-home-cta-grid__intro">
                    <?php
                    if ($attributes['header']) {
                    ?>
                    <h2 class="purdue-home-intro-text__header header-font-united purdue-home-cta-grid__header"><?= $attributes['header'] ?></h2>
                    <?php
                    }
                    ?>
                    <?php
                    if ($content && strlen($content) > 0) {
                    ?>
                        <div class="purdue-home-cta-grid__content">
                            <?= $content ?>
                        </div>
                    <?php
                    }
                    ?>
                </div>
            <?php
            }
            if (sizeof($attributes['cards']) > 0) {
                $cardsClass="purdue-home-cta-grid__cards";
                if($attributes['alignment']=="center"){
                    $cardsClass.=" align-center";
                }
                if($attributes['alignment']=="left"){
                    $cardsClass.=" align-left";
                }
            ?>
                <div class="<?= $cardsClass ?>">
                    <div class="columns is-multiline">
                        <?php
                        foreach ($attributes['cards'] as $card) {
                        ?>
                            <div class="column is-half-tablet is-<?= $attributes['columns'] ?>-desktop">
                                <?php
                                $cardClass = "purdue-home-cta-card purdue-home-cta-card--stack";
                                if($attributes['hasDecoration']){
                                    $cardClass .= " has-decoration-line";
                                }                                
                                ?>
                                <div class="<?= $cardClass ?>">
                                <?php if($card["mediaURL"]){ ?>
                                    <figure class="image is-16by9">
                                        <img class="purdue-home-background-image" alt="<?= $card["mediaAlt"] ?>" src="<?= $card["mediaURL"] ?>"/>
                                    </figure>
                                <?php } ?>
                                    <div class="flex-container flex-container--align-center">
                                        <?php
                                        if ($card["subtitle"]) {
                                        ?>
                                            <p class="purdue-home-cta-grid__card-subtitle"><?= $card["subtitle"] ?></p>
                                        <?php
                                        }
                                        ?>
                                        <p class="purdue-home-cta-grid__card-title"><?= $card["title"] ?></p>
                                        <?php
                                        if ($card["subtext"]) {
                                        ?>
                                            <p class="purdue-home-cta-grid__card-subtext"><?= $card["subtext"] ?></p>
                                        <?php
                                        }
                                        if($card["linkURL"] || $card["linkURL2"]){
                                            echo '<ul class="purdue-home-button-list">';
                                        }
                                        if ($card["linkURL"]) {
                                            $target = $card["external"] ? "_blank" : "_self";
                                        ?>
                                            <li><a class="purdue-home-button <?= $card["buttonCSS"];?>" href="<?= $card["linkURL"] ?>" target="<?= $target ?>"><?= $card["linkText"] ?></a></li>
                                        <?php
                                        }    
                                        if ($card["linkURL2"]) {
                                            $target2 = $card["external2"] ? "_blank" : "_self";
                                        ?>
                                            <li><a class="purdue-home-button <?= $card["buttonCSS2"];?>" href="<?= $card["linkURL2"] ?>" target="<?= $target2 ?>"><?= $card["linkText2"] ?></a></li>
                                        <?php
                                        }
                                        if($card["linkURL"] || $card["linkURL2"]){
                                            echo '</ul>';
                                        }?>
                                    </div>
                                </div>
                            </div>
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