import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import menuFix from './utils/admin-menu-fix'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#vue-admin-app',
  router,
  store,
  render: h => h(App)
});

menuFix('vue-app');
