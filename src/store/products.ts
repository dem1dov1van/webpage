import { defineStore } from "pinia"
import PocketBase from "pocketbase";
import {API_BASE} from "~/helpers/constants";

export const useProducts = defineStore("products",    () => {

  const pb = new PocketBase(API_BASE)

  const products = ref<any[]>([])

  const isRequesting = ref(true)
  const isError = ref(false)
  const fetchProducts = () => {
    pb.collection('products').getFullList().then((res) => {
      products.value = res
      isRequesting.value = false
    }).catch(e => {
      console.error(e)
      isError.value = true
      isRequesting.value = false
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

