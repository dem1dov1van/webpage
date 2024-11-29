import { defineStore } from "pinia"
import PocketBase from "pocketbase";
import {API_BASE} from "~/helpers/constants";

export const useProducts = defineStore("products",    () => {

  const pb = new PocketBase(API_BASE)

  const products = ref([])

  const isRequesting = ref(true)
  const isError = ref(false)
  const fetchProducts = () => {
    console.log('fetch is go')
    pb.collection('products').getFullList({
      sort: '-created',
    }).then((res) => {
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

