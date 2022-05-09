<template>
  <button-group>
    <button-singular 
      v-for="option in options" 
      v-bind:key="option.index"
      v-on:click="$emit('getOptionId', $event)"
      v-bind:id="option"
      v-bind:class="{
        'rounded-l-lg': option === options[0] ? true : false,
        'border-r rounded-r-lg': 
          option === options[options.length - 1] ? true : false,
      }">
      {{ option }}
    </button-singular>
  </button-group>
</template>
<script>
import { ButtonSingular, ButtonGroup } from "@/components/buttonui/index";
export default ({
  name: "ButtonGroupMultiButtons",
  components: {
    ButtonSingular,
    ButtonGroup,
  },
  props: {
    options: Array
  }
})
</script>