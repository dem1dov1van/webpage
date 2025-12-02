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
        <p class="text-sm sm:text-base">
          Подробнее с&nbsp;условиями можно ознакомится <a href="https://files.selectel.ru/docs/ru/conditions-garagesale.pdf" target="_blank" class="font-semibold text-indigo-600 hover:text-indigo-500">в&nbsp;документе</a>
        </p>
      </div>

      <div v-if="userModel">
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
            Вы подтвердили свое согласие с правилами
          </p>
        </div>
        <div class="mt-2 min-h-[1px] min-w-full bg-[#e2e2e2]"></div>
      </div>
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
          Нажимая кнопку согласия &mdash; подтверждаешь свое соглание <a href="https://files.selectel.ru/docs/ru/conditions-garagesale.pdf" target="_blank" class="font-semibold text-indigo-600 hover:text-indigo-500">с&nbsp;правилами участия</a>
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
    isAgree: true
  }

  try {
    await pb.collection('users').update(userModel.value.id, data);
  } catch (error) {
    console.error('Error updating isAgree:', error);
  }
}
</script>