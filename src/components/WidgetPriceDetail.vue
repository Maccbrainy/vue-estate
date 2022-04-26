<template>
  <div class="mt-1 text-base font-semibold text-gray-600">
    ${{ sellingPrice }}
  </div>
</template>
<script>
export default {
  name: "WidgetPriceDetail",
  props: ["sellingPrice"],
};
</script>
