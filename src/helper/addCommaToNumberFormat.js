export const addCommaToNumberFormat = (numberTag) => {
  //Number values comma separator;
  return numberTag.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}