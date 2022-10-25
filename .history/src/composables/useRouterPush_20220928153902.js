import router from "@/router";
import store from "@/store";
import { ref, computed, watchEffect } from "vue";
export default function useRouterPush(payLoad) {
  const searchParams = ref(payLoad);
  if (!searchParams.value) return;
  const activeRoute = ref("");
  const storeData = computed(() => store.getters.getStore);
  const regExpWhiteSpaces = /\s/gi; //Regular Expression for White Space detection
  
  let slugParam = regExpWhiteSpaces.test(searchParams.value.state_code) 
    ? searchParams.value.state_code.replaceAll(" ", "_") 
    : searchParams.value.state_code;
  let city = searchParams.value.city;
  let routeName = searchParams.value.activeRouteTab;

  let cityParam = !city 
    ? "" 
    : regExpWhiteSpaces.test(city) 
    ? city.replaceAll(" ", "_") 
    : city 

  switch (routeName) {
    case "list-for-rent":
      activeRoute.value = "RentPage";
      break;
    case "list-sold":
      activeRoute.value = "SoldPage";
      break;
    case "HomePage":
      activeRoute.value = "BuyPage";
      break;
    // case "list-for-sale":
    //   activeRoute.value = "HomePage";
    //   break;
    default:
      activeRoute.value = routeName;
      break;
  };
  watchEffect(() => {
    storeData.value.propertyFilters.numberOfBed;
    console.log(
      "Make i dey observe bedStore:",
      storeData.value.propertyFilters.numberOfBed
    );
})
  let minPriceFilter = searchParams.value.priceMin || "";
  let maxPriceFilter = searchParams.value.priceMax || "";
  let bedFilter = searchParams.value.bed || "";

  /**For variable homeTypeFilter and For variable features below;
   * Check if vuex store searchedData is empty,
   * If empty it means the user refreshed the page thus searchedData state lost
   * Otherwise there is no page refresh action from the user
   */
  let homeTypeFilter =
    storeData.value.searchedData && searchParams.value.homeType
      ? `${searchParams.value.homeType.join()}`
      : !storeData.value.searchedData && searchParams.value.homeType
      ? `${searchParams.value.homeType}`
      : "";
  let features =
    storeData.value.searchedData && searchParams.value.homeFeatures
      ? `${searchParams.value.homeFeatures.join()}`
      : !storeData.value.searchedData && searchParams.value.homeFeatures
      ? `${searchParams.value.homeFeatures}`
      : "";
  let bathFilter = searchParams.value.bath || "";
  let cats = searchParams.value.catsAllowed || "";
  let dogs = searchParams.value.dogsAllowed || "";
  let searchRadius = searchParams.value.radius 
    ? `${searchParams.value.radius}` 
    : "";
  let lotSizeFilter = searchParams.value.lotSize 
    ? `${searchParams.value.lotSize}` 
    : "";
  let ageMax = searchParams.value.ageMax ? `${searchParams.value.ageMax}` : "";
  let ageMin = searchParams.value.ageMin ? `${searchParams.value.ageMin}` : "";
  let foreclosureFilter = searchParams.value.foreclosure || "";
  let openHousesFilter = searchParams.value.openHouses || "";
  let three3DToursFilter = searchParams.value.threeDTours || "";
  let newPlansFilter = searchParams.value.newPlans || "";
  let newConstruct = searchParams.value.newConstruction || "";
  let contingentsFilter = searchParams.value.contingents || "";
  // let latMin = searchParams.value.lat ? searchParams.value.lat : "";
  // let longMin = searchParams.value.long ? searchParams.value.long : "";
  const queryContents = {
    bed: bedFilter,
    bath: bathFilter,
    priceMin: minPriceFilter,
    priceMax: maxPriceFilter,
    homeType: homeTypeFilter,
    dogsAllowed: dogs,
    catsAllowed: cats,
    homeFeatures: features,
    yearBuiltMin: ageMin,
    yearBuiltMax: ageMax,
    lotSize: lotSizeFilter,
    hasOpenHouses: openHousesFilter,
    has3DTours: three3DToursFilter,
    foreClosure: foreclosureFilter,
    newConstruction: newConstruct,
    newPlans: newPlansFilter,
    radius: searchRadius,
    contingents: contingentsFilter,
    // lat: latMin,
    // long: longMin,
  }

  let queryParams = Object.assign({}, queryContents);
  /**Delete empty query parameter contents
   * from the router
   */
  if (!queryParams.bed){
    delete queryParams.bed;
  }
  if (!queryParams.bath) {
    delete queryParams.bath;
  }
  if (!queryParams.priceMin){
    delete queryParams.priceMin;
  }
  if (!queryParams.priceMax){
    delete queryParams.priceMax;
  }
  if (!queryParams.homeType){
    delete queryParams.homeType;
  }
  if (!queryParams.dogsAllowed){
    delete queryParams.dogsAllowed;
  }
  if (!queryParams.catsAllowed){
    delete queryParams.catsAllowed;
  }
  if (!queryParams.homeFeatures){
    delete queryParams.homeFeatures;
  }
  if (!queryParams.yearBuiltMin){
    delete queryParams.yearBuiltMin;
  }
  if (!queryParams.yearBuiltMax){
    delete queryParams.yearBuiltMax;
  }
  if (!queryParams.lotSize){
    delete queryParams.lotSize;
  }
  if (!queryParams.hasOpenHouses){
    delete queryParams.hasOpenHouses;
  }
  if (!queryParams.has3DTours){
    delete queryParams.has3DTours;
  }
  if (!queryParams.foreClosure){
    delete queryParams.foreClosure;
  }
  if (!queryParams.newConstruction){
    delete queryParams.newConstruction;
  }
  if (!queryParams.newPlans){
    delete queryParams.newPlans;
  }
  if (!queryParams.radius){
    delete queryParams.radius;
  }
  if (!queryParams.contingents){
    delete queryParams.contingents;
  }
  router.push({
    name: activeRoute.value,
    params: {
      slug: slugParam,
      city: cityParam
    },
    query: queryParams,
  });
  console.log("USEROUTERPUSH RAN === AND USING ROUTE:", activeRoute.value);
  console.log("USEROUTERPUSH RAN ROUTER:", router);
  console.log("USEROUTERPUSH RAN querybed:", router.currentRoute.value.query.bed);
  console.log("USEROUTERPUSH RAN storeBed:", storeData.value.propertyFilters.numberOfBed);
  return {
    searchTerm: searchParams,
  }
}