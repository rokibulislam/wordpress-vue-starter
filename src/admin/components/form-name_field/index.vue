<template>
  <div class="formsuite-fields">
    <input type="text" name="name" placeholder="Enter Your Name" />
    <!-- <div :class="['formsuite-name-field-wrap', 'format-' + field.format]">
        <div class="formsuite-name-field-first-name">
            <input
                type="text"
                :class="class_names('textfield')"
                :placeholder="field.first_name.placeholder"
                :value="field.first_name.default"
                :size="field.size"
            >
            <label class="formsuite-form-sub-label" v-if="!field.hide_subs">{{ field.first_name.sub }}</label>
        </div>

        <div class="formsuite-name-field-middle-name">
            <input
                type="text"
                :class="class_names('textfield')"
                :placeholder="field.middle_name.placeholder"
                :value="field.middle_name.default"
                :size="field.size"
            >
            <label class="formsuite-form-sub-label" v-if="!field.hide_subs">{{ field.middle_name.sub }}</label>
        </div>

        <div class="formsuite-name-field-last-name">
            <input
                type="text"
                :class="class_names('textfield')"
                :placeholder="field.last_name.placeholder"
                :value="field.last_name.default"
                :size="field.size"
            >
            <label class="formsuite-form-sub-label" v-if="!field.hide_subs">{{ field.last_name.sub }}</label>
        </div>
    </div>

    <span v-if="field.help" class="formsuite-help">{{ field.help }}</span>-->
  </div>
</template>
<script>
export default {
  name: "form_name_field"
  //   mixins: [formsuite_mixins.form_field_mixin]
};
</script>
