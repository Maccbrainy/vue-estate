<template>
  <div class="flex flex-row space-x-4 whitespace-nowrap">
    <div v-if="!bedCheck" class="flex flex-row align-center">
      <bed-room-icon class="h-5" />
      <div class="ml-1 text-base font-normal text-gray-600">
        {{ bedroom }}
      </div>
    </div>
    <div v-if="!bathCheck" class="flex flex-row align-center">
      <bath-icon class="h-5" />
      <div class="ml-1 text-base font-normal text-gray-600">
        {{ bathroom }} bath
      </div>
    </div>
    <div v-if="squareFootCheck" class="flex flex-row align-center">
      <square-feet-icon class="h-5" />
      <div class="ml-1 text-base font-normal text-gray-600">
        {{ squarefoot }} sqft
      </div>
    </div>
  </div>
</template>
<script>
import BedRoomIcon from "@/assets/icons/BedIcon.vue";
import BathIcon from "@/assets/icons/BathRoomIcon.vue";
import SquareFeetIcon from "@/assets/icons/SquareFeetIcon.vue";
import { computed } from "vue";
export default {
  name: "WidgetUtilitySummary",
  components: {
    BedRoomIcon,
    BathIcon,
    SquareFeetIcon,   
  },
  props: {
    bedroom: String,
    bathroom: [String, Number],
    squarefoot: [String, Number],
  },
  setup(props){
    return{
      squareFootCheck: computed(() => 
        props.squarefoot === "Unknown" ? false : true),
      bedCheck: computed(() => !props.bedroom ? true : false),
      bathCheck: computed(() => props.bathroom == 0 || !props.bathroom ? true : false),

    }
  }
};
</script>