<template>
<div class="formsuite-form-builder-form-fields">
    <template v-for="(section, index) in panel_sections">
        <div v-if="section.fields.length" class="panel-form-field-group clearfix">
            <h3 class="clearfix" @click="panel_toggle(index)">
                {{ section.title }} <i :class="[section.show ? 'fa fa-angle-down' : 'fa fa-angle-right']"></i>
            </h3>

            <transition name="slide-fade">
                <ul
                    v-show="section.show"
                    class="panel-form-field-buttons clearfix"
                    :id="'panel-form-field-buttons-' + section.id"
                >
                    <template v-for="field in section.fields">
                        <li
                            v-if="is_pro_feature(field)"
                            class="button button-faded"
                            :data-form-field="field"
                            data-source="panel"
                            @click="alert_pro_feature(field)"
                        >
                            <i v-if="field_settings[field].icon" :class="['fa fa-' + field_settings[field].icon]" aria-hidden="true"></i> {{ field_settings[field].title }}
                        </li>

                        <li
                            v-if="is_failed_to_validate(field)"
                            :class="['button', get_invalidate_btn_class(field)]"
                            :data-form-field="field"
                            data-source="panel"
                            @click="alert_invalidate_msg(field)"
                        >
                            <i v-if="field_settings[field].icon" :class="['fa fa-' + field_settings[field].icon]" aria-hidden="true"></i> {{ field_settings[field].title }}
                        </li>

                        <li
                            v-if="!is_pro_feature(field) && !is_failed_to_validate(field)"
                            class="button"
                            :data-form-field="field"
                            data-source="panel"
                            @click="add_form_field(field)"
                        >
                            <i v-if="field_settings[field].icon" :class="['fa fa-' + field_settings[field].icon]" aria-hidden="true"></i> {{ field_settings[field].title }}
                        </li>
                    </template>
                </ul>
            </transition>
        </div>
    </template>
</div>

</template>
<script>
    export default {
        name:'form-fields', {
        mixins: formsuite_form_builder_mixins(formsuite_mixins.form_fields),

        computed: {
            panel_sections: function panel_sections() {
                return this.$store.state.panel_sections;
            },

            field_settings: function field_settings() {
                return this.$store.state.field_settings;
            },

            form_fields: function form_fields() {
                return this.$store.state.form_fields;
            }
        },

        mounted: function mounted() {
            // bind jquery ui draggable
            $(this.$el).find('.panel-form-field-buttons .button').draggable({
                connectToSortable: '#form-preview-stage .formsuite-form, .formsuite-column-inner-fields .formsuite-column-fields-sortable-list',
                helper: 'clone',
                revert: 'invalid',
                cancel: '.button-faded'
            }).disableSelection();
        },

        methods: {
            panel_toggle: function panel_toggle(index) {
                this.$store.commit('panel_toggle', index);
            },

            add_form_field: function add_form_field(field_template) {
                var payload = {
                    toIndex: this.$store.state.form_fields.length
                };

                // check if these are already inserted
                if (this.isSingleInstance(field_template) && this.containsField(field_template)) {
                    swal({
                        title: "Oops...",
                        text: "You already have this field in the form"
                    });
                    return;
                }

                var field = $.extend(true, {}, this.$store.state.field_settings[field_template].field_props);

                field.id = this.get_random_id();

                if (!field.name && field.label) {
                    field.name = field.label.replace(/\W/g, '_').toLowerCase();

                    var same_template_fields = this.form_fields.filter(function (form_field) {
                        return form_field.template === field.template;
                    });

                    if (same_template_fields.length) {
                        field.name += '_' + same_template_fields.length;
                    }
                }

                payload.field = field;

                // add new form element
                this.$store.commit('add_form_field_element', payload);
            },

            is_pro_feature: function is_pro_feature(field) {
                return this.field_settings[field].pro_feature;
            },

            alert_pro_feature: function alert_pro_feature(field) {
                var title = this.field_settings[field].title;

                swal({
                    title: '<i class="fa fa-lock"></i> ' + title + ' <br>' + this.i18n.is_a_pro_feature,
                    text: this.i18n.pro_feature_msg,
                    type: '',
                    showCancelButton: true,
                    cancelButtonText: this.i18n.close,
                    confirmButtonColor: '#46b450',
                    confirmButtonText: this.i18n.upgrade_to_pro
                }).then(function (is_confirm) {
                    if (is_confirm) {
                        window.open(formsuite_form_builder.pro_link, '_blank');
                    }
                }, function () {});
            },

            alert_invalidate_msg: function alert_invalidate_msg(field) {
                var validator = this.field_settings[field].validator;

                if (validator && validator.msg) {
                    this.warn({
                        title: validator.msg_title || '',
                        html: validator.msg,
                        type: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: '#46b450',
                        confirmButtonText: this.i18n.ok
                    });
                }
            },

            get_invalidate_btn_class: function get_invalidate_btn_class(field) {
                return this.field_settings[field].validator.button_class;
            }
        }
    }
</script>
