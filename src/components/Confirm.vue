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
        <div class="text-large">+255 713 809050</div>
      </div>
      <div class="card-separator"></div>
      <div class="card-body text-right">
        <small>Amount</small>
        <div class="text-large">7,500</div>
      </div>
    </div>

    <button @click="sendRequest" class="primary">Confirm</button>

    <p>
      <small>Or <a href="#">change payment details</a></small>
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
    sendRequest() {
      this.$router.push('/send-request')
    }
  }
}
</script>
