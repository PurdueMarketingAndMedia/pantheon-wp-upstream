<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
?>

<div <?= $id ?> class="purdue-home-rtb-row <?= $attributes['className'] ?>">
    <?php
    $blockclass = 'section';
    $blockclass .= ' has-' . $attributes['background'] . '-background';
    if ($attributes['paddingTop']) {
        $blockclass .= ' ' . $attributes['paddingTop'];
    }
    if ($attributes['paddingBottom']) {
        $blockclass .= ' ' . $attributes['paddingBottom'];
    }
    $cardclass = 'purdue-home-rtb-horizontal';
    if ($attributes['layout'] == "vertical") {
        $cardclass .= ' purdue-home-rtb-horizontal--vertical';
    }
    ?>
    <div class="<?= $blockclass ?>">
        <div class="container">
            <?php
            if (sizeof($attributes['rtbs']) > 0) {
                ?>
                <div class="columns">
                    <?php
                    foreach ($attributes['rtbs'] as $rtb) {
                        $column_class = ['column'];
                        if (isset($attributes['columns']) && !empty($attributes['columns']) && $attributes['columns'] != "auto") {
                            if ($attributes['columns'] == "2") {
                                $column_class[] = 'is-half-desktop is-half-tablet is-full-mobile';
                            } elseif ($attributes['columns'] == "3") {
                                $column_class[] = 'is-one-third-widescreen is-half-desktop is-half-tablet is-full-mobile';
                            } elseif ($attributes['columns'] == "4") {
                                $column_class[] = 'is-one-quarter-widescreen is-half-desktop is-half-tablet is-full-mobile';
                            } elseif ($attributes['columns'] == "1") {
                                $column_class[] = 'is-full-widescreen is-full-desktop is-full-tablet is-full-mobile';
                            }
                        }
                        ?>
                        <div class="<?= implode(' ', $column_class) ?>">
                            <div class="<?= $cardclass ?>">
                                <div class="columns">
                                    <?php
                                    if ($rtb["highlight"] != "") {
                                        ?>
                                        <div class="column is-highlight">
                                            <span class="purdue-home-rtb-horizontal__highlight"><?= $rtb["highlight"] ?></span>
                                        </div>
                                    <?php
                                    }

                                    if ($rtb["content"] != "") {
                                        ?>
                                        <div class="column">
                                            <span class="purdue-home-rtb-horizontal__content"><?= $rtb["content"] ?></span>
                                            <?php
                                            if ($rtb['source']) {
                                                if ($rtb['linkURL']) {
                                                    $target = $rtb["external"] ? 'target="_blank"' : 'target="_self"';
                                                    ?>
                                                    <a class="purdue-home-rtb-horizontal__source"
                                                       href="<?= $rtb['linkURL'] ?>" <?= $target ?>>
                                                        <?= $rtb["source"] ?>
                                                    </a>
                                                <?php
                                                } else {
                                                    ?>
                                                    <span class="purdue-home-rtb-horizontal__source">
                                                        <?= $rtb["source"] ?>
                                                    </span>
                                                <?php
                                                }
                                            }
                                            ?>
                                        </div>
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
</div>
