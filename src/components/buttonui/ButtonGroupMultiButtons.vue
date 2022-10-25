<template>
  <button-group>
    <button-singular
      v-for="option in options"
      v-bind:key="option.id"
      v-on:click="$emit('getOptionId', $event)"
      v-bind:id="option.id"
      v-bind:class="{
        'rounded-l-lg': option == options[0],
        'border-r rounded-r-lg': option == options[options.length - 1],
        'text-white bg-teal  border-teal shadow-xl hover:bg-teal focus:border-teal':
          isActiveTab == option.id,
      }"
    >
      {{ option.name }}
    </button-singular>
  </button-group>
</template>
<script>
import { ButtonSingular, ButtonGroup } from "@/components/buttonui";
export default {
  name: "ButtonGroupMultiButtons",
  components: {
    ButtonSingular,
    ButtonGroup,
  },
  props: {
    options: Array,
    isActiveTab: [String, Number],
  },
};
</script>
