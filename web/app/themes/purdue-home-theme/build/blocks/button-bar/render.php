<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
if($attributes['type']=="simple"){
    if ($attributes['links'] && sizeof($attributes['links']) > 0){
        $class = "purdue-home-buttons";  
        if($attributes['alignment']==="left"){
            $class.= " purdue-home-buttons--left";  
        }

?>
<div <?= $id ?> class="<?= $class ?> <?= $attributes['className'] ?>">
    <ul class="purdue-home-button-list">
        <?php foreach ($attributes['links'] as $key => $link):
            $target = $link["external"] ? 'target="_blank"' : 'target="_self"';
            $buttonClass = "purdue-home-button";
            $buttonClass .= $link["buttonCSS"] ? " ".$link["buttonCSS"] : "";
            if ($link["buttonColor"] == "black") {
                $buttonClass .= " purdue-home-button--black";
            }elseif($link["buttonColor"] == "white") {
                $buttonClass .= " purdue-home-button--white";
            }
            $liClass = $link["fullWidth"] ? "purdue-home-button-wrap--full" : "";
            ?>
            <li class="<?= $liClass ?>"><a class="<?= $buttonClass ?>" href="<?= $link["linkURL"] ?>" <?= $target ?>><?= trim($link["linkText"]) ?></a></li>
        <?php endforeach; ?>
    </ul>
</div>
<?php }
}else{ ?>
<div <?= $id ?> class="purdue-home-button-bar has-<?= $attributes['background'] ?>-background <?= $attributes['className'] ?>">
    <ul>
        <?php   
        foreach ($attributes['links'] as $key => $link):
            $target = $link["external"] ? 'target="_blank"' : 'target="_self"';
            $buttonclass = "purdue-home-button-bar__button";  
            $buttonclass .= $link["buttonCSS"] ? " ".$link["buttonCSS"] : "";
        ?>
            <li>
                <a class="<?= $buttonclass ?>" href="<?= $link["linkURL"] ?>" <?= $target ?>>
                    <?php if ($link["linkText"]): ?>
                        <p class="purdue-home-button-bar__button-title"><?= trim($link["linkText"]) ?></p>
                    <?php endif; ?>
                    <?php if ($link["linkSubtext"]): ?>
                        <p class="purdue-home-button-bar__button-content"><?= $link["linkSubtext"] ?></p>
                    <?php endif; ?>
                </a>
            </li>
        <?php endforeach; ?>
    </ul>
</div>
<?php }
 ?>