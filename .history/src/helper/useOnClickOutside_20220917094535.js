import { watchEffect } from "vue"

export const useOnClickOutside = (fieldSet, handler) => {
  watchEffect(() => {
    const listener = (event) => {
      console.log("USEONCLICKOUTSIDE");
      console.log("USEONCLICKOUTSIDE fieldSet:", fieldSet);
      console.log("USEONCLICKOUTSIDE handler", fieldSet.contains(event.target));
      console.log("USEONCLICKOUTSIDE event", event.target);
      if (!fieldSet || fieldSet.contains(event.target)){
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