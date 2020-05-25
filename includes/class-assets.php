<?php
namespace Contact;

/**
 * Scripts and Styles Class
 */
class Assets {

    function __construct() {
        if ( is_admin() ) {
            add_action( 'admin_enqueue_scripts', array( $this, 'register' ), 5 );
            add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_scripts' ] );
        } else {
            add_action( 'wp_enqueue_scripts', array( $this, 'register' ), 5 );
            add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_front_scripts' ] );
        }
    }

    public function enqueue_admin_scripts( $hook ) {

        if ( 'toplevel_page_contact' == $hook ) {

            do_action( 'base-vue-admin-scripts' );

            wp_enqueue_style( 'baseplugin-admin' );
            wp_enqueue_script( 'baseplugin-admin' );


            $localize_script = $this->get_admin_localized_scripts();

            wp_localize_script( 'baseplugin-admin', 'base_plugin', $localize_script );
        }

        do_action( 'base_enqueue_admin_scripts' );
    }

    public function enqueue_front_scripts() {

        do_action( 'base_enqueue_scripts' );
    }

    /**
     * Register our app scripts and styles
     *
     * @return void
     */
    public function register() {
        $styles = $this->get_styles();
        $scripts = $this->get_scripts();

        $this->register_scripts( $scripts );
        $this->register_styles( $styles );

        do_action( 'base_register_scripts' );
    }


    /**
     * Register scripts
     *
     * @param  array $scripts
     *
     * @return void
     */
    private function register_scripts( $scripts ) {
        foreach ( $scripts as $handle => $script ) {
            $deps      = isset( $script['deps'] ) ? $script['deps'] : false;
            $in_footer = isset( $script['in_footer'] ) ? $script['in_footer'] : false;
            $version   = isset( $script['version'] ) ? $script['version'] : CONTACT_VERSION;

            wp_register_script( $handle, $script['src'], $deps, $version, $in_footer );
        }
    }

    /**
     * Register styles
     *
     * @param  array $styles
     *
     * @return void
     */
    public function register_styles( $styles ) {
        foreach ( $styles as $handle => $style ) {
            $deps = isset( $style['deps'] ) ? $style['deps'] : false;

            wp_register_style( $handle, $style['src'], $deps, CONTACT_VERSION );
        }
    }

    /**
     * Get all registered scripts
     *
     * @return array
     */
    public function get_scripts() {
        $prefix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '.min' : '';

        $scripts = [
            'baseplugin-admin' => [
                'src'       => CONTACT_ASSETS . '/js/admin.js',
                'deps'      => [ 'jquery' ],
                'version'   => filemtime( CONTACT_PATH . '/assets/js/admin.js' ),
                'in_footer' => true
            ]
        ];

        return $scripts;
    }

    /**
     * Get registered styles
     *
     * @return array
     */
    public function get_styles() {

        $styles = [
            'baseplugin-style' => [
                'src' =>  CONTACT_ASSETS . '/css/style.css'
            ],
            'baseplugin-frontend' => [
                'src' =>  CONTACT_ASSETS . '/css/frontend.css'
            ],
            'baseplugin-admin' => [
                'src' =>  CONTACT_ASSETS . '/css/admin.css'
            ],
        ];

        return $styles;
    }


    public function get_admin_localized_scripts() {

        return apply_filters( 'base_admin_localize_script', [
            'ajaxurl' => admin_url( 'admin-ajax.php' ),
            'nonce'   => wp_create_nonce( 'base_plugin' ),
            'rest'    => array(
                'root'    => esc_url_raw( get_rest_url() ),
                'nonce'   => wp_create_nonce( 'wp_rest' ),
                'version' => 'base_plugin/v1',
            ),
            'routes' => $this->get_vue_admin_routes(),
            'routes'         => $this->get_vue_admin_routes(),
            'field_settings' => wpbaseplugin()->fields->get_js_settings(),
            'panel_sections' => wpbaseplugin()->fields->get_field_groups(),
        ]);

    }


    public function get_vue_admin_routes() {
        $routes = array(

        );

        return apply_filters( 'bas-admin-routes', $routes );
    }

}
