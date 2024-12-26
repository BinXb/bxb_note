import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import "ztree/css/metroStyle/metroStyle.css"
import "ztree/js/jquery.ztree.all.min.js"
import "ztree/js/jquery.ztree.exhide.min.js"

import Element from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
