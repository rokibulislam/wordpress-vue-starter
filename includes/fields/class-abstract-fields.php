<?php

namespace Contact\Fields;

abstract class Contact_Field {

	protected $name = '';
	protected $input_type = '';
	protected $icon = 'header';

	public function get_name() {
		return $this->name;
	}

	public function get_type() {
		return $this->input_type;
	}

	public function get_icon() {
		return $this->icon;
	}

	abstract public function render( $field_settings, $form_id );
	abstract public function get_options_settings();
	abstract public function get_field_props();

	public function is_full_width() {
		return false;
	}

	public function get_validator() {
		return false;
	}

	public function get_js_settings() {

		$settings = [
            'template'      => $this->get_type(),
            'title'         => $this->get_name(),
            'icon'          => $this->get_icon(),
            'settings'      => $this->get_options_settings(),
            'field_props'   => $this->get_field_props(),
            'is_full_width' => $this->is_full_width(),
        ];

       	if ( $validator = $this->get_validator() ) {
            $settings['validator'] = $validator;
        }

        return apply_filters( 'formsuite_field_get_js_settings', $settings );
	}

	public function default_attributes() {

	}

	public static function get_default_option_settings( $is_meta = true, $exclude = [] ) {

	}
}