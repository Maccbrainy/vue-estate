import { ref } from "vue";
export default {
  install: (app) => {
    const mapViewFullScreen = ref(false);

    const teleportModalMediaTable = ref(false);
    const teleportModalFormRequests = ref({
      name: "",
      for_modal: false,
      description: ""
    });

    const mapViewChangesCallback = () => {
      mapViewFullScreen.value = !mapViewFullScreen.value;
      if (mapViewFullScreen.value) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    };

    const teleportModalCallback = ({ name, open_modal, description }) => {
      if (name == "isMediaTable") {
        teleportModalMediaTable.value = open_modal;
        console.log("Teleport:", name, teleportModalMediaTable.value);
      }
      if (name == "Schedule A Tour") {
        teleportModalFormRequests.value.name = name;
        teleportModalFormRequests.value.for_modal = open_modal;
        console.log("Teleport:", name, teleportModalFormRequests.value);
      }
      if (name == "Request For Info") {
        teleportModalFormRequests.value.name = name;
        teleportModalFormRequests.value.for_modal = open_modal;
        console.log("Teleport:", name, teleportModalFormRequests.value);
      }
      if (name == "Contact This Property") {
        teleportModalFormRequests.value.name = name;
        teleportModalFormRequests.value.for_modal = open_modal;
        teleportModalFormRequests.value.description = description;
        console.log("Teleport:", name, teleportModalFormRequests.value);
      }
    };
    const saveHomePropertyCallback = () => {
      alert("Backend functionalities coming soon!")
    }

    const saveSearchCallback = () => {
      alert("Save search Backend functionalities coming soon!")
    }

    app.provide("provider", {
      mapViewChangesCallback,
      mapViewFullScreen,
      teleportModalCallback,
      teleportModalMediaTable,
      teleportModalFormRequests,
      saveHomePropertyCallback,
      saveSearchCallback
    });
  },
};
