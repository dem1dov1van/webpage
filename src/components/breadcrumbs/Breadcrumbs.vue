<template>
  <Container>
    <nav class="flex " aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1">
        <li
            v-for="(item, i) in items"
            class="inline-flex items-center"
            :key="i"
        >
          <span class="mx-1 text-gray-600 text-xs">/</span>
          <nuxt-link
              v-if="i < items.length - 1"
              :to="item.to"
              class="ml-1 inline-flex text-xs text-gray-600 hover:underline cursor-pointer font-light"
          >
            {{ item.label }}
          </nuxt-link>
          <span v-if="i > items.length - 1" class="mx-1 text-gray-600 text-xs">/</span>
          <span
              v-if="i === items.length - 1"
              class="ml-1 text-xs text-gray-600 font-light"
          >
            {{ item.label }}
          </span>
        </li>
      </ol>
    </nav>
  </Container>
</template>

<script lang="ts" setup>
defineProps<{
  items: {
    label: string
    to?: string
  }[]
}>()
</script>