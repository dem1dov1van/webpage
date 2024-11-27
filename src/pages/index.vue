<template>
  <div class="container">
    <div class="qr-wrap">
      <Qr />
    </div>
    <a href="https://t.me/demIdovIvan" class="link"></a>
  </div>
</template>

<script setup>
import Qr from '~/assets/icons/qr.svg?skipsvgo'

definePageMeta({
  layout: 'empty'
})
</script>

<style lang="css" scoped>

.container {
  min-height: 100vh;
  min-width: 100vw;
  max-height: 100vh;
  max-width: 100vw;
  background-color: #fff8ee;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-wrap {
  width: 250px;
  color: #E27D60;
}

.link {
  cursor: pointer;
}

.link:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

</style>