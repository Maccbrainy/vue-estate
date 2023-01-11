<template>
  <div>
    <div class="text-xl text-gray-700 font-normal mb-7">
      <p>
        Nothing turned up in {{ listingBranch }} listings, but we did find
        <span class="text-gray-800 font-semibold">{{ numberOfListings }}</span>
        listed {{ singularPluralWord ? `homes` : `home` }} that match your
        search.
      </p>
    </div>
    <button
      type="button"
      v-on:click="seeTheHomes"
      class="
        bg-red-600
        px-4
        py-2
        text-white text-base
        font-bold
        rounded-lg
        border border-red-600
        hover:bg-transparent hover:text-red-600
        focus:bg-red-50 focus:text-red-600
      "
    >
      {{ singularPluralWord ? `See the Homes` : `See the Home` }}
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
    const storeData = computed(() => store.getters.getStore);

    const numberOfListings = computed(() => {
      const {
        totalItemsMatchRows,
        propertyListingsByAgent,
        propertyListingsByNoneAgent,
      } = storeData.value;

      return propertyListingsByAgent.length == 0
        ? `${propertyListingsByNoneAgent.length.toLocaleString()} other`
        : propertyListingsByNoneAgent.length == 0
        ? `${totalItemsMatchRows.toLocaleString()} agent`
        : "";
    });

    const listingBranch = computed(() => {
      return storeData.value.activeListBranch == "Agent Listings"
        ? "agent"
        : "other";
    });

    function seeTheHomes() {
      let changeActiveListingBranch =
        storeData.value.activeListBranch == "Agent Listings"
          ? "Other Listings"
          : "Agent Listings";
      store.commit("setActiveListBranch", changeActiveListingBranch);
    }

    const singularPluralWord = computed(() => {
      return storeData.value.propertyListingsByAgent.length > 1 ||
        storeData.value.propertyListingsByNoneAgent.length > 1
        ? true
        : false;
    });

    return {
      listingBranch,
      numberOfListings,
      seeTheHomes,
      singularPluralWord,
    };
  },
};
</script>
