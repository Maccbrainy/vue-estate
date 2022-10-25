<template>
  <div class="relative flex justify-between">
    <div
      v-for="(title, arrayIndex) in [
        `Agent Listings (${numberOfPropertyByAgent})`,
        `Other (${numberOfPropertyByOther})`,
      ]"
      :key="title"
      class="relative w-auto h-auto -mr-1"
    >
      <button
        v-on:click="getScheduleTourType(event, title, arrayIndex)"
        :id="title"
        type="button"
        :class="{ 'transform -translate-x-3': arrayIndex == 1 }"
        class="
          flex
          justify-center
          items-center
          w-full
          h-full
          text-base
          font-medium
          text-gray-700
          px-6
          py-2
          rounded-lg
          outline-none
          bg-gray-100
          hover:bg-gray-200
        "
      >
        <span
          :class="{
            'absolute w-full px-6 py-2 h-full bg-white border rounded-lg z-10':
              arrayIndex == buttonSelectionIndex,
            'transform translate-x-0': arrayIndex == 0,
          }"
        ></span>
        <span class="z-10">{{ title }}</span>
      </button>
    </div>
  </div>
  <switch-button-container
    v-show="isBuyPage"
    v-bind:class="{
      'border border-gray-300': loadingIsActive,
      'hover:bg-gray-300': isActiveBranch,
    }"
  >
    <button
      v-on:click="activateListingBranch"
      :id="agentType[0].id"
      v-bind:class="{
        'border border-gray-300 bg-white rounded-lg transition duration-700':
          isActiveBranch,
        'bg-gray-100': loadingIsActive,
      }"
    >
      <switch-button
        class="pr-4"
        :id="agentType[0].id"
        v-bind:class="{ 'text-gray-400': loadingIsActive }"
        v-bind:disabled="loadingIsActive"
      >
        <span>{{ agentType[0].title }}</span>
        <span v-show="!loadingIsActive" class="xxs:hidden font-normal ml-1"
          >({{ numberOfPropertyByAgent }})</span
        >
      </switch-button>
    </button>
    <button
      v-on:click="activateListingBranch"
      :id="agentType[1].id"
      v-bind:class="{
        'border border-gray-300 bg-white rounded-lg transition duration-700':
          !isActiveBranch,
      }"
    >
      <switch-button
        :id="agentType[1].id"
        v-bind:class="{ 'text-gray-400': loadingIsActive }"
        v-bind:disabled="loadingIsActive"
      >
        <span>{{ agentType[1].title }} </span>
        <span v-show="!loadingIsActive" class="xxs:hidden font-normal ml-1">
          ({{ numberOfPropertyByOther }})</span
        >
      </switch-button>
    </button>
  </switch-button-container>
</template>
<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import {
  SwitchButton,
  SwitchButtonContainer,
} from "@/components/buttonui/index";
import settingsData from "@/api/settingsData.json";
export default {
  name: "FilterButtonAgentAndOtherListings",
  components: {
    SwitchButton,
    SwitchButtonContainer,
  },
  setup() {
    const store = useStore();
    const agentType = [...settingsData.agentType];
    const routeNames = [...settingsData.routeNames];

    const buttonSelectionIndex = ref(0);

    const getScheduleTourType = (_, title, arrayIndex) => {
      buttonSelectionIndex.value = arrayIndex;
    };

    const loadingIsActive = computed(() => store.getters.getIsLoading);
    const activeBranch = computed(() => store.getters.getActiveBranch);
    const getActiveRoutePath = computed(
      () => store.getters.getIsActiveRouteTab
    );
    const propertyListingsByAgent = computed(
      () => store.getters.getPropertyListingsByAgent
    );
    const propertyListingsByOther = computed(
      () => store.getters.getPropertyListingsByNoneAgent
    );
    const getNumberOfActiveProperties = computed(
      () => store.getters.getActiveListing.length
    );

    const numberOfActiveProperties = computed(() => {
      return getNumberOfActiveProperties.value > 0
        ? getNumberOfActiveProperties.value
        : 0;
    });
    const activateListingBranch = (e) => {
      if (e.target.parentNode.id != activeBranch.value) {
        switch (e.target.parentNode.id) {
          case agentType[1].id:
            store.commit("setActiveListBranch", agentType[1].id);
            break;
          case agentType[0].id:
            store.commit("setActiveListBranch", agentType[0].id);
            break;
        }
      }
    };
    const isBuyPage = computed(() =>
      getActiveRoutePath.value == routeNames[0].id ? true : false
    );
    const isActiveBranch = computed(() =>
      activeBranch.value == agentType[1].id ? false : true
    );
    const numberOfPropertyByAgent = computed(() => {
      let numberAgent = isActiveBranch.value
        ? numberOfActiveProperties.value
        : propertyListingsByAgent.value.length > 0
        ? propertyListingsByAgent.value.length
        : 0;
      console.log("By Agent:", numberAgent);
      return numberAgent;
    });
    const numberOfPropertyByOther = computed(() => {
      let numberOther = !isActiveBranch.value
        ? numberOfActiveProperties.value
        : propertyListingsByOther.value.length > 0
        ? propertyListingsByOther.value.length
        : 0;
      console.log("By Others:", numberOther);
      return numberOther;
    });
    return {
      isBuyPage,
      agentType,
      buttonSelectionIndex,
      activateListingBranch,
      loadingIsActive,
      isActiveBranch,
      propertyListingsByAgent,
      propertyListingsByOther,
      numberOfPropertyByAgent,
      numberOfPropertyByOther,
      getScheduleTourType,
    };
  },
};
</script>
