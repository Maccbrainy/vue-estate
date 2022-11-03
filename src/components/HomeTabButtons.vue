<template>
  <span role="group" class="flex bg-gray-600 bg-opacity-50 rounded-lg">
    <button
      v-for="(routeName, index) in routeNames"
      v-bind:key="index"
      v-on:mouseenter="mouseOverButton = true"
      v-on:mouseleave="mouseOverButton = false"
      v-bind:name="routeName.queryFormat"
      v-on:click.prevent="activateTab(routeName.queryFormat)"
      v-bind:class="{
        'bg-white font-semibold text-teal':
          routeName.queryFormat == activeTabButton && !mouseOverButton,
        'font-semibold': routeName.queryFormat == activeTabButton,
      }"
      class="
        relative
        inline-flex
        cursor-pointer
        rounded-lg
        px-7
        py-2
        text-xl
        font-normal
        text-white
        hover:text-teal hover:bg-white
      "
    >
      {{ routeName.name }}
    </button>
  </span>
</template>
<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import settingsData from "@/api/settingsData.json";

export default {
  name: "HomeTabButtons",

  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const mouseOverButton = ref(null);
    const storeData = computed(() => store.getters.getStore);
    const routeNames = ref([...settingsData.routeNames]);

    function activateTab(queryFormat) {
      if (queryFormat == storeData.value.activeRoutePath) {
        return;
      }
      let routingValue =
        queryFormat == routeNames.value[0].queryFormat
          ? "HomePage"
          : queryFormat;
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
      storeData,
      mouseOverButton,
    };
  },
};
</script>
