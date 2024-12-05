<script setup lang="ts">
import {priceFormatter} from "../helpers";

defineProps<{
  id: string
  title: string
  imageSrc: string
  price: string,
  isWin?: boolean,
  isShowStatus?: boolean
}>()
</script>

<template>
  <nuxt-link
    :to="`/store/products/${id}`"
    class="group flex flex-col min-h-[100%] relative"
  >
    <div class="flex-1 aspect-h-1.5 aspect-w-1 max-h-[500px] w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 xl:max-h-[300px]">
      <img
        :src="imageSrc"
        :alt="title"
        class="h-full w-full object-cover min-h-[100px] object-center [@media(any-hover:hover){&:hover}]:group-hover:opacity-75"
      />
    </div>
    <h3 class="mt-4 text-sm text-gray-700" v-html="title"></h3>
    <p class="mt-1 text-lg font-medium text-gray-900">
      {{ priceFormatter(price) }}
    </p>
    <div v-if="isWin" class="inline-flex items-center justify-between space-x-1 bg-green-100 text-green-800 px-2 py-0.5 rounded-md text-sm absolute top-2 left-2">
      <div class="select-none">
        Это теперь твое)
      </div>
    </div>
    <div v-if="!isWin && isShowStatus" class="inline-flex items-center justify-between space-x-1 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md text-sm absolute top-2 left-2">
      <div class="select-none">
        Пока не розыграно
      </div>
    </div>
  </nuxt-link>
</template>

<style scoped lang="css">

</style>