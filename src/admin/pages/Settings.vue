<template>
  <div class="app-settings">
    The Settings Page
  </div>
</template>

<script>
export default {

  name: 'Settings',

    data () {
     return {

     };
    },
  
	created() {
	    wp.hooks.addFilter( 'addCustomer', 'Settings', this.addCustomer );
	},

	methods: {

    	addCustomer(customers) {
    		return customers.push('kamrul');
    	}
    }
};
</script>

<style lang="css" scoped>
</style>
