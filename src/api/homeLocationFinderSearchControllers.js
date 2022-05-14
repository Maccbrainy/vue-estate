import { reactive } from "vue";
export default function homeLocationFinderSearchControllers() {
  // const homeLocationFinders = reactive(["city", "state", "postal_code"]);
  const homeLocationFinders = reactive(["city", "state_code","neighborhood_name", "postal_code"]);
  return {
    homeLocationFinders,
  }
}
