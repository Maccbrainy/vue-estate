<template>
  <div
    v-bind:class="{
      'animate-pulse bg-gray-200 w-16 h-3 my-1': storeData.fetchingIsBusy,
    }"
    class="my-1 text-lg font-bold text-gray-600"
  >
    <span v-if="sellingPrice && !storeData.fetchingIsBusy">{{
      sellingPrice
    }}</span>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "WidgetPriceDetail",
  props: ["sellingPrice"],
  setup() {
    const store = useStore();
    const storeData = computed(() => store.getters.getStore);
    return { storeData };
  },
};
</script>
