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

  let minPriceFilter = searchParams.value.priceMin || "";
  let maxPriceFilter = searchParams.value.priceMax || "";
  let bedFilter = searchParams.value.bed || "";
  let homeTypeFilter = searchParams.value.homeType 
    ? `${searchParams.value.homeType.join()}` 
    : "";
  let bathFilter = searchParams.value.bath || "";
  let cats = searchParams.value.catsAllowed || "";
  let dogs = searchParams.value.dogsAllowed || "";
  let features = searchParams.value.homeFeatures 
    ? `${searchParams.value.homeFeatures.join()}`
    : "";
  let searchRadius = searchParams.value.radius 
    ? `${searchParams.value.radius}` 
    : "";
  let lotSizeFilter = searchParams.value.lotSize 
    ? `${searchParams.value.lotSize}` 
    : "";
  let ageMax = searchParams.value.ageMax 
    ? `${searchParams.value.ageMax}` 
    : "";
  let ageMin = searchParams.value.ageMin 
    ? `${searchParams.value.ageMin}` 
    : "";
  let foreclosureFilter = searchParams.value.foreclosure || "";
  let openHousesFilter = searchParams.value.openHouses || "";
  let three3DToursFilter = searchParams.value.threeDTours || "";
  let newPlansFilter = searchParams.value.newPlans || "";
  let newConstruct = searchParams.value.newConstruction || "";
  let contingentsFilter = searchParams.value.contingents || "";
  // let latMin = searchParams.value.lat ? searchParams.value.lat : "";
  // let longMin = searchParams.value.long ? searchParams.value.long : "";

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
  console.log("USEROUTERPUSH RAN reached slug !:", slugParam);
  console.log("USEROUTERPUSH RAN reached city !:", cityParam);
  return {
    searchTerm: searchParams,
  }
}