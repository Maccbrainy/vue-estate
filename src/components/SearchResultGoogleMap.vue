<template>
  <section 
    role="region"
    aria-label="Interactive Google Map showing listings in .... Details about each listing, including address and price, can be found in the search results under the h2 heading." 
    class="
      fixed
      top-32 
      map-layout-size
      right-0
      bottom-0 
      bg-teal-lighter 
      mx-4
      mb-6
      rounded-xl">
    <div class="flex flex-1 w-full h-full">
      <div class="flex-1 relative overflow-hidden">
        <img 
          src="../assets/images/map.png" 
          alt="dummy interactive map" 
          class="w-full h-full object-center object-cover rounded-xl" />
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "SearchResultGoogleMap",
}
</script>