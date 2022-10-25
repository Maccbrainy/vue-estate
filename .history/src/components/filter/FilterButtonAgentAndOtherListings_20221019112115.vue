<template>
  <div v-show="isBuyPage" class="relative flex justify-between">
    <div
      v-for="(type, arrayIndex) in agentType"
      :key="type.id"
      class="relative w-auto h-auto -mr-1"
    >
      <button
        v-on:click="activateListingBranch(event, type, arrayIndex)"
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
          text-gray-800
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
        <span class="z-10">{{ type.title }}</span>
        <span class="xxs:hidden z-10 font-normal px-1">{{
          arrayIndex == 0
            ? `(${numberOfPropertyByAgent})`
            : `(${numberOfPropertyByOther})`
        }}</span>
      </button>
    </div>
  </div>
</template>
<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import settingsData from "@/api/settingsData.json";
export default {
  name: "FilterButtonAgentAndOtherListings",
  setup() {
    const store = useStore();
    const agentType = [...settingsData.agentType];
    const routeNames = [...settingsData.routeNames];
    const buttonSelectionIndex = ref(0);

    const storeData = computed(() => store.getters.getStore);
    const isBuyPage = computed(() =>
      storeData.value.activeRoutePath == routeNames[0].id ? true : false
    );

    const activateListingBranch = (_, type, arrayIndex) => {
      buttonSelectionIndex.value = arrayIndex;
      store.commit("setActiveListBranch", type.id);
    };

    const numberOfActiveListing = computed(() => {
      return storeData.value.activeListing.length > 0
        ? storeData.value.activeListing.length
        : 0;
    });

    const numberOfPropertyByAgent = computed(() => {
      let numberAgent =
        storeData.value.activeListBranch == !agentType[1].id
          ? numberOfActiveListing.value
          : storeData.value.propertyListingsByAgent.length > 0
          ? storeData.value.propertyListingsByAgent.length
          : 0;
      console.log("By Agent:", numberAgent);
      return numberAgent;
    });
    const numberOfPropertyByOther = computed(() => {
      let numberOther =
        storeData.value.activeListBranch == agentType[1].id
          ? numberOfActiveListing.value
          : storeData.value.propertyListingsByNoneAgent.length > 0
          ? storeData.value.propertyListingsByNoneAgent.length
          : 0;
      console.log("By Others:", numberOther);
      return numberOther;
    });
    return {
      isBuyPage,
      agentType,
      buttonSelectionIndex,
      storeData,
      numberOfPropertyByAgent,
      numberOfPropertyByOther,
      activateListingBranch,
    };
  },
};
</script>
