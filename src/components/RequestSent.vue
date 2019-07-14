<template>
  <div class="content">
      <brand/>
      <div class="mt-40">
          <h3>Check your phone!</h3>
          <p>A payment request for <strong>TZS 7,500</strong> has been sent to your phone.</p>
          <p>Enter your PIN number on your phone to complete your purchase.</p>
      </div>

      <div class="text-center mt-30">
        <img style="max-height: 180px;" :src="banner" alt="">
      </div>

      <button disabled class="primary mt-20">Resend request 02:45</button>

      <p>
        <small>Do not refresh or close this page!</small>
      </p>
    </div>
</template>

<script>
import Brand from './Brand'
import banner from '@/assets/images/smartphone.png'

export default {
  components: {
    Brand
  },

  data() {
    return {
      banner
    }
  }
}
</script>
