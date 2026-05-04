<?php $id = $attributes['id'] != "" ? 'id="' . $attributes['id'] . '"' : "" ;?>

<div <?= $id ?> class="purdue-home-50-50-animated-header <?= $attributes['className'] ?>">

    <div class="section page-layout-wide page-layout-two-column">

        <div class="container">

            <div class="wp-block-columns page-layout-columns columns is-multiline is-layout-flex wp-container-core-columns-layout-1 wp-block-columns-is-layout-flex">

                <div class="wp-block-column column is-half-desktop is-full-tablet is-layout-flow wp-block-column-is-layout-flow">

                        <div class="image is-16by9">

                            <img class="purdue-home-background-image" alt="<?= $attributes["mediaAlt"] ?>" src="<?= $attributes["mediaURL"] ?>" />

                        </div>

                </div>

                <div class="wp-block-column column is-half-desktop is-full-tablet is-full-mobile is-layout-flow wp-block-column-is-layout-flow">
                    
                    <?php if ($attributes['subheader'] != "") : ?>
                        <p class="purdue-home-hero__subheader tagged-header tagged-header--gold"><?= $attributes['subheader'] ?></p>
                    <?php endif; ?>

                    <?php $headerAnimate = explode(",", $attributes['headerAnimation']); ?>

                    <h2 class="second-level-page-heading purdue-home-cta-hero__header">
                        <?php 
                        if(trim($attributes['headerStatic1']) !=""){
                        ?>
                        <span class="purdue-home-cta-hero__header-static"><?= trim($attributes['headerStatic1']) ?></span>
                        <?php 
                    } 
                    if(sizeof($headerAnimate)>0){
                    ?>
                        <span class="purdue-home-cta-hero__header-animate">
                        <?php                    
                        foreach ($headerAnimate as $key=>$item) {
                            if($item != ""){
                            ?>
                            <span class="purdue-home-cta-hero__header-animate-item
                            <?php if($key != 0){echo ' hide';} ?>"><?= trim($item) ?></span>
                            <?php 
                            }
                        }
                        ?>
                        </span>
                        <?php 
                    }
                        if(trim($attributes['headerStatic2']) !=""){
                        ?>
                        <span class="purdue-home-cta-hero__header-static"><?= trim($attributes['headerStatic2']) ?></span>
                        <?php } ?>
                    </h2>

                </div>

            </div>

        </div>

    </div>

</div>