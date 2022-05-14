<template>
  <div class="w-1/2 sf:w-full block relative flex-1 px-4 py-3 -bottom-16">
    <div class="text-gray-600 ">
      <h1 class="text-2xl font-bold pb-8">
        Your search term doesn't match any home. 
        <br>
        Please search by:
      </h1>
      <li>State</li>
      <li>City</li>
      <li>Postal code</li>
      <li>Street name or address</li>
      <li>Location in United State</li>
    </div>
  </div>
</template>
<script>
export default {
  name: "NoSearchTermMatch",
}
</script>