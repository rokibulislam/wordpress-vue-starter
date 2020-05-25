<template>
    <div class="formsuite-fields">
        <template v-if="!has_recaptcha_api_keys">
            <p v-html="no_api_keys_msg"></p>
        </template>

        <template v-else>
            <div v-if="'invisible_recaptcha' != field.recaptcha_type">
                <img class="formsuite-recaptcha-placeholder" src="<?php echo FormSuite_ASSET_URI . '/images/recaptcha-placeholder.png'; ?>" alt="">
            </div>
            <div v-else><p><?php _e( 'Invisible reCaptcha', 'formsuite' ); ?></p></div>
        </template>
    </div>
</template>
<script>
    export default {
        name:'form-recaptcha',
        mixins: [formsuite_mixins.form_field_mixin],
        computed: {
            has_recaptcha_api_keys: function has_recaptcha_api_keys() {
                return formsuite_form_builder.recaptcha_site && formsuite_form_builder.recaptcha_secret ? true : false;
            },

            no_api_keys_msg: function no_api_keys_msg() {
                return formsuite_form_builder.field_settings.recaptcha.validator.msg;
            }
        }
    }
</script>
