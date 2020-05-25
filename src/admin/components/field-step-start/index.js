<template>
<div>
    <div class="panel-field-opt panel-field-opt-text">
        <label> Section Name <help-text text="Title"></help-text>
        	<input type="text" v-model="editing_form_field.label">
        </label>
    </div>

    <div class="panel-field-opt panel-field-opt-text">
        <label>
            Previous Button Text <help-text text="Previous Button Text"></help-text>
            <input type="text" v-model="editing_form_field.step_start.prev_button_text">
        </label>
    </div>

    <div class="panel-field-opt panel-field-opt-text">
        <label>
            Next Button Text <help-text text="Next Button Text"></help-text>
            <input type="text" v-model="editing_form_field.step_start.next_button_text">
        </label>
    </div>
</div>

</template>

<script>
    export default {
        name:'field-step-start',
        mixins: [formsuite_mixins.option_field_mixin]
    }
</script>
