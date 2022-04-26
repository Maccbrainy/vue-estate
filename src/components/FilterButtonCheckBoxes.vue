<template>
  <dropdown-button buttonTitle="All Home Types" menuTitle="Home Type">
    <dropdown-button-options>
      <dropdown-button-option>
        <dropdown-button-option-check-box id="single" value="single">
          Single
        </dropdown-button-option-check-box>
      </dropdown-button-option>
      <dropdown-button-option>
        <dropdown-button-option-check-box 
          id="multi_family" 
          value="multi_family">
          Multi-family
        </dropdown-button-option-check-box>
      </dropdown-button-option>
      <dropdown-button-option>
        <dropdown-button-option-check-box id="town" value="town">
          Town
        </dropdown-button-option-check-box>
      </dropdown-button-option>
      <dropdown-button-option>
        <dropdown-button-option-check-box id="land" value="land">
          Land
        </dropdown-button-option-check-box>
      </dropdown-button-option>
      <dropdown-button-option>
        <dropdown-button-option-check-box 
          id="mobile_manufactured" 
          value="mobile">
          Mobile/Manufactured
        </dropdown-button-option-check-box>
      </dropdown-button-option>
      <dropdown-button-option>
        <dropdown-button-option-check-box id="others" value="others">
          Others
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
} from "@/components/buttonui/index";
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