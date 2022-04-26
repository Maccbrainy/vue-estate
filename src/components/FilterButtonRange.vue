<template>
  <dropdown-button buttonTitle="Any Price" menuTitle="Price Range">
    <div class="flex">
      <dropdown-button-select-box>
        <dropdown-button-select>
          <dropdown-button-select-option>No Min</dropdown-button-select-option>
          <dropdown-button-select-option value="a">
            A
          </dropdown-button-select-option>
          <dropdown-button-select-option value="b">
            B
          </dropdown-button-select-option>
          <dropdown-button-select-option value="c">
            C
          </dropdown-button-select-option>
        </dropdown-button-select>
      </dropdown-button-select-box>
      <button-separator></button-separator>
      <dropdown-button-select-box>
        <dropdown-button-select>
          <dropdown-button-select-option>No Max</dropdown-button-select-option>
          <dropdown-button-select-option value="a">
            A
          </dropdown-button-select-option>
          <dropdown-button-select-option value="b">
            B
          </dropdown-button-select-option>
          <dropdown-button-select-option value="c">
            C
          </dropdown-button-select-option>
        </dropdown-button-select>
      </dropdown-button-select-box>
    </div>
  </dropdown-button>
</template>
<script>
import { 
  DropdownButton, 
  ButtonSeparator, 
  DropdownButtonSelect, 
  DropdownButtonSelectBox, 
  DropdownButtonSelectOption, 
} from "@/components/buttonui/index";
export default {
  name: "FilterButtonRange",
  components: {
    DropdownButton,
    ButtonSeparator,
    DropdownButtonSelect,
    DropdownButtonSelectBox,
    DropdownButtonSelectOption,
  }
}
</script>