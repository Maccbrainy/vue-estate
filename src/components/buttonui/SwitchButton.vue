<template>
  <button 
    v-on:click="sendTheActiveBranch" 
    :id="id" 
    class="px-4 py-2 cursor-pointer">
    <div class="text-base font-medium">
      <slot></slot>
    </div>
  </button>
</template>
<script>
import { useStore } from "vuex";
export default {
  name: "SwitchButton",
  props: ["id"],
  setup() {
    const store = useStore();
    function sendTheActiveBranch(e){
      let val = e.target.parentElement.id;
      val === "Agent Listings" 
        ? store.commit("setListingBranchByAgent", "active") 
        : store.commit("setListingBranchByAgent", "not_active")
    }
    return {
      sendTheActiveBranch,
    }
  }
}
</script>
