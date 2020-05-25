<template>
  <div class="formsuite-fields">
    <!-- <ul :class="['formsuite-fields-list', ('yes' === field.inline) ? 'formsuite-list-inline' : '']">
        <li v-if="has_options" v-for="(label, val) in field.options">
            <label>
                <input
                    type="radio"
                    :value="val"
                    :checked="is_selected(val)"
                    :class="class_names('radio_btns')"
                > {{ label }}
            </label>
        </li>
    </ul>

    <span v-if="field.help" class="formsuite-help">{{ field.help }}</span>-->
    <input type="radio" value="0" />
  </div>
</template>
<script>
export default {
  name: "form_radio_field"
  //   mixins: [formsuite_mixins.form_field_mixin]
};
</script>
