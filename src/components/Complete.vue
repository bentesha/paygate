<template>
  <div class="content">
      <brand/>
      <div class="mt-40">
          <h3>Thank you for the payment!</h3>
          <p>A payment of <strong>TZS {{amount}}</strong> has been been received!</p>
      </div>

      <div class="text-center mt-30">
        <img style="max-height: 180px;" :src="banner" alt="">
      </div>
      
      <button class="primary mt-20">Return to main website</button>

      <p>
        <small>You will be redirected in {{counter}} secs</small>
      </p>
    </div>
</template>

<script>
import Brand from './Brand'
import banner from '../assets/images/transaction-success-2.gif'
import numeral from 'numeral'

export default {
  components: {
    Brand
  },

  data() {
    return {
      banner: banner,
      counter: 10,
      data: null
    }
  },

  created() {
    this.fetch(this.$route.params.id)
  },

  computed: {
    amount() {
      if(!this.data) { return '' }
      return numeral(this.data.amount).format('0, 0')
    }
  },

  methods: {
    startTimer() {
      this.counter = 5 // Countdown 10sec then redirect to client website
      const timerHandle = setInterval(() => {
        if(this.counter <= 0) {
          window.clearInterval(timerHandle)
          this.counter = 0
          //Redirect to client website
          window.location = this.data.returnUrl
        } else {
          this.counter -= 1
        }
      }, 1000);
    },

    fetch(id) {
      this.$http.get('/payment-session/' + id)
        .then(response => {
          this.data = response.data
          console.log(this.data) // eslint-disable-line no-console
          //this.startTimer()
        })
        .catch(console.error) // eslint-disable-line no-console
    }
  }
}
</script>

<style>

</style>
