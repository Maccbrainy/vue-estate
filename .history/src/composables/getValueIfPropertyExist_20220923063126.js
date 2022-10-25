import { computed } from "vue";
export default function getValueIfPropertyExist(objectSource, propertyKey) {
  const getValue = computed(() => {
    let property = propertyKey;
    let propertyValue = Object.hasOwn(objectSource, property)
      ? objectSource.property
      : "";
    return propertyValue;
  });
  return {
    getValue,
  };
}
