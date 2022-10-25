<template>
  <div class="flex flex-row space-x-4 whitespace-nowrap">
    <div v-if="bedProperty" class="flex flex-row align-center">
      <bed-room-icon class="h-5" />
      <div class="ml-1 text-base font-normal text-gray-600">
        {{ bedProperty }}
      </div>
    </div>
    <div v-if="bathProperty" class="flex flex-row align-center">
      <bath-icon class="h-5" />
      <div class="ml-1 text-base font-normal text-gray-600">
        {{ bathProperty }}
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
import { computed } from "vue";
import BedRoomIcon from "@/assets/icons/BedIcon.vue";
import BathIcon from "@/assets/icons/BathRoomIcon.vue";
import SquareFeetIcon from "@/assets/icons/SquareFeetIcon.vue";
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
    bathroomMin: [String, Number],
    bathroomMax: [String, Number],
    squarefoot: [String, Number],
  },
  setup(props){
    const bedPropertyOnSale = computed(() =>
      props.bedroom == 0 
        ? "Studio" 
        : props.bedroom > 0
        ? `${props.bedroom} bd`
        : ""
    );
    const bedPropertyMin = computed(() => {
      return props.bedroomMin == 0 ? "Studio -" : `${props.bedroomMin} -` 
    });
    const bedPropertyMax = computed(() => 
      props.bedroomMax == 0 ? "Studio" : `${props.bedroomMax} bd` );

    const bedPropertyOnRental = computed(() => {
      return props.bedroomMin != props.bedroomMax
        ? `${bedPropertyMin.value} ${props.bedroomMax} bd`
        : !props.bedroomMax
        ? ""
        : bedPropertyMax.value
    })
    const bedProperty = computed(() => {
      return props.bedroomMin
        ? bedPropertyOnRental.value 
        : bedPropertyOnSale.value 
    });

    const bathPropertyOnSale = computed(() =>
      props.bedroom > 0 ? `${props.bedroom} bath` : ""
    );
    const bathPropertyMin = computed(() =>
      props.bathroomMin == 0 ? "" : `${props.bathroomMin} -`
    );
    const bathPropertyOnRental = computed(() => {
      return props.bathroomMin == props.bathroomMax
        ? `${props.bathroomMax} bath`
        : `${bathPropertyMin.value} ${props.bathroomMax} bath`
    })
    const bathProperty = computed(() => {
      return props.bathroomMin 
        ? bathPropertyOnRental.value  
        : bathPropertyOnSale.value
    });



    return{
      bedProperty,
      bathProperty,
      squareFootCheck: computed(() => 
        props.squarefoot === "Unknown" ? false : true),
    }
  }
};
</script>