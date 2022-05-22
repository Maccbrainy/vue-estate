import router from "@/router";
import { ref } from "vue";
export default function useBuildRouter(payLoad) {
  
  const searchParams = ref("");
  searchParams.value = payLoad;
  console.log("useBuildROuter Working:", payLoad);
  if (!searchParams.value) return;

  let cityParam = 
    searchParams.value.city != undefined ? searchParams.value.city : "";
  let slugParam = 
    searchParams.value.state_code != undefined
      ? searchParams.value.state_code
      : searchParams.value;
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

  const searchedWithZipCode = `Homes For Sale & Real Estate in ${slugParam} Zip Code`;
  const searchedWithCityNameDefined = `${cityParam} Homes For Sale & ${cityParam} Real Estate | Vue Estate`;
  const searchedDefault = `${slugParam} Homes For Sale & ${slugParam} Real Estate | Vue Estate`;

  router.push({
    name: "ListingPage",
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