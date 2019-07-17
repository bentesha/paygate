<template>
  <div class="content">
      <brand/>
      <div class="mt-40">
          <h3>Check your phone!</h3>
          <p>A payment request for <strong>TZS {{amount}}</strong> has been sent to your phone.</p>
          <p>Enter your PIN number on your phone to complete your purchase.</p>
      </div>

      <div class="text-center mt-30">
        <img style="max-height: 180px;" :src="banner" alt="">
      </div>

      <button
        @click="resendRequest"
        :disabled="!buttonEnabled"
        class="primary mt-20">
          Resend request <span v-if="counter">in {{timer}}</span>
      </button>

      <p>
        <small>Do not refresh or close this page!</small>
      </p>
    </div>
</template>

<script>
import Brand from './Brand'
import banner from '@/assets/images/smartphone.png'
import numeral from 'numeral'
import moment from 'moment'

export default {
  components: {
    Brand
  },

  data() {
    return {
      banner,
      data: {},
      counter: 0
    }
  },

  created(){
    this.fetch(this.$route.params.id)
  },

  computed: {
    amount() {
      return this.data && this.data.amount ? numeral(this.data.amount).format('0, 0') : ''
    },

    timer() {
      return moment(this.counter).format('mm:ss')
    },

    buttonEnabled() {
      return this.data && this.data.status === 'ON_PROGRESS' ||
        this.data.status === 'FAILED'
    }
  },

  methods: {
    startCounter() {
      if(!this.data || !this.data.requestSentOn) {
        this.counter = 0
        return
      }
      const endTime = new Date(this.data.requestSentOn).getTime() + 150 * 1000 // 2 mins 30 secs
      this.startPollingTimer()
      this.counterTimer = setInterval(() => {
        const now = new Date()
        const interval = endTime - now
        if(interval <= 0) {
          this.counter = 0
          window.clearInterval(this.counterTimer)
          this.counterTimer = null
        } else {
          this.counter = interval
        }
      }, 1000);
    },
    
    startPollingTimer(){
      this.pollingTimer = setInterval(() => {
        this.$http.get('/payment-session/' + this.data.id)
          .then(response => {
            const data = response.data
            if(data.status !== 'REQUEST_PENDING') {
              window.clearInterval(this.counterTimer)
              window.clearInterval(this.pollingTimer)
              this.counter = 0
            }
            if(data.status === 'COMPLETED') {
              this.$router.replace('/complete/' + this.data.id)
            } else if(data.status === 'FAILED') {
              window.alert('No payment confirmed was received! \n click "Resend Request to retry."')
            }
          })
          .catch(console.error) // eslint-disable-line no-console
      }, 5000);
    },

    resendRequest() {
      this.$http.post(`/payment-session/${this.data.id}/send-request`)
        .then(response => {
          this.data = response.data
          this.startCounter()
        })
        .catch(console.error) // eslint-disable-line no-console
    },

    fetch(id) {
      this.$http.get('/payment-session/' + id)
        .then(response => {
          this.data = response.data
          if(this.data.status === 'REQUEST_PENDING') { 
            this.startCounter()
          }
        })
        .catch(console.error) // eslint-disable-line no-console
    }
  }
}
</script>
