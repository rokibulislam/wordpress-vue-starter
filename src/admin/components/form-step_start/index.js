<template>
<div>
    <div class="step-start-indicator">
        <div class="hr-line"></div>
        <span class="step-label">{{ field.label }}</span>
    </div>
</div>

</template>
<script>
    export default {
        name:'form-step_start',
        mixins: [formsuite_mixins.form_field_mixin]
    }
</script>
