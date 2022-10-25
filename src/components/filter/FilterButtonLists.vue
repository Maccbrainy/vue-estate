<template>
  <dropdown-button buttonTitle="List">
    <dropdown-button-options>
      <dropdown-button-option>Specification </dropdown-button-option>
      <dropdown-button-option>Specification </dropdown-button-option>
      <dropdown-button-option>Specification </dropdown-button-option>
      <dropdown-button-option>Specification </dropdown-button-option>
      <dropdown-button-option>Specification </dropdown-button-option>
      <dropdown-button-option>Specification </dropdown-button-option>
      <dropdown-button-option>Specification </dropdown-button-option>
    </dropdown-button-options>
  </dropdown-button>
</template>
<script>
import {
  DropdownButton,
  DropdownButtonOptions,
  DropdownButtonOption,
} from "@/components/buttonui/index";
export default {
  name: "FilterButtonLists",
  components: {
    DropdownButton,
    DropdownButtonOptions,
    DropdownButtonOption,
  },
};
</script>
