<template>
<div class="panel-field-opt panel-field-opt-radio">
    <label v-if="option_field.title">
        {{ option_field.title }} <help-text v-if="option_field.help_text" :text="option_field.help_text"></help-text>
    </label>

    <ul :class="[option_field.inline ? 'list-inline' : '']">
        <li v-for="(option, key) in option_field.options">
            <label>
                <input type="radio" :value="key" v-model="selected"> {{ option }}
            </label>
        </li>
    </ul>

    <div v-if="'logged_in' === selected" class="condiotional-logic-container">

        <?php $roles = get_editable_roles(); ?>

        <ul>
            <?php
                foreach ( $roles as $role => $value ) {
                    $role_name = $value['name'];

                    $output  = '<li>';
                    $output .= "<label><input type='checkbox' v-model='choices' value='{$role}'> {$role_name} </label>";
                    $output .= '</li>';

                    echo $output;
                }
            ?>
        </ul>
    </div>
</div>
</template>
<script>
    export default {
        name:  'field-visibility',
        mixins: [formsuite_mixins.option_field_mixin],

        computed: {
            selected: {
                get: function get() {

                    return this.editing_form_field[this.option_field.name].selected;
                },

                set: function set(value) {

                    this.$store.commit('update_editing_form_field', {
                        editing_field_id: this.editing_form_field.id,
                        field_name: this.option_field.name,
                        value: {
                            selected: value,
                            choices: []
                        }
                    });
                }
            },

            choices: {
                get: function get() {
                    return this.editing_form_field[this.option_field.name].choices;
                },

                set: function set(value) {

                    this.$store.commit('update_editing_form_field', {
                        editing_field_id: this.editing_form_field.id,
                        field_name: this.option_field.name,
                        value: {
                            selected: this.selected,
                            choices: value
                        }
                    });
                }
            }

        },

        methods: {},

        watch: {
            selected: function selected(new_val) {
                this.update_value('selected', new_val);
            }
        }
    }
</script>
