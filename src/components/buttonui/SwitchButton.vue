<template>
  <span 
    class="flex justify-start px-4 py-2 cursor-pointer text-base font-medium xs:text-sm">
    <slot></slot>
  </span>
</template>
<script>
export default {
  name: "SwitchButton",
  setup() {
    return {
    }
  }
}
</script>
