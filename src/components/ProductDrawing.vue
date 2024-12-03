<script setup lang="ts">
  import Loader from "~/components/Loader.vue";
  import {API_BASE} from "~/helpers/constants";
  import {useAccount} from "~/store/account";
  import DrawingCount from "~/components/DrawingCount.vue";
  import DrawingAdmin from "~/components/DrawingAdmin.vue";
  import type {TProduct} from "~/types";

  const props = defineProps<{
    winner: string | null,
    product: TProduct
  }>()

  const {userModel} = storeToRefs(useAccount())
  const route = useRoute()

  const isParticipant = ref(false)
  const productId = route.params.products as string
  const requestId = computed(() => `${get8FirstSymbols(userModel.value.id)}${get7LastSymbols(productId)}`)
  const errorText = ref('')
  const isOpenSuccessModal = ref(false)
  const statusIsParticipant = ref('pending')

  const serverMessageToText = {
    'Failed to create record.': 'Заявка не отправлена'
  }

  const { data, refresh, status } = useAsyncData('fetchData', async () => {
    if (userModel.value) {
      return $fetch(`${API_BASE}/api/collections/requests/records/${requestId.value}`).finally(() => {
        statusIsParticipant.value = 'success'
      })
    }
  }, {
    watch: [userModel]
  })

  onMounted(() => {
    if (statusIsParticipant.value !== 'success') {
      refresh()
    }
  })

  watch(data, () => isParticipant.value = !!data.value)

  const onClickHandler = () => {
    if (isParticipant.value) return

    $fetch(`${API_BASE}/api/collections/requests/records`, {
      method: 'POST',
      body: {
        id: requestId.value,
        userId: userModel.value.id,
        productId
      }
    }).then(() => {
      isParticipant.value = true
      isOpenSuccessModal.value = true
    }).catch(err => {
      //@ts-ignore
      errorText.value = serverMessageToText[err.data.message] ?? 'Ошибка сервера'
      console.log('err', err)
    })
  }
  const get8FirstSymbols = (str: string) => str.slice(0, 8)
  const get7LastSymbols = (str: string) => str.slice(8, 15)
  const toggleSuccessModalHandler = (boo: boolean) => {
    isOpenSuccessModal.value = boo
  }

</script>

<template>
  <section v-if="statusIsParticipant === 'success'">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-8 mt-6">
      <div v-if="product.winner === userModel.id" class="grid gap-4">
        Ура, фортуна на твоей стороне <br>
        После оплаты, ты - новый владелец!
      </div>
      <div v-else>
        <div v-if="!isParticipant">
          <div>
            <button
              @click="onClickHandler"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-3"
            >
              Участвовать&nbsp;
              <drawing-count
                :product-id="productId"
                with-brackets
              ></drawing-count>
            </button>

            <p class="text-red-500 mb-2" v-if="errorText">
              {{ errorText }}
            </p>

            <p class="mb-2">
              Нажимая кнопку вы подтверждаете свое согласие с <nuxt-link class="font-semibold text-indigo-600 hover:text-indigo-500" to="/store/rules"> правилами</nuxt-link>
            </p>
          </div>
        </div>

        <div v-else class="w-full bg-white rounded-lg p-2">
          <p>Твое участие зарегистрированно!</p>
          <p><drawing-count :product-id="productId" text></drawing-count></p>
        </div>
      </div>

      <drawing-admin
        :product
      ></drawing-admin>
    </div>
  </section>

  <section v-else>
    <loader></loader>
  </section>

  <modal
      :open="isOpenSuccessModal"
      status="success"
      @toggle="toggleSuccessModalHandler"
      title="Успех! Ты подтвердил участие!"
      btn2="Ок"
  >
    <template #text>
      <p class="text-sm text-gray-500">
        Этот товар появится у тебя на странице <nuxt-link
          to='/store/products/my-products/'
          class="font-semibold text-indigo-600 hover:text-indigo-500"
      >
        мои товары
      </nuxt-link>
      </p>
    </template>
  </modal>
</template>

<style scoped lang="css">

</style>