<template>
  <div>
    <ul>
      <li v-for="(section, index) in panel_sections">
        <h3>{{ section.title }}</h3>
        <ul>
          <li
            v-for="(field, index) in section.fields"
            @click="add_field(field)"
          >{{ field_settings[field].title}}</li>
        </ul>
      </li>
    </ul>
    <ul>
      <li v-for="(field, index) in form_fields">
        <component :is="'form_' + field.template"></component>
      </li>
    </ul>
  </div>
</template>

<script>
import form_text_field from "../form-text_field/index.vue";
import form_textarea_field from "../form-textarea_field/index.vue";
import form_url_field from "../form-website_url/index.vue";
import form_name_field from "../form-name_field/index.vue";
import form_email_field from "../form-email_field/index.vue";
import form_checkbox_field from "../form-checkbox_field/index.vue";
import form_radio_field from "../form-radio_field/index.vue";
import form_image_field from "../form-image_field/index.vue";
import form_date_field from "../form-date_field/index.vue";
import form_dropdown_field from "../form-dropdown_field/index.vue";
import form_multiple_select from "../form-dropdown_field/index.vue";
import form_html_field from "../form-html_field/index.vue";
import form_hidden_field from "../form-hidden_field/index.vue";
import form_section_break from "../form-section_break/index.vue";

export default {
  name: "TestFields",
  components: {
    form_text_field,
    form_textarea_field,
    form_url_field,
    form_name_field,
    form_email_field,
    form_checkbox_field,
    form_radio_field,
    form_image_field,
    form_date_field,
    form_dropdown_field,
    form_multiple_select,
    form_html_field,
    form_hidden_field,
    form_section_break
  },
  computed: {
    panel_sections: function() {
      return this.$store.getters.panel_sections;
    },
    field_settings: function() {
      return this.$store.getters.field_settings;
    },
    form_fields: function() {
      return this.$store.getters.form_fields;
    }
  },
  methods: {
    add_field(field) {
      this.$store.dispatch("add_field", field);
    }
  }
};
</script>
