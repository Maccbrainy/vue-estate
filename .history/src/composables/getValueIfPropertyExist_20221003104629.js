import { computed } from "vue";
export default function getValueIfPropertyExist(
  objectSource,
  propertyKey,
  propertyKey2
) {

  let propertyKeyExist = propertyKey;
  let propertyKey2Exist = propertyKey2;

  const getValue = computed(() => {



    let propertyValue =
      Object.hasOwn(objectSource, propertyKeyExist) && propertyKey2Exist
        ? objectSource.propertyKeyExist.propertyKey2Exist
        : Object.hasOwn(objectSource, propertyKeyExist)
        ? objectSource.propertyKeyExist
        : "";

    console.log(
      `GETVALUE propertyKeyExist==${propertyKeyExist}==:`,
      propertyValue
    );
    return propertyValue;
  });
  getValue.value;
  return getValue.value;
}