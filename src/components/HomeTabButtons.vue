<template>
  <span role="group" class="flex bg-gray-600 bg-opacity-50 rounded-lg">
    <button-tab
      v-for="(routeName, index) in routeNames"
      v-bind:key="index"
      v-bind:name="routeName.queryFormat"
      v-on:click.prevent="activateTab"
      v-bind:class="{
        'bg-white text-teal': routeName.queryFormat == activeTabButton,
      }"
      >{{ routeName.name }}</button-tab
    >
  </span>
</template>
<script>
import { ButtonTab } from "@/components/buttonui";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import settingsData from "@/api/settingsData.json";
export default {
  name: "HomeTabButtons",
  components: {
    ButtonTab,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const storeData = computed(() => store.getters.getStore);
    const routeNames = ref([...settingsData.routeNames]);

    function activateTab(e) {
      if (e.target.name == storeData.value.activeRoutePath) {
        return;
      }
      let routingValue =
        e.target.name == routeNames.value[0].queryFormat
          ? "HomePage"
          : e.target.name;
      router.push({
        name: routingValue,
      });
    }
    const activeTabButton = computed(() => {
      let routingValue =
        route.name == "HomePage" ? routeNames.value[0].queryFormat : route.name;
      store.commit("setActiveRoutePath", routingValue);
      return routingValue;
    });

    return {
      routeNames,
      activateTab,
      activeTabButton,
      storeData
    };
  },
};
</script>
