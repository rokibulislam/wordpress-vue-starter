<template>
<div>
    <div :class="['formsuite-form-template-modal', show ? 'show' : 'hide' ]">

        <span class="screen-reader-text"><?php _e( 'Modal window. Press escape to close.', 'formsuite'  ); ?></span>
        <a href="#" class="close" v-on:click.prevent="closeModal()">× <span class="screen-reader-text"><?php _e( 'Close modal window', 'formsuite'  ); ?></span></a>

        <header class="modal-header">
            <slot name="header"></slot>
        </header>

        <div :class="['content-container', this.$slots.footer ? 'modal-footer' : 'no-footer']">
            <div class="content">
                <slot name="body"></slot>
            </div>
        </div>

        <footer v-if="this.$slots.footer">
            <slot name="footer"></slot>
        </footer>
    </div>
    <div :class="['formsuite-form-template-modal-backdrop', show ? 'show' : 'hide' ]"></div>
</div>

</template>
<script>
    export default {
        name:'formsuite-modal',
        template: '#tmpl-formsuite-modal',
        props: {
            show: Boolean,
            onClose: Function
        },

        mounted: function () {
            var self = this;

            $('body').on( 'keydown', function(e) {
                if (self.show && e.keyCode === 27) {
                    self.closeModal();
                }
            });
        },

        methods: {
            closeModal: function() {
                if ( typeof this.onClose !== 'undefined' ) {
                    this.onClose();
                } else {
                    this.$emit('hideModal');
                }
            }
        }
    }
</script>
