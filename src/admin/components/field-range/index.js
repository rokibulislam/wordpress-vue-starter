<template>
    <div v-if="met_dependencies" class="panel-field-opt panel-field-opt-text">
        <label>
            {{ option_field.title }} <help-text v-if="option_field.help_text" :text="option_field.help_text"></help-text>
            {{ option_field.min_column }}
            <input
                type="range"
                v-model="value"
                v-bind:min="minColumn"
                v-bind:max="maxColumn"
            >
        </label>
    </div>
</template>

<script>
    export default {
        name:'field-range',
        mixins: [formsuite_mixins.option_field_mixin],
        computed: {
            value: {
                get: function get() {
                    return this.editing_form_field[this.option_field.name];
                },

                set: function set(value) {
                    this.update_value(this.option_field.name, value);
                }
            },

            minColumn: function minColumn() {
                return this.editing_form_field.min_column;
            },

            maxColumn: function maxColumn() {
                return this.editing_form_field.max_column;
            }
        },
        methods: {}
    }
</script>
