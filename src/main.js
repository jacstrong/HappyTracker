import Vue from 'vue'
// import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import axios from 'axios'
import Cookies from 'js-cookie'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
  }
})

Vue.prototype.$http = axios
Vue.prototype.$cookies = Cookies

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
