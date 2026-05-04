<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
?>

<div <?= $id; ?> class="purdue-home-intro-text has-layout-<?= $attributes['layout']; ?> <?= $attributes['className']; ?>">
    <?php
    $blockclass = 'section';
    $blockclass .= ' has-' . $attributes['background'] . '-background';
    if ($attributes['paddingTop']) {
        $blockclass .= ' ' . $attributes['paddingTop'];
    }
    if ($attributes['paddingBottom']) {
        $blockclass .= ' ' . $attributes['paddingBottom'];
    }
    if ($attributes['removeSidePadding']) {
        $blockclass .= ' has-no-sidepadding';
    }
    ?>
    <div class="<?= $blockclass; ?>">
        <div class="container">
            <?php
            if ($attributes['subheader'] != "" && $attributes['headerType'] == "acumin") {
                if ($attributes['subheaderType'] == "background") {
                    $subheaderclass = "tagged-header";
                    if ($attributes['background'] != "gold") {
                        $subheaderclass .= " tagged-header--gold";
                    }
                    if ($attributes['layout'] == "two" || $attributes['layout'] == "two-line") { ?>
                        <div class="tagged-header-container">
                        <<?= $attributes['headerLevel']; ?> class="' <?= $subheaderclass; ?>"> <?= $attributes["subheader"]; ?></<?= $attributes['headerLevel']; ?>></div>
                    <?php } else { ?>
                        <<?= $attributes['headerLevel']; ?> class="<?= $subheaderclass ?>"><?= $attributes['subheader'] ?></<?= $attributes['headerLevel']; ?>>
                    <?php } ?>
                <?php } else { ?>
                    <<?= $attributes['headerLevel']; ?> class="purdue-home-subheader"><?= $attributes['subheader']; ?> </<?= $attributes['headerLevel']; ?>>
                <?php } ?>
            <?php } ?>

            <?php
            $headerclass = 'purdue-home-intro-text__header header-font-' . $attributes['headerType'];
            if ($attributes['layout'] == "two" || $attributes['layout'] == "two-line") {
                $columnclass = 'columns has-two-columns';
                if ($attributes['layout'] == "two-line") {
                    $columnclass .= ' has-line';
                }
                ?>
                <div class="<?= $columnclass; ?>">
                    <div class="column">
                        <?php
                        if ($attributes['header'] != "") {
                            if($attributes['subheader'] != "" || $attributes['headerType'] == "acumin"){
                                if($attributes['headerLevel']=="h2"){
                                    echo '<h3 class="' . $headerclass . '">' . $attributes['header'] . '</h3>';

                                }elseif($attributes['headerLevel']=="h3"){
                                    echo '<h4 class="' . $headerclass . '">' . $attributes['header'] . '</h4>';

                                }elseif($attributes['headerLevel']=="h4"){
                                    echo '<h5 class="' . $headerclass . '">' . $attributes['header'] . '</h5>';

                                }elseif($attributes['headerLevel']=="h5"){
                                    echo '<h6 class="' . $headerclass . '">' . $attributes['header'] . '</h6>';

                                }elseif($attributes['headerLevel']=="h6"){
                                    echo '<p class="' . $headerclass . '">' . $attributes['header'] . '</p>';

                                }
                            }elseif($attributes['subheader'] == "" && $attributes['headerType'] == "united"){
                                echo '<' . $attributes['headerLevel'] . ' class="' . $headerclass . '">' . $attributes['header'] . '</' . $attributes['headerLevel'] . '>';
                            }
                        }
                        ?>
                    </div>
                    <div class="column">
                        <?= $content; ?>
                    </div>
                </div>
            <?php } else {
                        if ($attributes['header'] != "" || $attributes['headerType'] == "acumin") {
                            if($attributes['subheader'] != ""){
                                if($attributes['headerLevel']=="h2"){
                                    echo '<h3 class="' . $headerclass . '">' . $attributes['header'] . '</h3>';

                                }elseif($attributes['headerLevel']=="h3"){
                                    echo '<h4 class="' . $headerclass . '">' . $attributes['header'] . '</h4>';

                                }elseif($attributes['headerLevel']=="h4"){
                                    echo '<h5 class="' . $headerclass . '">' . $attributes['header'] . '</h5>';

                                }elseif($attributes['headerLevel']=="h5"){
                                    echo '<h6 class="' . $headerclass . '">' . $attributes['header'] . '</h6>';

                                }elseif($attributes['headerLevel']=="h6"){
                                    echo '<p class="' . $headerclass . '">' . $attributes['header'] . '</p>';

                                }
                            }elseif($attributes['subheader'] == ""){
                                echo '<' . $attributes['headerLevel'] . ' class="' . $headerclass . '">' . $attributes['header'] . '</' . $attributes['headerLevel'] . '>';
                            }
                        }
                        echo $content;
            }
            ?>

            <?php
            if ($attributes['links'] && sizeof($attributes['links']) > 0 && $attributes['links'][0]["linkURL"] !== "") {
                ?>
                <div class="purdue-home-intro-text__list-container">
                    <ul class="purdue-home-intro-text__list">
                        <?php
                        foreach ($attributes['links'] as $key => $link) {   
                            $buttonclass = "purdue-home-button";                         
                            if (array_key_exists("buttonColor", $link) && $link["buttonColor"] == "black") {
                                $buttonclass .= " purdue-home-button--black";
                              }elseif(array_key_exists("buttonColor", $link) && $link["buttonColor"] == "white") {
                                $buttonclass .= " purdue-home-button--white";
                              } 
                              $liClass = array_key_exists("fullWidth", $link) && $link["fullWidth"] ? "purdue-home-button-wrap--full" : "";
                            $target = $link["external"] ? 'target="_blank"' : 'target="_self"';
                            echo '<li class='.$liClass.'><a class="' . $buttonclass . '" href="' . $link["linkURL"] . '" ' . $target . '>' . trim($link["linkText"]) . '</a></li>';
                        }
                        ?>
                    </ul>
                </div>
            <?php } ?>
        </div>
    </div>
</div>
