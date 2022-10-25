import { watchEffect } from "vue"

export const useOnClickOutside = (ref, handler) => {
  watchEffect(() => {
    const listener = (event) => {
        console.log("USEONCLICKOUTSIDE OOOOO")
      if (!ref.current || ref.current.contains(event.target)){
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
  })
}