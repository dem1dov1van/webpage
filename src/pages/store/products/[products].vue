<template>
  <div v-if="isSuccess" class="mx-auto max-w-7xl p-4 lg:px-8">
    <div v-if="data" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-8 mt-6">
        <div class="grid gap-4">
            <div>
              <client-only>
                <a
                  :href="getImageSrc(firstImage)"
                  data-fancybox="gallery"
                  data-caption="Caption #1"
                >
                  <img
                    class="h-auto max-h-[400px] sm:max-h-none max-w-full rounded-lg"
                    :src="getImageSrc(firstImage)"
                    alt=""
                  >
                </a>
              </client-only>
            </div>
            <div v-if="images.length > 1" class="grid grid-cols-5 gap-4">
              <client-only>
                <div
                    v-for="(url, i) in [...images,]"
                    :key="i"
                >
                    <a
                        :href="getImageSrc(url)"
                        data-fancybox="gallery"
                        data-caption="Caption #1"
                        class="min-h-[100%] block"
                    >
                        <img
                            class="min-h-[100%] w-full object-cover object-center block rounded-lg"
                            :src="getImageSrc(url)"
                            alt=""
                        >
                    </a>
                </div>
              </client-only>
            </div>
        </div>

        <div class="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
            <dl class="-my-3 divide-y divide-gray-100 text-sm">
                <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt class="font-medium text-gray-900">productId</dt>
                <dd class="text-gray-700 sm:col-span-2" v-html="productId"></dd>
                </div>

                <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt class="font-medium text-gray-900">Название</dt>
                <dd class="text-gray-700 sm:col-span-2" v-html="title"></dd>
                </div>

                <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt class="font-medium text-gray-900">Состояние</dt>
                  <dd class="text-gray-700 sm:col-span-2" v-html="description"></dd>
                </div>

                <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt class="font-medium text-gray-900">Габариты</dt>
                  <dd class="text-gray-700 sm:col-span-2" v-html="dimensions"></dd>
                </div>

                <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt class="font-medium text-gray-900">Износ</dt>
                  <dd class="text-gray-700 sm:col-span-2" v-html="percentageOfWear"></dd>
                </div>

                <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt class="font-medium text-gray-900">Цена</dt>
                <dd class="text-gray-700 sm:col-span-2"><span v-html="price"></span> ₽</dd>
                </div>

                <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt class="font-medium text-gray-900">Цена со скидкой</dt>
                  <dd class="text-gray-700 sm:col-span-2"><span v-html="`${priceWithDiscount}  ₽`"></span></dd>
                </div>

            </dl>
        </div>
    </div>

    <span class="flex items-center my-10">
        <span class="h-px flex-1 bg-black"></span>
        <span class="shrink-0 px-6">S Store</span>
        <span class="h-px flex-1 bg-black"></span>
    </span>

    <section v-if="statusIsParticipant === 'success'">
        <div v-if="!isParticipant" class="w-full bg-white rounded-lg p-2">

          <h3 class="font-bold">Участники:</h3>

          <p class="mb-4">
            Нажимая кнопку вы подтверждаете свое согласие с <nuxt-link class="font-semibold text-indigo-600 hover:text-indigo-500" to="/store/rules"> правилами</nuxt-link>
          </p>

          <div>
            <button @click="onClickHandler" type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Участвовать (12)
            </button>

            <p class="text-red-500" v-if="errorText">
              {{ errorText }}
            </p>
          </div>

        </div>
        <div v-else class="w-full bg-white rounded-lg p-2">
          <p>Вы и еще 12 человек хотят этот предмет</p>
        </div>
    </section>
    <section v-else-if="statusIsParticipant === 'error'">
      <span>Произошла ошибка загрузки с сервера 😞 </span>
    </section>
    <section v-else>
      <loader></loader>
    </section>
  </div>
  <div
    v-else
    class="mx-auto max-w-7xl p-4 lg:px-8"
  >
    loading...
  </div>
</template>

<script setup lang="ts">
import {API_BASE} from "~/helpers/constants";
import {useAccount} from "~/store/account";
import {da} from "cronstrue/dist/i18n/locales/da";
import Loader from "~/components/Loader.vue";

type TProduct = {
  collectionId: string
  collectionName: string
  created: string
  description: string
  dimensions: string
  id: string
  imageLink: string
  images: string[]
  percentageOfWear: number
  price: number
  priceWithDiscount: number
  title: string
  updated: string
}

type TError = {
  "code": number,
  "message": string,
  "data": Object
}


const route = useRoute()
const productId = route.params.products as string

const { data, status, error, refresh } = await useFetch<TProduct, TError>(`${API_BASE}/api/collections/products/records/${productId}`)


const isPending = computed(()=> status.value === 'pending')
const isSuccess = computed(()=> status.value === 'success')

const title = computed(() => data.value?.title)
const description = computed(() => data.value?.description)
const price = computed(() => data.value?.price)
const priceWithDiscount = computed(() => data.value?.priceWithDiscount)
const imageLink = computed(() => data.value?.imageLink)
const dimensions = computed(() => data.value?.dimensions)
const percentageOfWear = computed(() => data.value?.percentageOfWear)
const images = computed(() => data.value?.images)
const firstImage = computed(() => images.value?.[0])

const {userModel} = storeToRefs(useAccount())

const get8FirstSymbols = (str: string) => str.slice(0, 8)
const get7LastSymbols = (str: string) => str.slice(8, 15)

const getRequesId = () => `${get8FirstSymbols(userModel.value.id)}${get7LastSymbols(productId)}`

const errorText = ref('')

const serverMessageToText = {
  'Failed to create record.': 'Заявка не отправлена'
}

const makeRequest = async () => {
  if (userModel.value && userModel.value.id) {
    const {data, status} = await useFetch<TProduct, TError>(`${API_BASE}/api/collections/requests/records/${getRequesId()}`)

    isParticipant.value = !!data.value
    statusIsParticipant.value = status.value
  }
}

makeRequest()

const isParticipant = ref(false)
const statusIsParticipant = ref('pending')
watch(() => userModel.value, makeRequest)


const onClickHandler = () => {
  if (isParticipant.value) return

  $fetch(`${API_BASE}/api/collections/requests/records`, {
    method: 'POST',
    body: {
      id: getRequesId(),
      userId: userModel.value.id,
      productId
    }
  }).then(() => {
    isParticipant.value = true
  }).catch(err => {
    //@ts-ignore
    errorText.value = serverMessageToText[err.data.message] ?? 'Ошибка сервера'
    console.log('err', err)
  })
}


const getImageSrc = (name: string) => `http://api.dem1dov1van.ru/api/files/products/${productId}/${name}`

</script>
