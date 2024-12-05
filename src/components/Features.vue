<script setup lang="ts">

</script>

<template>
  <Container>
    <div class="flex flex-col items-center">
        <div class="mb-4 md:mb-6 lg:mb-8">
          <h2 class="text-2xl font-bold md:text-3xl w-full max-w-2xl text-center"> Расчет износа </h2>
        </div>
        <div class="w-full flex gap-10 flex-col items-center justify-center lg:flex-row">
          <div class="bg-gray-100 shadow-md rounded my-6 overflow-hidden w-full max-w-lg">
            <table class="w-full">
              <thead>
              <tr class="border-b border-gray-300">
                <td class="py-3 px-6 md:px-12 text-left whitespace-nowrap">
                  <div class="flex items-center">
                    <span class="font-bold">Процент</span>
                  </div>
                </td>
                <td class="py-3 px-6 md:px-12  text-center">
                  <div class="relative flex gap-3 items-center justify-center">
                  <span class="font-bold">
                    Состояние
                  </span>
                    <div class="absolute -top-3 -left-6 md:-left-12 bg-gray-300 h-20 w-[1px]"></div>
                  </div>
                </td>
              </tr>
              </thead>
              <tbody>
              <tr class="border-b border-gray-300">
                <td class="py-3 px-6 md:px-12 text-left whitespace-nowrap">
                  <div class="flex items-center">
                    <span class="font-semibold">30% / 0.3</span>
                  </div>
                </td>
                <td class="py-3 px-6 md:px-12 text-center">
                  <div class="relative flex gap-3 items-center">
                  <span class="font-semibold">
                    Отличное
                  </span>
                    <div class="absolute -top-3 -left-6 md:-left-12 bg-gray-300 h-20 w-[1px]"></div>
                  </div>
                </td>
              </tr>
              <tr class="border-b border-gray-300">
                <td class="py-3 px-6 md:px-12 text-left whitespace-nowrap">
                  <div class="flex items-center">
                    <span class="font-semibold">40% / 0.4</span>
                  </div>
                </td>
                <td class="py-3 px-6 md:px-12">
                  <div class="relative flex gap-3 items-center">
                  <span class="font-semibold">
                    Хорошее. Требуется химчистка
                  </span>
                    <div class="absolute -top-3 -left-6 md:-left-12 bg-gray-300 h-20 w-[1px]"></div>
                  </div>
                </td>
              </tr>
              <tr class="border-b border-gray-300">
                <td class="py-3 px-6 md:px-12 text-left whitespace-nowrap">
                  <div class="flex items-center">
                    <span class="font-semibold">60% / 0.6</span>
                  </div>
                </td>
                <td class="py-3 px-6 md:px-12">
                  <div class="relative flex gap-3 items-center">
                  <span class="font-semibold">
                    Хорошее. Есть потертости/царапины
                  </span>
                    <div class="absolute -top-3 -left-6 md:-left-12 bg-gray-300 h-20 w-[1px]"></div>
                  </div>
                </td>
              </tr>
              <tr class="border-b border-gray-300">
                <td class="py-3 px-6 md:px-12 text-left whitespace-nowrap">
                  <div class="flex items-center">
                    <span class="font-semibold">70% / 0.7</span>
                  </div>
                </td>
                <td class="py-3 px-6 md:px-12">
                  <div class="relative flex gap-3 items-center">
                  <span class="font-semibold">
                    Хорошее. Есть потертости/царапины + деформация и/или пятна
                  </span>
                    <div class="absolute -top-3 -left-6 md:-left-12 bg-gray-300 h-20 w-[1px]"></div>
                  </div>
                </td>
              </tr>
              <tr class="border-b border-gray-300">
                <td class="py-3 px-6 md:px-12 text-left whitespace-nowrap">
                  <div class="flex items-center">
                    <span class="font-semibold">80% / 0.8</span>
                  </div>
                </td>
                <td class="py-3 px-6 md:px-12">
                  <div class="relative flex gap-3 items-center">
                  <span class="font-semibold">
                    Удовл. Есть сильные потертости/царапины
                  </span>
                    <div class="absolute -top-3 -left-6 md:-left-12 bg-gray-300 h-20 w-[1px]"></div>
                  </div>
                </td>
              </tr>
              <tr class="border-b border-gray-300">
                <td class="py-3 px-6 md:px-12 text-left whitespace-nowrap">
                  <div class="flex items-center">
                    <span class="font-semibold">90% / 0.9</span>
                  </div>
                </td>
                <td class="py-3 px-6 md:px-12">
                  <div class="relative flex gap-3 items-center">
                  <span class="font-semibold">
                    Удовл. Есть сильные потертости/царапины + деформация/пятна
                  </span>
                    <div class="absolute -top-3 -left-6 md:-left-12 bg-gray-300 h-20 w-[1px]"></div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  </Container>
</template>

<style scoped lang="css">

</style>