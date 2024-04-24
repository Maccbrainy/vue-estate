<template>
  <div class="w-1/2 sf:w-full block relative flex-1 px-4 py-3 -bottom-16">
    <div class="flex flex-col text-gray-600">
      <!-- <h1 class="text-2xl font-bold pb-8">
        Your search term doesn't match any home.
        <br />
        Please search by:
      </h1>
      <li>State</li>
      <li>City</li>
      <li>Postal code</li>
      <li>Street name or address</li>
      <li>Location in United State</li> -->
      <h1 class="text-2xl font-bold pb-5">No Data found!</h1>
      <p class="max-w-2xl">
        The
        <strong>RapidAPI endpoints for realties in the US version 2</strong>
        consumed here has been deprecated. And the same endpoints and parameters
        have been removed in version 3. Contact me for further collaberations.
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "NoSearchTermMatch",
};
</script>
