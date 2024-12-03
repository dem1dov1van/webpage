<script setup lang="ts">
const props = defineProps<{
  isOpen?: boolean
  title: string,
  answer?: string
}>()


const isOpen = ref(props?.isOpen || false)
const toggleItem = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div
      @click="toggleItem"
      class="relative my-3 w-full rounded-md border border-gray-300 px-12 py-8 cursor-pointer"
  >
    <div class="max-w-3xl">
      <h2 class="font-bold text-black text-xl"> {{ title }}</h2>
      <template v-if="isOpen">
        <slot name="answer"></slot>

        <p
          v-if="answer"
          class="font-inter mt-4 text-base font-light text-gray-500 cursor-auto"
          v-html="answer"
          @click.stop
        ></p>
      </template>
    </div>
    <span class="absolute right-5 top-9">
      <svg v-if="isOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="white"></circle>
        <path d="M7.04688 11.9999H16.9469" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>

      <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="white"></circle>
        <path d="M7.05078 12H16.9508" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M12 7.05005V16.95" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    </span>
  </div>
</template>

<style scoped lang="css">

</style>