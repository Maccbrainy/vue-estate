<template>
  <div>
    <dropdown-button-multi-check-boxes 
      v-model:value="checkedHomeType"
      v-on:change="checkedSignal" 
      v-bind:propertyOptions="listOptions">
    </dropdown-button-multi-check-boxes>
  </div>
</template>
<script>
import { computed, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { DropdownButtonMultiCheckBoxes } from "@/components/buttonui/index";
import settingsData from "@/api/settingsData.json";
export default ({
  name: "FilterCoreHomeTypes",
  props: {
    listOptions: {
      type: Array
    }
  },
  components: {
    DropdownButtonMultiCheckBoxes
  },
  setup(props) {
    const store = useStore();
    let checkedHomeType = ref([]);
    const routeNames = ref([...settingsData.routeNames]);

    const getActiveRoutePath = computed(
      () => store.getters.getIsActiveRouteTab);

    watchEffect(() => {
      let activeRoute = getActiveRoutePath.value;
      let defaultTitle = 
        activeRoute == routeNames.value[1].id 
          ? "All Rental Types" 
          : "All Home Types";

      let typeTitle = 
        checkedHomeType.value.length == 0
          ? defaultTitle
          : checkedHomeType.value.length == 1 
          ? getHomeTypeTitle(props.listOptions, checkedHomeType.value[0])
          : `Home Types (${checkedHomeType.value.length})`;
      store.commit("setHomeTypeTitleInfo", typeTitle);
    });

    const getHomeTypeTitle = (types, theCheckedTypeId) => {
      let typeChecked = types.filter((type) => type.id === theCheckedTypeId);
      return typeChecked[0].title;
    };

    function checkedSignal(){
      store.commit("setHomeType", checkedHomeType.value);
    };

    return {
      checkedSignal,
      checkedHomeType
    }
  }
})
</script>