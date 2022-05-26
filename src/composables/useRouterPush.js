import router from "@/router";
import store from "@/store";
import { ref } from "vue";
export default function useRouterPush(payLoad) {
  const searchParams = ref("");
  const activeRoute = ref("");
  searchParams.value = payLoad;
  if (!searchParams.value) {
    return
  };

  let cityParam = 
    searchParams.value.city != undefined ? searchParams.value.city : "";
  let slugParam = 
    searchParams.value.state_code != undefined
      ? searchParams.value.state_code
      : searchParams.value;
    
  let searchedWithZipCode;
  let searchedWithCityNameDefined;
  let searchedDefault;

  switch (searchParams.value.activeRouteTab) {
    case "list-for-rent":
    case "RentPage":
      activeRoute.value = "RentPage";
      searchedWithZipCode = `Apartments For Rent in ${slugParam} Zip Code`;
      searchedWithCityNameDefined = `Apartments For Rent in ${cityParam}, ${slugParam} | Vue Estate`;
      searchedDefault = `Apartments For Rent in ${slugParam} | Vue Estate`;
      break;
    case "list-sold":
    case "SoldPage":
      activeRoute.value = "SoldPage";
      searchedWithZipCode = `Recently Sold Properties in ${slugParam} Zip Code`;
      searchedWithCityNameDefined = `${cityParam}, ${slugParam} Recently Sold Properties | Vue Estate`;
      searchedDefault = `${slugParam} Recently Sold Properties | Vue Estate`;
      break;
    default:
      activeRoute.value = "BuyPage";
      searchedWithZipCode = `Homes For Sale & Real Estate in ${slugParam} Zip Code`;
      searchedWithCityNameDefined = `${cityParam}, ${slugParam} Homes For Sale & ${cityParam}, ${slugParam} Real Estate | Vue Estate`;
      searchedDefault = `${slugParam} Homes For Sale & ${slugParam} Real Estate | Vue Estate`;
  };
  /**Regular Expression
   * for numeric characters only 
   * thus to detect postal or zip codes search; 
   * */
  const regExpNumbersOnly = /^\d+$/;
  const titleParam = regExpNumbersOnly.test(slugParam) 
    ? searchedWithZipCode 
    : cityParam 
    ? searchedWithCityNameDefined
    : searchedDefault
  /**Regular Expression
   * for white space detections only  
  * */
  const regExpWhiteSpaces = /\s/gi;
  const removedWhiteSpacesFromCityParam = regExpWhiteSpaces.test(cityParam)
    ? cityParam.replaceAll(" ", "_")
    : cityParam;
  store.commit("setActiveRouteTab", activeRoute.value);
  router.push({
    name: activeRoute.value,
    params: {
      slug: slugParam,
      city: removedWhiteSpacesFromCityParam,
      title: titleParam,
    },
  });
  return {
    searchTerm: searchParams,
  }
}