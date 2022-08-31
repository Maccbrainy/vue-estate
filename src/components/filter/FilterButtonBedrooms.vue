<template>
  <div>
    <dropdown-button
      v-bind:filterActivated="buttonActivated" 
      v-bind:buttonTitle="bedRoomFilterTitle" 
      menuTitle="Bedrooms">
      <filter-core-bedrooms></filter-core-bedrooms>
    </dropdown-button>
  </div>
</template>
<script>
import { computed } from "vue";
import { DropdownButton } from "@/components/buttonui/index";
import { useStore } from "vuex";
import { FilterCoreBedrooms } from "@/components/filter";
import settingsData from "@/api/settingsData.json";
export default ({
  name: "FilterButtonBedrooms",
  components: {
    DropdownButton,
    FilterCoreBedrooms
  },
  setup() {
    const store = useStore();
    const bedOptions = [...settingsData.bedOptions];
    const bedRoomFilterTitle = computed(() => store.getters.getBedroomInfo)
    const buttonActivated = computed(() =>
      bedRoomFilterTitle.value == bedOptions[0].id ? false : true
    );
    return {
      bedRoomFilterTitle,
      buttonActivated
    }
  }
})
</script>