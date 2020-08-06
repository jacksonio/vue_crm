import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import Paginate from 'vuejs-paginate'
import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin'
import Loader from "@/components/app/Loader";
import tooltipDirective from '@/directives/tooltip.directive'
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from "@/filters/localize.filter";
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)
Vue.directive('tooltip', tooltipDirective)

firebase.initializeApp({
  apiKey: "AIzaSyCjkPaXqrKaddEl8DnQ9QIhLsepmhyWwmE",
  authDomain: "vue-crm-bf232.firebaseapp.com",
  databaseURL: "https://vue-crm-bf232.firebaseio.com",
  projectId: "vue-crm-bf232",
  storageBucket: "vue-crm-bf232.appspot.com",
  messagingSenderId: "596581322635",
  appId: "1:596581322635:web:138df96eb2464a8eb6298e"
})

let app;

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


