import { computed, ref } from "vue";
import store from "@/store";

export default function useSortListingsByAgentAndOthers(dataProperties){
  const agentListingIsActive = ref(null);
  // const activeListings = ref({});

  const listingsByAgent = computed(() => {
    let byAgent = dataProperties;
    return byAgent;
  });
  store.commit("setListingsByAgent", listingsByAgent.value);

  const listingsByOthers = computed(() => {
    let byNoneAgent = "";
    return byNoneAgent;
  });
  store.commit("setListingsByNoneAgent", listingsByOthers.value);
  return {
    // activeListings,
    listingsByOthers,
    listingsByAgent,
    agentListingIsActive
  }
}