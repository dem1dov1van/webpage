<script setup lang="ts">
import {useProducts} from "~/store/products";
import {API_BASE} from "~/helpers/constants";

const {products, isRequesting} = storeToRefs(useProducts())

const fetchProducts = computed(() => products.value?.filter(item => !item.winner).map((item) => {
  const obj = {
    id: item.id,
    title: item.title,
    imageSrc: `${API_BASE}/api/files/${item.collectionName}/${item.id}/${item.images[0]}`,
    price: item.price
  }

  return obj
}))
</script>

<template>
  <div>
    <div
      v-if="isRequesting"
      class="flex items-center justify-center min-h-[100vh] min-w-[100vw]"
    >
      <loader></loader>
    </div>
    <products-card-grid v-else>
      <product-card
          v-for="item in fetchProducts"
          :id="item.id"
          :key="item.id"
          :title="item.title"
          :price="item.price"
          :imageSrc="item.imageSrc"
      ></product-card>
    </products-card-grid>
  </div>
</template>

<style scoped lang="css">

</style>