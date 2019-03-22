import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Axios from './assets/js/axiosPlugins.js'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.prototype.$Axios = Axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
