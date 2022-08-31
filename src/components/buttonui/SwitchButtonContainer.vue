<template>
  <span 
    class="
      flex 
      justify-center 
      items-center 
      mr-2 
      rounded-lg 
      bg-gray-100 
      h-auto">
    <slot></slot>
  </span>
</template>
<script>
export default {
  name: "SwitchButtonContainer"
}
</script>