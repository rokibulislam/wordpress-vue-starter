<template>
  <div class="formsuite-fields">
    <!-- <input
        type="text"
        :class="class_names('textfield')"
        :placeholder="field.placeholder"
        :value="field.default"
        :size="field.size"
    >-->
    <input type="text" placeholder="Enter Your Text" />
    <!-- <span v-if="field.help" class="formsuite-help">{{ field.help }}</span> -->
  </div>
</template>
<script>
export default {
  name: "form_text_field"
  // mixins: [formsuite_mixins.form_field_mixin]
};
</script>
