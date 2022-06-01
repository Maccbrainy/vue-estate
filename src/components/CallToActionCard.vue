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
    <router-link :to="callTo.url">
      <button 
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
    </router-link>
  </div>
</template>
<script>
import BuyAHomeIcon from "@/assets/icons/BuyAHome.vue";
import RentAHomeIcon from "@/assets/icons/RentAHome.vue";
import NeighborHoodsIcon from "@/assets/icons/Neighborhoods.vue";
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
    return {}
  },
}
</script>