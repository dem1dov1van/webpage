<template>
  <div>
    <div
        v-if="statusRequest === 'pending'"
        class="flex items-center justify-center min-h-[100vh] min-w-[100vw]"
    >
      <loader></loader>
    </div>

    <products-card-grid v-else-if="false">
      <product-card
          v-for="item in addedProducts"
          :id="item.id"
          :key="item.id"
          :title="item.title"
          :price="item.price"
          :imageSrc="getImageSrc(item.images[0], item.id)"
      ></product-card>
    </products-card-grid>

    <my-products-empty-state v-else></my-products-empty-state>
  </div>
</template>


<script setup lang="ts">
import {API_BASE} from "~/helpers/constants";
import {useAccount} from "~/store/account";
const {userModel} = storeToRefs(useAccount())
const {pb} = useAccount()

const statusRequest = ref('pending')
const response = ref(null)

const addedProducts = reactive([])

const getImageSrc = (name: string, id: string) => `http://api.dem1dov1van.ru/api/files/products/${id}/${name}`

const tryMakeRequest = async () => {
  if (userModel.value && userModel.value.id) {

    const {data, status} = await useFetch(`${API_BASE}/api/collections/requests/records/?filter=userId="${userModel.value.id}"`)
    response.value = data.value?.items

    statusRequest.value = status.value
  }
}

tryMakeRequest()


const requestAllProducts = () => {
  if (response.value && Array.isArray(response.value)) {
    response.value.forEach(item => {
      fetchProduct(item.productId)
    })
  }
}

watch(() => userModel.value, tryMakeRequest)

// onMounted(() => fetchProduct())

const fetchProduct = (id: string) => {
  fetch(`${API_BASE}/api/collections/products/records/${id}`).then((res) => {
    if (res.ok) return res.json()
    else throw new Error('res is not ok(')
  }).then(res => {
    console.log(res)
    addedProducts.push(res)
  }).catch(e => console.log(e, 'err'))
}

watch(response, requestAllProducts)
</script>