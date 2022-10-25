import { onMounted, onUnmounted } from "vue";
export default {
  name: "useOnClickOutside",
  setup() {
    function getArguments(fieldSetRef, handler) {
      function listenerOnOutsideClick(event) {
        if (!fieldSetRef || fieldSetRef.contains(event.target)) {
          console.log(fieldSetRef.contains(event.target));
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
    return { getArguments };
  },
};
