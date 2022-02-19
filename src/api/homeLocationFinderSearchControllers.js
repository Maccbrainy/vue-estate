import { reactive } from "vue";
export default function homeLocationFinderSearchControllers() {
  const homeLocationFinders = reactive(["city", "state", "postal_code"]);
  return {
    homeLocationFinders,
  }
}
