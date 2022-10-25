import { onMounted, onUnmounted } from "vue"

export const useOnClickOutside = (menuRef, fieldSetRef, handler) => {
  // watchEffect(() => {
  //   const listener = (event) => {
  //     console.log("USEONCLICKOUTSIDE");
  //     console.log("USEONCLICKOUTSIDE fieldSet:", fieldSet);
  //     console.log("USEONCLICKOUTSIDE handler", fieldSet.contains(event.target));
  //     console.log("USEONCLICKOUTSIDE event", event.target);
  //     if (!fieldSet || fieldSet.contains(event.target)){
  //       return;
  //    }
  //     handler(event);
  //   };
  //   document.addEventListener("mousedown", listener);
  //   document.addEventListener("touchstart", listener);

  //   return () => {
  //     document.removeEventListener("mousedown", listener);
  //     document.removeEventListener("touchstart", listener); 
  //   }
  // });
  function listenerOnOutsideClick(event){
    if (!fieldSetRef || fieldSetRef.contains(event.target)){
      console.log(fieldSetRef.value.contains(event.target));
      return;
    } 
    if (menuRef.contains(event.target)){
      return;
    }
    handler(event);
  };
  onMounted(() => {
    document.addEventListener("mousedown", listenerOnOutsideClick);
    document.addEventListener("touchstart", listenerOnOutsideClick);
  })
  onUnmounted(() => {
    document.removeEventListener("mousedown", listenerOnOutsideClick);
    document.removeEventListener("touchstart", listenerOnOutsideClick); 
  });
}