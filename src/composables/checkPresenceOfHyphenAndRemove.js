import { ref } from "vue";
export default function checkPresenceOfHyphenAndRemove(argument) {
  const hyphenFreeProp = ref("");
  hyphenFreeProp.value = /[-]/g.test(argument)
    ? argument.replaceAll("-", " ")
    : argument;
  return {
    hyphenFreeProp,
  };
}
