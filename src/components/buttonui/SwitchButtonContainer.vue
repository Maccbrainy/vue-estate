<template>
  <div 
    class="
      flex 
      justify-center 
      items-center 
      mr-2 
      rounded-lg 
      bg-gray-100 
      h-11">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "SwitchButtonContainer"
}
</script>