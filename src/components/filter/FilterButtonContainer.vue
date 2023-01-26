<template>
  <div class="sticky top-16 w-full h-16 bg-white z-20">
    <div class="flex items-center justify-between px-4 pt-2 pb-4 mb-2">
      <button-box class="xlm:justify-between">
        <filter-button-agent-and-other-listings>
        </filter-button-agent-and-other-listings>
        <filter-button-price-range class="xlm:hidden">
        </filter-button-price-range>
        <filter-button-bedrooms class="xlm:hidden"></filter-button-bedrooms>
        <filter-button-pets class="xlm:hidden"></filter-button-pets>
        <filter-button-home-types
          v-bind:disableOnMobile="!openFilter"
          class="xlm:hidden"
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
          v-on:click="saveSearchCallback"
          class="
            hidden
            border-teal-light
            hover:bg-teal-lighter
            active:bg-teal-lighter
            text-teal
          "
          >Save Search</button-slot
        >
      </button-box>
      <button-group-multi-buttons
        class="xlm:hidden"
        v-bind:options="showOrHideMapView"
        v-bind:isActiveTab="activeMapViewVariant"
        v-on:getOptionId="toggleMapHandler"
      >
      </button-group-multi-buttons>
    </div>
  </div>
</template>
<script>
import { ref, computed, inject } from "vue";
import { useStore } from "vuex";
import {
  ButtonBox,
  ButtonSlot,
  DropdownButton,
  ButtonGroupMultiButtons,
} from "@/components/buttonui";
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
    ButtonGroupMultiButtons,
  },
  setup() {
    const { saveSearchCallback, toggleMapHandler, activeMapViewVariant } =
      inject("provider");
    const openFilter = ref(false);
    const store = useStore();
    const storeData = computed(() => store.getters.getStore);
    const showOrHideMapView = [
      {
        id: "ListViewNoMapLayout",
        name: "List",
      },
      {
        id: "MapViewLayout",
        name: "Map",
      },
    ];
    return {
      saveSearchCallback,
      openFilter,
      storeData,
      toggleMapHandler,
      showOrHideMapView,
      activeMapViewVariant,
    };
  },
};
</script>
