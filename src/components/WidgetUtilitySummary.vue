<template>
  <div class="flex flex-row space-x-4">
    <div class="flex flex-row align-center">
      <bed-room-icon class="h-5" />
      <div class="ml-1 text-base font-normal text-gray-600">
        {{bedroom}} bd
      </div>
    </div>
    <div class="flex flex-row align-center">
      <bath-icon class="h-5" />
      <div class="ml-1 text-base font-normal text-gray-600">
        {{bathroom}} bath
      </div>
    </div>
    <div class="flex flex-row align-center">
      <square-feet-icon class="h-5" />
      <div class="ml-1 text-base font-normal text-gray-600">
        {{squarefoot}} sqft
      </div>
    </div>
  </div>
</template>
<script>
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
  props: ["bedroom", "bathroom", "squarefoot"],
};
</script>