<?php
// Don't show deprecations; useful under PHP 5.5
error_reporting( E_ALL ^ E_DEPRECATED );


$primary_domain = $_SERVER['HTTP_HOST'];
// Enforce Production URL and HTTPS on Pantheon
if (isset($_ENV['PANTHEON_ENVIRONMENT']) && php_sapi_name() != 'cli') {
  // Redirect to https://$primary_domain in the Live environment

  if ($_ENV['PANTHEON_ENVIRONMENT'] === 'live') {
    // $primary_domain = 'subdomain.purdue.edu';
  } 
  elseif ($_ENV['PANTHEON_ENVIRONMENT'] === 'test') {
    // $primary_domain = 'subdomain.test.purdue.ede';
  } 
  elseif ($_ENV['PANTHEON_ENVIRONMENT'] === 'dev') {
    // $primary_domain = 'subdomain.dev.purdue.edu';
  } 

  if ($_SERVER['HTTP_HOST'] != $primary_domain
      || !isset($_SERVER['HTTP_USER_AGENT_HTTPS'])
      || $_SERVER['HTTP_USER_AGENT_HTTPS'] != 'ON' ) {

    # Name transaction "redirect" in New Relic for improved reporting (optional)
    if (extension_loaded('newrelic')) {
      newrelic_name_transaction("redirect");
    }

    header('HTTP/1.0 301 Moved Permanently');
    header('Location: https://'. $primary_domain . $_SERVER['REQUEST_URI']);
    exit();
  }
}

/**
 * Set root path
 */
// $rootPath = realpath( __DIR__ . '/..' );

/**
 * Include the Composer autoload
 */
// require_once( $rootPath . '/vendor/autoload.php' );

/**
 * Local configuration information.
 *
 * If you are working in a local/desktop development environment and want to
 * keep your config separate, we recommend using a 'wp-config-local.php' file,
 * which you should also make sure you .gitignore.
 */
if ( (!isset($_ENV['PANTHEON_ENVIRONMENT'])) && (file_exists(dirname(__FILE__) . '/wp-config-local.php')) ):
  # IMPORTANT: ensure your local config does not include wp-settings.php
  require_once(dirname(__FILE__) . '/wp-config-local.php');
elseif (isset($_ENV['PANTHEON_ENVIRONMENT'])):
	/**
	 * Pantheon Environment configuration information.
	 */
	define( 'DB_NAME', $_ENV['DB_NAME'] );
	define( 'DB_USER', $_ENV['DB_USER'] );
	define( 'DB_PASSWORD', $_ENV['DB_PASSWORD'] );
	define( 'DB_HOST', $_ENV['DB_HOST'] . ':' . $_ENV['DB_PORT'] );

	/**#@+
	 * Authentication Unique Keys and Salts.
	 *
	 * Change these to different unique phrases!
	 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
	 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
	 *
	 * Pantheon sets these values for you also. If you want to shuffle them you
	 * can do so via your dashboard.
	 *
	 * @since 2.6.0
	 */
	define( 'AUTH_KEY', $_ENV['AUTH_KEY'] );
	define( 'SECURE_AUTH_KEY', $_ENV['SECURE_AUTH_KEY'] );
	define( 'LOGGED_IN_KEY', $_ENV['LOGGED_IN_KEY'] );
	define( 'NONCE_KEY', $_ENV['NONCE_KEY'] );
	define( 'AUTH_SALT', $_ENV['AUTH_SALT'] );
	define( 'SECURE_AUTH_SALT', $_ENV['SECURE_AUTH_SALT'] );
	define( 'LOGGED_IN_SALT', $_ENV['LOGGED_IN_SALT'] );
	define( 'NONCE_SALT', $_ENV['NONCE_SALT'] );
	/**#@-*/

  $scheme = 'https';
  define( 'WP_HOME', $scheme . '://' . $primary_domain );
  define( 'WP_SITEURL', WP_HOME . '/cms' );

	// Force the use of a safe temp directory when in a container
	if ( defined( 'PANTHEON_BINDING' ) ):
		define( 'WP_TEMP_DIR', sprintf( '/srv/bindings/%s/tmp', PANTHEON_BINDING ) );
	endif;

	// FS writes aren't permitted in test or live, so we should let WordPress know to disable relevant UI
	if ( in_array( $_ENV['PANTHEON_ENVIRONMENT'], array( 'test', 'live' ) ) && ! defined( 'DISALLOW_FILE_MODS' ) ) :
		define( 'DISALLOW_FILE_EDIT', true );
		define( 'DISALLOW_FILE_MODS', true );
		define( 'WP_DEBUG', false );
	else:
		define( 'WP_DEBUG', true );
	endif;

	define( 'FORCE_SSL_ADMIN', true );
endif;

/**
	*	Global DB Settings
**/
$table_prefix = 'blrmkr_';
define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );

/*
* Define wp-content directory outside of WordPress core directory
*/
define( 'WP_CONTENT_DIR', dirname( __FILE__ ) . '/app' );
define( 'WP_CONTENT_URL', WP_HOME . '/app' );

if ( ! defined( 'WP_DEBUG' ) ) {
    define('WP_DEBUG', false);
}
if ( WP_DEBUG ) {
    define( 'WP_DEBUG_LOG', true );
    define( 'WP_DEBUG_DISPLAY', false );
    @ini_set( 'display_errors', 0 );
}

define('AUTOSAVE_INTERVAL', 240 );
define('WP_POST_REVISIONS', 4);
define('EMPTY_TRASH_DAYS', 15);  // Default is 30
define('DISABLE_WP_CRON', false);  // If you set to TRUE, configure another method to run jobs

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}
/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
