<template>
  <section 
    role="region"
    aria-label="Interactive Google Map showing listings in .... Details about each listing, including address and price, can be found in the search results under the h2 heading."
    v-bind:class="{ 
      'map-half-size': !expandOrReduceMap, 
      'map-full-size': expandOrReduceMap
    }" 
    class="
      fixed
      top-32 
      right-0
      bottom-0 
      bg-teal-lighter 
      mx-4
      mb-4
      rounded-xl
      sf:hidden">
    <div class="flex flex-1 w-full h-full">
      <div class="flex-1 relative overflow-hidden">
        <button 
          v-on:click="mapHandler"
          V-bind:mapView="expandOrReduceMap"
          @update="$emit('update:mapView', $event)" 
          class="absolute bg-white border border-gray-100 rounded-md px-2 py-1 m-3">
          {{ expandOrReduceMap ? `Reduce Map` : `Expand Map`}}
        </button>
        <div 
          id="mapId" 
          class="w-full h-full object-cover object-center rounded-xl"
        ></div>
      </div>
    </div>
  </section>
</template>
<script>
import { ref } from "vue";
export default {
  emits: ["update:mapView"],
  setup(_, context) {
    const expandOrReduceMap = ref(false);
    const mapHandler = () => {
      expandOrReduceMap.value = !expandOrReduceMap.value;
      context.emit("update:mapView", expandOrReduceMap.value);
    };
    return { 
      expandOrReduceMap, 
      mapHandler
    }
  }
}
// import { onMounted } from "vue";
// import "leaflet/dist/leaflet.css";
// import leaflet from "leaflet";
// export default {
//   name: "SearchResultGoogleMap",
//   props: {
//     discoveredHomes: Object,
//   },
//   setup(props){
//     // const apartment = ref([]);
//     const homeCordinates = props.discoveredHomes.map((home) => ({
//       latitude: home.latitude,
//       longitude: home.longitude,
//       homePrice: `$ ${home.id}`,
//       bath: home.no_bedroom,
//       bed: home.no_bathroom,
//       area: `${home.no_sqft} sqft`,
//       street: home.street,
//       company: home.name,
//       city: home.city,
//       state: home.state,
//       postal_code: home.postal_code,
//     }));
//     console.log("For Map Details:", homeCordinates);

//     let mapWidget, mapMarker, markerText, mapPop, circle;
    
//     onMounted(() => {
//       mapWidget = leaflet.map("mapId").setView([39.5171702, -119.7732015], 12);

//       leaflet
//         .tileLayer(
//           "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
//           {
//             attribution:
//               "Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
//             maxZoom: 18,
//             id: "mapbox/streets-v11",
//             tileSize: 512,
//             zoomOffset: -1,
//             accessToken: `${process.env.VUE_APP_MAP_BOX_ACCESS_TOKEN}`
//           })
//         .addTo(mapWidget);
//       for (let i = 0; i < homeCordinates.length; i++){
//         mapPop = leaflet.popup({ mouseover: true }).setContent(`
//           <img class="rounded-xl" src="img/HomePage.013ddef6.jpg">
//           <div class="px-2 py-1">
//             <p class="text-lg font-bold">${homeCordinates[i].homePrice}</p>
//             <div class="flex">
//               <p class="mr-2">Bed: ${homeCordinates[i].bed}</p>
//               <p>Bath: ${homeCordinates[i].bath}</p>
//             </div>
//             <p class="text-base font-normal">${homeCordinates[i].street},</p>
//             <div class="flex">
//               <p class="text-base font-normal">${homeCordinates[i].city}</p>
//               <p class="text-base font-normal">, ${homeCordinates[i].state} ${homeCordinates[i].postal_code}</p>
//             </div>
//             <div class="border-t pb-2">
//             <p class="pt-1 uppercase text-xs font-normal">Listing By: ${homeCordinates[i].company}</p>
//             </div>
//           </div>`);
//         markerText = leaflet
//           .tooltip({ permanent: true })
//           .setContent(homeCordinates[i].homePrice);
//         circle = leaflet
//           .circle([homeCordinates[i].latitude, homeCordinates[i].longitude], {
//             color: "red",
//             fillColor: "#f03",
//             fillOpacity: 0.5,
//             radius: 250
//           })
//           .addTo(mapWidget);
//         circle.bindPopup(mapPop);
//         circle.bindTooltip(markerText);
//       }
//     });
//     return {
//       mapWidget,
//       mapMarker,
//       markerText,
//       mapPop,
//       circle,
//       homeCordinates
//     }
//   }
// }
</script>
<style scoped>
.map-half-size {
  width: calc(50% - 16px);
  height: calc(100vh -16px);
  touch-action: manipulation;
}
.map-full-size {
  width: calc(100% - 32px);
  height: calc(100vh -16px);
  touch-action: manipulation;
}
</style>