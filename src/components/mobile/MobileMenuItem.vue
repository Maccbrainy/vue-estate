<template>
  <li class="p-2 cursor-pointer">
    <div class="flex justify-between">
      <slot></slot>
    </div>
  </li>
</template>
<script>
export default {
  name: "MobileMenuItem",
};
</script>
