<template>
  <div>
    <dropdown-button-select-box>
      <dropdown-button-select 
        v-model="sorting"
        v-on:change="selectSignal" 
        class="shadow-none border-none text-gray-600 font-medium">
        <dropdown-button-select-option 
          v-for="option in sortOptions" 
          v-bind:key="option.id"
          v-bind:value="option.id">
          Sort: {{ option.title }}
        </dropdown-button-select-option>
      </dropdown-button-select>
    </dropdown-button-select-box>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { 
  DropdownButtonSelect, 
  DropdownButtonSelectOption, 
  DropdownButtonSelectBox 
} from "@/components/buttonui";
import settingsData from "@/api/settingsData.json";
export default {
  name: "FilterButtonSorting",
  components: {
    DropdownButtonSelect,
    DropdownButtonSelectOption,
    DropdownButtonSelectBox
  }, 
  setup() {
    const sortOptions = ref([...settingsData.sortOptions]);
    const store = useStore();
    const storeData = computed(() => store.getters.getStore);
    const sorting = ref(
      storeData.value.propertyFilters.sorting || sortOptions.value[0].id);

    function selectSignal(){
      store.commit("setPropertySorting", sorting.value);
    }
    return {
      sortOptions,
      sorting,
      selectSignal,
      storeData
    }
  },
}
</script>