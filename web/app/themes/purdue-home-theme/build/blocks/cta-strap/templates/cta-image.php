<div <?= $id; ?> class="<?= $blockClass; ?>">
    <div class="has-gray-background">
        <div class="container has-gray-background purdue-home-cta-strap__container">            
            <div class="purdue-home-cta-strap__container--left">
                <div class="image">
                    <img alt="<?= $attributes["mediaAlt"] ?>" src="<?= $attributes["mediaURL"] ?>"/>
                </div>
                <div>
                    <?php if($sub_header){?>
                        <h2 class="purdue-home-cta-strap__subTitle">
                            <?= $sub_header; ?>
                        </h2>
                    <?php } ?>
                    <p class="purdue-home-cta-strap__content"><?= $title; ?></p>
                    <div class="purdue-home-cta-strap__container--right<?= $attributes['stackButton']?" purdue-home-cta-strap__container--right-wrap":""; ?> is-hidden-tablet">
                        <?php foreach( $buttons as $button ) : ?>
                        <?php 
                        $target = $button["buttonExternal"] ?' target="_blank"' : 'target="_self" '; 
                        $buttonClass = "purdue-home-button";
                        if (array_key_exists("buttonColor", $button) && $button["buttonColor"] == "black") {
                            $buttonClass .= " purdue-home-button--black";
                        }elseif(array_key_exists("buttonColor", $button) && $button["buttonColor"] == "white") {
                            $buttonClass .= " purdue-home-button--white";
                        }
                        ?>
                            <a class="<?= $buttonClass; ?>" href="<?= $button['buttonURL']; ?>" <?= $target; ?>><?= trim($button['buttonText']); ?></a>
                        <?php endforeach; ?>
                    </div>  
                </div>           
            </div>
            <div class="purdue-home-cta-strap__container--right<?= $attributes['stackButton']?" purdue-home-cta-strap__container--right-wrap":""; ?> is-hidden-mobile">
                <?php foreach( $buttons as $button ) : ?>
                <?php 
                $target = $button["buttonExternal"] ?' target="_blank"' : 'target="_self" '; 
                $buttonClass = "purdue-home-button";
                if (array_key_exists("buttonColor", $button) && $button["buttonColor"] == "black") {
                    $buttonClass .= " purdue-home-button--black";
                }elseif(array_key_exists("buttonColor", $button) && $button["buttonColor"] == "white") {
                    $buttonClass .= " purdue-home-button--white";
                }
                ?>
                    <a class="<?= $buttonClass; ?>" href="<?= $button['buttonURL']; ?>" <?= $target; ?>><?= trim($button['buttonText']); ?></a>
                <?php endforeach; ?>
            </div>  
        </div>
    </div>
</div>