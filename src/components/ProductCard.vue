<script setup lang="ts">
import {NuxtLink} from "#components"
import {priceFormatter} from "../helpers";

defineProps<{
  id: string
  title: string
  imageSrc: string
  price: string,
  status?: 'win' | 'lose' | undefined
  isWin?: boolean,
  isLose?: boolean
  isShowStatus?: boolean,
  isFakeLink?: boolean
}>()
</script>

<template>
  <component
    :is="isFakeLink ? 'div' : NuxtLink"
    :to="isFakeLink ? null :`/store/products/product?id=${id}`"
    class="group flex flex-col min-h-[100%] relative"
  >
    <div class="flex-1 aspect-h-1.5 aspect-w-1 max-h-[500px] w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 xl:max-h-[300px]">
      <img
        :src="imageSrc"
        :alt="title"
        loading="lazy"
        class="h-full w-full object-cover min-h-[100px] object-center"
        :class="isFakeLink ? '' : '[@media(any-hover:hover){&:hover}]:group-hover:opacity-75'"
      />
    </div>
    <h3 class="mt-4 text-sm text-gray-700" v-html="title"></h3>
    <p class="mt-1 text-lg font-medium text-gray-900">
      {{ priceFormatter(price) }}
    </p>
    <div v-if="status === 'win'" class="inline-flex items-center justify-between space-x-1 bg-green-100 text-green-800 px-2 py-0.5 rounded-md text-sm absolute top-2 left-2">
      <div class="select-none">
        Это теперь твое)
      </div>
    </div>
    <div v-if="!status && isShowStatus" class="inline-flex items-center justify-between space-x-1 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md text-sm absolute top-2 left-2">
      <div class="select-none">
        Пока не розыграно
      </div>
    </div>
    <div v-if="status === 'lose' && isShowStatus" class="inline-flex items-center justify-between space-x-1 bg-red-100 text-red-800 px-2 py-0.5 rounded-md text-sm absolute top-2 left-2">
      <div class="select-none">
        Уже нашел своего владельца
      </div>
    </div>
  </component>
</template>

<style scoped lang="css">

</style>