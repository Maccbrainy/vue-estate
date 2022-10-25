import { onMounted, onUnmounted } from "vue";
export function useOnClickOutside(refData, handler) {

  function listenerOnOutsideClick(event) {
    if (!refData || refData.contains(event.target)) {
      console.log(refData.contains(event.target));
      return;
    }
    // if (menuRef.contains(event.target)) {
    //   return;
    // }
    handler(event);
  }
  onMounted(() => {
    document.addEventListener("mousedown", listenerOnOutsideClick);
    document.addEventListener("touchstart", listenerOnOutsideClick);
  });
  onUnmounted(() => {
    document.removeEventListener("mousedown", listenerOnOutsideClick);
    document.removeEventListener("touchstart", listenerOnOutsideClick);
  });
}
