<template>
  <ul class="animate-pulse flex flex-wrap">
    <li
      v-for="(card, index) in [1, 2, 3, 4]"
      :key="card + index"
      :class="{
        'xs:w-full sm:w-6/12 md:w-6/12 lg:w-4/12 xl:w-3/12 2xl:w-3/12 3xl:w-2/12':
          activeMapViewVariant == 'ListViewNoMapLayout',
        'xs:w-full sm:w-6/12 md:w-6/12 lg:w-4/12 xl:w-6/12 2xl:w-4/12 3xl:w-3/12':
          activeMapViewVariant == 'MapViewLayout',
      }"
      class="
        block
        mt-4
        mb-4
        flex-initial
        border-solid border-transparent border-r-8 border-l-8 border-t-8
      "
    >
      <div
        class="relative w-full h-44 bg-gray-200 rounded-xl overflow-hidden"
      ></div>
      <div class="block">
        <div class="mt-1 h-3 w-16 bg-gray-200"></div>
        <div class="flex space-x-4 mt-2">
          <div class="h-3 w-16 bg-gray-200"></div>
          <div class="h-3 w-16 bg-gray-200"></div>
          <div class="h-3 w-16 bg-gray-200"></div>
        </div>
        <div class="space-y-2 mt-2">
          <h4 class="h-3 w-full bg-gray-200"></h4>
          <h4 class="h-3 w-full bg-gray-200"></h4>
        </div>
      </div>
      <div class="mt-4 h-3 w-full bg-gray-200"></div>
    </li>
  </ul>
</template>
<script>
import { inject } from "vue";
export default {
  name: "IsLoading",
  setup() {
    const { activeMapViewVariant } = inject("provider");

    return { activeMapViewVariant };
  },
};
</script>
