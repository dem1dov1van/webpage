<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Авторизация</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

      <div v-if="isAuth">
        <nuxt-link class="block text-center py-3" to="/store/products/">Посмотреть продукты</nuxt-link>

        <p class="block text-center" @click="doLogout">
          Выйти из аккаунта
        </p>
      </div>

      <form
        v-else
        @submit.prevent
        class="space-y-6"
        autocomplete="on"
      >
        <d-input
          v-model="form.email"
          label="Рабочая почта"
          :error="validation.errorFields.value?.email?.[0].message"
        ></d-input>

        <d-input
            type="password"
            v-model="form.password"
            label="Пароль"
            :error="validation.errorFields.value?.password?.[0].message"
        ></d-input>

        <p class="text-red-500" v-if="serverError">
          {{ serverError }}
        </p>

        <div>
          <button
            :disabled="isSubmitBtnDisable"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-75 disabled:hover:bg-indigo-600 disabled:cursor-not-allowed"
            @click.prevent="submitRegisterWrapper"
          >
            Войти
          </button>
        </div>
      </form>

      <modal
        :open="isOpenErrorModal"
        @toggle="toggleModalHandler"
        title="Произошла ошибка авторизации"
        text="Повторите попытку позднее или напишите <a class='text-red-500' href='https://t.me/dem1dov1van' target='_blank'>@dem1dov1van</a> о&nbsp;проблеме"
        btn2="Ок"
      ></modal>

      <p v-if="!isAuth" class="mt-10 text-center text-sm/6 text-gray-500">
        Еще не зарегистрированы?
        <nuxt-link
            to="/store/registration/"
            class="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Регистрация
        </nuxt-link>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import DInput from "~/components/DInput.vue";
import {useAccount} from "~/store/account";
import {useFormAuth} from "~/composables/useFormAuth";

const {isAuth} = storeToRefs(useAccount())
const {form, submitLogin, doLogout, validation, serverError, resetServerError} = useFormAuth()
const submitAttempted = ref(false)
const isRequestError = ref(false)

watch(form, async () => {
  if (submitAttempted.value) {
    await validation.execute()
  }

  if (serverError.value) {
    resetServerError()
  }
})

const isSubmitBtnDisable = computed(() => !!serverError.value)

const submitRegisterWrapper = async () => {
  await validation.execute()
  submitAttempted.value = true
  if (!validation.pass.value || isSubmitBtnDisable.value) return

  try {
    await submitLogin()
  } catch {
    isRequestError.value = true
  }
}

const isOpenErrorModal = ref(false)

const toggleModalHandler = (bool: boolean) => isOpenErrorModal.value = bool

watch(isAuth, () => {
  if(isAuth.value) navigateTo('/store/products/')
})

definePageMeta({
  layout: 'empty'
})
</script>