<template>
  <div
    class="
      text-base
      font-normal
      overflow-ellipsis
      whitespace-nowrap
      overflow-hidden
      text-gray-600
    "
  >
    <span
      v-bind:class="{ 'animate-pulse bg-gray-200 w-16 h-4': fetchingIsBusy }"
    >
      <span v-show="!fetchingIsBusy">{{ streetOrName }}</span>
    </span>
    <br />
    <span
      v-bind:class="{ 'animate-pulse bg-gray-200 w-16 h-4': fetchingIsBusy }"
    >
      <span v-show="!fetchingIsBusy">
        {{ city }},
        {{ state }}
        {{ postalCode }}</span
      >
    </span>
  </div>
</template>
<script>
export default {
  name: "WidgetLocationDetail",
  props: ["streetOrName", "city", "state", "postalCode", "fetchingIsBusy"],
};
</script>
