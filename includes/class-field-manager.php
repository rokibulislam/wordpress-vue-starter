<?php

namespace Contact;

class FieldManager {

	private $fields = [];

	public function get_fields() {
        if ( !empty( $this->fields ) ) {
            return $this->fields;
        }

        $this->register_field_types();

        return $this->fields;
    }

	public function get_field( $field_type ) {
		$fields = $this->get_fields();

		if ( isset( $field_type, $fields ) ) {
            return $fields[ $field_type ];
        }
	}

	private function register_field_types() {
		require_once __DIR__ . '/fields/class-abstract-fields.php';
        require_once __DIR__ . '/fields/class-field-text.php';
        require_once __DIR__ . '/fields/class-field-textarea.php';
        require_once __DIR__ . '/fields/class-field-name.php';
        require_once __DIR__ . '/fields/class-field-checkbox.php';
        require_once __DIR__ . '/fields/class-field-radio.php';
        require_once __DIR__ . '/fields/class-field-url.php';
        require_once __DIR__ . '/fields/class-field-email.php';
        require_once __DIR__ . '/fields/class-field-image.php';
        require_once __DIR__ . '/fields/class-field-date.php';
        require_once __DIR__ . '/fields/class-field-dropdown.php';
        require_once __DIR__ . '/fields/class-field-multidropdown.php';
        require_once __DIR__ . '/fields/class-field-html.php';
        require_once __DIR__ . '/fields/class-field-hidden.php';
        require_once __DIR__ . '/fields/class-field-sectionbreak.php';

        $fields = [
            'checkbox_field'  => new \Contact\Fields\Field_Checkbox(),
            'email_field'     => new \Contact\Fields\Field_Email(),
            'image_field'     => new \Contact\Fields\Field_Image(),
            'name_field'      => new \Contact\Fields\Field_Name(),
            'radio_field'     => new \Contact\Fields\Field_Radio(),
            'text_field'      => new \Contact\Fields\Field_Text(),
            'textarea_field'  => new \Contact\Fields\Field_Textarea(),
            'url_field'       => new \Contact\Fields\Field_Url(),
            'date_field'      => new \Contact\Fields\Field_Date(),
            'dropdown_field'  => new \Contact\Fields\Field_Dropdown(),
            'multiple_select' => new \Contact\Fields\Field_MultiDropdown(),
            'html_field'      => new \Contact\Fields\Field_Html(),
            'hidden_field'    => new \Contact\Fields\Field_Hidden(),
            'section_break'   => new \Contact\Fields\Field_SectionBreak(),
        ];

        $this->fields = apply_filters( 'formsuite-form-fields', $fields );
	}

	public function get_field_groups() {
        $before_custom_fields = apply_filters( 'formsuite-form-fields-section-before', [] );
        $groups               = array_merge( $before_custom_fields, $this->get_custom_fields() );
        $groups               = array_merge( $groups, $this->get_others_fields() );
        $after_custom_fields  = apply_filters( 'formsuite-form-fields-section-after', [] );
        $groups               = array_merge( $groups, $after_custom_fields );

        return $groups;
    }

    private function get_custom_fields() {
        $fields = apply_filters( 'formsuite-form-fields-custom-fields', [
                'text_field',
                'textarea_field',
                'url_field',
                'name_field',
                'email_field',
                'checkbox_field',
                'radio_field',
                'image_field',
                'date_field',
                'dropdown_field',
                'multiple_select',
                'html_field',
                'hidden_field',
                'section_break'
            ]
        );

        return [
            [
                'title'     => __( 'Custom Fields', 'formsuite' ),
                'id'        => 'custom-fields',
                'fields'    => $fields,
            ],
        ];
    }

    private function get_others_fields() {
        $fields = apply_filters( 'formsuite-form-fields-others-fields', [] );

        return [
            [
                'title'     => __( 'Others', 'formsuite' ),
                'id'        => 'others',
                'fields'    => $fields,
            ],
        ];
    }

    public function get_js_settings() {
        $fields   = $this->get_fields();

        $js_array = [];

        if ( $fields ) {
            foreach ( $fields as $type => $object ) {
                if ( is_object( $object ) ) {
                    $js_array[ $type ] = $object->get_js_settings();
                }
            }
        }

        return $js_array;
    }
}