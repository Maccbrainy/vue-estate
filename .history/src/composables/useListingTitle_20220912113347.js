import { computed } from "vue";
export default function useListingTitle(activeRoute, slug, city) {
  const slugParam = slug;
  const cityParam = city ? city.replace(/_/g," ") : "";//remove all underscore from a string

  let searchedWithZipCode;
  let searchedWithCityNameDefined;
  let searchedDefault;
  let title;
  /**
   * Regular Expression to Detect Numbers only
   * /^\d+$/
   */
  function detectPostalCodeSearch(parameter, isZip, cityIsDefined, titleCityDefined, titleDefault){
    return /^\d+$/.test(parameter) 
      ? isZip 
      : cityIsDefined 
      ? titleCityDefined 
      : titleDefault;
  }
  const listTitle = computed(() => {
    switch (activeRoute) {
      case "RentsNearMe":
        title = `Apartments for rent near me`;
        break;
      case "SalesNearMe":
        title = `Houses for sale near me`;
        break;
      case "RentPage":
        searchedWithZipCode = `Apartments For Rent in ${slugParam} Zip Code`;
        searchedWithCityNameDefined = `Apartments For Rent in ${cityParam}, ${slugParam}`;
        searchedDefault = `Apartments For Rent in ${slugParam}`;
        title = detectPostalCodeSearch(slugParam, searchedWithZipCode, cityParam, searchedWithCityNameDefined, searchedDefault);
        break;
      case "SoldPage":
        searchedWithZipCode = `Recently Sold Properties in ${slugParam} Zip Code`;
        searchedWithCityNameDefined = `Recently Sold Properties in ${cityParam}, ${slugParam}`;
        searchedDefault = `Recently Sold Properties in ${slugParam}`;
        title = detectPostalCodeSearch(slugParam, searchedWithZipCode, cityParam, searchedWithCityNameDefined, searchedDefault);
        break;
      case "BuyPage":
        searchedWithZipCode = `Homes For Sale & Real Estate in ${slugParam} Zip Code`;
        searchedWithCityNameDefined = `${cityParam}, ${slugParam} Homes For Sale & Real Estate`;
        searchedDefault = `${slugParam} Homes For Sale & Real Estate`;
        title = detectPostalCodeSearch(slugParam, searchedWithZipCode, cityParam, searchedWithCityNameDefined, searchedDefault);
    };
    return title
  });
  return {
    listTitle,
  }
}