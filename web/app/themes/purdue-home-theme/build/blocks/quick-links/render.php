<?php

$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";

$heading = $attributes['heading'] !== "" ? $attributes['heading'] : "Quick Links";

if($attributes['style'] === "popout"):

    
?>

<div <?= $id ?> class="purdue-home-quick-links <?= $attributes['className'] ?>">

       <button class="accordion__heading" aria-controls="quick-links-content" aria-expanded="false"><span><?= $heading; ?></span></button>
       <ul id="quick-links-content" class="accordion__content navbar-find-info__items hide">
            <?php
            if (sizeof($attributes['links']) > 0) {
                    foreach ($attributes['links'] as $link) {
                        ?>
                            <li class="quick-link__item navbar-other-links">
                                <?php
                                $target = $link["external"] ? 'target="_blank"' : 'target="_self"';
                                ?>
                                <a class="quick-link__link"
                                    href="<?= $link['linkURL'] ?>" <?= $target ?>>
                                    <?= $link["linkText"] ?>
                                </a>
                            </li>
                    <?php
                    }
            }
            ?>
        </ul>

</div>

<?php else: ?>

    <div <?= $id ?> class="purdue-home-quick-links-static <?= $attributes['className'] ?>">
        <div class="tagged-header-container">

            <h2 class="tagged-header"><span><?= $heading; ?></span></h2>
        
        </div>

       <ul class="quick-links-content">
            <?php
            if (sizeof($attributes['links']) > 0) {
                    foreach ($attributes['links'] as $link) {
                        ?>
                            <li class="quick-link__item">
                                <?php
                                $target = $link["external"] ? 'target="_blank"' : 'target="_self"';
                                ?>
                                <a class="quick-link__link"
                                    href="<?= $link['linkURL'] ?>" <?= $target ?>>
                                    <?= $link["linkText"] ?>
                                </a>
                            </li>
                    <?php
                    }
            }
            ?>
        </ul>

</div>

<?php endif; ?>
