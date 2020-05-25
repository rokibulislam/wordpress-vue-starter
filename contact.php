<?php
/*
Plugin Name: Contact Form Plugin
Plugin URI:
Description: Contact Form plugin
Version: 1.0
Author: Your Name
Author URI:
License: GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: contact
Domain Path: /languages
*/

// don't call the file directly
if ( !defined( 'ABSPATH' ) ) exit;

/**
 * Base_Plugin class
 *
 * @class Base_Plugin The class that holds the entire Base_Plugin plugin
 */
final class Contact {

    public $version = '1.0.0';
    private $container = [];
    public function __construct() {
        $this->define_constants();
        register_activation_hook( __FILE__, array( $this, 'activate' ) );
        register_deactivation_hook( __FILE__, array( $this, 'deactivate' ) );

        add_action( 'plugins_loaded', array( $this, 'init_plugin' ) );
    }

    public static function init() {
        static $instance = false;

        if ( ! $instance ) {
            $instance = new Self();
        }

        return $instance;
    }

    public function __get( $prop ) {
        if ( array_key_exists( $prop, $this->container ) ) {
            return $this->container[ $prop ];
        }

        return $this->{$prop};
    }

    public function __isset( $prop ) {
        return isset( $this->{$prop} ) || isset( $this->container[ $prop ] );
    }

    public function define_constants() {
        define( 'CONTACT_VERSION', $this->version );
        define( 'CONTACT_FILE', __FILE__ );
        define( 'CONTACT_PATH', dirname( CONTACT_FILE ) );
        define( 'CONTACT_INCLUDES', CONTACT_PATH . '/includes' );
        define( 'CONTACT_URL', plugins_url( '', CONTACT_FILE ) );
        define( 'CONTACT_ASSETS', CONTACT_URL . '/assets' );
    }

    /**
     * Load the plugin after all plugis are loaded
     *
     * @return void
     */
    public function init_plugin() {
        $this->includes();
        $this->init_classes();
        $this->init_hooks();
    }

    public function activate() {

    }

    public function deactivate() {

    }

    public function includes() {
        require_once CONTACT_INCLUDES . '/class-assets.php';
        require_once CONTACT_INCLUDES . '/class-ajax.php';
        require_once CONTACT_INCLUDES . '/class-entry-manager.php';
        require_once CONTACT_INCLUDES . '/class-field-manager.php';
        require_once CONTACT_INCLUDES . '/class-form-manager.php';
        require_once CONTACT_INCLUDES . '/class-installer.php';
        require_once CONTACT_INCLUDES . '/class-notification.php';
        require_once CONTACT_INCLUDES . '/functions.php';

        if ( is_admin() ) {
            require_once CONTACT_INCLUDES . '/class-admin.php';
            require_once CONTACT_INCLUDES . '/class-settings.php';
        }

    }

    public function init_classes() {

        if ( is_admin() ) {
            $this->container['admin']    = new Contact\Admin();
            $this->container['settings'] = new Contact\Settings();
        }

        $this->container['ajax']         = new Contact\Ajax();
        $this->container['assets']       = new Contact\Assets();
        $this->container['entries']      = new Contact\EntryManager();
        $this->container['fields']       = new Contact\FieldManager();
        $this->container['forms']        = new Contact\FormManager();
        $this->container['installer']    = new Contact\Installer();
        $this->container['notification'] = new Contact\Notification();
    }

    public function init_hooks() {
        add_action( 'init', array( $this, 'localization_setup' ) );
    }

    public function localization_setup() {
        load_plugin_textdomain( 'contact', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
    }
}

function wpbaseplugin() {
    return Contact::init();
}

wpbaseplugin();