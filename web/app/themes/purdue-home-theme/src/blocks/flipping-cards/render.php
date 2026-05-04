<?php

$id=$attributes['id']!=""?' id="'.$attributes['id'].'"':"";
$sectionclass='section';
$sectionclass.=' has-'.$attributes['background'].'-background';
if($attributes['paddingTop']){
    $sectionclass.=' '.$attributes['paddingTop'];
}
if($attributes['paddingBottom']){
    $sectionclass.=' '.$attributes['paddingBottom'];
}
if ($attributes['removeSidePadding']) {
    $sectionclass .= ' has-no-sidepadding';
}

$columns = $attributes['columns'] ? $attributes['columns'] : 2; // Default to 4 columns if not set

$columnClass="column is-full-mobile";

if($columns == 3){

    $columnClass.=' is-4-desktop is-4-widescreen is-3-fullhd';

}elseif($columns == 2){

    $columnClass.=' is-half-desktop is-half-widescreen is-3-fullhd';

}else{

    $columnClass.=' is-'.$attributes['columns'].'-desktop is-'.$attributes['columns'].'-widescreen is-'.$attributes['columns'].'-fullhd';

}

if($attributes['columns']!=12){

    $columnClass.=" is-half-tablet";

}else{

    $columnClass.=" is-full-tablet";

}

?>
<div <?= $id; ?> class="purdue-home-flipping-cards <?= $attributes['className']; ?>">

<div class="<?= $sectionclass; ?>">
<div class="container">
<?php
if($attributes['header'] != ""){
?>
<h2 class="flipping-cards-header"><?= $attributes['header']; ?></h2>  
<?php } ?>
<?php
if($attributes['content'] != ""){
?>
<p class="flipping-cards-intro">
<?= $attributes['content']; ?>
</p>
<?php } ?>
    <div class="flipping-cards-wrap">
        <div class="columns is-multiline">
        <?php
        foreach( $attributes['cards'] as $card){
           // $columnClass='column is-full-mobile is-half-tablet is-half-desktop is-half-widescreen is-3-fullhd';
        ?>
            <div class="<?= $columnClass; ?>">
                <div class="flipping-card">
                    <div class="flipping-card-inner">
                        <div class="flipping-card-front">
                        <div class="flipping-icon front"></div>
                            <figure class="image">
                                <img src="<?= $card['mediaURL']; ?>" alt="<?= $card['mediaAlt']; ?>" />
                            </figure>
                            <?php
                            if($card['showTitle'] != ""){
                            ?>
                                <p class="flipping-card-front__title">
                                <?= $card['title']; ?>
                                </p>
                            <?php } ?>
                        </div>
                        <div class="flipping-card-back">
                            <div class="flipping-icon back"></div>
                            <figure class="image is-3by2">
                                <img src="<?= $card['backImageURL']; ?>" alt="<?= $card['backImageAlt']; ?>" />
                            </figure>
                            <div class="flipping-card-back__content">
                            <?php
                                if($card['showTitle'] != ""){
                            ?>
                                <p class="flipping-card-back__title">
                                    <?= $card['title']; ?>
                                </p>
                                <?php } ?>
                                <?php
                                    if($card['subtitle1'] != ""){
                                ?>
                                    <p class="flipping-card-back__subtitle">
                                        <?= $card['subtitle1']; ?>
                                    </p>
                                <?php } ?>
                                <?php
                                    if($card['content1'] != ""){
                                ?>
                                    <p class="flipping-card-back__text">
                                        <?= $card['content1']; ?>
                                    </p>
                                <?php } ?>
                                <?php
                                    if($card['subtitle2'] != ""){
                                ?>
                                    <p class="flipping-card-back__subtitle">
                                        <?= $card['subtitle2']; ?>
                                    </p>
                                <?php } ?>
                                <?php
                                    if($card['content2'] != ""){
                                ?>
                                    <p class="flipping-card-back__text">
                                        <?= $card['content2']; ?>
                                    </p>
                                <?php } ?>
                                <?php
                                    if($card['subtitle3'] != ""){
                                ?>
                                    <p class="flipping-card-back__subtitle">
                                        <?= $card['subtitle3']; ?>
                                    </p>
                                <?php } ?>
                                <?php
                                    if($card['content3'] != ""){
                                ?>
                                    <p class="flipping-card-back__text">
                                        <?= $card['content3']; ?>
                                    </p>
                                <?php } ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <?php } ?>
        </div>
    </div>


</div></div>
</div>