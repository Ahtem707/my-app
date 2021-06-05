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
      apiKey: "AIzaSyCqgXMQfp9J7BEgRd8gUXBvxRjM9-RPFQw",
      authDomain: "vue-app-ce14c.firebaseapp.com",
      projectId: "vue-app-ce14c",
      storageBucket: "vue-app-ce14c.appspot.com",
      messagingSenderId: "636948364692",
      appId: "1:636948364692:web:6d3ef2f628088e89aee381",
      measurementId: "G-J4VKB0L6ZY"
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
