import router from "@/router";
import { ref } from "vue";
export default function useRouterPush(payLoad) {
  const searchParams = ref(payLoad);
  if (!searchParams.value) return;
  const activeRoute = ref("");
  // const regExpNumbersOnly = /^\d+$/; //Regular Expression for Number detection
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
    default:
      activeRoute.value = routeName;
      break;
  };

  let minPriceFilter = searchParams.value.priceMin || undefined;
  let maxPriceFilter = searchParams.value.priceMax || undefined;
  let bedFilter = searchParams.value.bed || undefined;
  let homeTypeFilter = searchParams.value.homeType 
    ? `${searchParams.value.homeType.join()}` 
    : undefined;
  let bathFilter = searchParams.value.bath || undefined;
  let cats = searchParams.value.catsAllowed || undefined;
  let dogs = searchParams.value.dogsAllowed || undefined;
  let features = searchParams.value.homeFeatures 
    ? `${searchParams.value.homeFeatures.join()}`
    : undefined;
  let searchRadius = searchParams.value.radius 
    ? `${searchParams.value.radius}` 
    : undefined;
  let lotSizeFilter = searchParams.value.lotSize 
    ? `${searchParams.value.lotSize}` 
    : undefined;
  let ageMax = searchParams.value.ageMax 
    ? `${searchParams.value.ageMax}` 
    : undefined;
  let ageMin = searchParams.value.ageMin 
    ? `${searchParams.value.ageMin}` 
    : undefined;
  let foreclosureFilter = searchParams.value.foreclosure || undefined;
  let openHousesFilter = searchParams.value.openHouses || undefined;
  let three3DToursFilter = searchParams.value.threeDTours || undefined;
  let newPlansFilter = searchParams.value.newPlans || undefined;
  let newConstruct = searchParams.value.newConstruction || undefined;
  let contingentsFilter = searchParams.value.contingents || undefined;
  // let latMin = searchParams.value.lat ? searchParams.value.lat : undefined;
  // let longMin = searchParams.value.long ? searchParams.value.long : undefined;

  router.push({
    name: activeRoute.value,
    params: {
      slug: slugParam,
      city: cityParam
    },
    query: {
      bed: `${bedFilter}`,
      bath: `${bathFilter}`,
      priceMin: `${minPriceFilter}`,
      priceMax: `${maxPriceFilter}`,
      homeType: homeTypeFilter,
      dogsAllowed: dogs,
      catsAllowed: cats,
      homeFeatures: features,
      yearBuiltMin: `${ageMin}`,
      yearBuiltMax: `${ageMax}`,
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
    },
  });
  console.log("USEROUTERPUSH RAN !!!!!!!!! AND USING ROUTE:", activeRoute.value);
  return {
    searchTerm: searchParams,
  }
}