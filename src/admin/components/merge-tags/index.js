<template>
<div class="formsuite-merge-tag-wrap">
    <a href="#" v-on:click.prevent="toggleFields($event)" class="merge-tag-link" title="<?php echo esc_attr( 'Click to toggle merge tags', 'formsuite' ); ?>"><span class="dashicons dashicons-editor-code"></span></a>

    <!-- <pre>{{ form_fields.length }}</pre> -->

    <div class="formsuite-merge-tags">
        <div class="merge-tag-section" v-if="!filter || filter !== 'no_fields' ">
            <div class="merge-tag-head"><?php _e( 'Form Fields', 'formsuite' ); ?></div>

            <ul>
                <template v-if="form_fields.length">
                    <li v-for="field in form_fields">

                        <template v-if="field.template === 'name_field'">
                            <a href="#" v-on:click.prevent="insertField('name-full', field.name);">{{ field.label }}</a>
                            (
                            <a href="#" v-on:click.prevent="insertField('name-first', field.name);"><?php _e( 'first', 'formsuite' ); ?></a> |
                            <a href="#" v-on:click.prevent="insertField('name-middle', field.name);"><?php _e( 'middle', 'formsuite' ); ?></a> |
                            <a href="#" v-on:click.prevent="insertField('name-last', field.name);"><?php _e( 'last', 'formsuite' ); ?></a>
                            )
                        </template>

                        <template v-else-if="field.template === 'image_upload'">
                            <a href="#" v-on:click.prevent="insertField('image', field.name);">{{ field.label }}</a>
                        </template>

                        <template v-else-if="field.template === 'file_upload'">
                            <a href="#" v-on:click.prevent="insertField('file', field.name);">{{ field.label }}</a>
                        </template>

                        <a v-else href="#" v-on:click.prevent="insertField('field', field.name);">{{ field.label }} </a>

                    </li>
                </template>
                <li v-else>
                    <?php _e( 'No fields available', 'formsuite' ); ?>
                </li>
            </ul>
        </div><!-- .merge-tag-section -->

        <template v-if="!fieldsonly">

            <?php
            if ( function_exists( 'formsuite_get_merge_tags' ) ) {
                $merge_tags = formsuite_get_merge_tags();

                foreach ( $merge_tags as $section_key => $section ) {
                    ?>

                    <div class="merge-tag-section">
                        <div class="merge-tag-head"><?php echo $section['title']; ?></div>

                        <ul>
                            <?php foreach ( $section['tags'] as $key => $value ) { ?>
                                <li>
                                    <a href="#" v-on:click.prevent="insertField('<?php echo $key; ?>');"><?php echo $value; ?></a>
                                </li>
                            <?php } ?>
                        </ul>
                    </div><!-- .merge-tag-section -->

                    <?php
                }
            }
            ?>
        </template>
    </div><!-- .merge-tags -->
</div>
</template>
<script>
    export default {
        name:'formsuite-merge-tags',
        props: {
            field: [String, Number,Object],
            filter: {
                type: String,
                default: null
            },
            fieldsonly: {
                type: Boolean,
                default: false
            }
        },

        data: function() {
            return {
                type: null,
            };
        },

        mounted: function() {

            // hide if clicked outside
            $('body').on('click', function(event) {
                if ( !$(event.target).closest('.formsuite-merge-tag-wrap').length) {
                    $(".formsuite-merge-tags").hide();
                }
            });
        },

        computed: {
            form_fields: function () {
                var template = this.filter,
                    fields = this.$store.state.form_fields;

                if (template !== null) {
                    return fields.filter(function(item) {
                        return item.template === template;
                    });
                }

                // remove the action/hidden fields
                return fields.filter(function(item) {
                    return !_.contains( [ 'action_hook', 'custom_hidden_field'], item.template );
                });
            },

        },

        methods: {
            toggleFields: function(event) {
                $(event.target).parent().siblings('.formsuite-merge-tags').toggle('fast');
            },

            insertField: function(type, field) {
                this.$emit('insert', type, field, this.field);
            },
        }
    }
</script>
