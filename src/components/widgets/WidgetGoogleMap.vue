<template>
  <section
    role="region"
    aria-label="Interactive Google Map showing listings in .... Details about each listing, including address and price, can be found in the search results under the h2 heading."
    v-bind:class="{
      hidden: activeMapViewVariant == 'ListViewNoMapLayout' && isLargeScreen,
      'map-half-size': activeMapViewVariant == 'MapViewLayout' && isLargeScreen,
      'map-full-size': mobileMapViewLayoutFullScreen && !isLargeScreen,
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
      transition-all
      delay-500
      duration-1000
    "
  >
    <div class="flex flex-1 w-full h-full">
      <div class="flex-1 relative overflow-hidden">
        <div
          class="
            absolute
            w-full
            h-full
            flex
            justify-center
            items-center
            bg-teal-lighter
            rounded-xl
          "
        >
          <span class="text-5xl text-white font-bold">Map Coming Soon</span>
        </div>
        <button
          v-on:click="mapViewChangesCallback"
          v-bind:title="mapViewFullScreen ? `Show Lists` : `Expand map`"
          class="
            absolute
            flex
            gap-1
            bg-white
            shadow-lg
            rounded-md
            px-2
            py-1.5
            m-3
            font-normal
            text-base
            xlm:hidden
          "
        >
          <chevron-left
            class="text-teal"
            v-bind:class="{
              'transform rotate-180': mapViewFullScreen,
            }"
          />
          <span>{{ mapViewFullScreen ? "Show List" : "" }}</span>
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
import { inject } from "vue";
import { ChevronLeft } from "@/assets/icons";
export default {
  components: {
    ChevronLeft,
  },
  setup() {
    const {
      mapViewFullScreen,
      mobileMapViewLayoutFullScreen,
      mapViewChangesCallback,
      activeMapViewVariant,
      isLargeScreen,
    } = inject("provider");
    return {
      mapViewFullScreen,
      mapViewChangesCallback,
      activeMapViewVariant,
      mobileMapViewLayoutFullScreen,
      isLargeScreen,
    };
  },
};
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
