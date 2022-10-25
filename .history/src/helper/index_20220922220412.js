export { addCommaToNumberFormat } from "@/helper/addCommaToNumberFormat";
// export { convertLetterKToZeros } from "@/helper/convertLetterKToZeros";
// export { convertLetterMToZeros } from "@/helper/convertLetterMToZeros";
export { useOnClickOutside } from "@/helper/useOnClickOutside";

export const removeUnderScoresFromAString = (isAString) => {
  let string = isAString.toString().replace(/_/g," ");
  return string;
}
  
export const addUnderScoresToWhiteSpacesInAString = (isAString) => {
  let string = isAString.toString().replaceAll(" ", "_");
  return string;
}