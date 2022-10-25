import { computed } from "vue";
export default function getValueIfPropertyExist(
  objectSource,
  propertyKey,
  propertyKey2
) {
  const getValue = computed(() => {
    let property = propertyKey;
    let propertyKey2Exist = propertyKey2 || "";
    if (propertyKey2Exist) {
      let propertyValue = Object.hasOwn(objectSource, property)
        ? objectSource.property.propertyKey2Exist
        : "";
      console.log("GETVALUE:", propertyValue);
      return propertyValue;
    } else {
      let propertyValue = Object.hasOwn(objectSource, property)
        ? objectSource.property
        : "";
      console.log("GETVALUE:", propertyValue);
      return propertyValue;
    }
  });
  return {
    getValue,
  };
}
