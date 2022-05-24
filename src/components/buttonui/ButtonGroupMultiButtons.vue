<template>
  <button-group>
    <button-singular 
      v-for="option in options" 
      v-bind:key="option.index"
      v-on:click="$emit('getOptionId', $event)"
      v-bind:id="option"
      v-bind:class="{
        'rounded-l-lg': option == options[0],
        'border-r rounded-r-lg': option == options[options.length - 1],
        'bg-teal text-teal-lighter border-teal shadow-xl hover:bg-teal': isActiveTab == option
      }">
      {{ option }}
    </button-singular>
  </button-group>
</template>
<script>
import { ButtonSingular, ButtonGroup } from "@/components/buttonui";
export default ({
  name: "ButtonGroupMultiButtons",
  components: {
    ButtonSingular,
    ButtonGroup,
  },
  props: {
    options: Array,
    isActiveTab: String
  }
})
</script>