<script setup lang="ts">
import {API_BASE} from "~/helpers/constants";
import {useAccount} from "~/store/account";
const {userModel} = storeToRefs(useAccount())
const {pb} = useAccount()

const statusRequest = ref('pending')
const response = ref(null)

const props = withDefaults(defineProps<{
  productId: string,
  withBrackets?: boolean,
  minusOne?: boolean,
  text?: boolean
}>(),{
  withBrackets: false,
  minusOne: false,
  text: false
})

const tryMakeRequest = async () => {
  if (userModel.value && userModel.value.id) {

    const {data, status} = await useFetch(`${API_BASE}/api/collections/requests/records/?filter=productId="${props.productId}"`)
    //@ts-ignore
    response.value = data.value?.items.length || 0

    statusRequest.value = status.value
  }
}

const isSuccess = computed(() => statusRequest.value === 'success')

tryMakeRequest()
const textResult = computed(() => `Всего участников: ${response.value}`)

</script>

<template>
  <template v-if="isSuccess">
    <span v-if="text">
      {{ textResult }}
    </span>

    <span v-else-if="response">
      <span v-if="withBrackets">(</span>
        {{ response }}
      <span v-if="withBrackets">)</span>
    </span>
  </template>
</template>

<style scoped lang="css">

</style>