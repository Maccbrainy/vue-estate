<template>
  <span role="group" class="flex bg-gray-600 bg-opacity-50 rounded-lg">
    <button-tab>Buy</button-tab>
    <button-tab>Rent</button-tab>
    <button-tab>Sold</button-tab>
  </span> 
</template>
<script>
import ButtonTab from "@/utilityui/ButtonTab.vue";
export default {
  name: "HomeTabButtons",
  components: {
    ButtonTab,
  }
}
</script>