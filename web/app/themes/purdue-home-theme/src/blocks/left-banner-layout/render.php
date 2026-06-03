<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
$class = 'purdue-home-layout--left-banner has-' . $attributes['background'] . '-background ' . $attributes['className'] . '';
?>

<div <?= $id; ?> class="<?= $class; ?>">
<?php if ($attributes["mediaURL"]) : ?>
  <div class="image purdue-home-layout--left-banner__image">
    <img alt="<?= $attributes["mediaAlt"]; ?>" src="<?= $attributes["mediaURL"]; ?>"/>
  </div>
<?php endif; ?>

<div class="section has-padding-top-large has-padding-bottom-large">
  <div class="container">
    <?php if ($attributes['subheader'] != "") : ?>
      <p class="purdue-home-hero__subheader tagged-header tagged-header--gold purdue-home-layout--left-banner__subheader"><?= $attributes['subheader']; ?></p>
    <?php endif; ?>

    <?php if ($attributes['header'] != "") :
      $headerclass = 'second-level-page-heading purdue-home-layout--left-banner__header';
    ?>
      <h1 class="<?= $headerclass; ?>"><?= $attributes['header']; ?></h1>
    <?php endif; ?>

    <?php if ($attributes['subtext'] != "") : ?>
      <p class="purdue-home-layout--left-banner__subtext"><?= $attributes['subtext']; ?></p>
    <?php endif; ?>

    <?php if ($attributes['links'] && sizeof($attributes['links']) > 0 && $attributes['links'][0]['linkURL']) : 
      $buttonList = sizeof($attributes['links']) > 1 ? "ul" : "div";
      $buttonWrapper = sizeof($attributes['links']) > 1 ? "li" : "div";
    ?>
      <<?= $buttonList ?> class="purdue-home-button-list">
        <?php foreach ($attributes['links'] as $key => $link) :
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
          <<?= $buttonWrapper ?> class="<?= $liClass; ?>">
            <a class="<?= $buttonClass; ?>" href="<?= $link["linkURL"]; ?>" <?= $target; ?>>
              <?= trim($link["linkText"]); ?>
            </a>
          </<?= $buttonWrapper ?>>
        <?php endforeach; ?>
      </<?= $buttonList ?>>
    <?php endif; ?>
  </div>
</div>

<?php if ($attributes['borderBottom']) : ?>
  <div class="section has-padding-top-none has-padding-bottom-none purdue-home-layout--left-banner__border">
    <div class="container"><hr /></div>
  </div>
<?php endif; ?>

<?= $content; ?>
</div>
