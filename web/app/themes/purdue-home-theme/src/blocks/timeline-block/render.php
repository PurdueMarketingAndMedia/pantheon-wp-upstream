<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
?>

<div<?= $id ?> class="purdue-home-timeline has-gray-background <?= $attributes['className'] ?>">
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
                <div class="purdue-home-timeline__intro">
                    <?php
                    if ($attributes['header']) {
                    ?>
                    <h2 class="purdue-home-intro-text__header header-font-united purdue-home-cta-grid__header purdue-home-timeline__header"><?= $attributes['header'] ?></h2>
                    <?php
                    }
                    ?>
                    <?php
                    if ($content && strlen($content) > 0) {
                    ?>
                        <div class="purdue-home-timeline__content">
                            <?= $content ?>
                        </div>
                    <?php
                    }
                    ?>
                </div>
            <?php
            }
            $iframes = [];
            if (sizeof($attributes['cards']) > 0) {
            ?>
            <div class="purdue-home-timeline__cards">
            <?php
                foreach ($attributes['cards'] as $card) {
                    $cardClass="purdue-home-timeline__card";
                    $cardClass.=" card-width-".$card["width"];
                    $cardClass.=" content-align-".$card["align"];
                    $videoId ="";
                    if($card['mediaURL'] || $card['youtube'] || $card['vimeo']){
                        $cardClass.=" has-thumbnail";
                    }
                    $mediaURL = $card["mediaURL"];
                    if ($card['source'] == "youtube" && $card['youtube'] != "") {
                        $cardClass.= " purdue-home-timeline__card__youtube";
                        $videoId = purdue_get_youtube_id($card['youtube']);
                        $embed=array(
                            'source'=>'youtube',
                            'id'=>$videoId
                        );
                        $iframes[] = $embed;
                        if($mediaURL == ""){
                            $mediaURL = "https://img.youtube.com/vi/".$videoId."/maxresdefault.jpg";
                        }
                        
                    }elseif($card['source'] == "vimeo" && $card['vimeo'] != ""){
                        $cardClass.= " purdue-home-timeline__card__vimeo";
                        $videoId = purdue_get_vimeo_id($card['vimeo']);
                        $query = null;
                        if (parse_url($card['vimeo'], PHP_URL_QUERY)){
                            $query = parse_url($card['vimeo'], PHP_URL_QUERY);
                            parse_str($query, $query_params);    
                        }
                                 
                        $embed=array(
                            'source'=>'vimeo',
                            'id'=>$videoId,
                            'query' => '?'.$query
                        );
                        $iframes[] = $embed;
                        if($mediaURL == ""){
                            if($query){
                                $mediaURL = "https://vumbnail.com/".$videoId.":".$query_params['h'].".jpg";
                            }else{
                                $mediaURL = "https://vumbnail.com/".$videoId.".jpg";
                            }
                        }
                    }
            ?>
              <div class="<?= $cardClass ?>">
                <div class="purdue-home-timeline__card-content">
                <?php if($mediaURL){
                ?>
                     <figure class="image is-16by9">
                    <?php
                        if ($card['mediaType'] == "image" || $card['youtube'] || $card['vimeo']) {
                    ?>
                        <img class="purdue-home-background-image" alt="<?= $card["mediaAlt"] ?>" src="<?= $mediaURL ?>" />
                    <?php
                    } elseif ($card['mediaType'] == "video") {
                    ?>
                        <video preload="metadata" class="purdue-home-background-image" muted playsinline="">
                            <source src="<?=  $card['mediaURL'] ?>#t=0.1">
                        </video>
                    <?php
                    }
                    if ($card['youtube'] != "" || $card['vimeo'] != "" ) {
                    ?>
                        <div class="flex-container">
                            <div class="modal-trigger" data-target="iframe-<?= $videoId ?>">
                                <span class="cta-link purdue-home-cta-card__link">Watch Video</span>
                                <img class="cta-icon cta-icon--play" src="<?php echo get_template_directory_uri() ?>/imgs/play_icon_gold.svg" alt="">                                       
                            </div>
                        </div>
                    <?php
                    }
                    ?>
                    </figure>
                    <?php } ?>
                    <div class="flex-container--align-center">
                        <?php
                        if ($card["subtitle"]) {
                        ?>
                            <p class="purdue-home-timeline__card-subtitle"><?= $card["subtitle"] ?></p>
                        <?php
                        }
                        ?>
                        <?php
                        $tag = !empty($attributes['header']) ? 'h3' : 'h2';
                        ?>

                        <<?= $tag; ?> class="purdue-home-cta-grid__card-title">
                        <?= esc_html($card['title']); ?>
                        </<?= $tag; ?>>

                        <?php
                        if ($card["subtext"]) {
                        ?>
                            <p class="purdue-home-timeline__card-subtext"><?= $card["subtext"] ?></p>
                        <?php
                        }
                        if ($card["linkURL"]) {
                            $target = $card["external"] ? "_blank" : "_self";
                            $external = isset($card["external"]) && $card["external"] == 'target="_blank"' ? "(Opens in a new tab)" : "";
                            $ariaLabel = "";
                            if(isset($card["ariaLabel"]) && $card["ariaLabel"]!==""){
                                $ariaLabel = 'aria-label="'.$card["ariaLabel"].' '.$external.'"';
                            }elseif(isset($external) && $external!==""){
                                $ariaLabel = isset($card["linkText"])? 'aria-label="'.trim($card["linkText"]).' '.$external.'"':'';
                            }else{
                                $ariaLabel = "";
                            }
                            $buttonClass = isset($card["buttonCSS"]) ? "purdue-home-button ".$card["buttonCSS"] : "purdue-home-button";
                        ?>
                            <a class="<?= $buttonClass ?>" href="<?= $card["linkURL"] ?>" target="<?= $target ?>" <?= $ariaLabel ?>><?= $card["linkText"] ?></a>
                        <?php
                        }
                        ?>
                    </div>
                </div>
             </div>
             <?php
            }
            ?>
            </div>
            <?php
            }
            ?>
        </div>
    </div>
    <?php
// Print iframes
if (sizeof($iframes) > 0) {
    foreach ($iframes as $iframe) {
        if($iframe['source'] == "youtube"){
            $protocol = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
            $origin = $protocol . $_SERVER['HTTP_HOST'];
            $url = 'https://www.youtube.com/embed/' . $iframe['id'] . '?rel=0&enablejsapi=1&origin=' . $origin;
        }elseif($iframe['source'] == "vimeo"){
            $url = 'https://player.vimeo.com/video/' . $iframe['id'];
        }
        
    ?>
        <div id="iframe-<?= $iframe['id'] ?>" class="embed-video-modal modal">
            <div class="modal-background">
            </div>
            <div class="modal-close" aria-label="close"></div>
            <div class="modal-content">
                <div class="iframe-container">
                <?php
                if($iframe['source'] == "youtube"){
                ?>
                    <div class="modal-youtube-video" id="<?= $iframe['id'] ?>" data-src="<?= $url ?>"></div>
                <?php
                }
                else{
                ?>
                <iframe class="modal-vimeo-video" id="<?= $iframe['id'] ?>" src="<?= $url.$iframe['query'] ?>"></iframe>
                <?php
                }
                ?>
                </div>
            </div>
        </div>
<?php
    }
}
?>
</div>
