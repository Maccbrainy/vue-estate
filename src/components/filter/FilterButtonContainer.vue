<template>
  <div class="sticky top-16 w-full h-16 bg-white z-40">
    <div class="flex align-center px-4 pt-2 pb-4 mb-2">
      <button-box class="mf:justify-between">
        <filter-button-agent-and-other-listings
          v-bind:class="{'hidden':isNotBuyPage}">
        </filter-button-agent-and-other-listings>
        <filter-button-price-range class="mf:hidden"></filter-button-price-range>
        <filter-button-bedrooms class="mf:hidden"></filter-button-bedrooms>
        <filter-button-home-types class="mf:hidden"></filter-button-home-types>
        <filter-button-more></filter-button-more>
      </button-box> 
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { ref, computed, watchEffect } from "vue";
import { ButtonBox } from "@/components/buttonui";
import {
  FilterButtonAgentAndOtherListings, 
  FilterButtonPriceRange,
  FilterButtonBedrooms,
  FilterButtonHomeTypes,
  FilterButtonMore
} from "@/components/filter";
export default {
  components: {
    ButtonBox,
    FilterButtonPriceRange,
    FilterButtonBedrooms,
    FilterButtonMore,
    FilterButtonAgentAndOtherListings,
    FilterButtonHomeTypes,
  },
  setup() {
    const store = useStore();
    const isNotBuyPage = ref(false);
    const getActiveRoutePath = computed(() => {
      return store.getters.getIsActiveRouteTab;
    });
    watchEffect(() => {
      isNotBuyPage.value = getActiveRoutePath.value != "BuyPage" ? true : false;
    });
    return {
      isNotBuyPage
    }
  }
}
</script>