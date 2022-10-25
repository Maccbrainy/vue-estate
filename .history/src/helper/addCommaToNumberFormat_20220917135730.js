export const addCommaToNumberFormat = (numberTag) => {
  let isNumber = parseInt(numberTag);
  if (!isNaN(isNumber)){
    return numberTag.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return;
}