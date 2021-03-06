// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import store from '@/store'
import ElementUI from 'element-ui'
import '@/assets/icon/loginicon/iconfont.css'
import '@/assets/icon/twoicon/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/main.css'
Vue.config.productionTip = false

Vue.use(ElementUI)

// 登录拦截
axios.interceptors.response.use( response => {
  return response; 
}, error => {
  return error;
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
