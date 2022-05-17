import { computed } from "vue";
export default function useListingTitle(searchTerm, cityProp) {
  const listingTitle = computed(() => {
    return /^\d+$/.test(searchTerm) 
      ? `Homes For Sale & Real Estates in ${searchTerm}`
      : cityProp 
      ? `${cityProp}, ${searchTerm} Homes For Sale & Real Estates`
      : `${searchTerm} Homes For Sale & Real Estates`;
  });
  return {
    listingTitle,
  }
}