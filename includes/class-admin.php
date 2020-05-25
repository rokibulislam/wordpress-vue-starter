<?php
namespace Contact;


class Admin {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'admin_menu' ] );
    }

    public function admin_menu() {
        global $submenu;

        $capability = 'manage_options';
        $slug       = 'contact';

        $hook = add_menu_page( __( 'Contact App', 'textdomain' ), __( 'Contact App', 'textdomain' ), $capability, $slug, [ $this, 'plugin_page' ], 'dashicons-text' );

        if ( current_user_can( $capability ) ) {
            $submenu[ $slug ][] = array( __( 'App', 'textdomain' ), $capability, 'admin.php?page=' . $slug . '#/' );
            $submenu[ $slug ][] = array( __( 'Settings', 'textdomain' ), $capability, 'admin.php?page=' . $slug . '#/settings' );
        }

       // add_action( 'load-' . $hook, [ $this, 'init_hooks'] );
    }


    public function init_hooks() {
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
    }

    public function enqueue_scripts() {
        wp_enqueue_style( 'baseplugin-admin' );
        wp_enqueue_script( 'baseplugin-admin' );
    }

    public function plugin_page() {
        echo '<div class="wrap"><div id="vue-admin-app"></div></div>';
    }
}
