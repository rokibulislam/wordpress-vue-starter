<template>
<i class="fa fa-question-circle field-helper-text formsuite-tooltip" data-placement="top" :title="text"></i>
</template>
<script>
    export default {
        name:'help-text',
        props: {
            text: {
                type: String,
                default: ''
            }
        },

        mounted: function mounted() {
            $(".formsuite-tooltip").tooltip();
        }
    }
</script>
