import { ref, onMounted, onUnmounted } from "vue";

export default function userGeolocation(){
  const cordinates = ref({ latitude: 0, longitude: 0 });
  const userEnabledLocation = 
    "navigator" in window && "geolocation" in navigator
  let watcher = null;
  onMounted(() => {
    if (userEnabledLocation){
      watcher = navigator.geolocation.watchPosition(
        (position) => (cordinates.value = position.coords))
      }
    console.log("This is the user cordinates:", cordinates.value);
  });
  onUnmounted(() => {
    if (watcher) {
      navigator.geolocation.clearWatch(watcher);
    }
  });
  return {
    cordinates,
    userEnabledLocation
  }

}