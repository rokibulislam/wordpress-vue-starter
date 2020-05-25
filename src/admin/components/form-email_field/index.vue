<template>
  <div class="formsuite-fields">
    <input type="email" placeholder="Enter Your Email PlaceHolder" />
    <!-- <input
      type="email"
      :class="class_names('email')"
      :placeholder="field.placeholder"
      :value="field.default"
      :size="field.size"
    />
    <span v-if="field.help" class="formsuite-help">{{ field.help }}</span>-->
  </div>
</template>
<script>
export default {
  name: "form-email_address"
  // mixins: [formsuite_mixins.form_field_mixin]
};
</script>
