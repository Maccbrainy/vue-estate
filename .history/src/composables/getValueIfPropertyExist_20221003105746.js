export default function getValueIfPropertyExist(objectSource, propertyKey) {
  let propertyValue = Object.hasOwn(objectSource, propertyKey);
  console.log(`GETVALUE propertyKey==${propertyKey}==:`, propertyValue);
  return propertyValue;
}
