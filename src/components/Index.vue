<template>
  <div class="content">
      <brand/>
      <p class="mt-40">You are about to send payment to <a href="www.twendeshule.com">www.twendeshule.com</a></p>
      <p class="text-secondary mt-30"><small>Select payment method to continue</small></p>
      
      <ul class="payment-method-list">
        <li class="payment-method" @click.prevent="selectPaymentMethod('tigo')">
          <span class="text-secondary">Pay with</span>
          <img class="logo tigo" :src="tigoPesaLogo" alt="">
        </li>
      </ul>
      <p>
        <small>Or <a href="#">cancel and return to www.twendeshule.com</a></small>
      </p>
    </div>
</template>

<script>

import Brand from './Brand'
import logo from '@/assets/images/twendeshule-logo.png'
import tigoPesaLogo from '@/assets/images/tigopesa-logo.png'

export default {
  components: {
    Brand
  },

  data() {
    return {
      logo,
      tigoPesaLogo
    }
  },

  methods: {
    selectPaymentMethod(method) {
      this.$router.push('/payment')
    }
  }
}
</script>

<style>

</style>
