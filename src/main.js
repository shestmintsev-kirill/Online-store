import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import * as fb from 'firebase/app'
import 'vuetify/dist/vuetify.min.css'

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
    // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCvQalTj6IiSNY5fMmkif76m36imaujNv0",
    authDomain: "onlinestore-159c3.firebaseapp.com",
    databaseURL: "https://onlinestore-159c3.firebaseio.com",
    projectId: "onlinestore-159c3",
    storageBucket: "onlinestore-159c3.appspot.com",
    messagingSenderId: "167606344077",
    appId: "1:167606344077:web:789a167abd5ed8866045c4",
    measurementId: "G-DMSKK869RK"
  }
  // Initialize Firebase
  fb.initializeApp(firebaseConfig);
  fb.analytics();
  }
})
