<?php
    $id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : '';
?>

<div <?= $id ?> class="purdue-home-cta-banner <?= $attributes['className'] ?>">
    <div class="image">
        <?php if ($attributes['mediaType'] == 'image'): ?>
            <!-- <img alt="<?= $attributes["mediaAlt"] ?>" src="<?= $attributes["mediaURL"] ?>"/> -->
            
            
            <img class="background-<?= $attributes["backgroundPosition"] ?>" alt="<?= $attributes["mediaAlt"] ?>" src="<?= $attributes["mediaURL"] ?>"/>


        <?php elseif ($attributes['mediaType'] == 'video'): ?>
            <video preload="metadata" title="<?= $attributes['mediaTitle'] ?>" muted playsinline="">
                <source src="<?= $attributes["mediaURL"] ?>#t=0.1">
            </video>
        <?php endif; ?>
    </div>
    <div class="section has-padding-exlarge">
        <div class="container">
            <?php if ($attributes['subheader'] != ""): ?>
                <h2 class="purdue-home-subheader purdue-home-cta-banner__subheader"><?= $attributes['subheader'] ?></h2>
            <?php endif; ?>
            <?php if ($attributes['header'] != ""):
                $class = 'purdue-home-cta-banner__header';
                if ($attributes['headerFontSize'] == "small") {
                    $class .= ' font-size-small';
                }
                if ($attributes['headerFontSize'] == "medium") {
                    $class .= ' font-size-medium';
                }
                ?>
                <?php if ($attributes['subheader'] == ""): ?>
                <h2 class="<?= $class ?>"><?= $attributes['header'] ?></h2>
                <?php elseif($attributes['subheader'] != ""): ?>
                    <h3 class="<?= $class ?>"><?= $attributes['header'] ?></h3>
                    <?php endif; 
                 endif; ?>

                <?php if($content): ;?>

                  <div class="container has-white-color">
                            <?= $content; ?>
                </div>

                <?php endif; ?>
                

            <?php if ($attributes['links'] && sizeof($attributes['links']) > 0):
                    $buttonList = sizeof($attributes['links']) > 1 ? "ul" : "div";
                    $buttonWrapper = sizeof($attributes['links']) > 1 ? "li" : "div";
                if ($attributes['linkDisplay'] == "buttons"): ?>
                    <<?= $buttonList ?> class="purdue-home-button-list">
                        <?php foreach ($attributes['links'] as $key => $link):
                            $target = $link["external"] ? 'target="_blank"' : 'target="_self"';
                            $buttonClass = "purdue-home-button";
                            if ($link["buttonColor"] == "black") {
                                $buttonClass .= " purdue-home-button--black";
                            }elseif($link["buttonColor"] == "white") {
                                $buttonClass .= " purdue-home-button--white";
                            }
                            if($link['buttonCSS']){
                                $buttonClass .= " " .$link['buttonCSS'];
                            }
                            $liClass = $link["fullWidth"] ? "purdue-home-button-wrap--full" : "";
                            ?>                            
                            <<?= $buttonWrapper ?> class="<?= $liClass ?>"><a class="<?= $buttonClass ?>" href="<?= $link["linkURL"] ?>" <?= $target ?>><?= trim($link["linkText"]) ?></a></<?= $buttonWrapper ?>>
                        <?php endforeach; ?>
                    </<?= $buttonList ?>>
                <?php else: ?>
                    <form class="purdue-home-select">
                        <label for="<?= $attributes['fieldId'] ?>" class="is-sr-only">Choose a link:</label>
                        <select id="<?= $attributes['fieldId'] ?>" name="links">
                            <?php foreach ($attributes['links'] as $key => $link): ?>
                                <option value="<?= $link["linkURL"] ?>" data-external="<?= $link["external"] ?>"><?= trim($link["linkText"]) ?></option>
                            <?php endforeach; ?>
                        </select>
                        <button type="button" class="purdue-home-button"><?= $attributes["buttonName"] ?></button>
                    </form>
                <?php endif;
            endif; ?>
        </div>
    </div>
</div>