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
        namedRoute: "HomePage",
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
    function activateTab(e){
      router.push({
        name:`${e.target.name}`
      });
      store.commit("setActiveRouteTab", e.target.name);
    };
    const getIsActiveRouteTab = computed(() => {
      return store.getters.getIsActiveRouteTab;
    });
    watchEffect(() => {
      activeTabButton.value = 
        getIsActiveRouteTab.value == "" 
          ? route.name 
          : getIsActiveRouteTab.value;
    })
    return {
      tabButtons,
      activateTab,
      activeTabButton,
    }
  }
}
</script>