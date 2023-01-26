import { ref, watchEffect } from "vue";
import { useMediaQuery } from "@vueuse/core";
export default {
  install: (app) => {
    const isLargeScreen = useMediaQuery("(min-width: 1024px)");
    const mapViewFullScreen = ref(false);
    const activeMapViewVariant = ref("ListViewNoMapLayout");

    const teleportModalMediaTable = ref(false);
    const teleportModalFormRequests = ref({
      name: "",
      for_modal: false,
      description: {},
    });

    const mapViewChangesCallback = () => {
      // mapViewFullScreen.value = !mapViewFullScreen.value;
      // if (mapViewFullScreen.value) {
      //   document.body.classList.add("overflow-hidden");
      // } else {
      //   document.body.classList.remove("overflow-hidden");
      // }
      alert("Map not available, coming soon!");
    };

    const toggleMapHandler = (e) => {
      const layoutVariant = e.target.id;
      if (layoutVariant == "ListViewNoMapLayout") {
        document.body.classList.remove("overflow-hidden");
        mapViewFullScreen.value = false;
      }
      activeMapViewVariant.value = layoutVariant;
    };

    const mobileMapViewLayoutFullScreen = ref(false);
    const mobileToggleMapHandler = () => {
      mobileMapViewLayoutFullScreen.value =
        !mobileMapViewLayoutFullScreen.value;
      if (mobileMapViewLayoutFullScreen.value) {
        document.body.classList.add("overflow-hidden");
      }
      if (!mobileMapViewLayoutFullScreen.value) {
        document.body.classList.remove("overflow-hidden");
      }
    };
    watchEffect(() => {
      isLargeScreen.value;
      if (
        !isLargeScreen.value &&
        activeMapViewVariant.value == "MapViewLayout"
      ) {
        activeMapViewVariant.value = "ListViewNoMapLayout";
        mobileMapViewLayoutFullScreen.value = false;
      }
    });

    const teleportModalCallback = (modal_name, open_modal, description) => {
      if (modal_name == "isMediaTable") {
        teleportModalMediaTable.value = open_modal;
        return teleportModalMediaTable.value;
      }
      if (modal_name == "Schedule A Tour") {
        teleportModalFormRequests.value.name = modal_name;
        teleportModalFormRequests.value.for_modal = open_modal;
        teleportModalFormRequests.value.description.address = description;
        return teleportModalMediaTable.value;
      }
      if (modal_name == "Request For Info") {
        teleportModalFormRequests.value.name = modal_name;
        teleportModalFormRequests.value.for_modal = open_modal;
        teleportModalFormRequests.value.description.address = description;
        return teleportModalMediaTable.value;
      }
      if (modal_name == "Contact This Property") {
        teleportModalFormRequests.value.name = modal_name;
        teleportModalFormRequests.value.for_modal = open_modal;
        teleportModalFormRequests.value.description = description;
        return teleportModalMediaTable.value;
      }
    };
    const saveHomePropertyCallback = () => {
      alert("Backend functionalities coming soon!");
    };

    const saveSearchCallback = () => {
      alert("Save search Backend functionalities coming soon!");
    };

    app.provide("provider", {
      mapViewChangesCallback,
      mapViewFullScreen,
      teleportModalCallback,
      teleportModalMediaTable,
      teleportModalFormRequests,
      saveHomePropertyCallback,
      saveSearchCallback,
      toggleMapHandler,
      activeMapViewVariant,
      mobileToggleMapHandler,
      mobileMapViewLayoutFullScreen,
      isLargeScreen,
    });
  },
};
