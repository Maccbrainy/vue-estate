import dataSource from "@/components/homes.json";
import { reactive } from "vue";

export default function homeResourcesData() {
  const homeResourceReactivity = reactive({
    allHomes: dataSource.homes,
  });
  const homeResources = homeResourceReactivity.allHomes;
  return {
    homeResources,
  }
}
