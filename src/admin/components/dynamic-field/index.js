<template>
    <div>

        <div class="panel-field-opt panel-field-opt-text">
            <label> Dynamic value population
                <help-text text="Field value or options can be populated dynamically through filter hook or query string"></help-text>
            </label>

            <ul>
                <li>
                    <label>
                        <input type="checkbox" value="yes" v-model="dynamic.status"> Allow field to be populated dynamically
                    </label>
                </li>
            </ul>
        </div>

        <template v-if="dynamic.status">
            <div class="panel-field-opt panel-field-opt-text"><label> Parameter Name
                <help-text text="Enter a Parameter Name, using that the field value can be populated through filter hook or query string"></help-text>
                 <input type="text" v-model="dynamic.param_name">
                </label>
            </div>
        </template>
    </div>

</template>

<script>
    export default {
        name: 'field-dynamic-field',
        mixins: [formsuite_mixins.option_field_mixin],
        template: '#tmpl-formsuite-dynamic-field',
        data: function(){
            return {
                dynamic: {
                    status: false,
                    param_name: '',
                }
            }
        },
        computed: {
            dynamic: function(){
                return this.editing_form_field.dynamic;
            },
            editing_field: function(){
                return this.editing_form_field;
            },
        },

        created: function () {
            this.dynamic = $.extend(false, this.dynamic, this.editing_form_field.dynamic);
        },

        methods: {

        },

        watch: {
            dynamic: function(){
                this.update_value('dynamic', this.dynamic);
            }
        },
    }
</script>
