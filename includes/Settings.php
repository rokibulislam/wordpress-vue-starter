<?php
namespace App;

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
    	return (
    		array(
	            'id'    => 'general',
	            'title' => __( 'General', '' ),
	            'icon'  => 'dashicons-admin-generic'
	        )
	    );
    }

    public function get_settings_fields() {
    	return array(
            	'general' => array(
                    'name'  => 'site_options',
                    'label' => __( 'Site Options', '' ),
                    'type'  => 'sub_section',
            	)
            );
    }	
}