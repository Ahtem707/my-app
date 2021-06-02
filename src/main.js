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
      apiKey: "AIzaSyCWowwttJzC3ZVadL3_sfuwE7a7qFXwq8E",
      authDomain: "vue-app-6f4d8.firebaseapp.com",
      projectId: "vue-app-6f4d8",
      storageBucket: "vue-app-6f4d8.appspot.com",
      messagingSenderId: "709206541066",
      appId: "1:709206541066:web:773d2875554a9edf5230f3",
      measurementId: "G-YFF91E5MBB"
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
