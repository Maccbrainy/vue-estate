<template>
  <div class="relative">
    <div class="absolute left-0 p-2 z-10">
      <div class="flex justify-start space-x-1">
        <span 
          v-if="isNewListing" 
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
            has3Dtour || hasOpenHouses ? `NEW` : `NEW - ${propertyLastUpdated}`
          }}
        </span>
        <span 
          v-if="has3Dtour" 
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
          v-if="hasOpenHouses" 
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
          {{ hasOpenHouses }}
        </span>
        <span 
          v-if="isRentalProperty && petsFriendly" 
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
          v-if="isNewPlan" 
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
      <save-search/>
    </div>
  </div>
</template>
<script>
import { SaveSearch, ThreeDTourIcon } from "../assets/icons"; 
export default {
  name: "WidgetClientFlags",
  props: {
    isNewListing: Boolean, 
    hasOpenHouses: Boolean, 
    has3Dtour: Boolean, 
    isNewPlan: Boolean, 
    petsFriendly: Boolean, 
  },
  components: {
    SaveSearch,
    ThreeDTourIcon
  },
  setup() {},
}
</script>