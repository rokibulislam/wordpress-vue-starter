<template>
  <div class="formsuite-fields">
    <!-- // <input
    // type="url"
    // :class="class_names('url')"
    // :placeholder="field.placeholder"
    // :value="field.default"
    // :size="field.size"
    // >
    //-->
    <!-- <span v-if="field.help" class="formsuite-help">{{ field.help }}</span> -->
    <input type="url" placeholder="Enter Your Url" />
  </div>
</template>
<script>
export default {
  name: "form_url_field"
  //   mixins: [formsuite_mixins.form_field_mixin]
};
</script>
