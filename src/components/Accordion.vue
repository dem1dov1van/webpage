<template>
  <Container>
    <div class="mx-auto flex max-w-xl flex-col items-center justify-center px-6 text-center lg:max-w-3xl lg:px-10">
      <h2 class="mx-auto text-center font-bold text-black lg: text-3xl lg:text-4xl"> FAQ </h2>
    </div>

    <div class="mt-10 flex w-full max-w-4xl flex-col mx-auto">
      <accordion-item
        title="Это бесплатно?"
        answer="Нет, у&#160;каждого товара есть цена. Оплата происходит на&#160;расчетный счет компании по&#160;реквизитам."
      ></accordion-item>

      <accordion-item
        title="Как проходит розыгрыш?"
        answer="Победитель будет выбран рандомным образом из&#160;числа участников на&#160;сайте магазина."
      ></accordion-item>

      <accordion-item
          title="Как я пойму, что победил?"
      >
        <template #answer>
          <p
              @click.stop
              class="font-inter mt-4 text-base font-light text-gray-500 cursor-auto"
          >В&nbsp;разделе <nuxt-link class="font-semibold text-indigo-600 hover:text-indigo-500" to="/store/products/my-products/">мои товары</nuxt-link> на выйгранном лоте появится зеленый бейдж
            <span class="inline-flex items-center justify-between space-x-1 bg-green-100 text-green-800 px-2 py-0.5 rounded-md text-sm">Это теперь твое)</span>.

            Также придет письмо на&nbsp;почту от&nbsp;коллег с&nbsp;реквизитами для оплаты.
          </p>
        </template>
      </accordion-item>

      <accordion-item
          title="Могу я&nbsp;попросить больше фото или информации?"
          answer="Нет. Все имеющиеся фотографии и&nbsp;описания товаров уже на&nbsp;сайте магазина."
      ></accordion-item>

      <accordion-item
          title="Могу я&nbsp;вернуть товар, если он&nbsp;мне не&nbsp;понравился в&nbsp;живую?"
          answer="Нет, и&nbsp;помни, что приобретенный тобой товар покупается не&nbsp;для перепродажи, а&nbsp;для личного пользования."
      ></accordion-item>

      <accordion-item title="Какие сроки?">
        <template #answer>
          <ul class="list font-inter mt-4 text-base font-light text-gray-500 cursor-auto">
            <li>сроки сбора заявок – 10 рабочих дней</li>
            <li>сроки подведения итогов – 5 рабочих дней</li>
            <li>срок оплаты – 5 рабочих дней</li>
            <li>подготовка мебели и сроки выдачи товара – 15 рабочих дней</li>
          </ul>
        </template>
      </accordion-item>

      <accordion-item
        title="Я&nbsp;из&nbsp;другого города, кто оплачивает доставку?"
        answer="Доставка за&nbsp;счет покупателя. Вы&nbsp;вызываете курьера, который забирает товар из&nbsp;офиса."
      ></accordion-item>

      <p class="font-inter mx-auto mt-12 text-center text-base text-gray-500"> Не нашли ответ на свой вопрос? Напишите
        <a href="mailto:aho-cvt@selectel.ru" class="font-semibold text-indigo-600 hover:text-indigo-500">
          сюда
        </a>
      </p>
    </div>
  </Container>
</template>
<script setup lang="ts">
import AccordionItem from "~/components/AccordionItem.vue";
</script>