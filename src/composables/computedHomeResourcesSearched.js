import { computed } from "vue";

export default function computedHomeResourcesSearched(
  allPropertListings, 
  homeLocationFinders, 
  propsSlug,
  cityProp){
  const discoveredHomes = computed(() => {
    //Empty array to collect computed home data;
    let computedData = [];
    //Home Data;
    let homeData = allPropertListings;
    //Home location search term and controller which are home state, city and postal code;
    let homeFinderControllers = homeLocationFinders;
    let principalFinder = cityProp ? cityProp : propsSlug;
    for (let i = 0; i < homeFinderControllers.length; i++){
      //A single searchable property by location (State or City or Postal Code)
      let finderController = homeFinderControllers[i];
      for (let j = 0; j < homeData.length; j++){
        if (homeData[j][finderController] === principalFinder) {
          computedData.push(homeData[j]);
        }
      }
    }
    return computedData.length > 0 ? computedData : "";
  });
  return {
    discoveredHomes,
  }
}