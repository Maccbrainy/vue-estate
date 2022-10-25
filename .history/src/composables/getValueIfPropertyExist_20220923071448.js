// import { computed } from "vue";
export default function getValueIfPropertyExist(
  objectSource,
  propertyKey,
  propertyKey2
) {
  // const getValue = computed(() => {
  let property = propertyKey;
  let propertyKey2Exist = propertyKey2 || "";
  if (propertyKey2Exist) {
    let propertyValue = Object.hasOwn(objectSource, property)
      ? objectSource.property.propertyKey2Exist
      : "";
    return propertyValue;
  } else {
    let propertyValue = Object.hasOwn(objectSource, property)
      ? objectSource.property
      : "";
    return propertyValue;
  }
  // });
  // return {
  //   getValue,
  // };
}
