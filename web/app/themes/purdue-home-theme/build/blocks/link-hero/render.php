<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
?>

<div <?= $id; ?> class="purdue-home-cta-banner purdue-home-link-hero <?= $attributes['className']; ?>">
    <div class="image">
        <?php if ($attributes['mediaType'] == "image"): ?>
            <img alt="<?= $attributes["mediaAlt"]; ?>" src="<?= $attributes["mediaURL"]; ?>"/>
        <?php elseif ($attributes['mediaType'] == "video"): ?>
            <video preload="metadata" title="<?= $attributes['mediaTitle']; ?>" muted playsinline="">
                <source src="<?= $attributes["mediaURL"]; ?>#t=0.1">
            </video>
        <?php endif; ?>
    </div>
    <div class="section has-padding-exlarge">
        <div class="container">
            <?php if ($attributes['subheader'] != ""): ?>
                <p class="purdue-home-hero__subheader purdue-home-link-hero__subheader tagged-header tagged-header--gold">
                    <?= $attributes['subheader']; ?>
                </p>
            <?php endif; ?>
            <?php if ($attributes['header'] != ""): ?>
                <?php $class = 'second-level-page-heading purdue-home-link-hero__header'; ?>
                <h1 class="<?= $class; ?>">
                    <?= $attributes['header']; ?>
                </h1>
            <?php endif; ?>
            <?php if ($attributes['subtext'] != ""): ?>
                <p class="purdue-home-link-hero__subtext">
                    <?= $attributes['subtext']; ?>
                </p>
            <?php endif; ?>
            <?php if ($attributes['linkType']=="cta" && $attributes['ctalinks'] && sizeof($attributes['ctalinks']) > 0 && $attributes['ctalinks'][0]['linkURL']): 
                $buttonList = sizeof($attributes['ctalinks']) > 1 ? "ul" : "div";
                $buttonWrapper = sizeof($attributes['ctalinks']) > 1 ? "li" : "div";
            ?>
                <<?= $buttonList; ?> class="purdue-home-button-list">
                    <?php foreach ($attributes['ctalinks'] as $key => $link): ?>
                        <?php
                        $target = $link["external"] ? 'target="_blank"' : 'target="_self"';
                        $buttonClass = "purdue-home-button";
                        if ($link["buttonColor"] == "black") {
                            $buttonClass .= " purdue-home-button--black";
                        }elseif($link["buttonColor"] == "white") {
                            $buttonClass .= " purdue-home-button--white";
                        }
                        $buttonClass .= isset($link["buttonCSS"]) ? " ".$link["buttonCSS"] : "";
                        $liClass = $link["fullWidth"] ? "purdue-home-button-wrap--full" : "";
                        ?>
                        <<?= $buttonWrapper; ?> class="<?= $liClass; ?>">
                            <a class="<?= $buttonClass; ?>" href="<?= $link["linkURL"]; ?>" <?= $target; ?>>
                                <?= trim($link["linkText"]); ?>
                            </a>
                        </<?= $buttonWrapper; ?>>
                    <?php endforeach; ?>
                </<?= $buttonList; ?>>
            <?php endif; ?>
            <?php if ($attributes['linkType']=="shortCuts" && $attributes['links'] && sizeof($attributes['links']) > 0): ?>
                <div class="purdue-home-link-hero__list-container">
                    <span class="purdue-home-link-hero__list-desc tablet-hidden">
                        <?= $attributes['descText']; ?>:
                    </span>
                     <?php $buttonList = sizeof($attributes['links']) > 1 ? "ul" : "div";
                     $buttonWrapper = sizeof($attributes['links']) > 1 ? "li" : "div"; ?>
                    <<?= $buttonList ?> class="purdue-home-link-hero__list--desktop">
                        <?php foreach ($attributes['links'] as $key => $link): ?>
                            <?php
                            $target = $link["external"] ? 'target="_blank"' : 'target="_self"';
                            $buttonClass = isset($link["buttonCSS"]) ? " ".$link["buttonCSS"] : "";
                            ?>
                            <<?= $buttonWrapper ?>>
                                <a class="purdue-home-button purdue-home-button--white <?=$buttonClass?>" href="<?= $link["linkURL"]; ?>" <?= $target; ?>>
                                    <?= trim($link["linkText"]); ?>
                                </a>
                            </<?= $buttonWrapper ?>>
                        <?php endforeach; ?>
                    </<?= $buttonList ?>>
                    <form class="purdue-home-select purdue-home-link-hero__list--mobile">
                        <label for="<?= $attributes['fieldId']; ?>" class="is-sr-only">Choose a link:</label>
                        <select id="<?= $attributes['fieldId']; ?>" name="links">
                             <option value="" data-external=""><?= $attributes['descText']; ?></option>
                            <?php foreach ($attributes['links'] as $key => $link): ?>
                                <option value="<?= $link["linkURL"]; ?>" data-external="<?= $link["external"]; ?>">
                                    <?= trim($link["linkText"]); ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </form>
                </div>
            <?php endif; ?>
            <div class="purdue-home-link-hero__arrow hero-down-arrow" aria-hidden="true">
                <i class="fa-solid fa-chevron-down icon" aria-hidden="true"></i>
            </div>
        </div>
    </div>
</div>
