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
          v-bind:disableOnMobile="!openFilter"
          class="mf:hidden">
        </filter-button-home-types>
        <div>
          <li>
            <div class="mr-2">
              <button-slot v-on:click="openFilter = !openFilter">
                <span class="md:hidden xs:text-sm flex items-center">
                  <span v-show="!filterIsActive"><filter-icon/></span>
                  <span
                    v-show="filterIsActive" 
                    class="my-auto w-3 h-3 rounded-full bg-teal mr-1">
                  </span>
                  <span class="ml-1">Filters</span>
                </span>
                <span class="flex items-center sf:hidden lm:hidden">
                  <span v-show="!filterIsActive">
                    <filter-icon v-show="!isBuyPage"/>
                  </span>
                  <span
                    v-show="filterIsActive" 
                    class="my-auto w-3 h-3 rounded-full bg-teal mr-1">
                  </span>
                  <span class="ml-1">{{ isBuyPage ? "More" : "Filters" }}</span>
                  <chevron-down
                    v-show="isBuyPage"
                    v-bind:class="{
                      'transform rotate-180': openFilter
                    }"/>
                </span>
                <span class="hidden lm:flex lm:items-center">
                  <span
                    v-show="filterMoreIsActive" 
                    class="my-auto w-3 h-3 rounded-full bg-teal mr-1">
                  </span>
                  <span class="ml-1">More</span>
                  <chevron-down
                    v-bind:class="{
                      'transform rotate-180': openFilter
                    }"/>
                </span>
              </button-slot>
              <div 
                v-show="openFilter" 
                class="mf:z-50 mf:h-full mf:top-16 mf:fixed bg-white mf:w-full mf:right-0 overflow-hidden">
                <div class="hidden mf:m-3 mf:relative mf:flex mf:justify-end mf:pb-1">
                  <close-mobile-menu 
                    v-on:click="openFilter = !openFilter" 
                    class="text-teal-light"/>
                </div>
                <filter-button-more 
                  class="
                    lm:w-96 
                    lm:top-14 
                    lm:h-96 
                    lm:absolute 
                    lm:transform 
                    lm:-translate-x-3/4">
                  <button 
                    type="button" 
                    class="w-full my-2 bg-white border p-2 border-teal-light text-teal text-sm font-semibold rounded-lg hover:bg-teal-lighter hover:border-teal focus:bg-teal focus:text-white focus:border-teal">
                    Save Search
                  </button>
                  <button
                    v-on:click="openFilter = !openFilter" 
                    type="button" 
                    class="w-full my-2 bg-teal p-2 border border-teal-light text-white text-sm font-semibold rounded-lg hover:bg-teal-lighter hover:text-teal hover:border-teal focus:bg-teal focus:text-white focus:border-teal">
                    View Homes
                  </button>
                </filter-button-more>
              </div>
            </div>
          </li>
        </div>
        <button-slot 
          class="mf:hidden border-teal-light hover:bg-teal-lighter active:bg-teal-lighter text-teal">Save Search</button-slot>
      </button-box> 
    </div>
  </div>
</template>
<script>
import { ref, watchEffect, computed } from "vue";
import { useStore } from "vuex";
import { ButtonBox, ButtonSlot } from "@/components/buttonui";
import CloseMobileMenu from "@/assets/icons/CloseMobileMenu.vue";
import ChevronDown from "@/assets/icons/ChevronDown.vue";
import settingsData from "@/api/settingsData.json";
import {
  FilterButtonAgentAndOtherListings, 
  FilterButtonPriceRange,
  FilterButtonBedrooms,
  FilterButtonHomeTypes,
  FilterButtonMore,
  FilterButtonPets
} from "@/components/filter";
import FilterIcon from "@/assets/icons/FilterIcon.vue";
export default {
  components: {
    ButtonBox,
    ButtonSlot,
    FilterIcon,
    ChevronDown,
    FilterButtonPriceRange,
    FilterButtonBedrooms,
    FilterButtonMore,
    FilterButtonPets,
    FilterButtonAgentAndOtherListings,
    FilterButtonHomeTypes,
    CloseMobileMenu,
  },
  setup() {
    const openFilter = ref(false);
    const store = useStore();
    const isBuyPage = ref(Boolean);
    const routeNames = [...settingsData.routeNames];
    // const filterMoreActivated = ref(false);
    const getActiveRoutePath = computed(
      () => store.getters.getIsActiveRouteTab);
    const getFilterIsActivated = computed(
      () => store.getters.getFilterIsActive);
    const getFilterMoreIsActivated = computed(
      () => store.getters.getFilterMoreIsActive);
    watchEffect(() => {
      isBuyPage.value = 
        getActiveRoutePath.value == routeNames[0].id ? true : false;
    });
    return {
      openFilter,
      isBuyPage,
      filterIsActive: getFilterIsActivated,
      filterMoreIsActive: getFilterMoreIsActivated
    }
  }
}
</script>