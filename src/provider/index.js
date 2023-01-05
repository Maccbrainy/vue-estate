import { ref } from "vue";
export default {
  install: (app) => {
    const mapViewFullScreen = ref(false);

    const teleportModalMediaTable = ref(false);
    const teleportModalFormRequests = ref({
      name: "",
      for_modal: false,
    });

    const mapViewChangesCallback = () => {
      mapViewFullScreen.value = !mapViewFullScreen.value;
      if (mapViewFullScreen.value) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    };

    const teleportModalCallback = (modal) => {
      if (modal.name == "isMediaTable") {
        teleportModalMediaTable.value = modal.open_modal;
        console.log("Teleport:", modal.name, teleportModalMediaTable.value);
      }
      if (modal.name == "Schedule A Tour") {
        teleportModalFormRequests.value.name = modal.name;
        teleportModalFormRequests.value.for_modal = modal.open_modal;
        console.log("Teleport:", modal.name, teleportModalFormRequests.value);
      }
      if (modal.name == "Request For Info") {
        teleportModalFormRequests.value.name = modal.name;
        teleportModalFormRequests.value.for_modal = modal.open_modal;
        console.log("Teleport:", modal.name, teleportModalFormRequests.value);
      }
    };
    const saveHomePropertyCallback = () => {
      alert("Backend functionalities coming soon!")
    }

    app.provide("provider", {
      mapViewChangesCallback,
      mapViewFullScreen,
      teleportModalCallback,
      teleportModalMediaTable,
      teleportModalFormRequests,
      saveHomePropertyCallback
    });
  },
};
