<template>
  <div class="formsuite-fields">
    <!-- <select :class="class_names('select_lbl')">
      <option v-if="field.first" value>{{ field.first }}</option>

      <option
        v-if="has_options"
        v-for="(label, val) in field.options"
        :value="label"
        :selected="is_selected(label)"
      >{{ label }}</option>
    </select>

    <span v-if="field.help" class="formsuite-help">{{ field.help }}</span>-->
    <select>
      <option value></option>
      <option value></option>
      <option value></option>
      <option value></option>
    </select>
  </div>
</template>
<script>
export default {
  name: "form_dropdown_field"
  //   mixins: [formsuite_mixins.form_field_mixin]
};
</script>
