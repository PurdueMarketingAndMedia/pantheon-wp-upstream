<?php
# This is a Windows-friendly symlink
if (!empty($_ENV['CACHE_HOST']) && (file_exists(WP_CONTENT_DIR . '/plugins/wp-redis/object-cache.php')) ) {
    require_once WP_CONTENT_DIR . '/plugins/wp-redis/object-cache.php';
}