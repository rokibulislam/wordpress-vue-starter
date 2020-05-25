<template>

<div v-if="met_dependencies" class="panel-field-opt panel-field-opt-text">
    <label>
        {{ option_field.title }} <help-text v-if="option_field.help_text" :text="option_field.help_text"></help-text>

        <input
            v-if="option_field.variation && 'number' === option_field.variation"
            type="number"
            v-model="value"
            @focusout="on_focusout"
            @keyup="on_keyup"
        >

        <input
            v-if="!option_field.variation"
            type="text"
            v-model="value"
            @focusout="on_focusout"
            @keyup="on_keyup"
        >
    </label>
</div>

</template>
<script>
    export default {
        name:'field-text',
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

        methods: {
            on_focusout: function on_focusout(e) {
                formsuite_form_builder.event_hub.$emit('field-text-focusout', e, this);
            },
            on_keyup: function on_keyup(e) {
                formsuite_form_builder.event_hub.$emit('field-text-keyup', e, this);
            }
        }
    }
</script>
