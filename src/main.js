// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import Vuex from "vuex"
import VueCookies from 'vue-cookies'
//vue框架中使用cookies
Vue.use(VueCookies);
//vue框架中使用vuex
Vue.use(Vuex);
var store = new Vuex.Store({
  state:{
    flagLogin:true,
    username:'',
  },
  mutations:{
    updateLogin(state,arg){
      state.flagLogin = arg
    },
    username(state,arg){
      state.username = arg
    }
  }
})
//vue框架中使用element
Vue.use(ElementUI);
//vue中使用axios
Vue.prototype.$http= axios
//与后端进行数据交换的时候带上cookie
axios.defaults.withCredentials = true;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store:store
})
