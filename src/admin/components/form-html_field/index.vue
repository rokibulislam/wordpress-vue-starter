<template>
  <div class="formsuite-fields" v-html="html"></div>
</template>
<script>
export default {
  name: "form_html_field",
  //   mixins: [formsuite_mixins.form_field_mixin],
  data: function data() {
    return {
      html: "<p>from data</p>"
    };
  }
};
</script>
