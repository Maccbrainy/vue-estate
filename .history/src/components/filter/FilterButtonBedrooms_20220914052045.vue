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
import { ref, computed } from "vue";
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
    const storeData = computed(() => store.getters.getStore);
    const bedRoomFilterTitle = ref(
      storeData.value.filterDescriptionInfo.bedroom);
    const buttonActivated = computed(() => {
      console.log("BED TITLE:", storeData.value.filterDescriptionInfo.bedroom)
      return storeData.value.filterDescriptionInfo.bedroom == bedOptions[0].id ? false : true
    }
  );
    return {
      bedRoomFilterTitle,
      buttonActivated
    }
  }
})
</script>