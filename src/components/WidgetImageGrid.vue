<template>
  <div class="flex relative overflow-hidden justify-center">
    <div class="w-full md:w-9/12 mx-auto cursor-pointer">
      <div class="grid grid-cols-4 grid-rows-2 gap-3">
        <div class="relative h-96 col-span-4 row-span-2 md:col-span-3">
          <img 
            src="../assets/images/HomePage.jpg" 
            alt="" 
            class="
              absolute 
              inset-0 
              w-full 
              h-full 
              object-cover 
              bg-gray-100 
              md:rounded-l-xl"
          />
        </div>
        <div class="relative hidden md:block">
          <img 
            src="../assets/images/HomePage.jpg" 
            alt="" 
            class="
              absolute 
              inset-0 
              w-full 
              h-full 
              object-cover 
              rounded-tr-xl 
              bg-gray-100"
          />
        </div>
        <div class="relative hidden md:block">
          <img 
            src="../assets/images/HomePage.jpg" 
            alt="" 
            class="
              absolute 
              inset-0 
              w-full 
              h-full 
              object-cover
              rounded-br-xl 
              bg-gray-100" 
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "WidgetImageGrid",
};
</script>