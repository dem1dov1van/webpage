<template>
  <div>
    <header class="bg-white">
      <nav class="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <nuxt-link to="/store/products/" class="-m-1.5 p-1.5">
            <span class="sr-only">Selectel Furniture Sale</span>
            <s-logo class="max-w-[50px]"></s-logo>
          </nuxt-link>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <PopoverGroup class="hidden lg:flex lg:gap-x-12">

          <nuxt-link to="/store/products/" class="text-sm/6 font-semibold text-gray-900">Все товары</nuxt-link>
          <nuxt-link to="/store/rules/" class="text-sm/6 font-semibold text-gray-900">Правила</nuxt-link>
          <nuxt-link to="/store/products/my-products/" class="text-sm/6 font-semibold text-gray-900">Мои товары</nuxt-link>
        </PopoverGroup>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <header-account-info></header-account-info>
        </div>
      </nav>
      <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-10 bg-black/[.7]" />
        <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-4 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Selectel Furniture Sale</span>
              <s-logo class="max-w-[50px]"></s-logo>
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <nuxt-link
                  to="/store/products/"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  @click="closeMenu"
                >
                  Все товары
                </nuxt-link>
                <nuxt-link
                  to="/store/rules/"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  @click="closeMenu"
                >Правила
                </nuxt-link>
                <nuxt-link
                  to="/store/products/my-products/"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  @click="closeMenu"
                >
                  Мои товары
                </nuxt-link>
              </div>
              <div class="py-6">
                <header-account-info class="!justify-start pointer-events-none mb-2"></header-account-info>
                <span
                  @click="doLogout"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Выйти из аккаунта
                </span>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  </div>
</template>
<script setup lang="ts">
import {
  Dialog, DialogPanel, PopoverGroup
} from "@headlessui/vue";
import {
  Bars3Icon, XMarkIcon
} from "@heroicons/vue/24/outline";
import SLogo from '~/assets/icons/logo/shopping-t-rex.svg?skipsvgo'
import {ref} from "vue";
import HeaderAccountInfo from "~/components/header/HeaderAccountInfo.vue";

const {doLogout} = useFormAuth()
const mobileMenuOpen = ref(false)

const closeMenu = () => mobileMenuOpen.value = false

</script>