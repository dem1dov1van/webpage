<script setup lang="ts">
defineProps<{
  id: string
  title: string
  imageSrc: string
  price: string,
}>()
</script>

<template>
  <nuxt-link
      :to="`/store/products/${id}`"
      class="group flex flex-col min-h-[100%]"
  >
    <div class="flex-1 aspect-h-1.5 aspect-w-1 max-h-[500px] w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 xl:max-h-[300px]">
      <img :src="imageSrc" alt="image" class="h-full w-full object-cover object-center group-hover:opacity-75" />
    </div>
    <h3 class="mt-4 text-sm text-gray-700" v-html="title"></h3>
    <p class="mt-1 text-lg font-medium text-gray-900" v-html="price"></p>
  </nuxt-link>
</template>

<style scoped lang="css">

</style>