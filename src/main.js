import Vue from 'vue'
import App from './App.vue'
//导入路由
import router from "./router";


// import VueLazyload from 'vue-lazyload'
// Vue.use(VueLazyload)
Vue.config.productionTip = false
//  总线
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  //挂载路由
  router
}).$mount('#app')
