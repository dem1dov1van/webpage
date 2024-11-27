import { defineStore } from "pinia"
import {type ComputedRef, type Reactive} from "vue"
import PocketBase from "pocketbase";

type TAccount = {
  id: string
  email: string,
  token: string,
  verified: boolean
}

type TStore = {
  account: Reactive<TAccount>,
  isAuth: ComputedRef<boolean>,
  setAccount: (email: string, token: string) => void
}

export const useAccount = defineStore("account",   () => {
  const pb = new PocketBase('http://api.dem1dov1van.ru')

  const cookie = useCookie('pb_auth', {
    path:     '/',
    secure:   true,
    sameSite: 'strict',
    httpOnly: false,
    maxAge:   604800,
  })

  const userModel = ref(pb.authStore.model)

  pb.authStore.save(cookie.value?.token, cookie.value?.model);

  pb.authStore.onChange(() => {
    userModel.value = pb.authStore.model

    cookie.value = {
      token: pb.authStore.token,
      model: pb.authStore.model,
    };
  });

  onBeforeMount( async () => {
    try {
      await pb.collection('users').authRefresh();
    } catch (_) {
      pb.authStore.clear();
    }
  })

  const isAuth = computed<boolean>(() => !!userModel.value)
  const isVerify = computed<boolean>(() => userModel.value?.verified)

  // watch(isAuth, () => {
  //   console.log(isAuth.value, 'isAuth.value')
  //   if (isAuth.value) navigateTo('/store/products/')
  // })

  return {
    pb,
    isAuth,
    isVerify,
    userModel
  }
})
