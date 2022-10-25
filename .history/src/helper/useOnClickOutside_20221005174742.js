import { watchEffect } from "vue";
export const useOnClickOutside = (refData, handler) => {
  watchEffect(() => {
    const listener = (event) => {
      if (!refData || refData.contains(event.target)){
        return;
     }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener); 
    }
  });

}