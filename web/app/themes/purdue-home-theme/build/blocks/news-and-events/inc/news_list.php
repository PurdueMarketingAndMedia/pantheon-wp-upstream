<?php
$target = $card["external"] ? 'target="_blank"' : 'target="_self"';
if($card["postType"] && $card["postType"] == "rkv_podcast"){
    $card["postType"] = "podcast";
}elseif($card["postType"] && $card["postType"] == "post"){
$card["postType"] = "article";
}elseif($card["postType"] && ($card["postType"] == "video" || $card["postType"] == "rkv_video")){
$card["postType"] = "video";
}
if($attributes['type'] === "50-50-post"):
?>
<div class="<?= $cardClass; ?> <?= 'post-type-'.strtolower(str_replace(' ', '-', $card["postType"])) ?>  is-50-50">
    <div class="flex-container flex-container--align-center">
        <div class="columns">
            <?php
                    if($attributes["showImage"] && $card['mediaType'] == "image"):
                ?>
            <div class="column is-4 is-hidden-tablet-only">
                <?php                   
                            if ($card['mediaType'] == "image") {
                                if($card["mediaURL"] == ""){
                                    $card["mediaURL"]="https://marcom.purdue.edu/app/uploads/2021/09/cropped-cropped-DW540158-HDR.jpg";
                                }
                                ?>
                <div class="image is-16by9">
                    <img class="purdue-home-background-image" alt="<?= $card["mediaAlt"]; ?>"
                        src="<?= $card["mediaURL"]; ?>" />
                </div>
                <?php
                            }
                        ?>
            </div>
            <?php endif; ?>
            <a class="column" href="<?= $card["linkURL"]; ?>" <?= $target; ?>>
                <p class="purdue-home-news-events__title"><?= $card["title"]; ?></p>
                <?php if($attributes["showTag"] || $attributes["showPostType"]){?>
                <p class="purdue-home-news-events__date">
                    <?= $attributes["showPostType"] && $card["postType"] ? '<span class="purdue-posttype-tag">'.$card["postType"].'</span>' : "";?>
                    <?= ($attributes["showTag"] && $card["tag"]) && ($attributes["showPostType"] && $card["postType"])? " | " : "";?>
                    <?= $attributes["showTag"]? '<span class="purdue-tax-tag">'.$card["tag"].'</span>' : "";?></p>
                <?php } ?>
            </a>
        </div>
    </div>
</div>
<?php elseif($attributes['type'] === "50-50"): ?>
<div class="<?= $cardClass; ?> is-50-50">
    <div class="flex-container flex-container--align-center">
        <div class="columns">
            <?php
                        if($attributes["showImage"] && $card['mediaType'] == "image"):
                    ?>
            <div class="column is-4 is-hidden-tablet-only">
                <?php                   
                                if ($card['mediaType'] == "image") {
                                    if($card["mediaURL"] == ""){
                                        $card["mediaURL"]="https://marcom.purdue.edu/app/uploads/2021/09/cropped-cropped-DW540158-HDR.jpg";
                                    }
                                    ?>
                <div class="image is-16by9">
                    <img class="purdue-home-background-image" alt="<?= $card["mediaAlt"]; ?>"
                        src="<?= $card["mediaURL"]; ?>" />
                </div>
                <?php
                                }
                            ?>
            </div>
            <?php endif; ?>
            <a class="column" href="<?= $card["linkURL"]; ?>" <?= $target; ?>>
                <?php if($attributes["showTag"]&&$card["tag"]){?>
                <p class="purdue-home-news-events__tag"><?= $card["tag"]; ?></p>
                <?php } ?>
                <p class="purdue-home-news-events__title"><?= $card["title"]; ?></p>
                <?php if($attributes["showDate"]){?>
                <p class="purdue-home-news-events__date">
                    <?php
                            if ($card["date"]) {
                                ?>
                    <span class="date"><?= $card["date"]; ?></span>
                    <?php
                            }
                            if($card["date"] && $card["time"]){
                                echo " | ";
                            
                            }
                            if ($card["time"]) {
                                ?>
                    <span class="time"><?= $card["time"]; ?></span>
                    <?php
                            }
                            ?>
                </p>
                <?php } ?>
           </a>
        </div>
    </div>
</div>
<?php else: ?>
<a class="<?= $cardClass; ?>" href="<?= $card["linkURL"]; ?>" <?= $target; ?>>
    <div class="flex-container flex-container--align-center">
        <?php if($attributes["showTag"]&&$card["tag"]){?>
        <p class="purdue-home-news-events__tag"><?= $card["tag"]; ?></p>
        <?php } ?>
        <p class="purdue-home-news-events__title"><?= $card["title"]; ?></p>
        <?php if($attributes["showDate"]){?>
        <p class="purdue-home-news-events__date">
            <?php
                            if ($card["date"]) {
                                ?>
            <span class="date"><?= $card["date"]; ?></span>
            <?php
                            }
                            if($card["date"] && $card["time"]){
                                echo " | ";
                            
                            }
                            if ($card["time"]) {
                                ?>
            <span class="time"><?= $card["time"]; ?></span>
            <?php
                            }
                            ?>
        </p>
        <?php } ?>
    </div>
</a>
<?php endif; ?>