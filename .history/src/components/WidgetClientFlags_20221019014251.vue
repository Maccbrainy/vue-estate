<template>
  <div class="relative">
    <div class="absolute left-0 p-2 z-10">
      <div class="flex justify-start space-x-1">
        <span 
          v-if="propertyStatus" 
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
          {{ propertyStatus }}
        </span>
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
          v-if="petsFriendly" 
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
    <div class="absolute right-0 p-1 z-10 cursor-pointer">
      <slot name="iconSlot"></slot>
    </div>
  </div>
</template>
<script>
import { computed, inject } from "vue";
import { ThreeDTourIcon } from "../assets/icons"; 
import { format, formatDistanceStrict } from "date-fns";
export default {
  name: "WidgetClientFlags",
  props: {
    propertyClientDisplayFlags: Object,
    presentationStatus: String,
    lastUpdateTime: String, 
  },
  components: {
    // SaveSearch,
    ThreeDTourIcon
  },
  setup() {
    const isClientFlags = inject("displayClientFlags");
    console.log("isClientFlags", isClientFlags);


    const propertyStatus = computed(() =>
      isClientFlags.status == "for sale"
        ? "FOR SALE"
        : isClientFlags.status == "for rent"
        ? "FOR RENT"
        : false
    );
    const propertyLastUpdated = computed(() => {
      let todayDate = new Date();
      let lastUpdated = new Date(isClientFlags.lastUpdates);
      let lastUpdatedDistance = formatDistanceStrict(lastUpdated, todayDate, {
        addSuffix: true,
      });
      return lastUpdatedDistance;
    });
    const isNewListing = computed(() => {
      let getValueIfPropertyExist = Object.hasOwn(
        isClientFlags,
        "is_new_listing") 
        ? isClientFlags.is_new_listing 
        : false;
      return getValueIfPropertyExist; 
    });
    const hasOpenHouses = computed(() => {
      let getValueIfPropertyExist = Object.hasOwn(
        isClientFlags,
        "has_open_house") 
        ? isClientFlags.has_open_house 
        : false;
      if (getValueIfPropertyExist){
        let startDate = format(
          new Date(isClientFlags.open_houses[0].start_date),
          "E,h"
        );
        let endDate = format(
          new Date(isClientFlags.open_houses[0].end_date),
          "ha"
        );
        let openDateDuration = `OPEN ${startDate}-${endDate}`;
        return openDateDuration;
      }
      return false;
    });
    const has3Dtour = computed(() => {
      let getValueIfPropertyExist = Object.hasOwn(
        isClientFlags,
        "has_matterport") 
        ? isClientFlags.has_matterport 
        : false;
      return getValueIfPropertyExist;
    });
    const isNewPlan = computed(() => {
      let getValueIfPropertyExist = Object.hasOwn(
        isClientFlags,
        "is_new_plan") 
        ? isClientFlags.is_new_plan 
        : false;
      return getValueIfPropertyExist;
    });
    const petsFriendly = computed(() => {
      let getCatValueIfPropertyExist = Object.hasOwn(
        isClientFlags,
        "allows_cats") 
        ? isClientFlags.allows_cats
        : false;
      let getDogValueIfPropertyExist = Object.hasOwn(
        isClientFlags,
        "allows_dogs")
        ? isClientFlags.allows_dogs 
        : false;
      return getCatValueIfPropertyExist || getDogValueIfPropertyExist;
    });
    return {
      propertyStatus,
      propertyLastUpdated,
      isNewListing,
      hasOpenHouses,
      has3Dtour,
      isNewPlan,
      petsFriendly
    }
  },
}
</script>