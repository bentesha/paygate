<template>
  <div class="content">
      <brand/>
      <p class="mt-40">You are about to send payment to <a target="_blank" href="http://www.twendeshule.com">www.twendeshule.com</a></p>
      <p class="text-secondary mt-30"><small>Select payment method to continue</small></p>
      
      <ul class="payment-method-list">
        <li class="payment-method" @click.prevent="selectPaymentMethod('TIGO_PESA')">
          <span class="text-secondary">Pay with</span>
          <img class="logo tigo" :src="tigoPesaLogo" alt="">
        </li>
      </ul>
      <p v-if="data && data.returnUrl">
        <small>Or <a :href="data.returnUrl">cancel and return to www.twendeshule.com</a></small>
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
      tigoPesaLogo,

      data: null
    }
  },

  created() {
    const id = this.$route.params.id
    this.fetch(id)
  },

  methods: {
    async selectPaymentMethod(method) {
      // Update payment method
      this.$http.put(`/payment-session/${this.data.id}`, {
        paymentMethod: method
      })
        .then(() => this.$router.push(`/payment/${this.data.id}`))
        .catch(console.error) // eslint-disable-line no-console

    },

    fetch(id) {
      this.$http.get(`/payment-session/${id}`)
        .then(response => {
          this.data = response.data
        })
        .catch(console.log) // eslint-disable-line no-console
    }
  }
}
</script>

<style>

</style>
