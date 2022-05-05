<template>
  <div 
    class="
      md:w-1/4 
      w-2/5 
      fixed 
      -top-0 
      -right-0 
      h-screen 
      bg-gray-700 
      text-white 
      overflow-y-auto">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "MobileMenuContainer"
}
</script>