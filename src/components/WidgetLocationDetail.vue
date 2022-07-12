<template>
  <div 
    class="
      text-base 
      font-normal 
      overflow-ellipsis 
      whitespace-nowrap 
      overflow-hidden 
      text-gray-600">
    {{ streetOrName }}
    <br>
    {{city}}, 
    {{state}} 
    {{postalCode}}
  </div>
</template>
<script>
export default {
  name: "WidgetLocationDetail",
  props: ["streetOrName", "city", "state", "postalCode"],
};
</script>