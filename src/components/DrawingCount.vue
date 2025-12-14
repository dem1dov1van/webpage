<script setup lang="ts">
import {useAccount} from "~/store/account";
const {userModel} = storeToRefs(useAccount())
const {pb} = useAccount()

const statusRequest = ref('pending')
const response = ref(0)

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

    statusRequest.value = 'loading'
    try {
      const records = await pb.collection('requests').getFullList({
        filter: `productId = "${props.productId}"`,
      });

      response.value = records?.length || 0
      statusRequest.value = 'success'
    } catch {
      statusRequest.value = 'error'
    }
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