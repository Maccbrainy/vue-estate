<template>
  <div>
    <dropdown-button-select-box>
      <dropdown-button-select 
        v-model="sorting"
        v-on:change="selectSignal" 
        class="shadow-none border-none">
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
import { ref } from "vue";
import { useStore } from "vuex";
import { 
  DropdownButtonSelect, 
  DropdownButtonSelectOption, 
  DropdownButtonSelectBox 
} from "@/components/buttonui";

export default {
  name: "FilterButtonSorting",
  components: {
    DropdownButtonSelect,
    DropdownButtonSelectOption,
    DropdownButtonSelectBox
  }, 
  setup() {
    const sortOptions = ref([
      {
        id: "relevance",
        title: "Relevance",
      },
      {
        id: "newest",
        title: "Newest Listings",
      },
      {
        id: "price_high",
        title: "Price High",
      },
      {
        id: "price_low",
        title: "Price Low",
      },
      {
        id: "photos",
        title: "Most Photos",
      },
      {
        id: "sqft_high",
        title: "Sqft High",
      },
    ]);
    const store = useStore();
    const sorting = ref(sortOptions.value[1].id);

    function selectSignal(){
      store.commit("setPropertySorting", sorting.value);
    }
    return {
      sortOptions,
      sorting,
      selectSignal
    }
  },
}
</script>