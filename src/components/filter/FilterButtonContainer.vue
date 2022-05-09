<template>
  <div class="sticky top-16 w-full h-16 bg-white z-40">
    <div class="flex align-center px-4 pt-2 pb-4 mb-2">
      <button-box>
        <filter-button-agent-and-other-listings></filter-button-agent-and-other-listings>
        <filter-button-price-range></filter-button-price-range>
        <filter-button-bedrooms></filter-button-bedrooms>
        <filter-button-home-types></filter-button-home-types>
        <filter-button-more></filter-button-more>
      </button-box> 
    </div>
  </div>
</template>
<script>
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
  }
}
</script>