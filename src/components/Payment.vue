<template>
  <div class="content">
      <brand/>
      <div class="mt-40">
          <h3>Payment Details</h3>
          <p>Enter your <strong>TigoPesa</strong> number and amount of credits you want to purchase</p>
      </div>
      
      <!-- <div class="alert error">
        * You must enter a valid TigoPesa number!
      </div> -->
      
      <form class="mt-30">
        <p class="text-secondary"><small>Enter your phone number</small></p>
        <input class="with-border" type="text" placeholder="Example 0713783377"/>

        <p class="text-secondary"><small>Enter amount of credits to buy (TZS)</small></p>
        <input class="with-border" type="text" placeholder="Example 3500"/>

        <button @click="handleConfirm" class="primary">Continue</button>
      </form>
      
      <p>
        <small>Or <router-link to="/">select a different payment method</router-link></small>
      </p>
    </div>
</template>

<script>
import Brand from './Brand'

export default {
  components: {
    Brand
  },

  methods: {
    handleConfirm(){
      this.$router.push('/confirm')
    }
  }
}
</script>

<style>

</style>
