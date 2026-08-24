<div class="column is-half-tablet is-6-desktop is-6-widescreen">
    <?php
        if ($attributes['cardType'] != "directory"  ) {
            require __DIR__ . '/story.php';
        } else {
            require __DIR__ . '/directory.php';
        }
    ?>
</div>
