<template>
  <Breadcrumbs :items="breadcrumbs"></Breadcrumbs>
  <Container>
    <template v-if="isSuccess">
      <div v-if="data" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-8 mt-4">
        <div class="grid gap-4">
          <div>
            <client-only>
              <a
                :href="getImageSrc(firstImage)"
                data-fancybox="gallery"
                :data-caption="data.title"
                class="max-h-[400px] md:max-h-[600px] overflow-hidden flex items-center rounded-lg"
              >
                <img
                  class="h-auto sm:max-h-none max-w-full"
                  :src="getImageSrc(firstImage)"
                  alt=""
                >
              </a>
            </client-only>
          </div>
          <div v-if="images.length > 1" class="grid grid-cols-5 gap-4">
            <client-only>
              <div
                  v-for="(url, i) in [...images]"
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

        <div class="flex flex-col gap-2 lg:gap-4">
          <div class="flow-root rounded-lg border border-gray-100 py-3 shadow-sm flex-1">
            <dl class="-my-3 divide-y divide-gray-100 text-sm">
              <!--                <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">-->
              <!--                <dt class="font-medium text-gray-900">productId</dt>-->
              <!--                <dd class="text-gray-700 sm:col-span-2" v-html="productId"></dd>-->
              <!--                </div>-->

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
                <dt class="font-medium text-gray-900 ">Фото</dt>
                <dd class="text-gray-700 sm:col-span-2">
                  <a
                    :href="imageLink"
                    target="_blank"
                    class="font-semibold text-indigo-600 hover:text-indigo-500 break-all"
                  >
                    {{imageLink}}
                  </a>
                </dd>
              </div>

<!--              <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">-->
<!--                <dt class="font-medium text-gray-900">Цена</dt>-->
<!--                <dd class="text-gray-700 sm:col-span-2">-->
<!--                  <span v-html="priceFormatter(price ?? 0)"></span>-->
<!--                </dd>-->
<!--              </div>-->

              <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt class="font-medium text-gray-900">Цена со скидкой</dt>
                <dd class="text-gray-700 sm:col-span-2">
                  <span v-html="priceFormatter(priceWithDiscount ?? 0)"></span>
                </dd>
              </div>

            </dl>
          </div>
          <div class="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
            <p v-if="isAuth && !isAgree" class="p-3 flex items-center justify-center gap-2">
              Для участия необходимо согласие с <nuxt-link to="/store/rules/" class="font-semibold text-indigo-600 hover:text-indigo-500">правилами</nuxt-link>
              <Attention class="max-w-[25px] max-h-[25px]"></Attention>
            </p>
            <template v-else-if="isAuth">
              <product-drawing
                  v-if="data"
                  :product="data"
              ></product-drawing>
            </template>
            <p v-else class="p-3 flex items-center justify-center gap-2">
              <nuxt-link to="/store/login/" class="font-semibold text-indigo-600 hover:text-indigo-500">Авторизуйтесь</nuxt-link> для участия
              <Attention class="max-w-[25px] max-h-[25px]"></Attention>
            </p>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <loader></loader>
    </template>
  </Container>
</template>

<script setup lang="ts">
import ProductDrawing from "~/components/ProductDrawing.vue";
import Breadcrumbs from "~/components/breadcrumbs/Breadcrumbs.vue"
import Loader from "~/components/Loader.vue";

import Attention from '~/assets/icons/attention.svg?skipsvgo'

import {API_BASE} from "~/helpers/constants";
import type {TProduct} from "~/types";
import {useAccount} from "~/store/account";
import {priceFormatter} from "~/helpers";

type TError = {
  "code": number,
  "message": string,
  "data": Object
}

const {isAuth, isAgree} = storeToRefs(useAccount())

const route = useRoute()
const productId = route.params.products as string

const { data, status, error, refresh } = await useFetch<TProduct, TError>(`${API_BASE}/api/collections/products/records/${productId}`)

const isSuccess = computed(() => status.value === 'success')

const title = computed(() => data.value?.title)
const description = computed(() => data.value?.description)
const price = computed(() => data.value?.price)
const priceWithDiscount = computed(() => data.value?.priceWithDiscount)
const imageLink = computed(() => data.value?.imageLink)
const dimensions = computed(() => data.value?.dimensions)
const percentageOfWear = computed(() => data.value?.percentageOfWear)
const images = computed(() => data.value?.images)
const firstImage = computed(() => images.value?.[0])
const winner = computed(() => data.value?.winner)


const getImageSrc = (name: string) => `${API_BASE}/api/files/products/${productId}/${name}`

const breadcrumbs = [
  {
    label: 'Все продукты',
    to: '/store/products/'
  },
  {
    label: title.value
  }
]
</script>
