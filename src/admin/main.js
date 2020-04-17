import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import menuFix from './utils/admin-menu-fix'
// import { createHooks } from '@wordpress/hooks';

// window.rokib = {

// };

// window.rokib.hooks = createHooks();

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#vue-admin-app',
  router,
  store,
  render: h => h(App)
});


// wp.hooks.addFilter( 'spa_admin_routes', 'myApp', addRoute );


// function addRoute( $data ) {
// 	console.log('hihi');
// 	return $data;
// }

// fix the admin menu for the slug "vue-app"
menuFix('vue-app');
