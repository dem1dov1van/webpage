<template>
  <div>
    <label
      :for="id"
      class="block text-sm/6 font-medium text-gray-900"
      v-html="label"
    ></label>
    <div class="mt-2">
      <input
          v-model="model"
          :id
          name="email"
          :type
          :autocomplete="type"
          :required
          class="
            block w-full rounded-md py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:shadow-focus focus:ring-indigo-600 sm:text-sm/6 px-2 outline-none
"
          :class="{
            'border-red-600 ring-red-600 text-red-600 focus:ring-red-300 shadow-[0]': error
          }"
      >
      <span
          class="text-red-500 text-xs italic"
          v-if="error"
          v-html="error"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
const id = useId()
const model = defineModel<string>({required: true})

const props = withDefaults(
    defineProps<{
      label?: string
      error?: string
      type: string,
      disabled?: boolean
      placeholder?: string
    }>(),
    {
      type: 'email',
      label: "",
      error: "",
      disabled: false,
    },
)
</script>