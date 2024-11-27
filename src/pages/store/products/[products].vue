<template>
  <div v-if="data" class="mx-auto max-w-7xl p-4 lg:px-8">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-8 mt-6">
        <div class="grid gap-4">
            <div>
              <client-only>
                <a
                  :href="getImageSrc(data.images[1])"
                  data-fancybox="gallery"
                  data-caption="Caption #1"
                >
                  <img
                    class="h-auto max-h-[400px] sm:max-h-none max-w-full rounded-lg"
                    :src="getImageSrc(data.images[1])"
                    alt=""
                  >
                </a>
              </client-only>
            </div>
            <div class="grid grid-cols-5 gap-4">
              <client-only>
                <div
                    v-for="(url, i) in [...data.images, ...data.images]"
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
                <dt class="font-medium text-gray-900">Что это?</dt>
                <dd class="text-gray-700 sm:col-span-2" v-html="name"></dd>
                </div>

                <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt class="font-medium text-gray-900">Где находится</dt>
                <dd class="text-gray-700 sm:col-span-2">Бар на цвт19</dd>
                </div>

                <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt class="font-medium text-gray-900">Цена</dt>
                <dd class="text-gray-700 sm:col-span-2"><span v-html="price"></span> ₽</dd>
                </div>

                <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt class="font-medium text-gray-900">Описание</dt>
                <dd class="text-gray-700 sm:col-span-2" v-html="description"></dd>
                </div>
            </dl>
        </div>
    </div>

    <span class="flex items-center my-10">
        <span class="h-px flex-1 bg-black"></span>
        <span class="shrink-0 px-6">S Store</span>
        <span class="h-px flex-1 bg-black"></span>
    </span>

    <section>
          <div class="w-full bg-white rounded-lg border p-2">

          <h3 class="font-bold">Участники:</h3>

          <form>

              <div class="flex flex-col">

                  <div class="border rounded-md p-3 ml-3 my-3">
                      <div class="flex gap-3 items-center">

                          <img src="https://avatars.githubusercontent.com/u/22263436?v=4"
                              class="object-cover w-8 h-8 rounded-full
                              border-2 border-emerald-400  shadow-emerald-400
                              ">

                          <h3 class="font-bold">
                              Елена Епишина
                          </h3>
                      </div>


                      <p class="text-gray-600 mt-2">
                          Хочу красный кожаный стул!
                      </p>

                  </div>

                  <div class="border rounded-md p-3 ml-3 my-3">
                      <div class="flex gap-3 items-center">

                          <img src="https://avatars.githubusercontent.com/u/22263436?v=4"
                              class="object-cover w-8 h-8 rounded-full
                              border-2 border-emerald-400  shadow-emerald-400
                              ">

                          <h3 class="font-bold">
                              Олег Игоревич
                          </h3>
                      </div>


                      <p class="text-gray-600 mt-2">
                          Тоже не против забрать себе такой)
                      </p>
                  </div>
              </div>



              <div class="w-full px-3 my-2">
                  <textarea
                      class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                      name="body" placeholder='Оставь комментарий, если хочешь себе этот предмет' required></textarea>
              </div>

              <div class="w-full flex justify-end px-3">
                  <input type='submit' class="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500" value='Отправить'>
              </div>
          </form>

          </div>
      </section>
  </div>
  <div v-else>
    loading...
  </div>
</template>

<script setup lang="ts">
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://api.dem1dov1van.ru')

const route = useRoute()

const productId = route.params.products

const data = ref(null)
const collectionName = ref(null)

const name = computed(() => data.value.title || 'Предмет мебели')
const price = computed(() => data.value.price || '777')
const description = computed(() => data.value.description || 'Преобразите ваше пространство с нашим стильным барным стулом. Этот барный стул сочетает в себе современный дизайн и непревзойденный комфорт, делая его идеальным дополнением для кухонного островка, бара или обеденной зоны.')

onBeforeMount( async () => {
  const record = await pb.collection('products').getOne(productId);
  console.log(data.value, 'data.value')

  data.value = record
  collectionName.value = record.collectionName
})

const getImageSrc = (name:string) => `http://api.dem1dov1van.ru/api/files/${collectionName.value}/${productId}/${name}`

</script>
