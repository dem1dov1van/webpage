<template>

  <section class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <!-- Container -->
    <div class="mx-auto flex w-full flex-col items-center justify-center px-5 py-16 md:px-10 md:py-20">
      <div class="mx-auto flex max-w-xl flex-col items-center justify-center px-6 text-center lg:max-w-3xl lg:px-10">
        <h2 class="mx-auto text-center font-bold text-black lg: text-3xl lg:text-4xl"> FAQ </h2>
      </div>

      <div class="mt-10 flex w-full max-w-4xl flex-col">
        <accordion-item
          title="Это бесплатно?"
          answer="Нет, у каждого товара есть цена, эта цена будет удержана из заработной планы покупателя"
        ></accordion-item>

        <accordion-item
          title="Как проходит розыгрыш?"
          answer="Победитель будет выбран рандомным убразом из числа участников."
        ></accordion-item>

        <accordion-item
          title="Как я пойму, что победил?"
        >
          <template #answer>
            <p
              @click.stop
              class="font-inter mt-4 text-base font-light text-gray-500 cursor-auto"
            >В разделе <nuxt-link class="font-semibold text-indigo-600 hover:text-indigo-500" to="/store/products/my-products/">мои товары</nuxt-link> на выйгранном лоте появится зеленый бейдж
              <span class="inline-flex items-center justify-between space-x-1 bg-green-100 text-green-800 px-2 py-0.5 rounded-md text-sm">Это теперь твое)</span>.

              Также в скором времени с тобой свяжутся
            </p>
          </template>
        </accordion-item>

        <accordion-item
          title="Могу я попросить больше фото или информации?"
          answer="Нет."
        ></accordion-item>

        <accordion-item
            title="Могу я вернуть товар, если он мне не понравился в живую?"
            answer="Нет (Наверно да, но лучше нет)"
        ></accordion-item>

        <p class="font-inter mx-auto mt-12 text-center text-base text-gray-500"> Не нашли ответ на свой вопрос? Напишите
          <a href="" class="text-black font-bold">
            организатору этой движухи
          </a>
        </p>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import AccordionItem from "~/components/AccordionItem.vue";
</script>