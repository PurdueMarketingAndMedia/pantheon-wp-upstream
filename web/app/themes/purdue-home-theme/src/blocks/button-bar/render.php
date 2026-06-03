<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
$buttonList = sizeof($attributes['links']) > 1 ? "ul" : "div";
$buttonWrapper = sizeof($attributes['links']) > 1 ? "li" : "div";

if($attributes['type']=="simple"){
    if ($attributes['links'] && sizeof($attributes['links']) > 0){
        $class = "purdue-home-buttons";  
        if($attributes['alignment']==="left"){
            $class.= " purdue-home-buttons--left";  
        }

?>
<div <?= $id ?> class="<?= $class ?> <?= $attributes['className'] ?>">
    <<?= $buttonList; ?> class="purdue-home-button-list">
        <?php foreach ($attributes['links'] as $key => $link):
            $target = $link["external"] ? 'target="_blank"' : 'target="_self"';
            $external = isset($link["external"]) && $link["external"] == 'target="_blank"' ? "(Opens in a new tab)" : "";
            $ariaLabel = "";
            if(isset($link["ariaLabel"]) && $link["ariaLabel"]!==""){
                $ariaLabel = 'aria-label="'.$link["ariaLabel"].' '.$external.'"';
            }elseif(isset($external) && $external!=""){
                $ariaLabel = isset($link["linkText"])? 'aria-label="'.trim($link["linkText"]).' '.$external.'"':'';
            }else{
                $ariaLabel = "";
            }
            $buttonClass = "purdue-home-button";
            $buttonClass .= isset($link["buttonCSS"]) ? " " . $link["buttonCSS"] : "";
            if ($link["buttonColor"] == "black") {
                $buttonClass .= " purdue-home-button--black";
            }elseif($link["buttonColor"] == "white") {
                $buttonClass .= " purdue-home-button--white";
            }
            $liClass = $link["fullWidth"] ? "purdue-home-button-wrap--full" : "";
            ?>
            <<?= $buttonWrapper ?> class="<?= $liClass ?>"><a class="<?= $buttonClass ?>" href="<?= $link["linkURL"] ?>" <?= $target ?> <?= $ariaLabel ?>><?= trim($link["linkText"]) ?></a></<?= $buttonWrapper ?>>
        <?php endforeach; ?>
    </<?= $buttonList; ?>>
</div>
<?php }
}else{ ?>
<div <?= $id ?> class="purdue-home-button-bar has-<?= $attributes['background'] ?>-background <?= $attributes['className'] ?>">
    <<?= $buttonList; ?>>
        <?php   
        foreach ($attributes['links'] as $key => $link):
            $target = $link["external"] ? 'target="_blank"' : 'target="_self"';
            $buttonclass = "purdue-home-button-bar__button";  
            $buttonclass .= isset($link["buttonCSS"]) ? " ".$link["buttonCSS"] : "";
        ?>
            <<?= $buttonWrapper; ?>>
                <a class="<?= $buttonclass ?>" href="<?= $link["linkURL"] ?>" <?= $target ?>>
                    <?php if ($link["linkText"]): ?>
                        <h2 class="purdue-home-button-bar__button-title"><?= trim($link["linkText"]) ?></h2>
                    <?php endif; ?>
                    <?php if ($link["linkSubtext"]): ?>
                        <p class="purdue-home-button-bar__button-content"><?= $link["linkSubtext"] ?></p>
                    <?php endif; ?>
                </a>
            </<?= $buttonWrapper; ?>>
        <?php endforeach; ?>
    </<?= $buttonList ?>>
</div>
<?php }
 ?>