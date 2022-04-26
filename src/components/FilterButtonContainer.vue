<template>
  <div class="sticky top-16 w-full h-16 bg-white z-40">
    <div class="flex align-center px-4 pt-2 pb-4 mb-2">
      <button-box>
        <filter-button-toggle-active></filter-button-toggle-active>
        <filter-button-range></filter-button-range>
        <filter-button-group></filter-button-group>
        <filter-button-check-boxes></filter-button-check-boxes>
        <filter-button-more></filter-button-more>
      </button-box> 
    </div>
  </div>
</template>
<script>
import { ButtonBox } from "@/components/buttonui/index";
// import FilterButtonLists from "@/components/FilterButtonLists.vue";
import FilterButtonToggleActive from "@/components/FilterButtonToggleActive.vue";
import FilterButtonRange from "@/components/FilterButtonRange.vue";
import FilterButtonGroup from "@/components/FilterButtonGroup.vue";
import FilterButtonCheckBoxes from "@/components/FilterButtonCheckBoxes.vue";
import FilterButtonMore from "@/components/FilterButtonMore.vue";
export default {
  components: {
    ButtonBox,
    // FilterButtonLists,
    FilterButtonRange,
    FilterButtonGroup,
    FilterButtonMore,
    FilterButtonToggleActive,
    FilterButtonCheckBoxes,
  }
}
</script>