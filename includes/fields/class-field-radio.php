<?php

namespace Contact\Fields;
use Contact\Fields\Contact_Field;

class Field_Radio extends Contact_Field {

	public function __construct() {
        $this->name       = __( 'Radio', '' );
        $this->input_type = 'radio_field';
        $this->icon       = 'user';
    }

    public function render( $field_settings, $form_id ) {

    }

    public function get_options_settings() {
    	return [];
    }

    public function get_field_props() {
    	return [];
    }

    public function prepare_entry( $field, $args = [] ) {
    	return '';
    }
}