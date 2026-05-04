<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
$class="section";
if($attributes['withSidebar'] ){
    $class.=" page-layout-with-sidebar";
}
if($attributes['bgColor'] ){
    $class.=" ".$attributes['bgColor'];
}
if($attributes['paddingTop'] ){
    $class.=" ".$attributes['paddingTop'];
}
if($attributes['paddingBottom'] ){
    $class.=" ".$attributes['paddingBottom'];
}
if($attributes['border'] ){
    $class.=" has-border-bottom";
}
$class.=" ".$attributes['className'];
if($attributes['width']=="wide" ){
    $class.=" page-layout-wide";
    if($attributes['twoColumn'] ){
        $class.=" page-layout-two-column";
        if($attributes['stackReverseMobile'] ){
            $class.=" page-layout-two-column-reverser";
        }
        if($attributes['divider'] ){
            $class.=" page-layout-two-column-divider";
        }
        if($attributes['verticalCenter'] ){
            $class.=" page-layout-two-column-verticalCenter";
        }
    }
}
$containerClass="container";
if($attributes['sidebarLocationDesktop'] =='left' && $attributes['width']=="narrow" ){
    $containerClass.=" desktop-reverse";
}
if(($attributes['sidebarLocationMobile'] =='above' && $attributes['width']=="narrow" )||($attributes['width']=="wide" && $attributes['stackReverseMobile'])){
    $containerClass.=" mobile-reverse";
}
?>
<div <?= $id ?> class="<?= $class ?>">
    <div class="<?= $containerClass ?>">
        <?php
    if($attributes['header'] != ""){

        if($attributes['bgColor']!="has-gold-background" && $attributes['bgColor']!=""){
             $headerClass.= " tagged-header--gold";
        }elseif($attributes['bgColor']===""){
             $headerClass.= " tagged-header--".$attributes['headerColor']."";
        }else{
             $headerClass.= " ";
        }

        $headerContainerClass="tagged-header-container tagged-header-container--content-block";
        if($attributes['width']=="narrow" && !$attributes['withSidebar']){
            $headerContainerClass.= " tagged-header-container-narrow";
        }
        if($attributes['bgColor']!="has-gold-background" && $attributes['bgColor']!=""){
            $headerContainerClass.= " tagged-header-container-gold";
        }elseif($attributes['bgColor']===""){
            $headerContainerClass.= " tagged-header-container-".$attributes['headerColor']."";
        }else{
            $headerContainerClass.= " tagged-header-container-black";
        }
    ?>
        <div class="<?= $headerContainerClass; ?>">
            <h2 class="tagged-header<?= $headerClass; ?>"><?= $attributes['header']; ?></h2>
        </div>
        <?php } ?>
        <?= $content ?>
    </div>
</div>