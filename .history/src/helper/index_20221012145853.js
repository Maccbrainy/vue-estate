export const addCommaToNumberFormat = (numberTag) => {
  let isNumber = parseInt(numberTag);
  if (!isNaN(isNumber)) {
    return isNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return numberTag;
};
export const removeUnderScoresFromAString = (isAString) => {
  let string = isAString ? `${isAString}`.replace(/_/g, " ") : "";
  return string;
};
export const addUnderScoresToWhiteSpacesInAString = (isAString) => {
  let string = isAString ? isAString.replaceAll(" ", "_") : "";
  return string;
};
