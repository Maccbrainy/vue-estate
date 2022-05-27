<template>
  <button 
    v-on:click="activateListingBranch" 
    :id="id" 
    class="px-4 py-2 cursor-pointer">
    <div :id="id" class="text-base font-medium">
      <slot></slot>
    </div>
  </button>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "SwitchButton",
  props: ["id"],
  setup() {
    const store = useStore();
    const activeBranch = computed(() => {
      return store.getters.getActiveBranch;
    });
    function activateListingBranch(e){
      if (e.target.id != activeBranch.value){
        switch (e.target.id) {
          case "Other Listings":
            store.commit("setActiveListBranch", "Other Listings");
            break;
          case "Agent Listings":
            store.commit("setActiveListBranch", "Agent Listings");
            break;
        }
      }
    }
    return {
      activateListingBranch,
    }
  }
}
</script>
