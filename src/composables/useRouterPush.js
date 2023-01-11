import router from "@/router";
import store from "@/store";
import { ref, computed } from "vue";
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
    : city;
  let postalCode = searchParams.value.zip_code
    ? parseInt(searchParams.value.zip_code)
    : "";

  switch (routeName) {
    case "list-for-rent":
    case "RentsNearMe":
    case "RentPageDetail":
      activeRoute.value = "RentPage";
      break;
    case "list-sold":
      activeRoute.value = "SoldPage";
      break;
    case "HomePage":
    case "SalesNearMe":
    case "SalesPageDetail":
      activeRoute.value = "BuyPage";
      break;
    default:
      activeRoute.value = routeName;
      break;
  }

  let minPriceFilter = searchParams.value.priceMin || "";
  let maxPriceFilter = searchParams.value.priceMax || "";
  let bedFilter = searchParams.value.bed || "";
  let pagination = searchParams.value.pagination || null;

  /**For variable homeTypeFilter and For variable features below;
   * Check if vuex store searchedData is empty,
   * If empty it means the user refreshed the page thus searchedData state lost
   * Otherwise there is no page refresh action from the user
   */
  let homeTypeFilter =
    Object.keys(storeData.value.searchedData).length > 0 &&
    searchParams.value.homeType
      ? `${searchParams.value.homeType.join()}`
      : !storeData.value.searchedData && searchParams.value.homeType
      ? `${searchParams.value.homeType}`
      : "";
  let features =
    Object.keys(storeData.value.searchedData).length > 0 &&
    searchParams.value.homeFeatures
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
  let sortFilter = searchParams.value.sortType || "";
  // let latMin = searchParams.value.lat ? searchParams.value.lat : "";
  // let longMin = searchParams.value.long ? searchParams.value.long : "";
  let openMediaTable = searchParams.value.mediaTable || false;

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
    sortType: sortFilter,
    mediaTable: openMediaTable,
    page: pagination,
    // lat: latMin,
    // long: longMin,
  };

  let queryParams = Object.assign({}, queryContents);
  /**Delete empty query parameter contents
   * from the router
   */
  if (!queryParams.bed) {
    delete queryParams.bed;
  }
  if (!queryParams.bath) {
    delete queryParams.bath;
  }
  if (!queryParams.priceMin) {
    delete queryParams.priceMin;
  }
  if (!queryParams.priceMax) {
    delete queryParams.priceMax;
  }
  if (!queryParams.homeType) {
    delete queryParams.homeType;
  }
  if (!queryParams.dogsAllowed) {
    delete queryParams.dogsAllowed;
  }
  if (!queryParams.catsAllowed) {
    delete queryParams.catsAllowed;
  }
  if (!queryParams.homeFeatures) {
    delete queryParams.homeFeatures;
  }
  if (!queryParams.yearBuiltMin) {
    delete queryParams.yearBuiltMin;
  }
  if (!queryParams.yearBuiltMax) {
    delete queryParams.yearBuiltMax;
  }
  if (!queryParams.lotSize) {
    delete queryParams.lotSize;
  }
  if (!queryParams.hasOpenHouses) {
    delete queryParams.hasOpenHouses;
  }
  if (!queryParams.has3DTours) {
    delete queryParams.has3DTours;
  }
  if (!queryParams.foreClosure) {
    delete queryParams.foreClosure;
  }
  if (!queryParams.newConstruction) {
    delete queryParams.newConstruction;
  }
  if (!queryParams.newPlans) {
    delete queryParams.newPlans;
  }
  if (!queryParams.radius) {
    delete queryParams.radius;
  }
  if (!queryParams.contingents) {
    delete queryParams.contingents;
  }
  if (!queryParams.sortType) {
    delete queryParams.sortType;
  }
  if (!queryParams.page) {
    delete queryParams.page;
  }
  if (!queryParams.mediaTable) {
    delete queryParams.mediaTable;
  }

  router.push({
    name: activeRoute.value,
    params: {
      slug: slugParam,
      city: cityParam,
      zipCode: postalCode,
    },
    query: queryParams,
  });
  return {
    searchTerm: searchParams,
  };
}
