<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
$blockClass = "purdue-home-path-way";
if ($attributes['type'] == "aligned") {
    $blockClass .= " purdue-home-path-way--aligned";
} else {
    $blockClass .= " purdue-home-path-way--full";
}
if ($attributes['addConnector']) {
    $blockClass .= " purdue-home-path-way--has-connector";
}
if ($attributes['addConnector'] && $attributes['connectorType'] == "elbow") {
    $blockClass .= " purdue-home-path-way--has-connector-elbow";
}
if ($attributes['isFirst']) {
    $blockClass .= " purdue-home-path-way--first";
}
$blockClass .= " " . $attributes['className'];
?>

<div <?= $id ?> class="<?= $blockClass ?>">
    <div class="section has-padding-top-none">
        <div class="container">
            <?php if ($attributes['addConnector'] && $attributes['isFirst'] == true): ?>
                <?php $connectorClass0 = "purdue-home-path-way__connector purdue-home-path-way__connector--top"; ?>
                <div class="<?= $connectorClass0 ?>"></div>
            <?php endif; ?>

            <?php if ($attributes['addConnector'] && $attributes['isLast'] == false): ?>
                <?php $connectorClass1 = "purdue-home-path-way__connector purdue-home-path-way__connector--straight"; ?>
                <div class="<?= $connectorClass1 ?>"></div>
            <?php endif; ?>

            <?php if ($attributes['addConnector'] && $attributes['isLast'] == false && $connectorClass = $attributes['connectorType'] == "elbow"): ?>
                <?php $connectorClass2 = "purdue-home-path-way__connector purdue-home-path-way__connector--elbow"; ?>
                <div class="<?= $connectorClass2 ?>"></div>
            <?php endif; ?>

            <?php if ($attributes['addConnector'] && $attributes['isLast'] == false && $connectorClass = $attributes['connectorType'] == "elbow" && $attributes['type'] == "full"): ?>
                <?php $connectorClass3 = "purdue-home-path-way__connector purdue-home-path-way__connector--down"; ?>
                <div class="<?= $connectorClass3 ?>"></div>
            <?php endif; ?>

            <?php 
            $containerClass = "purdue-home-path-way__container";
             if($attributes["contentAlign"] === "left" ){
                $containerClass.= " purdue-home-path-way__container--reversed";
             }
             if($attributes["imageSize"] === "square" ){
                $containerClass.= " purdue-home-path-way__container--small-image";
             }
            ?>
            <div class="<?= $containerClass ?>">
                <div class="purdue-home-path-way__image-container">
                    <div class="image">
                        <?php if ($attributes['mediaURL']): ?>
                            <img alt="<?= $attributes["mediaAlt"] ?>" src="<?= $attributes["mediaURL"] ?>"/>
                        <?php endif; ?>
                    </div>
                </div>

                <div class="purdue-home-path-way__content-container">
                    <?php if ($attributes['subheader'] != ""): ?>
                        <<?= $attributes['headerLevel'] ?> class="purdue-home-path-way__subheader"><?= $attributes['subheader'] ?></<?= $attributes['headerLevel'] ?>>
                    <?php endif; ?>

                    <?php if ($attributes['header'] != ""): ?>
                        <?php 
                        $class = 'purdue-home-path-way__header second-level-page-heading'; 
                        if ($attributes['subheader'] == ""):
                        ?>                    
                        <<?= $attributes['headerLevel'] ?> class="<?= $class ?>"><?= $attributes['header'] ?></<?= $attributes['headerLevel'] ?>>
                        <?php elseif($attributes['subheader'] != ""):
                                if($attributes['headerLevel']=="h2"):
                        ?>
                        <h3 class="<?= $class ?>"><?= $attributes['header'] ?></h3>
                        <?php elseif($attributes['headerLevel']=="h3"):
                        ?>
                        <h4 class="<?= $class ?>"><?= $attributes['header'] ?></h4>
                        <?php elseif($attributes['headerLevel']=="h4"):
                        ?>
                        <h5 class="<?= $class ?>"><?= $attributes['header'] ?></h5>
                        <?php elseif($attributes['headerLevel']=="h5"):
                        ?>
                        <h6 class="<?= $class ?>"><?= $attributes['header'] ?></h6>
                        <?php elseif($attributes['headerLevel']=="h6"):
                        ?>
                        <p class="<?= $class ?>"><?= $attributes['header'] ?></p>
                        <?php
                        endif;
                        endif;
                    endif; ?>

                    <?= $content ?>

                    <div class="purdue-home-path-way__list-container">
                        <?php if ($attributes['descText']): ?>
                            <span class="purdue-home-path-way__list-desc"><?= $attributes['descText'] ?>:</span>
                        <?php endif; ?>

                        <?php if ($attributes['links'] && sizeof($attributes['links']) > 0 && $attributes['links'][0]['linkURL']): ?>
                            <?php if ($attributes['linkDisplay'] == "buttons"): 
                                $buttonList = sizeof($attributes['links']) > 1 ? "ul" : "div";
                                $buttonWrapper = sizeof($attributes['links']) > 1 ? "li" : "div";
                            ?>
                                <<?= $buttonList ?>  class="purdue-home-button-list">
                                    <?php foreach ($attributes['links'] as $key => $link): ?>
                                        <?php 
                                            $target = $link["external"] ? 'target="_blank"' : 'target="_self"'; 
                                            $buttonClass = "purdue-home-button";
                                            if (array_key_exists("buttonColor", $link) && $link["buttonColor"] == "black") {
                                                $buttonClass .= " purdue-home-button--black";
                                            }elseif(array_key_exists("buttonColor", $link) && $link["buttonColor"] == "white") {
                                                $buttonClass .= " purdue-home-button--white";
                                            }
                                             $buttonClass .= isset($link["linkCSS"]) ? " ".$link["linkCSS"] : "";
                                            $liClass = array_key_exists("fullWidth", $link) && $link["fullWidth"] ? "purdue-home-button-wrap--full" : "";
                                        ?>
                                         <<?= $buttonWrapper ?> class="<?= $liClass; ?>"><a class="<?= $buttonClass; ?>" href="<?= $link["linkURL"] ?>" <?= $target ?>><?= trim($link["linkText"]) ?></a></<?= $buttonWrapper ?>>
                                    <?php endforeach; ?>
                                </<?= $buttonList ?>>
                            <?php else: ?>
                                <?php $buttonClass = isset($attributes["buttonCSS"]) ? " ".$attributes["buttonCSS"] : ""; ?>
                                <form class="purdue-home-select">
                                    <label for="<?= $attributes['fieldId'] ?>" class="is-sr-only">Choose a link:</label>
                                    <select id="<?= $attributes['fieldId'] ?>" name="links">
                                        <?php foreach ($attributes['links'] as $key => $link): ?>
                                            <option value="<?= $link["linkURL"] ?>" data-external="<?= $link["external"] ?>"><?= trim($link["linkText"]) ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                    <button type="button" class="purdue-home-button <?= $buttonClass; ?>">Learn More</button>
                                </form>
                            <?php endif; ?>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
