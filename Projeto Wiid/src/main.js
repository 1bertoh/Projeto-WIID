import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vue from 'vue';
import App from './App';
import router from './router';


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify,
  router,
  iconfont: 'mdi',
  render: h => h(App),
});
