<template>
<div class="panel-field-opt panel-field-opt-text panel-field-opt-text-meta">
    <label>
        {{ option_field.title }} <help-text v-if="option_field.help_text" :text="option_field.help_text"></help-text>
        <input
            type="text"
            v-model="value"
        >
    </label>
</div>
</template>
<script>
    export default {
        name:'field-text-meta'
        mixins: [formsuite_mixins.option_field_mixin],

        computed: {
            value: {
                get: function get() {
                    return this.editing_form_field[this.option_field.name];
                },

                set: function set(value) {
                    this.update_value(this.option_field.name, value);
                }
            }
        },

        created: function created() {
            if ('yes' === this.editing_form_field.is_meta) {
                if (!this.value) {
                    this.value = this.editing_form_field.label.replace(/\W/g, '_').toLowerCase();
                }

                formsuite_form_builder.event_hub.$on('field-text-keyup', this.meta_key_autocomplete);
            }
        },

        methods: {
            meta_key_autocomplete: function meta_key_autocomplete(e, label_vm) {
                if ('label' === label_vm.option_field.name && parseInt(this.editing_form_field.id) === parseInt(label_vm.editing_form_field.id)) {
                    this.value = label_vm.value.replace(/\W/g, '_').toLowerCase();
                }
            }
        }
    }
</script>
