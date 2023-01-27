<template>
  <div
    class="
      xs:w-11/12
      sf:w-10/12
      lm:w-1/4
      w-5/12
      fixed
      -top-0
      -right-0
      h-screen
      bg-menu
      text-white
      overflow-y-auto
    "
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "MobileMenuContainer",
};
</script>
