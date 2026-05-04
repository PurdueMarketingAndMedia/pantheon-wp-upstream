<div <?= $id; ?> class="<?= $blockClass; ?>">
    <div class="section has-<?= $attributes['background']?>-background">
        <div class="container">
            <p class="purdue-home-cta-strap__content"><?= $title; ?></p>
            <div class="purdue-home-cta-strap--wrap">
                <?php foreach( $buttons as $button ) : ?>
                    <?php $target = $button["buttonExternal"] ?' target="_blank"' : 'target="_self" '; 
                        $buttonClass = "purdue-home-button";
                        if (array_key_exists("buttonColor", $button) && $button["buttonColor"] == "black") {
                            $buttonClass .= " purdue-home-button--black";
                        }elseif(array_key_exists("buttonColor", $button) && $button["buttonColor"] == "white") {
                            $buttonClass .= " purdue-home-button--white";
                        }
                        $buttonClass .= $button["buttonCSS"] ? " ".$button["buttonCSS"] : "";
                    ?>
                        <a class="<?= $buttonClass; ?>" href="<?= $button['buttonURL']; ?>" <?= $target; ?>><?= trim($button['buttonText']); ?></a>
                <?php endforeach; ?>  
            </div>
        </div>
    </div>
</div>