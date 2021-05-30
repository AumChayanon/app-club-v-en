import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import* as firebase from "firebase";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
Vue.config.productionTip = false

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(Antd);
Vue.use(PerfectScrollbar)
const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
appId: process.env.VUE_APP_FIREBASE_APP_ID,
}  

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}



let app;
firebase.auth().onAuthStateChanged(user => {
  console.log(user);
  if(!app){
    app = new Vue({
          router,
          store,
          render: h => h(App)
        }).$mount('#app')
  }
  
})