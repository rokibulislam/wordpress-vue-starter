<template>
    <div id="form-preview-stage" class="formsuite-style">
        <h4 v-if="!form_fields.length" class="text-center">
            Add fields by dragging the fields from the right sidebar to this area.
        </h4>
        <ul :class="['formsuite-form', 'sortable-list', 'form-label-' + label_type]">
            <li
                v-for="(field, index) in form_fields"
                :key="field.id"
                :class="[
                    'field-items', 'formsuite-el', field.name, field.css, 'form-field-' + field.template,
                    field.width ? 'field-size-' + field.width : '',
                    ('custom_hidden_field' === field.template) ? 'hidden-field' : '',
                    parseInt(editing_form_id) === parseInt(field.id) ? 'current-editing' : ''
                ]"
                :data-index="index"
                data-source="stage"
            >
                <div v-if="!is_full_width(field.template)" class="formsuite-label">
                    <label v-if="!is_invisible(field)" :for="'formsuite-' + field.name ? field.name : 'cls'">
                        {{ field.label }} <span v-if="field.required && 'yes' === field.required" class="required">*</span>
                    </label>
                </div>

                <component v-if="is_template_available(field)" :is="'form-' + field.template" :field="field"></component>

                <div v-if="is_pro_feature(field.template)" class="stage-pro-alert">
                    <label class="formsuite-pro-text-alert">
                        <a :href="pro_link" target="_blank"><strong>{{ get_field_name(field.template) }}</strong> <?php _e( 'is available in Pro Version', 'formsuite' ); ?></a>
                    </label>
                </div>

                <div v-if="!is_failed_to_validate(field.template)" class="control-buttons">
                    <p>
                        <i class="fa fa-arrows move"></i>
                        <i class="fa fa-pencil" @click="open_field_settings(field.id)"></i>
                        <i class="fa fa-clone" @click="clone_field(field.id, index)"></i>
                        <i class="fa fa-trash-o" @click="delete_field(index)"></i>
                    </p>
                </div>
            </li>

            <li v-if="!form_fields.length" class="field-items empty-list-item"></li>

            <li class="formsuite-submit">
                <div class="formsuite-label">&nbsp;</div>

                <?php do_action( 'formsuite-form-builder-template-builder-stage-submit-area' ); ?>
            </li>
        </ul><!-- .formsuite-form -->

        <div v-if="hidden_fields.length" class="hidden-field-list">
            <h4> Hidden Fields </h4>
            <ul class="formsuite-form">
                <li
                    v-for="(field, index) in hidden_fields"
                    :class="['field-items', parseInt(editing_form_id) === parseInt(field.id) ? 'current-editing' : '']"
                >
                    <strong> key </strong>: {{ field.name }} | <strong>value </strong>: {{ field.meta_value }}

                    <div class="control-buttons">
                        <p>
                            <i class="fa fa-pencil" @click="open_field_settings(field.id)"></i>
                            <i class="fa fa-clone" @click="clone_field(field.id, index)"></i>
                            <i class="fa fa-trash-o" @click="delete_hidden_field(field.id)"></i>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    name: 'builder-stage',
    template: '#tmpl-formsuite-builder-stage',
    mixins: formsuite_form_builder_mixins(formsuite_mixins.builder_stage),
    computed: {
        form_fields: function form_fields() {
            return this.$store.state.form_fields;
        },

        field_settings: function field_settings() {
            return this.$store.state.field_settings;
        },

        hidden_fields: function hidden_fields() {
            return this.$store.state.form_fields.filter(function (item) {
                return 'custom_hidden_field' === item.template;
            });
        },

        editing_form_id: function editing_form_id() {
            return this.$store.state.editing_field_id;
        },

        pro_link: function pro_link() {
            return formsuite_form_builder.pro_link;
        }
    },

    mounted: function mounted() {
        var self = this,
            in_column_field = false;

        // bind jquery ui sortable
        $('#form-preview-stage .formsuite-form.sortable-list').sortable({
            placeholder: 'form-preview-stage-dropzone',
            items: '.field-items',
            handle: '.control-buttons .move',
            scroll: true,
            over: function over() {
                in_column_field = false;

                // if the field drop in column field, then stop field rendering in the builder stage
                $(".formsuite-column-inner-fields").on("drop", function (event) {
                    var targetColumn = event.currentTarget.classList,
                        isColumnExist = $.inArray(".formsuite-column-inner-fields", targetColumn);

                    if (isColumnExist) {
                        in_column_field = true;
                    }
                });
            },
            update: function update(e, ui) {
                var item = ui.item[0],
                    data = item.dataset,
                    source = data.source,
                    toIndex = parseInt($(ui.item).index()),
                    payload = {
                    toIndex: toIndex
                };

                if ('panel' === source) {
                    // prepare the payload to add new form element
                    var field_template = ui.item[0].dataset.formField,
                        field = $.extend(true, {}, self.field_settings[field_template].field_props);

                    // check if these are already inserted
                    if (self.isSingleInstance(field_template) && self.containsField(field_template)) {
                        swal({
                            title: "Oops...",
                            text: "You already have this field in the form"
                        });

                        $(this).find('.button.ui-draggable.ui-draggable-handle').remove();
                        return;
                    }

                    // add a random integer id
                    field.id = self.get_random_id();

                    // add meta key
                    if ('yes' === field.is_meta && !field.name) {
                        field.name = field.label.replace(/\W/g, '_').toLowerCase() + '_' + field.id;
                    }

                    payload.field = field;

                    // add new form element
                    if (!in_column_field) {
                        self.$store.commit('add_form_field_element', payload);
                    }

                    // remove button from stage
                    $(this).find('.button.ui-draggable.ui-draggable-handle').remove();
                } else if ('stage' === source) {
                    payload.fromIndex = parseInt(data.index);

                    self.$store.commit('swap_form_field_elements', payload);
                }
            }
        });
    },

    methods: {

        open_field_settings: function open_field_settings(field_id) {
            this.$store.commit('open_field_settings', field_id);
        },

        clone_field: function clone_field(field_id, index) {
            var payload = {
                field_id: field_id,
                index: index,
                new_id: this.get_random_id()
            };

            // single instance checking
            var field = _.find(this.$store.state.form_fields, function (item) {
                return parseInt(item.id) === parseInt(payload.field_id);
            });

            // check if these are already inserted
            if (this.isSingleInstance(field.template) && this.containsField(field.template)) {
                swal({
                    title: "Oops...",
                    text: "You already have this field in the form"
                });
                return;
            }

            this.$store.commit('clone_form_field_element', payload);
        },

        delete_field: function delete_field(index) {
            var self = this;

            swal({
                text: self.i18n.delete_field_warn_msg,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d54e21',
                confirmButtonText: self.i18n.yes_delete_it,
                cancelButtonText: self.i18n.no_cancel_it,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger'
            }).then(function () {
                self.$store.commit('delete_form_field_element', index);
            }, function () {});
        },

        delete_hidden_field: function delete_hidden_field(field_id) {
            var i = 0;

            for (i = 0; i < this.form_fields.length; i++) {
                if (parseInt(field_id) === parseInt(this.form_fields[i].id)) {
                    this.delete_field(i);
                }
            }
        },

        is_pro_feature: function is_pro_feature(template) {
            return this.field_settings[template] && this.field_settings[template].pro_feature ? true : false;
        },

        is_template_available: function is_template_available(field) {
            var template = field.template;

            if (this.field_settings[template]) {
                if (this.is_pro_feature(template)) {
                    return false;
                }

                return true;
            }

            // for example see 'mixin_builder_stage' mixin's 'is_taxonomy_template_available' method
            if (_.isFunction(this['is_' + template + '_template_available'])) {
                return this['is_' + template + '_template_available'].call(this, field);
            }

            return false;
        },

        is_full_width: function is_full_width(template) {
            if (this.field_settings[template] && this.field_settings[template].is_full_width) {
                return true;
            }

            return false;
        },

        is_invisible: function is_invisible(field) {
            return field.recaptcha_type && 'invisible_recaptcha' === field.recaptcha_type ? true : false;
        },

        get_field_name: function get_field_name(template) {
            return this.field_settings[template].title;
        }
    }
}
</script>
