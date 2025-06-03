<template>
  <Breadcrumbs :items="breadcrumbs"></Breadcrumbs>
<!--ToDo показать Лене или убрать -->
  <div v-if="false">
    <Container>
      <h3 class="mb-6 text-2xl font-bold md:text-4xl">Офисная распродажа</h3>
      <p class="max-w-[760px] mb-8">
        Привет!<br>
        Мы&#160;решили устроить офисную онлайн-распродажу б/у мебели, которая находится на&#160;Цветочной в&#160;СПб. У&#160;нас появился удобный онлайн-магазин с&#160;информацией о&#160;товарах, их&#160;состоянии и&#160;фото. Приобрести товар может любой авторизованный сотрудник Selectel вне зависимости от&#160;локации.
      </p>

      <h3 class="mb-6 text-2xl font-bold md:text-4xl">Почему распродажа, а&#160;не&#160;просто отдать</h3>
      <p class="max-w-[760px] mb-8">
        У&#160;нас есть мебель, которую мы&#160;не&#160;планируем использовать у&#160;себя в&#160;офисах, но, возможно, она порадует вас дома или на&#160;даче. По&#160;закону мы&#160;не&#160;можем просто так отдать даже б/у мебель, поэтому оценив ее&#160;состояние и&#160;коэффициент износа, сформировали цены, за&#160;которые вы&#160;сможете приобрести стул, стол, шкаф и&#160;тд.
      </p>

      <h3 class="mb-6 text-2xl font-bold md:text-4xl">Как проходит распродажа</h3>
      <p class="max-w-[760px] mb-8">
        Для того чтобы у&#160;всех была равная возможность купить понравившийся товар, будет устроен розыгрыш.
        <br>
        <br>
        С&#160;1&#160;по&#160;15&#160;апреля добавляйте все понравившиеся товары, которые готовы выкупить, в&#160;корзину, а&#160;затем нажимайте &#34;участвовать&#34;. Через 15&#160;рабочих дней после запуска распродажи, мы&#160;проведем розыгрыш с&#160;помощью рандомайзера. Если твоя фамилия выпадет, ты&#160;можешь выкупить товары по , договору-оферты. Если передумаешь , возможность перейдет следующему сотруднику, который выпал в&#160;рандомайзере.
      </p>

      <h3 class="mb-6 text-2xl font-bold md:text-4xl">Как я&#160;узнаю, что могу выкупить товар</h3>
      <p class="max-w-[760px] mb-[-5px]">
        На&#160;сайте магазина во&#160;вкладке &#34;Мои товары&#34; ты&#160;увидишь, что этот Товар уже твой
        <br>
      </p>
    </Container>

    <products-card-grid>
      <product-card
          id="1"
          :key="1"
          title="Барный стул модели GINGER S с мягким сиденьем"
          price="3552"
          imageSrc="https://api.dem1dov1van.ru/api/files/products/i2y0g5jinm80ye6/photo_2024_10_31_10_22_10_LXynL0Zxhu.jpg"
          :is-win="true"
          is-fake-link
          is-show-status
      ></product-card>
      <product-card
          id="2"
          :key="2"
          title="Кухня ИКЕА"
          price="9137"
          imageSrc="https://api.dem1dov1van.ru/api/files/products/b2yxaj3wp5fdyui/photo_2024_10_31_17_31_24_dNac71xn7E.jpg"
          :is-win="false"
          is-fake-link
          is-show-status
      ></product-card>
    </products-card-grid>

    <Container>
      <p class="max-w-[760px] mb-8">
        Дополнительно, коллеги из&#160;команды АХО напишут на&#160;почту письмо с&#160;просьбой оплатить товар, перечислив деньги на&#160;расчетный счет.
        <br>
        <br>
        Внимательно почитай на&#160;сайте магазина блок FAQ и&#160;правила оферты. Магазин уже открыт и&#160;ждет!
        <br>
        <br>
        Приятных покупок!
        <br>
        Псс: магазин создан <a href="https://in.selectel.org/hr/employee/1737" class="font-semibold text-indigo-600 hover:text-indigo-500">Ваней Демидовым</a>. Такое мы&#160;любим и&#160;уважаем!
      </p>
    </Container>
  </div>

  <Container>
<!--ToDo добавить настоящие ссылки-->
    <div class="mt-10 flex w-full max-w-4xl flex-col mx-auto">
      <p class="mb-8">
        Привет!<br>
        Добро пожаловать на&#160;распродажу офисной мебели. Внимательно ознакомься с&#160;правилами розыгрыша и&#160;договором оферты.
      </p>

      <h3 class="mb-6 text-2xl font-bold md:text-4xl text-center">
        Правила
      </h3>
      <p class="mb-8">
        Выбирайте понравившийся товар и&#160;добавляйте в&#160;корзину. Количество товара неограниченно. Через 15&#160;рабочих дней после запуска распродажи мы&#160;проведем розыгрыш с&#160;помощью рандомайзера. Если ваша фамилия выпала, то&#160;у&#160;вас будет возможность выкупить товар.
      </p>
    </div>
  </Container>

  <features></features>

  <accordion></accordion>

  <Container>
    <div class="max-w-4xl flex-col mx-auto mb-20">
      <nuxt-link
        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-75 disabled:hover:bg-indigo-600 disabled:cursor-not-allowed cursor-pointer"
        to="/store/products/"
      >
        К товарам!
      </nuxt-link>
    </div>
  </Container>

</template>

<script setup lang="ts">
import Accordion from "~/components/Accordion.vue";
import Tearms from "~/components/Tearms.vue";

const breadcrumbs = [
  {
    label: 'Правила'
  }
]
</script>