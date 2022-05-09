<template>
  <div>
    <h2 class="text-2xl text-gray-700 font-medium mb-7">
      Nothing turned up in {{ listingBranch }} listings, but we did find 
      {{ numberOfListings }} 
      listed {{ singularPluralWord ? `homes` : `home` }} that match your search.
    </h2>
    <button 
      type="button"
      v-on:click="seeTheHomes" 
      class="bg-red-600 px-4 py-2 text-white text-base font-bold rounded-lg border border-red-600 hover:bg-transparent hover:text-red-600 focus:bg-red-50 focus:text-red-600">
      {{ singularPluralWord ? `See the Homes` : `See the Home`}}
    </button>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "NoSearchTermForAgentOrOtherListings",
  setup() {
    const store = useStore();
    const numberOfListingsByAgent = computed(() => {
      return store.getters.getPropertyListingsByAgent.length;
    });
    const numberOfListingsByOthers = computed(() => {
      return store.getters.getPropertyListingsByNoneAgent.length;
    });
    const numberOfListings = computed(() => {
      return numberOfListingsByAgent.value == 0 
        ? `${numberOfListingsByOthers.value} other` 
        : numberOfListingsByOthers.value == 0 
        ? `${numberOfListingsByAgent.value} agent` 
        : null
    })
    const listingBranchByAgent = computed(() => {
      return store.getters.getListingBranchByAgent;
    });
    const listingBranch = computed(() => {
      return listingBranchByAgent.value == "active" ? "agent" : "other"
    });

    function seeTheHomes(){
      let changeActiveListingBranch = 
        listingBranchByAgent.value == "active" ? "not_active" : "active" 
      store.commit("setListingBranchByAgent", changeActiveListingBranch);
    };

    const singularPluralWord = computed(() => {
      return numberOfListingsByAgent.value > 1 || 
        numberOfListingsByOthers.value > 1 
        ? true 
        : false
    })

    return {
      listingBranch,
      numberOfListings,
      numberOfListingsByAgent,
      numberOfListingsByOthers,
      seeTheHomes,
      singularPluralWord
    }
  },
}
</script>