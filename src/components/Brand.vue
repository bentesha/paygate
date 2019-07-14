<template>
  <div class="brand">
      <img :src="logo" alt="">
  </div>
</template>

<script>

import logo from '../assets/images/twendeshule-logo.png'

export default {
  data() {
    return {
      logo
    }
  }
}
</script>
