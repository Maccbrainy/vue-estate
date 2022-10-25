import { computed } from "vue";
export default function getValueIfPropertyExist(
  objectSource,
  propertyKey,
  propertyKey2
) {
  const getValue = computed(() => {

    let propertyValue = ""
    let propertyKeyExist = propertyKey;
    let propertyKey2Exist = propertyKey2;

    if (propertyKey2Exist) {
      propertyValue = Object.hasOwn(objectSource.value, propertyKeyExist)
        ? objectSource.value.propertyKeyExist.propertyKey2Exist
        : "";
      console.log("GETVALUE:", propertyValue);
      return propertyValue;
    } else if (propertyKeyExist) {
      propertyValue = Object.hasOwn(objectSource.value, propertyKeyExist)
        ? objectSource.value.propertyKeyExist
        : "";
      console.log(`GETVALUE==${propertyKeyExist}==:`, propertyValue);
      return propertyValue;
    } else {
      return propertyValue;
    }
  });
  getValue.value;
  return {
    getValue,
  };
}
