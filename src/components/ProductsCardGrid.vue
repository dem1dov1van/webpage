<template>
  <div class="bg-white">
    <Container>
      <h2 class="sr-only">Products</h2>

      <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <slot></slot>
      </div>
    </Container>
  </div>
</template>
<script setup lang="ts">
</script>