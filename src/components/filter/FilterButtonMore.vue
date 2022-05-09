<template>
  <dropdown-button buttonTitle="More">
    <button-group-multi-buttons 
      v-bind:options="propertyListingType"
      v-on:getOptionId="propertyListingTypeId">
    </button-group-multi-buttons>
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
      <button-group-multi-buttons 
        v-bind:options="bathroomOptions"
        v-on:getOptionId="numberOfBathroom">
      </button-group-multi-buttons>
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
  ButtonSeparator, 
  ButtonInput, 
  DropdownButton, 
  DropdownButtonFieldset, 
  DropdownButtonSelectBox, 
  DropdownButtonSelect, 
  DropdownButtonSelectOption,
  DropdownButtonMultiCheckBoxes,
  ButtonGroupMultiButtons 
} from "@/components/buttonui/index";
import { ref } from "vue";
export default ({
  components: {
    ButtonInput,
    ButtonSeparator,
    DropdownButton,
    DropdownButtonFieldset,
    DropdownButtonSelectBox,
    DropdownButtonSelect,
    DropdownButtonSelectOption,
    DropdownButtonMultiCheckBoxes,
    ButtonGroupMultiButtons
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
    const propertyListingType = ref(["Buy", "Rent", "Sold"]);
    const bathroomOptions = ref(["Any", "1+", "2+", "3+", "4+", "5+"]);

    function propertyListingTypeId(e){
      console.log("Listing Type Id:", e.target.id);
    };
    function numberOfBathroom(e){
      console.log("Bathroom No:", e.target.id);
    };
    return {
      propertyListingType,
      typeOfListing,
      bathroomOptions,
      propertyListingTypeId,
      checkedTypeOfListing,
      numberOfBathroom
    }
  }
})
</script>