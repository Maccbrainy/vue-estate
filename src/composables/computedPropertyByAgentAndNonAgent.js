import { computed, watchEffect, ref } from "vue";
import { useStore } from "vuex";

export default function computedPropertyByAgentAndNonAgent(discoveredHomes){
  const store = useStore();
  const agentListIsActive = ref(null);
  const activeListing = ref({});

  console.log("DiscoveredHomes:", discoveredHomes);
  const listingsByAgent = computed(() => {
    let byAgent = discoveredHomes.filter(
      (property) => property.agents[0].primary == true);
    store.commit("setListingsByAgent", byAgent);
    return byAgent;
  });

  const listingsByOthers = computed(() => {
    let byNoneAgent = discoveredHomes.filter(
      (property) => property.agents[0].primary == false);
    // store.commit("setListingsByNoneAgent", byNonAgent);
    return byNoneAgent;
  });

  const listingBranchByAgent = computed(() => {
    return store.getters.getListingBranchByAgent;
  });
  watchEffect(() =>{
    agentListIsActive.value = 
      listingBranchByAgent.value === "active" ? true : false;

    //update Listing ByOthers When Agent Is Active
    if (agentListIsActive.value ){
      store.commit("setListingsByNoneAgent", listingsByOthers.value);
    };
    //update Listing ByAgent When Other Is Active
    if (!agentListIsActive.value){
      store.commit("setListingsByAgent", listingsByAgent.value);
      store.commit("setListingsByNoneAgent", listingsByOthers.value);
    }

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