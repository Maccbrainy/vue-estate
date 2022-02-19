<template>
  <div class="px-2">
    <input 
      v-bind:placeholder="placeholder"
      class="
        inline-flex
        w-full
        justify-center 
        rounded-md
        border border-gray-500 
        shadow-sm
        px-3
        py-2 
        bg-white 
        text-base 
        font-medium 
        text-teal
        focus:outline-none 
        focus:ring
        focus:ring-offset-2 
        focus:ring-offset-white 
        focus:ring-teal-light" 
    />
  </div>
</template>
<script>
export default {
  props:["placeholder"],
}
</script>