<template>
  <Container>
    <div class="flex max-w-3xl flex-col py-10 md:py-12 lg:py-16">
      <!-- Title -->
      <h1 class="mb-10 text-3xl font-bold md:text-5xl">Правила участия</h1>
      <!-- Term -->
      <div class="mb-6 flex flex-col items-start gap-y-3">
        <p class="text-sm sm:text-base">
          Выбирайте понравившийся товар и&nbsp;добавляйте в&nbsp;корзину. Количество товара неограниченно. Через 3&nbsp;недели после запуска распродажи мы&nbsp;проведем розыгрыш с&nbsp;помощью рандомайзера. Если ваша фамилия выпала, то&nbsp;у&nbsp;вас будет возможность выкупить свой товар. Как далее выкупается офисная мебель описано тут.
        </p>
      </div>
      <div class="mb-6 flex flex-col items-start gap-y-3">
        <p class="font-bold uppercase sm:text-base">1. Термины</p>
        <p class="text-sm sm:text-base">
          1.1. Участник&nbsp;&mdash; авторизованный, верифицированный работник Selectel и&nbsp;всех дочерних организаций.
          <br />1.2. Товар&nbsp;&mdash; предмет мебели, выставленный на&nbsp;продажу в&nbsp;этом приложении.
          <br />1.3. Розыгрыш&nbsp;&mdash; случайное определение будущего покупателя предмета мебели.
          <br />1.4. Победитель&nbsp;&mdash; случайно выбранный участник, которому досталось право выкупить предмет мебели.
          <br />1.5. Износ&nbsp;&mdash; коэффициент износа мебели. Чем меньше коэффициент, тем лучше состояние товара.
        </p>
      </div>
      <!-- Term -->
      <div class="mb-6 flex flex-col items-start gap-y-3">
        <p class="font-bold uppercase sm:text-base">2. Ответственность организатора</p>
        <p class="text-sm sm:text-base">
          2.1. Предоставить интерфейс с информацией о предметах мебели, доступных для продажи.
          <br />2.2. Провести розыгрыш в установленный срок.
          <br />2.3. Передать мебель победителю в соответствии с установленными правилами.
        </p>
      </div>
      <!-- Term -->
      <div class="mb-6 flex flex-col items-start gap-y-3">
        <p class="font-bold uppercase sm:text-base">3. Ответственность участника</p>
        <p class="text-sm sm:text-base">
          3.1. Организовать доставку выкупленной мебели к месту своего проживания или работы.
        </p>
      </div>
      <!-- Term -->
      <div class="mb-6 flex flex-col items-start gap-y-3">
        <p class="font-bold uppercase sm:text-base">4. Оплата</p>
        <p class="text-sm sm:text-base">
          4.1. Оплата за выкупленную мебель будет удержана с победителя из его заработной платы согласно установленным условиям.
          <br />4.2. Победитель обязан подтвердить свое согласие на удержание денежных средств в задаче в Jira.
        </p>
      </div>

      <div v-if="!isAgree">
        <button
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-75 disabled:hover:bg-indigo-600 disabled:cursor-not-allowed cursor-pointer"
            @click="onAgreeClickHandler"
        >
          Согласен с условиями
        </button>
      </div>
      <div v-else>
        <p>
          Вы подтвердили свое согласие с правилами (база данных все помнит)
        </p>
      </div>
      <div class="mt-2 min-h-[1px] min-w-full bg-[#e2e2e2]"></div>
    </div>

    <modal
      :open="isOpenModal"
      status="success"
      @toggle="toggleModalHandler"
      title="Подтверждение"
      btn2="Согласен"
      @btn2-click="setIsAgree"
    >
      <template #text>
        <p class="text-sm text-gray-500">
          Нажимая кнопку согласия - подтверждаешь свое соглание с правилами участия
        </p>
      </template>
    </modal>

    <modal
      :open="isOpenErrorModal"
      @toggle="toggleErrorModalHandler"
      title="Не удалось сохранить согласие"
      btn1="Закрыть"
    >
      <template #text>
        <p class="text-sm text-gray-500 mb-2">
          Произошла ошибка: <span v-html="error"></span>
        </p>

        <p class="text-sm text-gray-500">
          Попробуйте позже
        </p>
      </template>
    </modal>
  </Container>
</template>

<script setup lang="ts">
import {useAccount} from "~/store/account";

const {isAgree, userModel} = storeToRefs(useAccount());
const {pb} = useAccount()
const isOpenModal = ref(false);

const isOpenErrorModal = ref(false);
const error = ref('')

const toggleModalHandler = () => isOpenModal.value = !isOpenModal.value
const toggleErrorModalHandler = () => isOpenErrorModal.value = !isOpenErrorModal.value
const onAgreeClickHandler = () => isOpenModal.value = true

const setIsAgree = async() => {
  const data =  {
    isAgree: true,
  }

  try {
    await pb.collection('users').update(userModel.value.id, data);
  } catch (error) {
    console.error('Error updating isAgree:', error);
  }
}
</script>