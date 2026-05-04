<?php
    $subHeader          = $attributes['subHeader'] ?? '';
    $header             = $attributes['header'] ?? '';
    $subText            = $attributes['subText'] ?? '';
    $rightColumnHeading = $attributes['rightColumnHeading'] ?? '';
    $stat1              = $attributes['rightColumnStat1'] ?? '';
    $description1       = $attributes['rightColumnDescription1'] ?? '';
    $stat2              = $attributes['rightColumnStat2'] ?? '';
    $description2       = $attributes['rightColumnDescription2'] ?? '';
?>
<div class="purdue-color-hero has-gold-background <?php esc_html( $attributes['className'] ); ?>">
    <div class="section has-padding-top-large has-padding-bottom-large">
        <div class="container">
            <div class="purdue-color-hero--body">
            <?php if($subHeader){?>
                <p class="purdue-home-hero__subheader tagged-header purdue-color-hero--subheader">
                    <?php echo $subHeader; ?>
                </p>
                <?php } ?>
                <h1 class="second-level-page-heading purdue-color-hero--header"><?php echo $header; ?></h1>
                <?php if($subText){?>
                <p class="purdue-color-hero--subtext"><?php echo $subText ?></p>
                <?php } 
                if($attributes['links'] && sizeof($attributes['links'])>0 &&$attributes['links'][0]["linkURL"]!=="" ){?>
                <ul class="purdue-home-button-list">
                <?php
                foreach ( $attributes['links'] as $key=>$link ) { 
                    $target=$link["external"]?'target="_blank"':'target="_self"'; 
                    $buttonClass = "purdue-home-button";
                    if ($link["buttonColor"] == "black") {
                        $buttonClass .= " purdue-home-button--black";
                    }elseif($link["buttonColor"] == "white") {
                        $buttonClass .= " purdue-home-button--white";
                    }
                    $liClass = $link["fullWidth"] ? "purdue-home-button-wrap--full" : "";
                ?>
                <li class="<?= $liClass; ?>">
                    <a class="<?= $buttonClass; ?>" href="<?= $link["linkURL"]; ?>" <?= $target; ?>>
                        <?= trim($link["linkText"]); ?>
                    </a>
                </li>
                    <?php } ?>
                </ul>

             <?php } ?>
            </div>
        </div>
        <div class="has-black-background purdue-color-hero--stats">
                <div class="purdue-color-hero--stats-heading">
                    <?php echo $rightColumnHeading; ?>
                </div>
                <div class="purdue-color-hero--stats-wrapper">
                    <div class="purdue-color-hero--stats-wrapper--box">
                    <?php if($stat1){ ?>
                        <span class="purdue-color-hero--stats-wrapper--box--stat has-text-gold">
                            <?php echo $stat1; ?>
                        </span>
                        <?php } ?>
                        <?php if($description1){?>
                        <span class="purdue-color-hero--stats-wrapper--box--description has-text-white">
                            <?php echo $description1; ?>
                        </span>
                        <?php } ?>
                        <?php if($attributes['rightColumnSource1']){?>
                            <p class="purdue-color-hero--stats-wrapper--box--source has-text-white">
                                <?php echo $attributes['rightColumnSource1']; ?>
                            </p>
                         <?php } ?>
                    </div>
                    <?php if( ! empty( $stat2 ) ) : ?>
                        <div class="purdue-color-hero--stats-wrapper--box">
                        <?php if($stat2){?>
                            <span class="purdue-color-hero--stats-wrapper--box--stat has-text-gold">
                                <?php echo $stat2; ?>
                            </span>
                        <?php } ?>
                        <?php if($description2){?>
                            <span class="purdue-color-hero--stats-wrapper--box--description has-text-white">
                                <?php echo $description2; ?>
                            </span>
                    <?php } ?>
                    <?php if($attributes['rightColumnSource2']){?>
                            <p class="purdue-color-hero--stats-wrapper--box--source has-text-white">
                                <?php echo $attributes['rightColumnSource2']; ?>
                            </p>
                    <?php } ?>
                        </div>
                    <?php endif; ?>
                </div>
        </div>
    </div>   
</div>