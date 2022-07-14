import router from "@/router";
import store from "@/store";
import { ref } from "vue";
export default function useRouterPush(payLoad) {
  const searchParams = ref("");
  const activeRoute = ref("");
  const regExpNumbersOnly = /^\d+$/; //Regular Expression for Number detection
  const regExpWhiteSpaces = /\s/gi; //Regular Expression for White Space detection
  searchParams.value = payLoad;
  if (!searchParams.value) {
    return
  };

  let cityParam = !searchParams.value.city ? "" : searchParams.value.city;

  let slugParam = !searchParams.value.state_code
    ? searchParams.value 
    : searchParams.value.state_code;
    
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
  const titleParam = regExpNumbersOnly.test(slugParam) 
    ? searchedWithZipCode 
    : cityParam 
    ? searchedWithCityNameDefined
    : searchedDefault
  /**Regular Expression
   * for white space detections only  
  * */
  const removedWhiteSpacesFromCityParam = regExpWhiteSpaces.test(cityParam)
    ? cityParam.replaceAll(" ", "_")
    : cityParam;

  store.commit("setActiveRoutePath", activeRoute.value);

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