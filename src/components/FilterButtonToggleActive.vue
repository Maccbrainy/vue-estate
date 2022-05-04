<template>
  <switch-button-container>
    <switch-button-class-active 
      v-bind:class="{
        'border border-gray-300 bg-white rounded-lg h-11 transition duration-700'
          :isActiveBranch }">
      <switch-button id="Agent Listings">
        Agent Listings
        <span class="font-normal">({{ numberOfPropertyByAgent }})</span>
      </switch-button>
    </switch-button-class-active>
    <switch-button-class-active 
      v-bind:class="{
        'border border-gray-300 bg-white rounded-lg h-11 transition duration-700': !isActiveBranch}">
      <switch-button id="Other">
        Other
        <span class="font-normal">({{ numberOfPropertyByOther }})</span>
      </switch-button>
    </switch-button-class-active>
  </switch-button-container>
</template>
<script>
import { computed, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import {
  SwitchButton, 
  SwitchButtonContainer, 
  SwitchButtonClassActive 
} from "@/components/buttonui/index";
export default {
  components: {
    SwitchButton,
    SwitchButtonContainer,
    SwitchButtonClassActive
  },
  setup() {
    const store = useStore();
    const numberOfPropertyByAgent = ref(Number);
    const numberOfPropertyByOther = ref(Number);
    const isActiveBranch = ref(Boolean);

    const propertListingsByAgent = computed(() => {
      return store.getters.getPropertyListingsByAgent;
    });
    const propertListingsByOther = computed(() => {
      return store.getters.getPropertyListingsByNoneAgent;
    });
    const byAgent = computed(() => {
      return store.getters.getListingBranchByAgent;
    });
    watchEffect(() => {
      isActiveBranch.value = byAgent.value === "active" ? true : false;
    });
    watchEffect(() => {
      let numberByOther = propertListingsByOther.value.length;
      numberOfPropertyByOther.value = numberByOther;
      console.log("By Others:", numberOfPropertyByOther.value);

      let numberByAgent = propertListingsByAgent.value.length;
      numberOfPropertyByAgent.value = numberByAgent;
      console.log("By Agent:", numberOfPropertyByAgent.value);
    });
    return {
      isActiveBranch,
      propertListingsByAgent,
      propertListingsByOther,
      numberOfPropertyByAgent,
      numberOfPropertyByOther
    }
  }
}
</script>
<style scoped>
</style>