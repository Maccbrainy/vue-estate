<template>
  <div class="relative">
    <div class="w-10/12 absolute left-0 p-2 z-10">
      <div class="flex justify-start flex-wrap gap-1">
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
            font-semibold
          "
        >
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
            font-semibold
          "
        >
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
            font-semibold
          "
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
            font-semibold
          "
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
            font-semibold
          "
        >
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
            font-semibold
          "
        >
          BUILDABLE PLAN</span
        >
      </div>
    </div>
    <div class="absolute right-0 p-1 z-10 cursor-pointer">
      <slot name="iconSlot"></slot>
    </div>
  </div>
</template>
<script>
import { computed, inject } from "vue";
import { useStore } from "vuex";
import { ThreeDTourIcon } from "@/assets/icons";
import { format, formatDistanceStrict } from "date-fns";
export default {
  name: "WidgetClientFlags",
  components: {
    // SaveSearch,
    ThreeDTourIcon,
  },
  setup() {
    const store = useStore();
    const storeData = computed(() => store.getters.getStore);
    const displayFlags = inject("displayClientFlags");

    const propertyStatus = computed(() =>
      displayFlags.status == "for_sale"
        ? "FOR SALE"
        : displayFlags.status == "for_rent"
        ? "FOR RENT"
        : false
    );
    const propertyLastUpdated = computed(() => {
      let todayDate = new Date();
      let lastUpdated = new Date(displayFlags.lastUpdates);
      let lastUpdatedDistance = formatDistanceStrict(lastUpdated, todayDate, {
        addSuffix: true,
      });
      return lastUpdatedDistance;
    });
    const isNewListing = computed(() => {
      let getValueIfPropertyExist = Object.hasOwn(
        displayFlags.clientFlags,
        "is_new_listing"
      )
        ? displayFlags.clientFlags.is_new_listing
        : false;
      return getValueIfPropertyExist;
    });
    const hasOpenHouses = computed(() => {
      let getValueIfPropertyExist = Object.hasOwn(
        displayFlags.clientFlags,
        "has_open_house"
      );

      if (getValueIfPropertyExist && displayFlags.clientFlags.has_open_house) {
        const { activeRoutePath } = storeData.value;
        let dataSourceIsFromDetailedPage =
          activeRoutePath == "RentPageDetail" ||
          activeRoutePath == "SalesPageDetail"
            ? true
            : false;

        let startDate = dataSourceIsFromDetailedPage
          ? format(new Date(displayFlags.openHouses[0].start_date), "E,h")
          : format(new Date(displayFlags.hasOpenHouses[0].start_date), "E,h");

        let endDate = dataSourceIsFromDetailedPage
          ? format(new Date(displayFlags.openHouses[0].end_date), "ha")
          : format(new Date(displayFlags.hasOpenHouses[0].end_date), "E,h");
        let openDateDuration = `OPEN ${startDate}-${endDate}`;
        return openDateDuration;
      }
      return false;
    });
    const has3Dtour = computed(() => {
      let getValueIfPropertyExist = Object.hasOwn(
        displayFlags.clientFlags,
        "has_matterport"
      )
        ? displayFlags.clientFlags.has_matterport
        : false;
      return getValueIfPropertyExist;
    });
    const isNewPlan = computed(() => {
      let getValueIfPropertyExist = Object.hasOwn(
        displayFlags.clientFlags,
        "is_new_plan"
      )
        ? displayFlags.clientFlags.is_new_plan
        : false;
      return getValueIfPropertyExist;
    });
    const petsFriendly = computed(() => {
      let getCatValueIfPropertyExist = Object.hasOwn(
        displayFlags.clientFlags,
        "allows_cats"
      )
        ? displayFlags.clientFlags.allows_cats
        : false;
      let getDogValueIfPropertyExist = Object.hasOwn(
        displayFlags.clientFlags,
        "allows_dogs"
      )
        ? displayFlags.clientFlags.allows_dogs
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
      petsFriendly,
    };
  },
};
</script>
