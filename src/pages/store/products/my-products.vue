<template>
  <div>
  <Breadcrumbs :items="breadcrumbs"></Breadcrumbs>

  <div class="mt-4">
    <div
      v-if="statusRequest === 'pending' && isRequesting"
      class="flex items-center justify-center min-h-[100vh] min-w-[100vw]"
    >
      <loader></loader>
    </div>
    <products-card-grid v-else-if="hasAddedProducts">
      <product-card
        v-for="item in addedProducts"
        :id="item.id"
        :key="item.id"
        :title="item.title"
        :price="item.priceWithDiscount"
        :imageSrc="getImageSrc(item.images[0], item.id)"
        :is-win="item.winner === userModel.id"
        :status="getStatus(item.winner)"
        is-show-status
      ></product-card>
    </products-card-grid>
    <my-products-empty-state v-else></my-products-empty-state>
  </div>
  </div>
</template>


<script setup lang="ts">
import {API_BASE} from "~/helpers/constants";
import {useAccount} from "~/store/account";
import {useProducts} from "~/store/products";

const {userModel} = storeToRefs(useAccount())
const {pb} = useAccount()
const {products, isRequesting} = storeToRefs(useProducts())

const statusRequest = ref('pending')
const response = ref(null)

const addedProducts = computed(() => products.value.filter(item => response.value?.some(res => res.productId === item.id)))
const hasAddedProducts = computed(() => !!addedProducts.value.length)

const getStatus = (winner: string | undefined) => {
  if (!winner) return undefined
  if (winner === userModel.value.id) return 'win'
  return 'lose'
}

const getImageSrc = (name: string, id: string) => `${API_BASE}/api/files/products/${id}/${name}`

const tryMakeRequest = async () => {
  if (userModel.value && userModel.value.id) {

    const records = await pb.collection('requests').getFullList({
      filter: `userId = '${userModel.value.id}'`
    });

    response.value = records

    statusRequest.value = "success"
  }
}

onMounted(tryMakeRequest)

watch(() => userModel.value, tryMakeRequest)

const breadcrumbs = [
  {
    label: 'Все товары',
    to: '/store/products/'
  },
  {
    label: 'Мои товары'
  }
]

useSeoMeta({
  title: 'Мои товары | Garagesale',
  description: "Выбирайте понравившийся товар и добавляйте в корзину",

  ogTitle: 'Мои товары | Garagesale',
  ogDescription: "Выбирайте понравившийся товар и добавляйте в корзину",
});
</script>