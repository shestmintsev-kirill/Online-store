import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import * as fb from 'firebase/app'
import 'vuetify/dist/vuetify.min.css'
import firebaseConfig from '../config/firebase'

Vue.use(Vuetify)
/* eslint-disable */
Vue.config.productionTip = false

 new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {

  // Initialize Firebase
  fb.initializeApp(firebaseConfig);
  fb.analytics();
  fb.auth().onAuthStateChanged(user => {
    if (user) {
      this.$store.dispatch('autoLoginUser', user)
    }
  })
  }
})
