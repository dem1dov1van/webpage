<script setup lang="ts">
import { ref } from 'vue'

import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import {useAccount} from "~/store/account";
import {useFormAuth} from "~/composables/useFormAuth";

const {doLogout} = useFormAuth()
const {isAuth, isVerify, userModel} = storeToRefs(useAccount())

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
</script>

<template>
  <div
    v-if="isAuth"
    class="flex items-center justify-end gap-2 cursor-pointer w-full"
    @click="isOpen = !isOpen"
  >
    <div class="w-[32px] h-[32px] min-w-[32px] min-h-[32px] bg-gray-300 flex items-center justify-center rounded-full relative">
      <span v-html="userModel.email[0].toUpperCase()"></span>
      <svg v-if="isVerify" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="green" class="size-4 absolute bottom-0 right-0 translate-x-1 translate-y-1">
        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clip-rule="evenodd" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="red" class="size-4  absolute bottom-0 right-0 translate-x-1 translate-y-1">
        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd" />
      </svg>
    </div>
    <div v-html="userModel.email" class="text-ellipsis max-w-[70%] whitespace-nowrap overflow-hidden"></div>

    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" :open="isOpen" class="relative z-10">
        <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
              class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900"
                >
                  {{ isVerify ? 'Верификация пройдена!' : 'Верификация не пройдена.'}}

                </DialogTitle>
                <div class="mt-2 ">
                  <p class="text-sm text-gray-500 mb-4">
                    {{ isVerify ? 'Теперь можно пользоваться приложением в полной мере' : 'Чтобы получить дополнительные возможности - подтвердите почту. Письмо было отправлено при регистрации'}}
                  </p>

                  <span
                      @click="doLogout"
                      class="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
                  >
                    Выйти из аккаунта
                  </span>
                </div>

                <div class="mt-4">
                  <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      @click="closeModal"
                  >
                    Ок!
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
  <div v-else class="py-2 flex gap-2">
    <nuxt-link to="/store/login/" class="block text-sm/6 text-gray-900">Войти</nuxt-link>
    <div>|</div>
    <nuxt-link to="/store/registration/" class=" pt-0 text-sm/6 text-gray-800">Создать аккаунт</nuxt-link>
  </div>
</template>

<style scoped lang="css">
</style>