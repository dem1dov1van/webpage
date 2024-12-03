<template>
  <div>
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
        :price="item.price"
        :imageSrc="getImageSrc(item.images[0], item.id)"
        :is-win="item.winner === userModel.id"
      ></product-card>
    </products-card-grid>

    <my-products-empty-state v-else></my-products-empty-state>
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

const getImageSrc = (name: string, id: string) => `${API_BASE}/api/files/products/${id}/${name}`

const tryMakeRequest = async () => {
  if (userModel.value && userModel.value.id) {

    const {data, status} = await useFetch(`${API_BASE}/api/collections/requests/records/?filter=userId="${userModel.value.id}"`)
    response.value = data.value?.items

    statusRequest.value = status.value
  }
}

tryMakeRequest()


// const requestAllProducts = () => {
//   if (response.value && Array.isArray(response.value)) {
//     response.value.forEach(item => {
//       fetchProduct(item.productId)
//     })
//   }
// }

watch(() => userModel.value, tryMakeRequest)

// onMounted(() => fetchProduct())

// const fetchProduct = (id: string) => {
//   fetch(`${API_BASE}/api/collections/products/records/${id}`).then((res) => {
//     if (res.ok) return res.json()
//     else throw new Error('res is not ok(')
//   }).then(res => {
//     console.log(res)
//     addedProducts.push(res)
//   }).catch(e => console.log(e, 'err'))
// }

// watch(response, requestAllProducts)
</script>