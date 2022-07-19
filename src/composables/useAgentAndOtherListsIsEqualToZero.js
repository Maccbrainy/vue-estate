import { computed } from "vue";
export default function useAgentAndOtherListsIsEqualToZero(
  agentLists, 
  otherLists
){
  const agentAndOtherListsIsZero = computed(() => {
    return agentLists.length == 0 && otherLists.length == 0 ? true : false;
  })
  return {
    agentAndOtherListsIsZero
  }
}