<template>
  <dropdown-button buttonTitle="All Home Types" menuTitle="Home Type">
    <dropdown-button-options>
      <dropdown-button-option>
        <dropdown-button-option-check-box>
          Home
        </dropdown-button-option-check-box>
      </dropdown-button-option>
    </dropdown-button-options>
  </dropdown-button>
</template>
<script>
import { 
  DropdownButton, 
  DropdownButtonOptions, 
  DropdownButtonOption,
  DropdownButtonOptionCheckBox, 
} from "@/utilityui/index";
export default ({
  name: "FilterButtonCheckBoxes",
  components: {
    DropdownButton,
    DropdownButtonOptions,
    DropdownButtonOption,
    DropdownButtonOptionCheckBox,
  }
})
</script>