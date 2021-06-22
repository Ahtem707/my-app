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
    var firebaseConfig = {
      apiKey: "AIzaSyC7NsceT7izxcieKLMBfoJnCiaKhfigiSA",
      authDomain: "my-app-95eaa.firebaseapp.com",
      databaseURL: "https://my-app-95eaa-default-rtdb.firebaseio.com",
      projectId: "my-app-95eaa",
      storageBucket: "my-app-95eaa.appspot.com",
      messagingSenderId: "393522771381",
      appId: "1:393522771381:web:4c09f6b5566036cdaa55fc"
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
