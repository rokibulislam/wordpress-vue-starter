<template>
<div>
    <div class="panel-field-opt panel-field-name clearfix">
        <label> First Name </label>
        <div class="name-field-placeholder">
            <div class="name-merge-tag-holder">
                <input type="text" v-model="editing_form_field.first_name.placeholder">
                <formsuite-merge-tags
                    filter="no_fields"
                    v-on:insert="insertValue"
                    :field="{name: 'first_name', type: 'placeholder'}">
                </formsuite-merge-tags>
            </div>
            <label> Placeholder </label>
        </div>

        <div class="name-field-value">
            <div class="name-merge-tag-holder">
                <input type="text" v-model="editing_form_field.first_name.default">
                <formsuite-merge-tags
                    filter="no_fields"
                    v-on:insert="insertValue"
                    :field="{name: 'first_name', type: 'default'}">
                </formsuite-merge-tags>
            </div>
            <label> Default Value</label>
        </div>
    </div>

    <div class="panel-field-opt panel-field-name clearfix" v-if="editing_form_field.format !== 'first-last'">
        <label> Middle Name </label>
        <div class="name-field-placeholder">
            <div class="name-merge-tag-holder">
                <input type="text" v-model="editing_form_field.middle_name.placeholder">
                <formsuite-merge-tags
                    filter="no_fields"
                    v-on:insert="insertValue"
                    :field="{name: 'middle_name', type: 'placeholder'}">
                </formsuite-merge-tags>
            </div>
            <label>Placeholder</label>
        </div>

        <div class="name-field-value">

            <div class="name-merge-tag-holder">
                <input type="text" v-model="editing_form_field.middle_name.default">
                <formsuite-merge-tags
                    filter="no_fields"
                    v-on:insert="insertValue"
                    :field="{name: 'middle_name', type: 'default'}">
                </formsuite-merge-tags>
            </div>
            <label>Default Value</label>
        </div>
    </div>

    <div class="panel-field-opt panel-field-name clearfix">
        <label>Last Name</label>
        <div class="name-field-placeholder">
            <div class="name-merge-tag-holder">
                <input type="text" v-model="editing_form_field.last_name.placeholder">
                <formsuite-merge-tags
                    filter="no_fields"
                    v-on:insert="insertValue"
                    :field="{name: 'last_name', type: 'placeholder'}">
                </formsuite-merge-tags>
            </div>
            <label> Placeholder </label>
        </div>

        <div class="name-field-value">
            <div class="name-merge-tag-holder">
                <input type="text" v-model="editing_form_field.last_name.default">
                <formsuite-merge-tags
                    filter="no_fields"
                    v-on:insert="insertValue"
                    :field="{name: 'last_name', type: 'default'}">
                </formsuite-merge-tags>
            </div>
            <label> Default Value </label>
        </div>
    </div>
</div>



</template>

<script>
    export default {
        name::'field-name',
        mixins: [ formsuite_mixins.option_field_mixin],
        computed: {
            value: {
                get: function () {
                    return this.editing_form_field[this.option_field.name];
                },

                set: function (value) {
                    this.update_value(this.option_field.name, value);
                }
            }
        },

        methods: {
            on_focusout: function (e) {
                formsuite_form_builder.event_hub.$emit('field-text-focusout', e, this);
            },
            on_keyup: function (e) {
                formsuite_form_builder.event_hub.$emit('field-text-keyup', e, this);
            },
            insertValue: function(type, field, property) {
                var value = ( field !== undefined ) ? '{' + type + ':' + field + '}' : '{' + type + '}';
                this.editing_form_field[property.name][property.type] = value;
            },
        }
    }
</script>
