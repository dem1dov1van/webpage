<template>
  <div class="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-lg shadow-sm p-6 text-center">
    <!-- Иконка -->
    <div class="mb-4">
      <svg class="w-12 h-12 text-indigo-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
      </svg>
    </div>

    <!-- Заголовок -->
    <h2 class="text-xl font-semibold text-gray-800 mb-2">
      Папин гараж закрыт 
    </h2>

    <!-- Описание -->
    <p class="text-gray-600 mb-4 max-w-md mx-auto">
      Спасибо, что заглянули на огонек! Следите за обновлениями на портале Inside :)
    </p>

    <!-- Кнопка для возврата -->
    <NuxtLink 
      to="/store/products/my-products/"
      class="inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-75 disabled:hover:bg-indigo-600 disabled:cursor-not-allowed cursor-pointer transition-colors"
    >
      Посмотреть мои товары
    </NuxtLink>
  </div>
</template>

<style scoped>
@keyframes subtle-pulse {
  0%, 100% {
    box-shadow: 0 1px 3px 0 rgba(79, 70, 229, 0.1);
  }
  50% {
    box-shadow: 0 1px 6px 0 rgba(79, 70, 229, 0.15);
  }
}

.bg-gradient-to-br {
  animation: subtle-pulse 3s infinite;
}
</style>