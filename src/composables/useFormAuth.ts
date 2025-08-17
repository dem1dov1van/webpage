import type {Rules} from "async-validator";
import {useAsyncValidator} from "@vueuse/integrations/useAsyncValidator";
import {useAccount} from "~/store/account";

export const useFormAuth = () => {
  const {pb} = useAccount()

  const emptyForm = {
    email: "",
    password: "",
  }

  const form = reactive(emptyForm)

  const rules: Rules = {
    email: [
      {
        required: true,
        transform: (value) => value.trim(),
        message: "Введите email",
      },
      {
        type: "pattern",
        message: "Недопустимый email",
        validator: (rule, value, callback) => {
          if(!/^[a-zA-Z0-9._%-]+@([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.[a-zA-Z]{2,})$/.test(value)) {
            callback(new Error())
          } else {
            callback()
          }
        },
      },
      {
        type: "pattern",
        message: "Почта должна приднадлежать Selectel",
        validator: (rule, value, callback) => {
          if(!value.endsWith('@selectel.ru')) {
            callback(new Error())
          } else {
            callback()
          }
        },
      },
      {
        type: "email",
        transform: (value) => value.trim(),
        message: "Введите корректный email",
      }
    ],
    password: [
      {
        required: true,
        transform: (value) => value.trim(),
        message: "Введите пароль",
      },
      {
        type: "string",
        min: 8,
        transform: (value) => value.trim(),
        message: "Пароль должен содержать не менее 8 символов"
      },
    ],
  }

  const serverError = ref('')

  const responseErrorCodeToText = {
    email: {
      validation_invalid_email: 'Почта невалидна, либо она уже используется',
      default: 'Некорректная почта'
    },
    password: {
      validation_length_out_of_range: 'Пароль должен содержать минимум 8 символов',
      default: 'Некорректный пароль'
    }
  }

  const serverMessageToText = {
    'Failed to authenticate.': 'Почта или пароль неверны',
    'Please verify your account first.': 'Вход неверефицированным пользователям ограничен, пожалуйста, подтвердите свой аккаунт, перейдя по ссылке на вашей почте',
    'Failed to create record.': 'Почта невалидна, либо уже используется'
  }

  const doLogin = async () => {
    try {
      await pb.collection('users').authWithPassword(
        form.email,
        form.password,
      );
    } catch (e) {
      if (typeof e === "string") {
        serverError.value = e.toUpperCase()
      } else if (e instanceof Error) {
        serverError.value = serverMessageToText[e.message] ?? 'Необработанная ошибка сервера'
      }
    }
  }

  const doRegister = async () => {
    const data = {
      "email": form.email,
      "emailVisibility": true,
      "isAdmin": false,
      "isAgree": false,
      "password": form.password,
      "passwordConfirm": form.password,
      "name": `name_${form.email}`
    };

    try {
      await pb.collection('users').create(data);
      await pb.collection('users').requestVerification(form.email);
    } catch (e) {
      if (typeof e === "string") {
        serverError.value = e.toUpperCase()
      } else if (e instanceof Error) {
        console.error(e)
        serverError.value = serverMessageToText[e.message] ?? 'Необработанная ошибка сервера'
      }
    }
  }

  const doLogout = () => {
    pb.authStore.clear()
    navigateTo('/store/login/')
  }

  const resetServerError = () => {
    serverError.value = ''
  }

  const validation = useAsyncValidator(form, rules, {manual: true})

  const submitLogin = async () => {
    if (!validation.pass.value) {
      return new Error("Форма не валидна")
    }

    await doLogin()
  }

  const submitRegister = async () => {
    if (!validation.pass.value) {
      return new Error("Форма не валидна")
    }

    await doRegister()
  }

  return {
    form,
    submitLogin,
    submitRegister,
    clearForm: () => Object.assign(form, emptyForm),
    validation,
    serverError,
    doLogout,
    resetServerError
  }
}
