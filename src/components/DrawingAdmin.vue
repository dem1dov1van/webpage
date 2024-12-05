<script setup lang="ts">
import {API_BASE} from "~/helpers/constants";
import type {TProduct} from "~/types";
import {useAccount} from "~/store/account";

const props = withDefaults(defineProps<{
  product: TProduct
}>(),{

})

type TRequest = {
  userId: string,
}

const randomRequest = ref<TRequest | null>(null)
const randomPersonId = computed(() => randomRequest.value?.userId)
const winnerEmail = ref<null | string>(null)

onMounted(() => {
  if (props.product.winner) {
    randomRequest.value = {userId: props.product.winner}
  }
})

const onChooseWinnerHandler = async () => {
  $fetch(`${API_BASE}/api/collections/requests/records/?filter=productId="${props.product.id}"`)
    .then((res) => randomRequest.value = getRandomElement(res?.items || []))
    .catch(e => console.error(e, 'error when fetch all requests'))
  }

watch(randomRequest, () => {
  $fetch<{email: string}>(`${API_BASE}/api/collections/users/records/${randomPersonId.value}`)
    .then((res) => winnerEmail.value = res?.email)
    .then(registerWinner)
    .catch(e => console.error(e, 'error when fetch user by id'))
})

const registerWinner = () => {
  $fetch(`${API_BASE}/api/collections/products/records/${props.product.id}`, {
    method: "patch",
    body: {
      title: props.product.title,
      winner: randomPersonId.value
    }
  }).catch(e => console.error(e, 'error when patch product'))
}

function getRandomElement(arr: any[]) {
  if (arr.length === 0) {
    alert('Список участников пуст')
    return null;
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const {userModel} = storeToRefs(useAccount())

const isAdmin = computed(() => userModel.value?.isAdmin || false)
</script>

<template>
  <div v-if="isAdmin" class="flow-root p-3">

    <h2 class="text-xl mb-4">Эту часть видят только админы:</h2>

    <template v-if="!product.winner">
      <p class="mb-2">
        Нажимая кнопку вы получите рандомного участника, что выбрал этот товар:
      </p>

      <button
        @click="onChooseWinnerHandler"
        :disabled="winnerEmail"
        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-75 disabled:hover:bg-indigo-600 disabled:cursor-not-allowed"
      >
        Выбрать победителя
      </button>
    </template>

    <p
      v-if="winnerEmail"
      class="mt-2"
    >
      Победитель: {{winnerEmail}}
    </p>
  </div>
</template>

<style scoped lang="css">

</style>