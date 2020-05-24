import Vue from 'vue'
import App from './App'
import BuyDialogComponent from '@/components/Common/BuyDialog'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import * as fb from 'firebase/app'
import 'vuetify/dist/vuetify.min.css'
import firebaseConfig from '../config/firebase'

Vue.use(Vuetify)
Vue.component('app-buy-dialog', BuyDialogComponent)
Vue.config.productionTip = false
// Initialize Firebase
fb.initializeApp(firebaseConfig)
fb.analytics()
let app
fb.auth().onAuthStateChanged(() => {
  if (!app) {
    // eslint-disable-next-line
    app = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>',
      created () {
        fb.auth().onAuthStateChanged(user => {
          if (user) {
            this.$store.dispatch('autoLoginUser', user)
          }
          this.$store.dispatch('fetchProducts')
        })
      }
    })
  }
})
