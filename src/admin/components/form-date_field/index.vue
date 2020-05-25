<template>
  <div class="formsuite-fields">
    <input type="date" value />
    <!-- <input
        type="text"
        :class="class_names('datepicker')"
        :placeholder="field.format"
        :value="field.default"
        :size="field.size"
    >
    <span v-if="field.help" class="formsuite-help">{{ field.help }}</span>-->
  </div>
</template>
<script>
export default {
  name: "form_date_field"
  //   mixins: [formsuite_mixins.form_field_mixin]
};
</script>
