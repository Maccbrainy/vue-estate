import router from "@/router";
import { ref } from "vue";
export default function buildRouterParamsUrl(
  validatedSearchInfo, 
  propsCity, 
  hyphenFreeProp,
) {
  const searchSlugTerm = ref("");
  searchSlugTerm.value = validatedSearchInfo;
  if (!searchSlugTerm.value) return;
  //Regular Expression for numeric characters only thus to detect postal or zip codes search;
  const regExpNumbersOnly = /^\d+$/;
  // const regExpWhiteSpaces = /\s/gi;
  // const replacedWhiteSpacesInPropsCityWithHypen = regExpWhiteSpaces.test(propsCity)
  //   ? propsCity.replaceAll(" ", "-")
  //   : propsCity;
  const searchedWithZipCode = `Homes For Sale & Real Estate in ${searchSlugTerm.value} Zip Code`;
  const searchedWithCityNameDefined = `${hyphenFreeProp} Homes For Sale & ${hyphenFreeProp} Real Estate | Vue Estate`;
  const searchedDefault = `${searchSlugTerm.value} Homes For Sale & ${searchSlugTerm.value} Real Estate | Vue Estate`;
  //named route with params to let the router build the url;
  router.push({
    name: "BuyPage",
    params: {
      slug: searchSlugTerm.value,
      city: propsCity ? propsCity : "",
      title: regExpNumbersOnly.test(searchSlugTerm.value) 
        ? searchedWithZipCode 
        : hyphenFreeProp 
        ? searchedWithCityNameDefined
        : searchedDefault,
    },
  });
  return {
    searchTerm: searchSlugTerm,
  }
}