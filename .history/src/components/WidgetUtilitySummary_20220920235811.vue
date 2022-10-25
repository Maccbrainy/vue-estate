<template>
  <div class="flex flex-row space-x-4 whitespace-nowrap">
    <div v-if="!bedCheck" class="flex flex-row align-center">
      <bed-room-icon class="h-5" />
      <div class="ml-1 text-base font-normal text-gray-600">
        {{ isRentalPropertyBed }}
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
    bedroom: [String, Number],
    bedroomMin: [String, Number],
    bedroomMax: [String, Number],
    bathroom: [String, Number],
    squarefoot: [String, Number],
  },
  setup(props){
    const bedPropertyNotOnRental = computed(() => {
      return props.bedroom === 0 
        ? "Studio" 
        : props.bedroom
        ? `${props.home.beds} bd`
        : ""  
    });
    const bedPropertyMin = computed(() => {
      return props.bedroomMin == 0 ? "Studio -" : `${props.bedroomMin} -` 
    });
    const bedPropertyMax = computed(() => 
      props.bedroomMax == 0 ? "Studio" : `${props.bedroomMax} bd` );

    const bedProperty = computed(() => {
      return props.bedroomMin != props.bedroomMax
        ? `${bedPropertyMin.value} ${props.bedroomMax} bd`
        : !props.bedroomMax
        ? ""
        : bedPropertyMax.value
    })
    const isRentalPropertyBed = computed(() => {
      return !props.bedroomMin && !props.bedroomMax
        ? bedPropertyNotOnRental.value
        : bedProperty.value 
    });

    return{
      isRentalPropertyBed,
      squareFootCheck: computed(() => 
        props.squarefoot === "Unknown" ? false : true),
      bedCheck: computed(() => !props.bedroom ? true : false),
      bathCheck: computed(() => props.bathroom == 0 || !props.bathroom ? true : false),

    }
  }
};
</script>