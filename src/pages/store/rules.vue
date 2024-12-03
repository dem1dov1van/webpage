<template>


  <div class="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-4">
    Привет! <br>

    Селектел распродает ненужную более мебель. Купить эту мебель может любой сотрудник Селектел. Для того, чтобы уровнять шансы для всех мы (комитет по культуре) придумали механику с розыгрышем предметов мебели.

    Ниже можно ознакомится с правилами участия:
  </div>
  <tearms></tearms>

  <features></features>

<!--  <steps></steps>-->

  <accordion></accordion>

  <div class="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
    <nuxt-link
        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-75 disabled:hover:bg-indigo-600 disabled:cursor-not-allowed cursor-pointer"
      to="/store/products/"
    >
      К товарам!
    </nuxt-link>
  </div>

</template>
<script setup lang="ts">
import Steps from "~/components/Steps.vue";
import Accordion from "~/components/Accordion.vue";
import Tearms from "~/components/Tearms.vue";
</script>