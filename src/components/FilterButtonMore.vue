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
      <dropdown-button-options>
        <dropdown-button-option>
          <dropdown-button-option-check-box>
            For Sale by Agent
          </dropdown-button-option-check-box>
        </dropdown-button-option>
        <dropdown-button-option>
          <dropdown-button-option-check-box>
            For Sale by Owner
          </dropdown-button-option-check-box>
        </dropdown-button-option>
        <dropdown-button-option>
          <dropdown-button-option-check-box>
            New Construction
          </dropdown-button-option-check-box>
        </dropdown-button-option>
        <dropdown-button-option>
          <dropdown-button-option-check-box>
            Foreclosures
          </dropdown-button-option-check-box>
        </dropdown-button-option>
        <dropdown-button-option>
          <dropdown-button-option-check-box>
            Open Houses
          </dropdown-button-option-check-box>
        </dropdown-button-option>
      </dropdown-button-options>  
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
  DropdownButtonOptionCheckBox, 
  DropdownButtonOption,
  DropdownButtonOptions,
} from "@/components/buttonui/index";
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
    DropdownButtonOption,
    DropdownButtonOptions,
    DropdownButtonOptionCheckBox,
  }
})
</script>