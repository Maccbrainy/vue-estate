import { computed } from "vue";
export default function useListingTitle(activeRoute, slug, city, zipCode) {
  const slugParam = slug;
  const cityParam = city ? city.replace(/_/g, " ") : ""; //remove all underscore from a string

  let isZipCodeTitle;
  let isSearchTermTitle;
  let titleList;

  const isZipCode = computed(() => (zipCode ? true : false));
  const listTitle = computed(() => {
    switch (activeRoute) {
      case "RentsNearMe":
        titleList = "Apartments For Rent Near Me";
        break;
      case "SalesNearMe":
        titleList = "Houses For Sale Near Me";
        break;
      case "RentPage":
        isZipCodeTitle = `Apartments For Rent in ${zipCode} Zip Code`;
        isSearchTermTitle = `Apartments For Rent in ${cityParam}, ${slugParam}`;
        titleList = isZipCode.value ? isZipCodeTitle : isSearchTermTitle;
        break;
      case "SoldPage":
        isZipCodeTitle = `Recently Sold Properties in ${zipCode} Zip Code`;
        isSearchTermTitle = `Recently Sold Properties in ${cityParam}, ${slugParam}`;
        titleList = isZipCode.value ? isZipCodeTitle : isSearchTermTitle;
        break;
      case "BuyPage":
        isZipCodeTitle = `Homes For Sale & Real Estate in ${zipCode} Zip Code`;
        isSearchTermTitle = `${cityParam}, ${slugParam} Homes For Sale & Real Estate`;
        titleList = isZipCode.value ? isZipCodeTitle : isSearchTermTitle;
    }
    return titleList;
  });
  return {
    listTitle,
  };
}
