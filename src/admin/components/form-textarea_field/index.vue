<template>
  <div class="formsuite-fields">
    <!-- <textarea
      v-if="'no' === field.rich"
      :class="class_names('textareafield')"
      :placeholder="field.placeholder"
      :deault="field.default"
      :rows="field.rows"
      :cols="field.cols"
    >{{ field.default }}</textarea>

    <text-editor v-if="'no' !== field.rich" :default_text="field.default" :rich="field.rich"></text-editor>

    <span v-if="field.help" class="formsuite-help">{{ field.help }}</span>-->
    <textarea> Enter Your Textarea </textarea>
  </div>
</template>
<script>
export default {
  name: "form_textarea_field"
  // mixins: [formsuite_mixins.form_field_mixin]
};
</script>
