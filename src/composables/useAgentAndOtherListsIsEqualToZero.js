import { computed } from "vue";
export default function useAgentAndOtherListsIsEqualToZero(
  agentLists, 
  otherLists
){
  const agentAndOtherListsIsZero = computed(() => {
    return !agentLists.length && !otherLists.length ? true : false;
  })
  return {
    agentAndOtherListsIsZero
  }
}