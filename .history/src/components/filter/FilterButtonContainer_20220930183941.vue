<template>
  <div class="sticky top-16 w-full h-16 bg-white z-40">
    <div class="flex align-center px-4 pt-2 pb-4 mb-2">
      <button-box class="mf:justify-between">
        <filter-button-agent-and-other-listings>
        </filter-button-agent-and-other-listings>
        <filter-button-price-range class="mf:hidden">
        </filter-button-price-range>
        <filter-button-bedrooms class="mf:hidden"></filter-button-bedrooms>
        <filter-button-pets class="mf:hidden"></filter-button-pets>
        <filter-button-home-types
          v-if="true"
          v-bind:disableOnMobile="!openFilter"
          class="mf:hidden"
        >
        </filter-button-home-types>
        <div>
          <dropdown-button
            v-bind:isAdvancedDropdown="true"
            buttonTitle=""
            menuTitle=""
            v-bind:filterActivated="false"
            v-bind:filterMoreActivated="
              storeData.filterDescriptionInfo.filterMoreIsActive
            "
          >
            <template v-slot:moreAdvancedButtons>
              <filter-button-more></filter-button-more>
            </template>
          </dropdown-button>
        </div>
        <button-slot
          class="
            mf:hidden
            border-teal-light
            hover:bg-teal-lighter
            active:bg-teal-lighter
            text-teal
          "
          >Save Search</button-slot
        >
      </button-box>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { ButtonBox, ButtonSlot, DropdownButton } from "@/components/buttonui";
import {
  FilterButtonAgentAndOtherListings,
  FilterButtonPriceRange,
  FilterButtonBedrooms,
  FilterButtonHomeTypes,
  FilterButtonMore,
  FilterButtonPets,
} from "@/components/filter";
export default {
  components: {
    ButtonBox,
    ButtonSlot,
    FilterButtonPriceRange,
    FilterButtonBedrooms,
    FilterButtonMore,
    FilterButtonPets,
    FilterButtonAgentAndOtherListings,
    FilterButtonHomeTypes,
    DropdownButton,
  },
  setup() {
    const openFilter = ref(false);
    const store = useStore();
    const storeData = computed(() => store.getters.getStore);
    return {
      openFilter,
      storeData,
    };
  },
};
</script>
