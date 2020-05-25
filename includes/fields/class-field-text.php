<?php

namespace Contact\Fields;
use Contact\Fields\Contact_Field;

class Field_Text extends Contact_Field {

	public function __construct() {
        $this->name       = __( 'Text', '' );
        $this->input_type = 'text_field';
        $this->icon       = 'text-width';
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