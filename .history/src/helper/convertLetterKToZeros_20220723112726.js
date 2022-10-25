export const convertLetterKToZeros = (priceTag, convertLetterMToZeros) => {
  let price = priceTag;
  let priceValue = price.endsWith("k") 
    ? price.replace(/k/g, "000")
    : price.endsWith("m") 
    ? convertLetterMToZeros(price)
    : price;
  let priceNumber = parseInt(priceValue);
  console.log("Price Number:", priceNumber);
  return priceNumber;
}