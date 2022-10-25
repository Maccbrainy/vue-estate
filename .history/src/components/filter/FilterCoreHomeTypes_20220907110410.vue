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
    const getHomeTypes = computed(() => store.getters.getHomeType);
    let checkedHomeType = ref([...getHomeTypes.value]);
    const routeNames = ref([...settingsData.routeNames]);

    const getActiveRoutePath = computed(
      () => store.getters.getIsActiveRouteTab);

    const defaultTitle = computed(() => {
      let title = 
        getActiveRoutePath.value == routeNames.value[1].id 
          ? "All Rental Types" 
          : "All Home Types";
      return title;
    });
    watchEffect(() => {
      let typeTitle = 
        checkedHomeType.value.length == 0
          ? defaultTitle.value
          : checkedHomeType.value.length == 1 
          ? getHomeTypeTitle(props.listOptions, checkedHomeType.value[0])
          : `Home Types (${checkedHomeType.value.length})`;
      store.commit("setHomeTypeTitleInfo", typeTitle);
    });

    function getHomeTypeTitle(types, theCheckedTypeId){
      let typeChecked = types.filter((type) => type.id === theCheckedTypeId);
      return typeChecked[0].title;
    };

    function checkedSignal(){
      store.commit("setHomeType", checkedHomeType.value);
    };

    return {
      checkedSignal,
      defaultTitle,
      checkedHomeType
    }
  }
})
</script>