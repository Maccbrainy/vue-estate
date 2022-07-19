<template>
  <switch-button-container 
    v-bind:class="{ 
      'border border-gray-300': loadingIsActive,
      'hover:bg-gray-300': !loadingIsActive 
    }">
    <switch-button-class-active 
      v-bind:class="{
        'border border-gray-300 bg-white rounded-lg h-11 transition duration-700': 
          isActiveBranch,
        'bg-gray-100': loadingIsActive 
      }">
      <switch-button 
        id="Agent Listings" 
        v-bind:class="{ 'text-gray-400': loadingIsActive }" 
        v-bind:disabled="loadingIsActive">
        Agent Listings
        <span v-show="!loadingIsActive" class="font-normal">({{ numberOfPropertyByAgent }})</span>
      </switch-button>
    </switch-button-class-active>
    <switch-button-class-active 
      v-bind:class="{
        'border border-gray-300 bg-white rounded-lg h-11 transition duration-700': !isActiveBranch,
         }">
      <switch-button 
        id="Other Listings"
        v-bind:class="{ 'text-gray-400': loadingIsActive }" 
        v-bind:disabled="loadingIsActive">
        Other
        <span v-show="!loadingIsActive" class="font-normal">({{ numberOfPropertyByOther }})</span>
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
    // const isLoading = ref(false);
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

    const getNumberOfActiveProperties = computed(() => {
      return store.getters.getActiveListing.length;
    });
    const numberOfActiveProperties = computed(() => {
      return getNumberOfActiveProperties.value > 0 
        ? getNumberOfActiveProperties.value 
        : 0;
    }) 
    watchEffect(() => {
      isActiveBranch.value = 
        activeBranch.value === "Agent Listings" ? true : false;

      numberOfPropertyByAgent.value = isActiveBranch.value 
        ? numberOfActiveProperties.value 
        : propertyListingsByAgent.value.length > 0
        ? propertyListingsByAgent.value.length
        : 0;
      console.log("By Agent:", numberOfPropertyByAgent.value);

      numberOfPropertyByOther.value = !isActiveBranch.value
        ? numberOfActiveProperties.value
        : propertyListingsByOther.value.length > 0
        ? propertyListingsByOther.value.length
        : 0;
      console.log("By Others:", numberOfPropertyByOther.value);
    });
    return {
      loadingIsActive,
      isActiveBranch,
      propertyListingsByAgent,
      propertyListingsByOther,
      numberOfPropertyByAgent,
      numberOfPropertyByOther
    }
  }
}
</script>