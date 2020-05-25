<template>
	<div class="panel-field-opt panel-field-html-help-text" v-html="option_field.text"> </div>
</template>

<script>
    export default {
        name: 'field-html_help_text',
    	mixins: [formsuite_mixins.option_field_mixin]
	}
</script>
