<template>
  <dropdown-button-options>
    <dropdown-button-option 
      v-for="propertyOption in propertyOptions" 
      v-bind:key="propertyOption">
      <dropdown-button-option-check-box
        v-bind:checked="value.includes(propertyOption)"
        @update:checked="check(propertyOption, $event)" 
        v-bind:fieldId="propertyOption"
        v-bind:label="propertyOption">
        {{ propertyOption }}
      </dropdown-button-option-check-box>
    </dropdown-button-option>
  </dropdown-button-options>
</template>
<script>
// import { ref } from "vue";
// import { useStore } from "vuex";
import { 
  // DropdownButton, 
  DropdownButtonOptions, 
  DropdownButtonOption,
  DropdownButtonOptionCheckBox, 
} from "@/components/buttonui/index";
export default ({
  name: "DropdownButtonMultiCheckBoxes",
  components: {
    // DropdownButton,
    DropdownButtonOptions,
    DropdownButtonOption,
    DropdownButtonOptionCheckBox,
  },
  props: {
    value: {
      type: Array
    },
    propertyOptions: {
      type: Array,
      required: true
    }
  },
  emits: ["update:value"],
  setup(props, context) {
    // const store = useStore();
    const check = (propertyOption, checked) => {
      let updatedValue = [...props.value];
      if (checked ){
        updatedValue.push(propertyOption);
      } else {
        updatedValue.splice(updatedValue.indexOf(propertyOption), 1)
      }
      context.emit("update:value", updatedValue);
    }
    return {
      check
    }
  }
})
</script>