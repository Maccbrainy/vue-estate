<template>
  <dropdown-button buttonTitle="More">
    <button-group>
      <button-singular 
        class="rounded-l-md text-teal-lighter bg-teal hover:bg-teal">
        Buy
      </button-singular>
      <button-singular>Rent</button-singular>
      <button-singular class="rounded-r-md border-r">Sold</button-singular>
    </button-group>
    <dropdown-button-fieldset fieldsetTitle="Type of Listings">
      <dropdown-button-multi-check-boxes 
        v-model:value="checkedTypeOfListing"
        v-bind:propertyOptions="typeOfListing">
      </dropdown-button-multi-check-boxes>  
    </dropdown-button-fieldset>
    <dropdown-button-fieldset fieldsetTitle="Max HOA Fees">
      <dropdown-button-select-box>
        <dropdown-button-select>
          <dropdown-button-select-option>No Min</dropdown-button-select-option>
          <dropdown-button-select-option value="a">
            A</dropdown-button-select-option>
          <dropdown-button-select-option value="b">
            B</dropdown-button-select-option>
          <dropdown-button-select-option value="c">
            C</dropdown-button-select-option>
        </dropdown-button-select>
      </dropdown-button-select-box>
    </dropdown-button-fieldset>
    <dropdown-button-fieldset fieldsetTitle="Bathrooms">
      <button-group>
        <button-singular 
          class="rounded-l-md text-teal-lighter bg-teal hover:bg-teal">
          Any+
        </button-singular>
        <button-singular>1+</button-singular>
        <button-singular>2+</button-singular>
        <button-singular>3+</button-singular>
        <button-singular>4+</button-singular>
        <button-singular class="rounded-r-md">5+</button-singular>
      </button-group>
    </dropdown-button-fieldset>
    <dropdown-button-fieldset fieldsetTitle="Square Feet">
      <div class="flex">
        <button-input placeholder="No Min"></button-input>
        <button-separator></button-separator>
        <button-input placeholder="No Max"></button-input>
      </div>
    </dropdown-button-fieldset>
    <dropdown-button-fieldset fieldsetTitle="Lot Size">
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
    </dropdown-button-fieldset>
    <dropdown-button-fieldset fieldsetTitle="Year Built">
      <div class="flex">
        <button-input placeholder="Min Year"></button-input>
        <button-separator></button-separator>
        <button-input placeholder="Max Year"></button-input>
      </div>
    </dropdown-button-fieldset>
    <dropdown-button-fieldset fieldsetTitle="MLS#">
      <button-input placeholder="MLS#"></button-input>
    </dropdown-button-fieldset>
  </dropdown-button>
</template>
<script>
import { 
  ButtonSingular, 
  ButtonGroup, 
  ButtonSeparator, 
  ButtonInput, 
  DropdownButton, 
  DropdownButtonFieldset, 
  DropdownButtonSelectBox, 
  DropdownButtonSelect, 
  DropdownButtonSelectOption,
  DropdownButtonMultiCheckBoxes, 
} from "@/components/buttonui/index";
import { ref } from "vue";
export default ({
  components: {
    ButtonSingular,
    ButtonInput,
    ButtonGroup,
    ButtonSeparator,
    DropdownButton,
    DropdownButtonFieldset,
    DropdownButtonSelectBox,
    DropdownButtonSelect,
    DropdownButtonSelectOption,
    DropdownButtonMultiCheckBoxes
  },
  setup() {
    const checkedTypeOfListing = ref([]);
    const typeOfListing = ref([
      "For Sale by Agent",
      "For Sale by Owner",
      "Foreclosures",
      "Open Houses",
      "New Construction",
      "New Listings (Past Week)",
      "Price Reduced (Past Week)",
    ]);
    return {
      typeOfListing,
      checkedTypeOfListing
    }
  }
})
</script>