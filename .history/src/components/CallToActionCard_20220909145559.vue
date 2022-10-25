<template>
  <div 
    v-for="callTo in callToActionsData"
    :key="callTo.id" 
    class="flex flex-col items-center max-w-xs p-2 cursor-pointer">
    <component v-bind:is="callTo.icon"></component>
    <h1 class="text-gray-700 text-2xl font-semibold">
      {{ callTo.title }}
    </h1>
    <p class="font-normal text-base text-gray-600 mt-3 mb-5">
      {{ callTo.description }}
    </p>
    <!-- <router-link :to="callTo.url"> -->
    <button
      v-on:click="setLongitudeAndLatitude" 
      type="button" 
      class="
        bg-teal 
        px-4 
        py-2 
        shadow-xl 
      text-white text-base 
        font-bold 
        rounded-lg 
        border border-teal 
        hover:bg-transparent hover:text-teal 
      focus:bg-teal-lighter focus:text-teal">
      {{ callTo.callToAction }}
    </button>
    <!-- </router-link> -->
  </div>
</template>
<script>
import BuyAHomeIcon from "@/assets/icons/BuyAHome.vue";
import RentAHomeIcon from "@/assets/icons/RentAHome.vue";
import NeighborHoodsIcon from "@/assets/icons/Neighborhoods.vue";
// import userGeolocation from "@/helper/userGeolocation";

import { ref, onUnmounted } from "vue";
export default {
  name: "CallToActionCard",
  components: {
    BuyAHomeIcon,
    RentAHomeIcon,
    NeighborHoodsIcon 
  },
  props: {
    callToActionsData: Array
  },
  setup() {
    const userLocationLatitude = ref("");
    const userLocationLongitude = ref("");
    // const watcherQ = ref(null);
    const setLongitudeAndLatitude = () => {
      // console.log("I am working!!!!!!");
      // const { cordinates, userEnabledLocation, watcher } = userGeolocation();
      // console.log("From CallToAction location", cordinates); 
      // console.log("From CallToAction location enable", userEnabledLocation); 
      // console.log("From CallToAction location watcher", watcher.value); 
      // watcherQ.value = watcher.value
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          const userCordinates = reactive({
            lat: latitude,
            long: longitude,
          })
          userLocationLatitude.value = userCordinates.lat;
          userLocationLongitude.value = userCordinates.long;
          console.log("From CallToAction user location", userCordinates); 
        })
    }
    // onUnmounted(() => {
    //   if (watcherQ.value) {
    //     navigator.geolocation.clearWatch(watcherQ.value);
    //   }
    // });
    return {
      userLocationLatitude,
      userLocationLongitude,
      setLongitudeAndLatitude
    }
  },
}
</script>