<script setup lang="ts">
import Breadcrumbs from "~/components/breadcrumbs/Breadcrumbs.vue"
import Filter from "~/components/Filter.vue"
import {useProducts} from "~/store/products";
import {API_BASE} from "~/helpers/constants";

const {products, isRequesting} = storeToRefs(useProducts())

const fetchProducts = computed(() => products.value?.filter(item => !item.winner).map((item) => {
  const obj = {
    id: item.id,
    title: item.title,
    imageSrc: `${API_BASE}/api/files/${item.collectionName}/${item.id}/${item.images[0]}`,
    price: item.priceWithDiscount,
    category: item.category
  }

  return obj
}))

const breadcrumbs = [
  {
    label: 'Все товары'
  }
]

useSeoMeta({
  title: "Все товары | Garagesale",
  description: "Выбирайте понравившийся товар и добавляйте в корзину",

  ogTitle: "Все товары | Garagesale",
  ogDescription: "Выбирайте понравившийся товар и добавляйте в корзину",
});

const changeFilter = (val) => {
  activeFilters.value = val
}

const activeFilters = ref([])

const filteredProducts = computed(() => {
  if (activeFilters.value.length === 0) {
    return fetchProducts.value
  }
  
  return fetchProducts.value.filter(product => activeFilters.value.includes(product.category))
})
</script>

<template>
  <div>
    <Breadcrumbs :items="breadcrumbs"></Breadcrumbs>
    <div
      v-if="isRequesting"
      class="flex items-center justify-center min-h-[100vh] min-w-[100vw]"
    >
      <loader></loader>
    </div>

    <products-card-grid
      v-else
      class="mt-4"
    >
    <template #filter>
      <Filter @changeFilter="changeFilter"></Filter>
    </template>

      <product-card
        v-for="item in filteredProducts"
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