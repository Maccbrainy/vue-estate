<template>
  <div>
    <dropdown-button 
      v-bind:filterActivated="buttonActivated" 
      v-bind:buttonTitle="homeTypeTitle" 
      menuTitle="Home Type">
      <dropdown-button-multi-check-boxes 
        v-model:value="checkedHomeType"
        v-on:change="checkedSignal" 
        v-bind:propertyOptions="homeTypes">
      </dropdown-button-multi-check-boxes>
    </dropdown-button>
  </div>
</template>
<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { 
  DropdownButton, 
  DropdownButtonMultiCheckBoxes 
} from "@/components/buttonui/index";
export default ({
  name: "FilterButtonHomeTypes",
  components: {
    DropdownButton,
    DropdownButtonMultiCheckBoxes
  },
  setup() {
    const store = useStore();
    const allHomeTypesTitle = "All Home Types";
    let checkedHomeType = ref([]);
    const homeTypes = ref([
      {
        id: "single_family",
        title: "House"
      },
      {
        id: "condo",
        title: "Condo"
      },
      {
        id: "land",
        title: "Land"
      },
      {
        id: "multi_family",
        title: "Multi-Family"
      },
      {
        id: "mobile",
        title: "Mobile"
      },
      {
        id: "farm",
        title: "Farm"
      },
      {
        id: "other",
        title: "Other"
      },
    ]);

    function checkedSignal(){
      store.commit("setHomeType", checkedHomeType.value);
    };

    const homeTypeTitle = computed(() => {
      return checkedHomeType.value.length == 0
        ? allHomeTypesTitle
        : checkedHomeType.value.length == 1 
        ? getHomeTypeTitle(homeTypes.value, checkedHomeType.value[0])
        : `Home Types (${checkedHomeType.value.length})`
    });

    const getHomeTypeTitle = (types, theCheckedTypeId) => {
      let typeChecked = types.filter((type) => type.id === theCheckedTypeId);
      return typeChecked[0].title;
    }
    const buttonActivated = computed(() => {
      return homeTypeTitle.value == allHomeTypesTitle ? false : true;
    });
    return {
      homeTypes,
      checkedSignal,
      checkedHomeType,
      homeTypeTitle,
      buttonActivated
    }
  }
})
</script>