<template>
  <div
    class="
      flex flex-col
      space-y-0.5
      text-base
      font-normal
      overflow-ellipsis
      whitespace-nowrap
      overflow-hidden
      text-gray-600
    "
  >
    <div
      v-bind:class="{
        'animate-pulse bg-gray-200 my-1 full h-3': storeData.fetchingIsBusy,
      }"
    >
      <span v-if="!storeData.fetchingIsBusy">{{ streetOrName }}</span>
    </div>

    <div
      v-bind:class="{
        'animate-pulse bg-gray-200 w-full h-3': storeData.fetchingIsBusy,
      }"
    >
      <span v-if="!storeData.fetchingIsBusy">
        {{ city }},
        {{ state }}
        {{ postalCode }}</span
      >
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "WidgetLocationDetail",
  props: ["streetOrName", "city", "state", "postalCode"],
  setup() {
    const store = useStore();
    const storeData = computed(() => store.getters.getStore);
    return { storeData };
  },
};
</script>
