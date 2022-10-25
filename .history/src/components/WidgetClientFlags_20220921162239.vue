<template>
  <div class="relative">
    <div class="absolute left-0 p-2 z-10">
      <div class="flex justify-start space-x-1">
        <span 
          v-if="isNewLists" 
          class="
            flex
            items-center
            cursor-default
            text-xs text-blue-900 
            bg-white 
            rounded-md 
            p-1 
            uppercase 
            font-semibold">
          {{
            hasTour3D || hasOpenHousesTime ? `NEW` : `NEW - ${lastUpdateTime}`
          }}
        </span>
        <span 
          v-if="hasTour3D" 
          class="
            flex
            justify-center
            items-center
            cursor-default
            text-xs text-blue-900 
            bg-white 
            rounded-md 
            p-1 
            uppercase 
            font-semibold"
          ><three-d-tour-icon />
          3D VIEW
        </span>
        <span 
          v-if="hasOpenHousesTime" 
          class="
            flex
            items-center
            cursor-default
            text-xs text-gray-600 
            bg-white 
            rounded-md 
            p-1 
            uppercase 
            font-semibold"
        >
          {{ hasOpenHousesTime }}
        </span>
        <span 
          v-if="isRental && isPetsFriendly" 
          class="
            flex
            items-center
            cursor-default
            text-xs text-gray-600 
            bg-white 
            rounded-md 
            p-1 
            uppercase 
            font-semibold">
          PET FRIENDLY</span
        >
        <span 
          v-if="isNewPlanNotYetBuilt" 
          class="
            flex
            items-center
            cursor-default
            text-xs text-gray-600 
            bg-white 
            rounded-md 
            p-1 
            uppercase 
            font-semibold"
        >
          BUILDABLE PLAN</span>
      </div>
    </div>
    <div class="absolute right-0 p-1 z-20 cursor-pointer">
      <slot name="iconSlot"></slot>
    </div>
  </div>
</template>
<script>
import { ThreeDTourIcon } from "../assets/icons"; 
export default {
  name: "WidgetClientFlags",
  props: {
    isNewLists: Boolean, 
    hasOpenHousesTime: Boolean, 
    hasTour3D: Boolean, 
    isNewPlanNotYetBuilt: Boolean, 
    isPetsFriendly: Boolean,
    isRental: Boolean, 
    lastUpdateTime: String, 
  },
  components: {
    // SaveSearch,
    ThreeDTourIcon
  },
  setup() {},
}
</script>