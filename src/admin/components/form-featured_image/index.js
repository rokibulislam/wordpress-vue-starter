<template>
<div class="formsuite-fields">
    <div :id="'formsuite-img_label-' + field.id + '-upload-container'">
        <div class="formsuite-attachment-upload-filelist" data-type="file" data-required="yes">
            <a class="button file-selector" href="#">
                <template v-if="field.button_label === ''">
                    <?php _e( 'Select Image', 'formsuite' ); ?>
                </template>
                <template v-else>
                    {{ field.button_label }}
                </template>
            </a>
        </div>
    </div>

    <span v-if="field.help" class="formsuite-help">{{ field.help }}</span>
</div>

</template>
<script>
    export default {
        name:'form-featured_image',
        mixins: [formsuite_mixins.form_field_mixin]
    }
</script>
