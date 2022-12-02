<template>
  <div class="my-1 text-lg font-bold text-gray-600">
    {{ sellingPrice }}
  </div>
</template>
<script>
export default {
  name: "WidgetPriceDetail",
  props: ["sellingPrice"],
};
</script>
