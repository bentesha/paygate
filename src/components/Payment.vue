<template>
  <div class="content">
      <brand/>
      <div class="mt-40">
          <h3>Payment Details</h3>
          <p>Enter your <strong>TigoPesa</strong> number and amount of credits you want to purchase</p>
      </div>
      
      <div v-if="error.message" class="alert error">
        * {{error.message}}
      </div>
      
      <form class="mt-30">
        <p class="text-secondary"><small>Enter your phone number</small></p>
        <input 
          v-model="model.phoneNumber"
          class="with-border"
          :disabled="loading"
          :class="{ error: error.field === 'phoneNumber' }"
          type="text"
          placeholder="Example 0713783377"/>

        <p class="text-secondary"><small>Enter amount of credits to buy. (Min amount TZS 650)</small></p>
        <input
          v-model="model.amount"
          class="with-border"
          :disabled="loading"
          :class="{ error: error.field === 'amount' }"
          type="text"
          placeholder="Example 3500"/>

        <button :disabled="loading" @click.prevent="handleConfirm" class="primary">Continue</button>
      </form>
      
      <p v-if="data">
        <small>Or <router-link :to="'/' + data.id">select a different payment method</router-link></small>
      </p>
    </div>
</template>

<script>
import Brand from './Brand'

export default {
  components: {
    Brand
  },

  data() {
    return {
      data: null,
      model: {
        phoneNumber: null,
        amount: null,
      },

      loading: false,

      error: {
        message: '',
        field: ''
      }
    }
  },

  created() {
    this.fetch(this.$route.params.id)
  },

  methods: {
    validateInput(){
      this.error.message = ''
      this.error.field = ''

      // Validate phone number
      const phoneNumber = this.model.phoneNumber;
      const amount = this.model.amount
      const regex = /^(071|065|067)\d{7}$/
      if(!phoneNumber) {
        this.error.message = 'Enter your phone number'
        this.error.field = 'phoneNumber'
      } else if(!phoneNumber.match(regex)) {
        this.error.message = 'You must enter a valid TigoPesa number'
        this.error.field = 'phoneNumber'
      } else if(!amount) {
        this.error.message = 'Enter amount to pay'
        this.error.field = 'amount'
      } else if(!this.isNumber(amount)) {
        this.error.message = 'Enter a valid amount'
        this.error.field = 'amount'
      } else if(Number(amount) < 650) {
        this.error.message = 'Minimum amounts is TZS 650'
        this.error.field = 'amount'
      } else {
        this.model.amount = Math.trunc(Number(amount))
      }

      return !this.error.message
    },

    isNumber(number) {
      if(typeof number === 'string') { number.trim() }
      if(number === '' || typeof number === 'boolean' || number === null || number === undefined) {
        return false
      }
      return !Number.isNaN(Number(number))
    },

    handleConfirm(){
      if(!this.validateInput()) {
        return
      }
      // Update phone number and amount
      this.$http.put('/payment-session/' + this.data.id, {
        phoneNumber: this.model.phoneNumber,
        amount: this.model.amount
      })
        .then(() => this.$router.push('/confirm/' + this.data.id))
        .catch(console.error) // eslint-disable-line no-console
    },

    fetch(id) {
      this.loading = true
      this.$http.get('/payment-session/' + id)
        .then(response => {
          this.data = response.data
          this.model.phoneNumber = response.data.phoneNumber
          this.model.amount = Number(response.data.amount) || null
        })
        .catch(console.error) // eslint-disable-line no-console
        .finally(() => this.loading = false)
    }
  }
}
</script>

<style>

</style>
