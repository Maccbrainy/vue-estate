<template>
  <span role="group" class="flex bg-gray-600 bg-opacity-50 rounded-lg">
    <button-tab 
      v-for="(tabButton, index) in tabButtons" 
      v-bind:key="index"
      v-bind:name="tabButton.namedRoute"
      v-on:click="activateTab"
      v-bind:class="{'bg-white text-teal': tabButton.namedRoute == activeTabButton}"
      >{{ tabButton.title }}</button-tab>
  </span> 
</template>
<script>
import { ButtonTab } from "@/components/buttonui";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ref, computed, watchEffect } from "vue";
export default {
  name: "HomeTabButtons",
  components: {
    ButtonTab,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const activeTabButton = ref(false);
    const tabButtons = [
      {
        title: "Buy",
        namedRoute: "list-for-sale",
      },
      {
        title: "Rent",
        namedRoute: "list-for-rent",
      },
      {
        title: "Sold",
        namedRoute: "list-sold",
      }
    ]
    const getIsActiveRouteTab = computed(() => {
      return store.getters.getIsActiveRouteTab;
    });
    watchEffect(() => {
      let routingValue = 
        route.name == "HomePage" ? "list-for-sale" : route.name;
      if (getIsActiveRouteTab.value == ""){
        store.commit("setActiveRouteTab", routingValue);
      } 
    });

    function activateTab(e){
      let routingValue = 
        e.target.name == "list-for-sale" ? "HomePage" : e.target.name; 
      router.push({
        name: routingValue
      });
      store.commit("setActiveRouteTab", e.target.name);
    };

    watchEffect(() => {
      activeTabButton.value = getIsActiveRouteTab.value;
    });
    return {
      tabButtons,
      activateTab,
      activeTabButton,
    }
  }
}
</script>