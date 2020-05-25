<template>
    <div class="panel-field-opt panel-field-opt-text">
        <label class="clearfix">
            {{ option_field.title }} <help-text v-if="option_field.help_text" :text="option_field.help_text"></help-text>
            <span class="pull-right">
                <input type="checkbox" v-model="show_value"> Show values
            </span>
        </label>

        <ul :class="['option-field-option-chooser', show_value ? 'show-value' : '']">
            <li class="clearfix margin-0 header">
                <div class="selector">&nbsp;</div>

                <div class="sort-handler">&nbsp;</div>

                <div class="label">
                    Label
                </div>

                <div v-if="show_value" class="value">
                    Value
                </div>

                <div class="action-buttons">&nbsp;</div>
            </li>
        </ul>

        <ul :class="['option-field-option-chooser margin-0', show_value ? 'show-value' : '']">
            <li v-for="(option, index) in options" :key="option.id" :data-index="index" class="clearfix option-field-option">
                <div class="selector">
                    <input
                        v-if="option_field.is_multiple"
                        type="checkbox"
                        :value="option.value"
                        v-model="selected"
                    >
                    <input
                        v-else
                        type="radio"
                        :value="option.value"
                        v-model="selected"
                        class="option-chooser-radio"
                    >
                </div>

                <div class="sort-handler">
                    <i class="fa fa-bars"></i>
                </div>

                <div class="label">
                    <input type="text" v-model="option.label" @input="set_option_label(index, option.label)">
                </div>

                <div v-if="show_value" class="value">
                    <input type="text" v-model="option.value">
                </div>

                <div class="action-buttons clearfix">
                    <i class="fa fa-minus-circle" @click="delete_option(index)"></i>
                </div>
            </li>
            <li>
                <div class="plus-buttons clearfix" @click="add_option">
                    <i class="fa fa-plus-circle"></i>
                </div>
            </li>
        </ul>

        <a v-if="!option_field.is_multiple && selected" href="#clear" @click.prevent="clear_selection">Clear Selection </a>
    </div>
</template>

<script>
    export default {
        name: 'field-option-data',
        mixins: [formsuite_mixins.option_field_mixin],

        data: function data() {
            return {
                show_value: false,
                options: [],
                selected: []
            };
        },

        computed: {
            field_options: function field_options() {
                return this.editing_form_field.options;
            },

            field_selected: function field_selected() {
                return this.editing_form_field.selected;
            }
        },

        mounted: function mounted() {
            var self = this;

            this.set_options();

            $(this.$el).find('.option-field-option-chooser').sortable({
                items: '.option-field-option',
                handle: '.sort-handler',
                update: function update(e, ui) {
                    var item = ui.item[0],
                        data = item.dataset,
                        toIndex = parseInt($(ui.item).index()),
                        fromIndex = parseInt(data.index);

                    self.options.swap(fromIndex, toIndex);
                }
            });
        },

        methods: {
            set_options: function set_options() {
                var self = this;
                var field_options = $.extend(true, {}, this.editing_form_field.options);

                _.each(field_options, function (label, value) {
                    self.options.push({ label: label, value: value, id: self.get_random_id() });
                });

                if (this.option_field.is_multiple && !_.isArray(this.field_selected)) {
                    this.selected = [this.field_selected];
                } else {
                    this.selected = this.field_selected;
                }
            },

            // in case of select or radio buttons, user should deselect default value
            clear_selection: function clear_selection() {
                this.selected = null;
            },

            add_option: function add_option() {
                var count = this.options.length,
                    new_opt = this.i18n.option + '-' + (count + 1);

                this.options.push({
                    label: new_opt, value: new_opt, id: this.get_random_id()
                });
            },

            delete_option: function delete_option(index) {
                if (this.options.length === 1) {
                    this.warn({
                        text: this.i18n.last_choice_warn_msg,
                        showCancelButton: false,
                        confirmButtonColor: "#46b450"
                    });

                    return;
                }

                this.options.splice(index, 1);
            },

            set_option_label: function set_option_label(index, label) {
                this.options[index].value = label.toLocaleLowerCase().replace(/\s/g, '_');
            }
        },

        watch: {
            options: {
                deep: true,
                handler: function handler(new_opts) {
                    var options = {},
                        i = 0;

                    for (i = 0; i < new_opts.length; i++) {
                        options[new_opts[i].value] = new_opts[i].label;
                    }

                    this.update_value('options', options);
                }
            },

            selected: function selected(new_val) {
                this.update_value('selected', new_val);
            }
        }
    }
</script>
