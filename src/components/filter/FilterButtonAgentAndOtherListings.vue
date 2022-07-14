<template>
  <switch-button-container 
    v-bind:class="{ 
      'border border-gray-300': isLoading,
      'hover:bg-gray-300': !isLoading 
    }">
    <switch-button-class-active 
      v-bind:class="{
        'border border-gray-300 bg-white rounded-lg h-11 transition duration-700': 
          isActiveBranch,
        'bg-gray-100': isLoading 
      }">
      <switch-button 
        id="Agent Listings" 
        v-bind:class="{ 'text-gray-400': isLoading }" 
        v-bind:disabled="isLoading">
        Agent Listings
        <span v-show="!isLoading" class="font-normal">({{ numberOfPropertyByAgent }})</span>
      </switch-button>
    </switch-button-class-active>
    <switch-button-class-active 
      v-bind:class="{
        'border border-gray-300 bg-white rounded-lg h-11 transition duration-700': !isActiveBranch,
         }">
      <switch-button 
        id="Other Listings"
        v-bind:class="{ 'text-gray-400': isLoading }" 
        v-bind:disabled="isLoading">
        Other
        <span v-show="!isLoading" class="font-normal">({{ numberOfPropertyByOther }})</span>
      </switch-button>
    </switch-button-class-active>
  </switch-button-container>
</template>
<script>
import { computed, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import {
  SwitchButton, 
  SwitchButtonContainer, 
  SwitchButtonClassActive 
} from "@/components/buttonui/index";
export default {
  name: "FilterButtonAgentAndOtherListings",
  components: {
    SwitchButton,
    SwitchButtonContainer,
    SwitchButtonClassActive
  },
  setup() {
    const store = useStore();
    const isLoading = ref(false);
    const numberOfPropertyByAgent = ref(Number);
    const numberOfPropertyByOther = ref(Number);
    const isActiveBranch = ref(Boolean);

    const loadingIsActive = computed(() => {
      return store.getters.getIsLoading;
    });
    const propertyListingsByAgent = computed(() => {
      return store.getters.getPropertyListingsByAgent;
    });
    const propertyListingsByOther = computed(() => {
      return store.getters.getPropertyListingsByNoneAgent;
    });
    const activeBranch = computed(() => {
      return store.getters.getActiveBranch;
    });
    watchEffect(() => {
      if (!activeBranch.value){
        store.commit("setActiveListBranch", "Agent Listings");
      }
    });
    watchEffect(() => {
      isLoading.value = loadingIsActive.value;
    });
    watchEffect(() => {
      isActiveBranch.value = 
        activeBranch.value === "Agent Listings" ? true : false;
    });
    watchEffect(() => {
      let numberByOther = propertyListingsByOther.value.length;
      numberOfPropertyByOther.value = numberByOther > 0 ? numberByAgent: 0;
      console.log("By Others:", numberOfPropertyByOther.value);

      let numberByAgent = propertyListingsByAgent.value.length;
      numberOfPropertyByAgent.value = numberByAgent > 0 ? numberByAgent: 0;
      console.log("By Agent:", numberOfPropertyByAgent.value);
    });
    return {
      isLoading,
      isActiveBranch,
      propertyListingsByAgent,
      propertyListingsByOther,
      numberOfPropertyByAgent,
      numberOfPropertyByOther
    }
  }
}
</script>