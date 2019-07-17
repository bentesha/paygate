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
import Complete from './components/Complete'
import axios from 'axios'

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/:id', component: Index },
  { path: '/payment/:id', component: Payment },
  { path: '/confirm/:id', component: Confirm },
  { path: '/send-request/:id', component: RequestSent },
  { path: '/complete/:id',  component: Complete }
]

const router = new VueRouter({
  routes
})

const http = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

Vue.mixin({
  beforeCreate() {
    if(this.$options.http) {
      this.$http = this.$options.http
    } else if(this.$options.parent && this.$options.parent.$http) {
      this.$http = this.$options.parent.$http
    }
  }
})

export default {
  name: 'app',
  router,
  http,
  components: {
  },

  data() {
    return {
    }
  }
}
</script>
