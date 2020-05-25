<template>
<div class="formsuite-form-builder-field-options">
    <div v-if="!parseInt(editing_field_id)" class="options-fileds-section text-center">
        <p>
            <span class="loader"></span>
        </p>
    </div>

    <div v-else>
        <div class="option-fields-section">
            <h3 class="section-title clearfix" @click="show_basic_settings = !show_basic_settings">
                {{ form_field_type_title }} <i :class="[show_basic_settings ? 'fa fa-angle-down' : 'fa fa-angle-right']"></i>
            </h3>

            <transition name="slide-fade">
                <div v-show="show_basic_settings" class="option-field-section-fields">
                    <component
                        v-for="option_field in basic_settings"
                        :key="option_field.name"
                        :is="'field-' + option_field.type"
                        :option_field="option_field"
                        :editing_form_field="editing_form_field"
                    ></component>
                </div>
            </transition>
        </div>


        <div v-if="advanced_settings.length" class="option-fields-section">
            <h3 class="section-title" @click="show_advanced_settings = !show_advanced_settings">
                {{ i18n.advanced_options }}  <i :class="[show_advanced_settings ? 'fa fa-angle-down' : 'fa fa-angle-right']"></i>
            </h3>

            <transition name="slide-fade">
                <div v-show="show_advanced_settings" class="option-field-section-fields">
                    <component
                        v-for="option_field in advanced_settings"
                        :key="option_field.name"
                        :is="'field-' + option_field.type"
                        :option_field="option_field"
                        :editing_form_field="editing_form_field"
                    ></component>
                </div>
            </transition>
        </div>
    </div>
</div>
</template>

<script>

export default {
    name:'field-options',
    mixins: formsuite_form_builder_mixins(formsuite_mixins.field_options),

    data: function data() {
        return {
            show_basic_settings: true,
            show_advanced_settings: false,
            show_quiz_settings: false
        };
    },

    computed: {
        editing_field_id: function editing_field_id() {
            this.show_basic_settings = true;
            this.show_advanced_settings = false;
            this.show_quiz_settings = false;

            return parseInt(this.$store.state.editing_field_id);
        },

        editing_form_field: function editing_form_field() {
            var self = this,
                i = 0;

            for (i = 0; i < self.$store.state.form_fields.length; i++) {
                // check if the editing field exist in normal fields
                if (self.$store.state.form_fields[i].id === parseInt(self.editing_field_id)) {
                    return self.$store.state.form_fields[i];
                }

                // check if the editing field belong to column field
                if (self.$store.state.form_fields[i].template === 'column_field') {
                    var innerColumnFields = self.$store.state.form_fields[i].inner_fields;

                    for (var columnFields in innerColumnFields) {
                        if (innerColumnFields.hasOwnProperty(columnFields)) {
                            var columnFieldIndex = 0;

                            while (columnFieldIndex < innerColumnFields[columnFields].length) {
                                if (innerColumnFields[columnFields][columnFieldIndex].id === self.editing_field_id) {
                                    return innerColumnFields[columnFields][columnFieldIndex];
                                }
                                columnFieldIndex++;
                            }
                        }
                    }
                }
            }
        },

        settings: function settings() {
            var settings = [],
                template = this.editing_form_field.template;

            if (_.isFunction(this['settings_' + template])) {
                settings = this['settings_' + template].call(this, this.editing_form_field);
            } else {
                settings = this.$store.state.field_settings[template].settings;
            }

            return _.sortBy(settings, function (item) {
                return parseInt(item.priority);
            });
        },

        basic_settings: function basic_settings() {
            return this.settings.filter(function (item) {
                return 'basic' === item.section;
            });
        },

        advanced_settings: function advanced_settings() {
            return this.settings.filter(function (item) {
                return 'advanced' === item.section;
            });
        },

        quiz_settings: function quiz_settings() {
            return this.settings.filter(function (item) {
                return 'quiz' === item.section;
            });
        },

        form_field_type_title: function form_field_type_title() {
            var template = this.editing_form_field.template;

            if (_.isFunction(this['form_field_' + template + '_title'])) {
                return this['form_field_' + template + '_title'].call(this, this.editing_form_field);
            }

            return this.$store.state.field_settings[template].title;
        },

        form_settings: function form_settings() {
            return this.$store.state.settings;
        }
    },

    watch: {
        form_settings: function form_settings() {
            return this.$store.state.settings;
        }
    }
}
</script>
