<template>
    <div class="panel-field-opt panel-field-opt-select">
        <label v-if="option_field.title">
            {{ option_field.title }} <help-text v-if="option_field.help_text" :text="option_field.help_text"></help-text>
        </label>

        <select
            :class="['term-list-selector']"
            v-model="value"
            multiple
        >
            <option v-for="(option, key) in option_field.options" :value="key">{{ option }}</option>
        </select>
    </div>
</template>

<script>
    export default {
        name: 'field-multiselect',
        mixins: [formsuite_mixins.option_field_mixin],
        computed: {
            value: {
                get: function get() {
                    return this.editing_form_field[this.option_field.name];
                },

                set: function set(value) {
                    this.$store.commit('update_editing_form_field', {
                        editing_field_id: this.editing_form_field.id,
                        field_name: this.option_field.name,
                        value: value
                    });
                }
            }
        },

        mounted: function mounted() {
            this.bind_selectize();
        },

        methods: {
            bind_selectize: function bind_selectize() {
                var self = this;

                $(this.$el).find('.term-list-selector').selectize({}).on('change', function () {
                    var data = $(this).val();

                    self.value = data;
                });
            }
        }

    }

</script>
