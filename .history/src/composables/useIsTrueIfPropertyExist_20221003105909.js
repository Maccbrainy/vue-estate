export default function useIsTrueIfPropertyExist(objectSource, propertyKey) {
  let propertyValue = Object.hasOwn(objectSource, propertyKey);
  console.log(`GETVALUE propertyKey==${propertyKey}==:`, propertyValue);
  return propertyValue;
}
