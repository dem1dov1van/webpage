<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Регистрация аккаунта
      </h2>
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
          label="Придумайте пароль"
          :error="validation.errorFields.value?.password?.[0].message"
        ></d-input>

        <p class="text-red-500" v-if="serverError">
          {{ serverError }}
        </p>

        <div>
          <button
            v-if="!submitSuccesAttempted"
            :disabled="isSubmitBtnDisable"
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click.prevent="submitRegisterWrapper"
          >
            Зарегистрироваться
          </button>

          <button
            v-else
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="navigateTo('/store/login/')"
          >
            К авторизации
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Уже зарегистрированы?
        <nuxt-link
            to="/store/login/"
            class="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Авторизация
        </nuxt-link>
      </p>

      <modal
        :open="isOpenVerifyModal"
        @toggle="toggleModalHandler"
        title="Аккаунт успешно зарегистрирован!"
        :text="`Осталось только подтвердить свою почту и авторизоваться в этом приложении. Письмо для подтверджения отправлено на ${form.email}`"
        btn2="Авторизоваться"
        status="success"
        @btn2-click="navigateTo('/store/login/')"
      ></modal>
    </div>
  </div>
</template>
<script setup lang="ts">
import type {Rules} from "async-validator";
import DInput from "~/components/DInput.vue";
import {useAccount} from "~/store/account";
import {useFormAuth} from "~/composables/useFormAuth";
const {form, submitRegister, doLogout, validation, serverError, resetServerError} = useFormAuth()

const {isAuth} = storeToRefs(useAccount())
const submitAttempted = ref(false)
const submitSuccesAttempted = ref(false)
const isRequestError = ref(false)

const rules: Rules = {
  email: [
    {
      required: true,
      transform: (value) => value.trim(),
      message: "Введите email",
    },
    // {
    //   type: "pattern",
    //   message: "Недопустимый email",
    //   validator: (rule, value, callback) => {
    //     if(!/^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.[a-zA-Z]{2,})$/.test(value)) {
    //       callback(new Error())
    //     } else {
    //       callback()
    //     }
    //   },
    // },
    // {
    //   type: "email",
    //   transform: (value) => value.trim(),
    //   message: "Введите корректный email",
    // },
  ],
  password: [
    {
      required: true,
      transform: (value) => value.trim(),
      message: "Введите пароль",
    },
  ],
}

const isOpenVerifyModal = ref(false)
const isSubmitBtnDisable = computed(() => !!serverError.value)

const toggleModalHandler = (bool: boolean) => isOpenVerifyModal.value = bool

const submitRegisterWrapper = async () => {
  await validation.execute()
  submitAttempted.value = true
  if (!validation.pass.value || isSubmitBtnDisable.value) return

  try {
    await submitRegister()
    if (!serverError.value) {
      toggleModalHandler(true)
      submitSuccesAttempted.value = true
    }
  } catch {
    isRequestError.value = true
  }
}

watch(form, async () => {
  if (submitAttempted.value) {
    await validation.execute()
  }

  if (serverError.value) {
    resetServerError()
  }
})

definePageMeta({
  layout: 'empty'
})
</script>