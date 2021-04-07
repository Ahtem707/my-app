import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import router from './router/index.js'
import vuetify from './plugins/vuetify.js'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
  router: router,
  store,
}).$mount('#app')
