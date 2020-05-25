<?php
namespace Contact;

/**
 * Admin Pages Handler
 */
class Settings {

    public function __construct() {
        add_action( 'base_admin_localize_script',[ $this, 'settings_localize_data' ] );
    }

    public function settings_localize_data( $data ) {
        $data['settings_sections'] = $this->get_settings_sections();
        $data['settings_fields'] = $this->get_settings_fields();
        return $data;
    }

    public function get_settings_sections() {
        $sections = array(
            array(
                'id'    => 'general',
                'title' => __( 'General', '' ),
                'icon'  => 'dashicons-admin-generic'
            ),
            array(
                'id'    => 'email_template',
                'title' => __( 'Email', '' ),
                'icon'  => 'dashicons-admin-generic'
            ),
        );

        return apply_filters( 'base_settings_sections', $sections );

    }

    public function get_settings_fields() {

        $settings_fields = array(
            'general' => array(
                'site_options' => array(
                    'name'  => 'site_options',
                    'label' => __( 'Site Options', '' ),
                    'type'  => 'sub_section'
                ),
                'admin_access' => array(
                    'name'    => 'admin_access',
                    'label'   => __( 'Admin area access', '' ),
                    'desc'    => __( 'Disallow Vendors and Customers from accessing the wp-admin dashboard area' ),
                    'type'    => 'checkbox',
                    'default' => 'on'
                )
            ),
            'email_template' => array(
                'email_access' => array(
                    'name'    => 'email_access',
                    'label'   => __( 'Email area access', '' ),
                    'desc'    =>  __('test'),
                    'type'    => 'checkbox',
                    'default' => 'on'
                ),
                'tax_fee_recipient' => array(
                    'name'    => 'tax_fee_recipient',
                    'label'   => __( 'Tax Fee Recipient' ),
                    'desc'    => __( 'Who will be receiving the Tax fees' ),
                    'type'    => 'select',
                    'options' => array( 'seller' => __( 'Vendor' ), 'admin' => __( 'Admin') ),
                    'default' => 'Admin'
                ),
                'map_api_source' => array(
                    'name'               => 'map_api_source',
                    'label'              => __( 'Map API Source' ),
                    'desc'               => __( 'Which Map API source you want to use in your site?' ),
                    'refresh_after_save' => true,
                    'type'               => 'radio',
                    'default'            => 'google_maps',
                    'options'            => array(
                        'google_maps' => __( 'Google Maps' ),
                        'mapbox'      => __( 'Mapbox' ),
                    ),
                ),
            )
        );

        return $settings_fields;
    }
}