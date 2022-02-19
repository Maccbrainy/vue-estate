<template>
  <div 
    class="
      text-base 
      font-normal 
      overflow-ellipsis 
      whitespace-nowrap 
      overflow-hidden 
      text-gray-600">
    {{ street }},
    <br>
    {{city}}, 
    {{state}} 
    {{postalCode}}
  </div>
</template>
<script>
export default {
  name: "WidgetLocationDetail",
  props: ["street", "city", "state", "postalCode"],
};
</script>