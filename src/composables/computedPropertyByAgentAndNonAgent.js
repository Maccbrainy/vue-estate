import { computed, watchEffect, ref } from "vue";
import { useStore } from "vuex";

export default function computedPropertyByAgentAndNonAgent(discoveredHomes){
  const store = useStore();
  const agentListIsActive = ref(null);
  const activeListing = ref({});

  const listingsByAgent = computed(() => {
    let byAgent = discoveredHomes.filter(
      (property) => property["listing_by_Agent"]);
    store.commit("setListingsByAgent", byAgent);
    return byAgent;
  });

  const listingsByOthers = computed(() => {
    let byNonAgent = discoveredHomes.filter(
      (property) => !property["listing_by_Agent"]);
    // store.commit("setListingsByNoneAgent", byNonAgent);
    return byNonAgent;
  });

  const listingBranchByAgent = computed(() => {
    return store.getters.getListingBranchByAgent;
  });
  watchEffect(() =>{
    let isActive = listingBranchByAgent.value === "active" ? true : false;
    agentListIsActive.value = isActive;

    let updateListingByOthersWhenAgentIsActive = isActive 
      ? listingsByOthers.value 
      : listingsByOthers.value; 

    store.commit(
      "setListingsByNoneAgent", 
      updateListingByOthersWhenAgentIsActive
    );
  
    activeListing.value = agentListIsActive.value 
      ? listingsByAgent.value 
      : listingsByOthers.value;
    store.commit("setActiveListing", activeListing.value);
    console.log("Agent Branch Is Active", agentListIsActive.value);
  });
  return {
    activeListing,
    listingsByOthers,
    listingsByAgent,
    agentListIsActive
  }
}