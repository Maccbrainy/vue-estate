<template>
  <div>
    <dropdown-button-select-box>
      <dropdown-button-select
        v-model="sortType"
        v-on:change="selectSortType"
        class="shadow-none border-none text-gray-600 font-medium"
      >
        <dropdown-button-select-option
          v-for="option in sortOptions"
          v-bind:key="option.id"
          v-bind:value="option.id"
        >
          Sort: {{ option.title }}
        </dropdown-button-select-option>
      </dropdown-button-select>
    </dropdown-button-select-box>
  </div>
</template>
<script>
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import {
  DropdownButtonSelect,
  DropdownButtonSelectOption,
  DropdownButtonSelectBox,
} from "@/components/buttonui";
import settingsData from "@/api/settingsData.json";
export default {
  name: "FilterButtonSorting",
  components: {
    DropdownButtonSelect,
    DropdownButtonSelectOption,
    DropdownButtonSelectBox,
  },
  setup() {
    const route = useRoute();
    const sortOptions = ref([...settingsData.sortOptions]);
    const store = useStore();
    const storeData = computed(() => store.getters.getStore);
    const sortType = ref(
      storeData.value.propertyFilters.sorting || sortOptions.value[0].id
    );

    function selectSortType() {
      let sortOption =
        sortType.value == sortOptions.value[0].id ? "" : sortType.value;
      store.commit("setPropertySorting", sortOption);
    }
    onBeforeMount(() => {
      if (route.query.sortType) {
        sortType.value = route.query.sortType;
        store.commit("setPropertySorting", route.query.sortType);
      }
    });

    return {
      sortOptions,
      sortType,
      selectSortType,
      storeData,
    };
  },
};
</script>
