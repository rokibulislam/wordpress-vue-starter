<template>
    <div v-if="met_dependencies" class="panel-field-opt panel-field-opt-checkbox">
        <label v-if="option_field.title" :class="option_field.title_class">
            {{ option_field.title }} <help-text v-if="option_field.help_text" :text="option_field.help_text"></help-text>
        </label>
        <ul :class="[option_field.inline ? 'list-inline' : '']">
            <li v-for="(option, key) in option_field.options">
                <label>
                    <input type="checkbox" :value="key" v-model="value"> {{ option }}
                </label>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'field-checkbox',
        mixins: [formsuite_mixins.option_field_mixin],
        computed: {
            value: {
                get: function get() {
                    var value = this.editing_form_field[this.option_field.name];

                    if (this.option_field.is_single_opt) {
                        var option = Object.keys(this.option_field.options)[0];

                        if (value === option) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                    return this.editing_form_field[this.option_field.name];
                },

                set: function set(value) {
                    if (this.option_field.is_single_opt) {
                        value = value ? Object.keys(this.option_field.options)[0] : '';
                    }

                    this.$store.commit('update_editing_form_field', {
                        editing_field_id: this.editing_form_field.id,
                        field_name: this.option_field.name,
                        value: value
                    });
                }
            }
        }
    }
</script>
