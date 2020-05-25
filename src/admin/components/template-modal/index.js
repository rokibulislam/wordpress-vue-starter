<template>
<div class="wefroms-form-templates">
    <formsuite-modal :show.sync="show" :onClose="onClose">
        <h2 slot="header">
            <?php _e( 'Select a Template', 'formsuite' ); ?>
            <small><?php printf( __( 'Select from a pre-defined template or from a <a href="#" %s>blank form</a>', 'formsuite' ), '@click.prevent="blankForm()"' ); ?></small>
            <?php
                $registry   = formsuite()->templates->get_templates();
                $categories = formsuite_get_form_template_categories();
                $colors     = formsuite_get_flat_ui_colors();
             ?>
        </h2>

        <div slot="body">

                <?php

                // remove the blank form from index as it's handled separately
                if ( array_key_exists( 'blank', $registry ) ) {
                    unset( $registry['blank'] );
                }

                foreach ( $categories as $category_id => $category ) {
                    ?>
                    <div class="clearfix" v-if="category=='<?php echo $category_id; ?>' || category=='all'">

                    <?php

                    printf( '<h2><i class="%s" style="color: %s"></i> &nbsp;  %s</h2> <ul class="clearfix">', $category['icon'], $colors[array_rand( $colors )], $category['name'] );

                    if ( $category_id == 'default' ) {
                        ?>

                            <li class="blank-form">
                                <h3><?php _e( 'Blank Form', 'formsuite' ); ?></h3>

                                <div class="blank-form-text">
                                    <span class="dashicons dashicons-plus"></span>
                                    <div class="title"><?php _e( 'Blank Form', 'formsuite' ); ?></div>
                                </div>

                                <div class="form-create-overlay">

                                    <div class="title"><?php _e( 'Blank Form', 'formsuite' ); ?></div>
                                    <br>
                                    <button class="button button-primary" @click.prevent="blankForm($event.target)" title="<?php echo esc_attr( 'Blank Form' ); ?>">
                                        <?php _e( 'Create Form', 'formsuite' ); ?>
                                    </button>
                                </div>
                            </li>

                        <?php
                    }

                    foreach ( $registry as $key => $template ) {
                        if ( $category_id !== $template->category ) {
                            continue;
                        }

                        $is_available = true;
                        $class        = 'template-active';
                        $title        = $template->title;
                        $image        = $template->image ? $template->image : '';

                        if ( !$template->is_enabled() ) {
                            $title        = __( 'This integration is not installed.', 'formsuite' );
                            $class        = 'template-inactive';
                            $is_available = false;
                        } ?>

                        <li class="<?php echo $class; ?>">
                            <h3><?php _e( $title, 'formsuite' ); ?></h3>

                            <?php  if ( $image ) {
                            printf( '<img src="%s" alt="%s">', $image, $title );
                        } ?>

                            <div class="form-create-overlay">

                                <div class="title"><?php echo $template->get_title(); ?></div>
                                <div class="description"><?php echo $template->get_description(); ?></div>
                                <br>

                                <button class="button button-primary" @click.prevent="createForm('<?php echo $key; ?>', $event.target)" title="<?php echo esc_attr( $title ); ?>" <?php echo $is_available ? '' : 'disabled="disabled"'; ?>>
                                  <?php if ( $is_available ) { ?>
                                       <?php _e( 'Create Form', 'formsuite' ); ?>
                                    <?php } else { ?>
                                        <?php _e( 'Require Pro Upgrade', 'formsuite' ); ?>
                                    <?php } ?>
                                </button>
                            </div>
                        </li>
                        <?php
                    } ?>

                    </ul></div>

                    <?php
                }
                ?>
        </div>
    </formsuite-modal>
</div>

</template>
<script>
    export default {
        name:'formsuite-template-modal',
        props: {
            show: Boolean,
            onClose: Function,
        },

        data: function() {
            return {
                loading: false,
                category: 'all',
            };
        },

        methods: {

            blankForm: function(target) {
                this.createForm( 'blank', target );
            },

            createForm: function(form, target) {
                var self = this;

                // already on a request?
                if ( self.loading ) {
                    return;
                }

                self.loading = true;

                $(target).addClass('updating-message');

                wp.ajax.send( 'formsuite_contact_form_template', {
                    data: {
                        template: form,
                        _wpnonce: formSuite.nonce
                    },

                    success: function(response) {
                        self.$router.push({
                            name: 'edit',
                            params: { id: response.id }
                        });
                    },

                    error: function(error) {

                    },

                    complete: function() {
                        self.loading = false;

                        $(target).removeClass('updating-message');
                    }
                });
            }
        }
    }
</script>
