import { ref } from "vue";
export default {
  install: (app) => {
    const mapViewFullScreen = ref(false);
    const mapViewChangesCallback = () => {
      mapViewFullScreen.value = !mapViewFullScreen.value;
      if (mapViewFullScreen.value) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    };
    app.provide("provider", {
      mapViewChangesCallback,
      mapViewFullScreen,
    });
  },
};
