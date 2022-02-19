import { ref } from "vue";
export default function checkWhiteSpacesAndReplaceWithHypen(property){
//   if (!property) return;
  const hypenatedProp = ref("");
  hypenatedProp.value = /\s/gi.test(property)
    ? property.replaceAll(" ", "-")
    : property;
  return {
    hypenatedProp,
  }
}