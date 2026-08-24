<div class="column is-half-tablet is-4-desktop">
    <?php
        if ($attributes['cardType'] != "directory"  ) {
            require __DIR__ . '/story.php';
        } else {
            require __DIR__ . '/directory.php';
        }
    ?>
</div>
