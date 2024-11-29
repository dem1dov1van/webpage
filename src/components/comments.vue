<template>
  <form>

    <div class="flex flex-col">

      <div class="border rounded-md p-3 ml-3 my-3">
        <div class="flex gap-3 items-center">

          <img src="https://avatars.githubusercontent.com/u/22263436?v=4"
               class="object-cover w-8 h-8 rounded-full
                            border-2 border-emerald-400  shadow-emerald-400
                            ">

          <h3 class="font-bold">
            Елена Епишина
          </h3>
        </div>


        <p class="text-gray-600 mt-2">
          Хочу красный кожаный стул!
        </p>

      </div>

      <div class="border rounded-md p-3 ml-3 my-3">
        <div class="flex gap-3 items-center">

          <img src="https://avatars.githubusercontent.com/u/22263436?v=4"
               class="object-cover w-8 h-8 rounded-full
                            border-2 border-emerald-400  shadow-emerald-400
                            ">

          <h3 class="font-bold">
            Олег Игоревич
          </h3>
        </div>


        <p class="text-gray-600 mt-2">
          Тоже не против забрать себе такой)
        </p>
      </div>
    </div>



    <div class="w-full px-3 my-2">
                <textarea
                    class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                    name="body" placeholder='Оставь комментарий, если хочешь себе этот предмет' required></textarea>
    </div>

    <div class="w-full flex justify-end px-3">
      <input type='submit' class="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500" value='Отправить'>
    </div>
  </form>
</template>