import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import router from './router/index.js'
import vuetify from './plugins/vuetify.js'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import fb from 'firebase/app';
import 'firebase/auth'
import BuyModalComponent from '@/components/Shared/BuyModal'

Vue.use(VueRouter)
Vue.component('app-vue-modal',BuyModalComponent)
Vue.config.productionTip = true
Vue.config.devtools = true;

new Vue({
  vuetify,
  render: h => h(App),
  router: router,
  store,
  created() {
    const firebaseConfig = {
      apiKey: "AIzaSyBoyoooBTv_NFYMJ5FtKJik1xh5KcgB0sc",
      authDomain: "my-app-1972c.firebaseapp.com",
      projectId: "my-app-1972c",
      storageBucket: "my-app-1972c.appspot.com",
      messagingSenderId: "413729819733",
      appId: "1:413729819733:web:570227d2e37b41a32418dc"
    };
    fb.initializeApp(firebaseConfig)

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
   })
   this.$store.dispatch('fetchAds')
  }
}).$mount('#app')
