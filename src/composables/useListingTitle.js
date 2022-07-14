import { computed, ref } from "vue";
export default function useListingTitle(slug, city) {
  const slugName = ref(slug);
  const cityName = ref(city.replace(/_/g," "));//remove all underscore from a string
  const listTitle = computed(() => {
    //Recently Sold Homes in San Francisco, CA
    //Apartments For Rent in San Francisco, CA
    /**
     * Regular Expression to Detect Numbers only
     * /^\d+$/
     */
    return /^\d+$/.test(slugName) 
      ? `Homes For Sale & Real Estates in ${slugName.value}`
      : cityName.value 
      ? `${cityName.value}, ${slugName.value} Real Estates & Homes For Sale`
      : `${slugName.value} Homes For Sale & Real Estates`;
  });
  return {
    listTitle,
  }
}