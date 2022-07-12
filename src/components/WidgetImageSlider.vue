<template>
  <div
    v-bind:class="{ 'animate-pulse': !propertyListingPhotos }" 
    class="relative w-full h-44 bg-gray-200 rounded-xl overflow-hidden">
    <img
      v-bind:class="{ 'hidden': !propertyListingPhotos }" 
      v-bind:src="listingPhotos" 
      alt="" 
      class="w-full h-full object-center object-cover"/>
  </div>
</template>
<script>
import { computed } from "vue";
export default {
  name: "WidgetImageSlider",
  props: ["listingPhotos"],
  setup(props){
    const propertyListingPhotos = computed(() => {
      return !props.listingPhotos ? false : true
    })
    return {
      propertyListingPhotos
    }
  }
}
</script>