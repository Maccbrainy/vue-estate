<template>
  <dropdown-button buttonTitle="More">
    <button-group-multi-buttons 
      v-bind:options="propertyListingType"
      v-bind:isActiveTab="activeRouteTab"
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
        v-bind:isActiveTab="noBath"
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
import { ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
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
} from "@/components/buttonui";
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
    const store = useStore();
    const activeRouteTab = ref("");
    const typeOfListing = ref([
      "For Sale by Agent",
      "For Sale by Owner",
      "Foreclosures",
      "Open Houses",
      "New Construction",
      "New Listings (Past Week)",
      "Price Reduced (Past Week)",
    ]);

    const bathroomOptions = ref(["Any", "1+", "2+", "3+", "4+", "5+"]);

    /**==========================
     * propertyListingType
     * ==========================
     */
    const propertyListingType = ref(["Buy", "Rent", "Sold"]);
    
    const getIsActiveRouteTab = computed(() => {
      return store.getters.getIsActiveRouteTab;
    });
    
    watchEffect(() => {
      console.log("Inside Filter:", getIsActiveRouteTab.value);
      switch (getIsActiveRouteTab.value) {
        case "BuyPage":
          activeRouteTab.value = propertyListingType.value[0]
          break;
        case "RentPage":
          activeRouteTab.value = propertyListingType.value[1]
          break;
        case "SoldPage": 
          activeRouteTab.value = propertyListingType.value[2]
          break;
      };
    });
    function propertyListingTypeId(e){
      console.log("Listing Type Id:", e.target.id);
    };

    /**==========================
     * numberOfBathroom
     * ==========================
     */
    const noBath = computed(() => bathroomOptions.value[0]);
    function numberOfBathroom(e){
      console.log("Bathroom No:", e.target.id);
    };
    return {
      noBath,
      activeRouteTab,
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