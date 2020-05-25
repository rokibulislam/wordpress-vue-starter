<template>
<div class="formsuite-fields">
    <div :id="'formsuite-img_label-' + field.id + '-upload-container'">
        <div class="formsuite-attachment-upload-filelist" data-type="file" data-required="yes">
            <a class="button file-selector formsuite_img_label_148" href="#">
                <?php _e( 'Select Files', 'formsuite-pro' ); ?>
            </a>
        </div>
    </div>

    <span v-if="field.help" class="formsuite-help">{{ field.help }}</span>
</div>

</template>
<script>
    export default {
        name:'form-file_upload',
         mixins: [formsuite_mixins.form_field_mixin]
    }
</script>
