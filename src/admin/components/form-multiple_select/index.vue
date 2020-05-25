<template>
  <div class="formsuite-fields">
    <!-- <select :class="class_names('multi_label')" multiple>
      <option v-if="field.first" value>{{ field.first }}</option>

      <option
        v-if="has_options"
        v-for="(label, val) in field.options"
        :value="label"
        :selected="is_selected(label)"
      >{{ label }}</option>
    </select>

    <span v-if="field.help" class="formsuite-help">{{ field.help }}</span>-->
  </div>
</template>
<script>
export default {
  name: "form_multiple_select"
  // mixins: [formsuite_mixins.form_field_mixin]
};
</script>
