import { defineStore } from "pinia"
import PocketBase from "pocketbase";

export const useProducts = defineStore("products",    () => {

  const pb = new PocketBase('http://api.dem1dov1van.ru')

  const products = ref([])

  const isRequesting = ref(true)
  const isError = ref(false)
  const fetchProducts = () => {
    console.log('fetch is go')
    pb.collection('products').getFullList({
      sort: '-created',
    }).then((res) => {
      console.log(res, 'res from store')
      products.value = res
      isRequesting.value = false
    }).catch(e => {
      console.error(e)
      isError.value = true
    })
  }
  fetchProducts()


  return {
    fetchProducts,
    isRequesting,
    products,
    isError
  }

})

