// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/index'
import Axios from 'axios'

Vue.prototype.$axios = Axios
Axios.defaults.withCredentials = true
Axios.defaults.baseURL = '/'
Axios.defaults.headers.post['Content-Type'] = 'application/json';


Vue.use(router)
Vue.use(Vuex)
//引入饿了么插件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引入UI组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//引入有赞组件
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
Vue.use(Vant);

Vue.config.productionTip = false

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});


