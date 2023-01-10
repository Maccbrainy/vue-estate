import { ref } from "vue";
export default {
  install: (app) => {
    const mapViewFullScreen = ref(false);

    const teleportModalMediaTable = ref(false);
    const teleportModalFormRequests = ref({
      name: "",
      for_modal: false,
      description: {},
    });

    const mapViewChangesCallback = () => {
      mapViewFullScreen.value = !mapViewFullScreen.value;
      if (mapViewFullScreen.value) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    };

    const teleportModalCallback = (modal_name, open_modal, description ) => {
      console.log("teleportModalCallback", modal_name, open_modal, description);
      if (modal_name == "isMediaTable") {
        teleportModalMediaTable.value = open_modal;
        console.log("Teleport:", modal_name, teleportModalMediaTable.value);
        return teleportModalMediaTable.value;
      }
      if (modal_name == "Schedule A Tour") {
        teleportModalFormRequests.value.name = modal_name;
        teleportModalFormRequests.value.for_modal = open_modal;
        teleportModalFormRequests.value.description.address = description;
        console.log("Teleport:", modal_name, teleportModalFormRequests.value);
        return teleportModalMediaTable.value;
      }
      if (modal_name == "Request For Info") {
        teleportModalFormRequests.value.name = modal_name;
        teleportModalFormRequests.value.for_modal = open_modal;
        teleportModalFormRequests.value.description.address = description;
        console.log("Teleport:", modal_name, teleportModalFormRequests.value);
        return teleportModalMediaTable.value;
      }
      if (modal_name == "Contact This Property") {
        teleportModalFormRequests.value.name = modal_name;
        teleportModalFormRequests.value.for_modal = open_modal;
        teleportModalFormRequests.value.description = description;
        console.log("Teleport:", modal_name, teleportModalFormRequests.value);
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
    });
  },
};
