export const convertLetterMToZeros = (price) => {
  let splitted = price.split("");
  return splitted.length == 4 || splitted.length == 5  
    ? price.replace(/m/g, "00000").replace(/\./g, "")
    : price.replace(/m/g, "000000").replace(/\./g, "")
};