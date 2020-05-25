<template>
    <div v-if="formsuite_cond && formsuite_cond.condition_status" class="panel-field-opt panel-field-opt-conditional-logic">
        <label> Conditional Logic</label>

        <ul class="list-inline">
            <li>
                <label><input type="radio" value="yes" v-model="formsuite_cond.condition_status"> Yes </label>
            </li>

            <li>
                <label><input type="radio" value="no" v-model="formsuite_cond.condition_status"> No </label>
            </li>
        </ul>

        <div v-if="'yes' === formsuite_cond.condition_status" class="condiotional-logic-container">
            <ul class="condiotional-logic-repeater">
                <li v-for="(condition, index) in conditions" class="clearfix">
                    <div class="cond-field">
                        <select v-model="condition.name" @change="on_change_cond_field(index, condition.name)">
                            <option value=""> - select - </option>
                            <option v-for="dep_field in dependencies" :value="dep_field.name"> {{ dep_field.label }} </option>
                        </select>
                    </div>

                    <div class="cond-operator">
                        <select v-model="condition.operator">
                            <option value="="> is </option>
                            <option value="!=">is not</option>
                        </select>
                    </div>

                    <div class="cond-option">
                        <select v-model="condition.option">
                            <option value="">- select -</option>
                            <option v-for="cond_option in get_cond_options(condition.name)" :value="cond_option.opt_name">
                                {{ cond_option.opt_title }}
                            </option>
                        </select>
                    </div>

                    <div class="cond-action-btns">
                        <i class="fa fa-plus-circle" @click="add_condition"></i>
                        <i class="fa fa-minus-circle pull-right" @click="delete_condition(index)"></i>
                    </div>
                </li>
            </ul>

            <p>
                Show this field when %s of these rules are met
                <select v-model="formsuite_cond.cond_logic">
                    <option value="any">' . __( 'any', 'formsuite' ) . '</option>
                    <option value="all">' . __( 'all', 'formsuite' ) . '</option>
                </select>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'field-conditional-logic',
        mixins: [formsuite_mixins.option_field_mixin],

        data: function data() {
            return {
                conditions: []
            };
        },

        computed: {
            formsuite_cond: function formsuite_cond() {
                return this.editing_form_field.formsuite_cond;
            },

            hierarchical_taxonomies: function hierarchical_taxonomies() {
                var hierarchical_taxonomies = [];

                _.each(formsuite_form_builder.wp_post_types, function (taxonomies) {
                    _.each(taxonomies, function (tax_props, taxonomy) {
                        if (tax_props.hierarchical) {
                            hierarchical_taxonomies.push(taxonomy);
                        }
                    });
                });

                return hierarchical_taxonomies;
            },

            formsuite_cond_supported_fields: function formsuite_cond_supported_fields() {
                return formsuite_form_builder.formsuite_cond_supported_fields.concat(this.hierarchical_taxonomies);
            },

            dependencies: function dependencies() {
                var self = this,
                    dependenciesFields = [],
                    i = 0;

                for (i = 0; i < self.$store.state.form_fields.length; i++) {

                    var field = self.$store.state.form_fields[i];

                    if ('column_field' === field.template) {
                        var innerColumnFields = self.$store.state.form_fields[i].inner_fields;

                        for (var columnFields in innerColumnFields) {
                            if (innerColumnFields.hasOwnProperty(columnFields)) {
                                var columnFieldIndex = 0;

                                while (columnFieldIndex < innerColumnFields[columnFields].length) {
                                    var columnInnerField = innerColumnFields[columnFields][columnFieldIndex];

                                    if ('taxonomy' !== columnInnerField.template) {
                                        if (_.indexOf(self.formsuite_cond_supported_fields, columnInnerField.template) >= 0 && columnInnerField.name && columnInnerField.label && self.editing_form_field.name !== columnInnerField.name) {
                                            dependenciesFields.push(columnInnerField);
                                        }
                                    } else {
                                        if (_.indexOf(self.formsuite_cond_supported_fields, columnInnerField.name) >= 0 && columnInnerField.label && self.editing_form_field.name !== columnInnerField.name) {
                                            dependenciesFields.push(columnInnerField);
                                        }
                                    }

                                    columnFieldIndex++;
                                }
                            }
                        }
                    } else if ('taxonomy' !== field.template && 'column_field' !== field.template) {

                        if (_.indexOf(self.formsuite_cond_supported_fields, field.template) >= 0 && field.name && field.label && self.editing_form_field.name !== field.name) {
                            dependenciesFields.push(field);
                        }
                    } else {

                        if (_.indexOf(self.formsuite_cond_supported_fields, field.name) >= 0 && field.label && self.editing_form_field.name !== field.name) {
                            dependenciesFields.push(field);
                        }
                    }
                }

                return dependenciesFields;
            }
        },

        created: function created() {
            var formsuite_cond = $.extend(true, {}, this.editing_form_field.formsuite_cond),
                self = this;

            _.each(formsuite_cond.cond_field, function (name, i) {

                if (name && formsuite_cond.cond_field[i] && formsuite_cond.cond_operator[i]) {

                    self.conditions.push({
                        name: name,
                        operator: formsuite_cond.cond_operator[i],
                        option: formsuite_cond.cond_option[i]
                    });
                }
            });

            if (!self.conditions.length) {
                self.conditions = [{
                    name: '',
                    operator: '=',
                    option: ''
                }];
            }
        },

        methods: {
            get_cond_options: function get_cond_options(field_name) {
                var options = [];

                if (_.indexOf(this.hierarchical_taxonomies, field_name) < 0) {
                    var dep = this.dependencies.filter(function (field) {
                        return field.name === field_name;
                    });

                    if (dep.length && dep[0].options) {
                        _.each(dep[0].options, function (option_title, option_name) {
                            options.push({ opt_name: option_name, opt_title: option_title });
                        });
                    }
                } else {
                    // NOTE: Two post types cannot have same taxonomy
                    // ie: post_type_one and post_type_two cannot have same taxonomy my_taxonomy
                    var i;

                    for (i in formsuite_form_builder.wp_post_types) {
                        var taxonomies = formsuite_form_builder.wp_post_types[i];

                        if (taxonomies.hasOwnProperty(field_name)) {
                            var tax_field = taxonomies[field_name];

                            if (tax_field.terms && tax_field.terms.length) {
                                var j = 0;

                                for (j = 0; j < tax_field.terms.length; j++) {
                                    options.push({ opt_name: tax_field.terms[j].term_id, opt_title: tax_field.terms[j].name });
                                }
                            }

                            break;
                        }
                    }
                }

                return options;
            },

            on_change_cond_field: function on_change_cond_field(index) {
                this.conditions[index].option = '';
            },

            add_condition: function add_condition() {
                this.conditions.push({
                    name: '',
                    operator: '=',
                    option: ''
                });
            },

            delete_condition: function delete_condition(index) {
                if (this.conditions.length === 1) {
                    this.warn({
                        text: this.i18n.last_choice_warn_msg,
                        showCancelButton: false,
                        confirmButtonColor: "#46b450"
                    });

                    return;
                }

                this.conditions.splice(index, 1);
            }
        },

        watch: {
            conditions: {
                deep: true,
                handler: function handler(new_conditions) {
                    var new_formsuite_cond = $.extend(true, {}, this.editing_form_field.formsuite_cond);

                    if (!this.editing_form_field.formsuite_cond) {
                        new_formsuite_cond.condition_status = 'no';
                        new_formsuite_cond.cond_logic = 'all';
                    }

                    new_formsuite_cond.cond_field = [];
                    new_formsuite_cond.cond_operator = [];
                    new_formsuite_cond.cond_option = [];

                    _.each(new_conditions, function (cond) {
                        new_formsuite_cond.cond_field.push(cond.name);
                        new_formsuite_cond.cond_operator.push(cond.operator);
                        new_formsuite_cond.cond_option.push(cond.option);
                    });

                    this.update_value('formsuite_cond', new_formsuite_cond);
                }
            }
        }
    }
</script>
