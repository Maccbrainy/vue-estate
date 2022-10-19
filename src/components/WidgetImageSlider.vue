<template>
  <div
    v-bind:class="{
      'animate-pulse':
        isDefaultImage || storeData.fetchingIsBusy || storeData.isLoading,
    }"
    class="relative w-full h-44 bg-gray-200 rounded-xl overflow-hidden"
  >
    <img
      v-show="
        (!isDefaultImage && !storeData.isLoading) ||
        (!isDefaultImage && !storeData.fetchingIsBusy)
      "
      v-bind:src="listingPhotos"
      alt=""
      class="w-full h-full object-center object-cover"
    />
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "WidgetImageSlider",
  props: ["listingPhotos"],
  setup(props) {
    const store = useStore();
    const storeData = computed(() => store.getters.getStore);
    const isDefaultImage = computed(() =>
      props.listingPhotos == "defaultImage" ? true : false
    );
    return {
      isDefaultImage,
      storeData,
    };
  },
};
</script>
