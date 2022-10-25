import { computed } from "vue";
import store from "@/store";

export default function useSortListingsByAgentAndOthers(dataProperties) {
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
    listingsByOthers,
    listingsByAgent,
  };
}
