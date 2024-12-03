import { defineStore } from "pinia"
import {type ComputedRef, type Reactive} from "vue"
import PocketBase from "pocketbase";
import {API_BASE} from "~/helpers/constants";

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

type TUserModel = {
  avatar: string
  collectionId: string
  collectionName: string
  created: string
  email: string
  emailVisibility: boolean
  id: string
  name: string
  updated: string
  username: string
  verified: boolean
  isAdmin: boolean
}

export const useAccount = defineStore("account",   () => {
  const pb = new PocketBase(API_BASE)

  const cookie = useCookie('pb_auth', {
    path:     '/',
    secure:   true,
    sameSite: 'strict',
    httpOnly: false,
    maxAge:   604800,
  })

  const userModel = ref(pb.authStore.model as TUserModel)

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
