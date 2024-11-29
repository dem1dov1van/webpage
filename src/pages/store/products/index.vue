<script setup lang="ts">
import {useProducts} from "~/store/products";

const products1 = [
  {
    id: 1,
    title: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    title: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    title: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    title: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  }
]

const {products, isRequesting} = storeToRefs(useProducts())

const fetchProducts = computed(() => products.value?.map((item) => {
  const obj = {
    id: item.id,
    title: item.title,
    imageSrc: `http://api.dem1dov1van.ru/api/files/${item.collectionName}/${item.id}/${item.images[0]}`,
    price: item.price
  }

  return obj
}))
const fetchProducts1 = computed(() => products.value?.map((item) => {
  const obj = {
    id: item.id,
    title: item.title,
    imageSrc: `http://api.dem1dov1van.ru/api/files/${item.collectionName}/${item.id}/${item.images[1]}`,
    price: item.price
  }

  return obj
}))
const fetchProducts2 = computed(() => products.value?.map((item) => {
  const obj = {
    id: item.id,
    title: item.title,
    imageSrc: `http://api.dem1dov1van.ru/api/files/${item.collectionName}/${item.id}/${item.images[2]}`,
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
      <product-card
          v-for="item in fetchProducts1"
          :id="item.id"
          :key="item.id"
          :title="item.title"
          :price="item.price"
          :imageSrc="item.imageSrc"
      ></product-card>
      <product-card
          v-for="item in fetchProducts2"
          :id="item.id"
          :key="item.id"
          :title="item.title"
          :price="item.price"
          :imageSrc="item.imageSrc"
      ></product-card>
      <product-card
          v-for="item in products1"
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