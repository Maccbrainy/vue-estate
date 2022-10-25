import { ref } from "vue";

export default function userGeolocation() {
  const cordinates = ref({ latitude: 0, longitude: 0 });
  const userEnabledLocation =
    "navigator" in window && "geolocation" in navigator;
  let watcher = ref(null);
  // onMounted(() => {
  if (userEnabledLocation) {
    watcher.value = navigator.geolocation.watchPosition(
      (position) => (cordinates.value = position.coords)
    );
  }
  console.log("This is the user cordinates:", cordinates.value);
  // });
  // onUnmounted(() => {
  // if (watcher) {
  //   navigator.geolocation.clearWatch(watcher);
  // }
  // });
  return {
    cordinates,
    userEnabledLocation,
    watcher,
  };
}
