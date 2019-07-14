<template>
  <div id="app" class="main-container">
    <router-view/>
  </div>
</template>

<script>

import Index from './components/Index.vue'
import Payment from './components/Payment'
import Confirm from './components/Confirm'
import RequestSent from './components/RequestSent'

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index },
  { path: '/payment', component: Payment },
  { path: '/confirm', component: Confirm },
  { path: '/send-request', component: RequestSent }
]

const router = new VueRouter({
  routes
})

export default {
  name: 'app',
  router,
  components: {
    Index
  },

  data() {
    return {
    }
  }
}
</script>
