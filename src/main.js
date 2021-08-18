import Vue from 'vue'
import App from './App.vue'
//导入路由
import router from "./router";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //挂载路由
  router
}).$mount('#app')
