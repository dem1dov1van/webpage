<script setup lang="ts">
  import Loader from "~/components/Loader.vue";
  import {useAccount} from "~/store/account";
  import DrawingCount from "~/components/DrawingCount.vue";
  import DrawingAdmin from "~/components/DrawingAdmin.vue";
  import type {TProduct} from "~/types";

  const props = defineProps<{
    product: TProduct
  }>()

  const {userModel, isAgree} = storeToRefs(useAccount())
  const {pb} = useAccount()
  const route = useRoute()

  const isParticipant = ref(false)
  const productId = route.query.id as string
  const requestId = computed(() => `${get8FirstSymbols(userModel.value.id)}${get7LastSymbols(productId)}`)
  const errorText = ref('')
  const isOpenSuccessModal = ref(false)

  const serverMessageToText = {
    'Failed to create record.': 'Заявка не отправлена',
    'Value must be unique.': 'Заявка не отправлена',
    "The requested resource wasn't found.": 'Заявка не была удалена'
  }

  const { data, refresh, status } = useAsyncData('fetchData', async () => {
    const res = await pb.collection('requests').getOne(requestId.value)
    return res
  }, {
    watch: [userModel]
  })


  onMounted(() => {
    if (status.value !== 'success') {
      refresh()
    }
  })

  watch(data, () => isParticipant.value = !!data.value)

  const onClickHandler = async () => {
    if (isParticipant.value) return;

    // const record = await pb.collection('requests').create({
    //   id: requestId.value,
    //   userId: userModel.value.id,
    //   productId
    // });
    const data = {
      id: requestId.value,
      userId: userModel.value.id,
      productId
    }

    try {
      await pb.collection('requests').create(data);
      isParticipant.value = true
      isOpenSuccessModal.value = true
    } catch(e) {
      errorText.value = serverMessageToText[e?.data.message] ?? 'Ошибка сервера'
      console.error('err', e)
    }
  }
  const get8FirstSymbols = (str: string) => str.slice(0, 8)
  const get7LastSymbols = (str: string) => str.slice(8, 15)
  const toggleSuccessModalHandler = (boo: boolean) => {
    isOpenSuccessModal.value = boo
  }

  const onDeleteClickHandler = async () => {
    try {
      await pb.collection('requests').delete(requestId.value);
      // window.location.reload();
      refreshNuxtData()
    } catch (e) {
      errorText.value = serverMessageToText[e?.data.message] ?? 'Ошибка сервера'
      console.error(errorText.value)
    }
  }
</script>

<template>
  <div>
    <section v-if="status !== 'pending'">
      <div class="grid grid-cols-1 gap-4 lg:gap-8">
        <div v-if="!product.winner">
          
          <div class="p-3">
            <div v-if="!isParticipant">
              <div>
                <button
                  @click="onClickHandler"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Участвовать&nbsp;
                  <drawing-count
                    :product-id="productId"
                    with-brackets
                  ></drawing-count>
                </button>

                <p class="text-red-500 mt-3" v-if="errorText">
                  {{ errorText }}
                </p>

    <!--            <p class="mb-2">-->
    <!--              Нажимая кнопку вы подтверждаете свое согласие с <nuxt-link class="font-semibold text-indigo-600 hover:text-indigo-500" to="/store/rules"> правилами</nuxt-link>-->
    <!--            </p>-->
              </div>
            </div>

            <div v-else class="w-full bg-white rounded-lg p-2">
              <p>Твое участие зарегистрированно!</p>
              <p><drawing-count :product-id="productId" text></drawing-count></p>
              <button
                @click="onDeleteClickHandler"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-75 disabled:hover:bg-indigo-600 disabled:cursor-not-allowed mt-2"
              >
                Отказаться от участия
              </button>
              <p class="text-red-500 mt-1" v-if="errorText">
                {{ errorText }}
              </p>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="product.winner === userModel.id" class="grid gap-4 p-3">
            Ура, фортуна на твоей стороне <br>
            После оплаты, ты &mdash; новый владелец!
          </div>

          <div v-else class="grid gap-4 p-3">
            Этот товар уже ждет своего победителя
          </div>
        </div>
      </div>

      <drawing-admin :product="product"></drawing-admin>
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
  </div>
</template>

<style scoped lang="css">

</style>