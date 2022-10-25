// import { computed } from "vue";
export default function getValueIfPropertyExist(
  objectSource,
  propertyKey,
  propertyKey2
) {
  let propertyKeyExist = propertyKey;
  let propertyKey2Exist = propertyKey2;

  let propertyValue =
    Object.hasOwn(objectSource, propertyKeyExist) && propertyKey2Exist
      ? objectSource.propertyKeyExist.propertyKey2Exist
      : Object.hasOwn(objectSource, propertyKeyExist)
      ? objectSource.propertyKeyExist
      : "";

  let isTrue = Object.hasOwn(objectSource, propertyKeyExist);
  console.log(
    `GETVALUE propertyKeyExist==${propertyKeyExist}==:`,
    isTrue
  );
  // }
  return propertyValue;
}
