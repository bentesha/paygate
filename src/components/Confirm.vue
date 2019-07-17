<template>
  <div class="content">
    <brand/>
    <div class="mt-40">
        <h3>Confirm Payment Details</h3>
        <p><small>When you click the 'Confirm' button, a payment request will be sent to the phone number below for authorization.</small></p>
    </div>

    <div class="card mt-40">
      <div class="card-body text-right">
        <small>Phone number</small>
        <div class="text-large">{{phoneNumber}}</div>
      </div>
      <div class="card-separator"></div>
      <div class="card-body text-right">
        <small>Amount</small>
        <div class="text-large">{{amount}}</div>
      </div>
    </div>

    <button @click="sendRequest" class="primary">Confirm</button>

    <p v-if="data">
      <small>Or <router-link :to="'/payment/' + data.id">change payment details</router-link></small>
    </p>
  </div>
</template>

<script>
import Brand from './Brand'
import numeral from 'numeral'

export default {
  components: {
    Brand
  },

  data() {
    return {
      data: {}
    }
  },

  computed: {
    phoneNumber() {
      if(this.data && this.data.phoneNumber) {
        return '+255 ' + this.data.phoneNumber.slice(1, 4) + ' ' + this.data.phoneNumber.slice(4)
      } else {
        return ''
      }
    },

    amount() {
      return this.data.amount === null ? '' : numeral(this.data.amount).format('0,0')
    }
  },

  created() {
    this.fetch(this.$route.params.id)
  },

  methods: {
    sendRequest() {
      this.$http.post(`/payment-session/${this.data.id}/send-request`)
        .then(() => {
          this.$router.push('/send-request/' + this.data.id)
        })
        .catch(console.error) // eslint-disable-line no-console
    },

    fetch(id) {
      this.$http.get(`/payment-session/${id}`)
        .then(response => {
          this.data = response.data
        })
        .catch(console.error) // eslint-disable-line no-console
    }
  }
}
</script>
