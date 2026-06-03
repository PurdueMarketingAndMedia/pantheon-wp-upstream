<?php
$id = $attributes['id'] != "" ? ' id="' . $attributes['id'] . '"' : "";
$class = '';
if ($attributes['paddingTop']) {
    $class .= ' ' . $attributes['paddingTop'];
}
if ($attributes['paddingBottom']) {
    $class .= ' ' . $attributes['paddingBottom'];
}

if ($attributes['borderTop']) { ?>
    <div <?php echo $id; ?> class="purdue-home-search-bar has-<?php echo $attributes["background"]; ?>-background <?php echo $attributes['className']; ?>">
        <div class="section has-padding-bottom-none has-padding-top-none">
            <div class="container">
                <hr/>
            </div>
        </div>
        <div class="section<?php echo $class; ?>">
<?php } else { ?>
    <div<?php echo $id; ?> class="purdue-home-search-bar has-<?php echo $attributes["background"]; ?>-background <?php echo $attributes['className']; ?>">
        <div class="section<?php echo $class; ?>">
<?php } ?>

<div class="container">
<?php
if ($attributes['header'] != ""): ?>
    <h2 class="purdue-home-search-bar__header align-center"><?= $attributes['header'];?></h2>
<?php endif; ?>

<div class="form-group search-box search-box-wide">
<?php 

$searchOption = get_theme_mod( 'search_option_settings', 'wordpress' );

if ($searchOption == "wordpress") {
    $placeholder = purdue_search_placeholder_wordpress();
    $value = isset($_GET['s']) ? wp_filter_nohtml_kses(sanitize_text_field($_GET['s'])) : ""; ?>
    <form action="<?php echo home_url('/'); ?>" name="searchform" method="get" class="search-form">
        <i class="fas fa-search search-icon" aria-label="Search for:"></i>
        <input type="search" title="search" class="search-field" aria-label="Search" placeholder="<?php echo $placeholder; ?>" name="s" value="<?php echo esc_attr($value); ?>">
        <button type="submit" class="search-button">Search</button>
        <button type="button" class="clear-button">
            <i class="fa-regular fa-circle-xmark" aria-label="Clear"></i>
        </button>
    </form>
<?php } elseif($searchOption == "google") {
    $value = isset($_GET['q']) ? wp_filter_nohtml_kses(sanitize_text_field($_GET['q'])) : "";
    $placeholder = purdue_search_placeholder_google(); ?>
    <form action="<?php echo home_url('/'); ?>/search" name="searchform" method="get" class="search-form">
        <i class="fas fa-search search-icon"></i>
        <input type="search" title="search"  aria-label="Search for:" class="search-field" placeholder="<?php echo $placeholder; ?>" name="q" value="<?php echo esc_attr($value); ?>">
        <button type="submit" class="search-button">Search</button>
        <button type="button" class="clear-button">
            <i class="fa-regular fa-circle-xmark" aria-label="Clear"></i>
        </button>
    </form>
<?php } else {
    $value = isset($_GET['q']) ? wp_filter_nohtml_kses(sanitize_text_field($_GET['q'])) : "";
?>
    <form action="<?php echo home_url('/'); ?>/search" name="searchform" method="get" class="search-form">
        <i class="fas fa-search search-icon" aria-label="Search for:"></i>
        <input type="search" title="search" class="search-field" placeholder="Search" name="q" value="<?php echo esc_attr($value); ?>">
        <button type="submit" class="search-button">Search</button>
        <button type="button" class="clear-button">
            <i class="fa-regular fa-circle-xmark" aria-label="Clear"></i>
        </button>
    </form>
<?php } ?>

</div>

<?php
if ($searchOption == "wordpress") {
    $popular_links = purdue_search_popular_wordpress();
    echo $popular_links;
} elseif($searchOption == "google") {
    $popular_links = purdue_search_popular_google();
    echo $popular_links;
}
?>

</div>

<?php
if ($attributes['borderBottom']) { ?>
    <div class="section has-padding-bottom-none has-padding-top-none">
        <div class="container">
            <hr/>
        </div>
    </div>
<?php } ?>

</div>
</div>
