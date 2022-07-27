<template>
  <dropdown-button class="transform -translate-x-3/4" buttonTitle="More">
    <filter-route-tab></filter-route-tab>
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
// import { useRouterPush } from "@/composables";
//import { useRoute } from "vue-router";
import { ref, computed, reactive } from "vue";
//import { useStore } from "vuex";
import { FilterRouteTab } from "@/components/filter";
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
    ButtonGroupMultiButtons,
    FilterRouteTab,
  },
  setup() {
    const checkedTypeOfListing = ref([]);
    //const store = useStore();
    // const router = useRouter();
    //const route = useRoute();
    const activeRouteTab = ref("");
    const typeOfListing = reactive([
      {
        id: "saleByAgent",
        title: "For Sale by Agent",
      },
      {
        id: "saleByOwner",
        title: "For Sale by Owner",
      },
      {
        id: "foreclosures",
        title: "Foreclosures",
      },
      {
        id: "open_house_date",
        title: "Open Houses",
      },
      {
        id: "newest",
        title: "New Listings (Past Week)",
      },
      {
        id: "price_reduced_date",
        title: "Price Reduced (Past Week)",
      },
    ]);

    const bathroomOptions = ref([
      {
        id: "Any",
        name: "Any"
      },
      {
        id: "1+",
        name: "1+"
      },
      {
        id: "2+",
        name: "2+"
      },
      {
        id: "3+",
        name: "3+"
      },
      {
        id: "4+",
        name: "4+"
      },
      {
        id: "5+",
        name: "5+"
      },
    ]);

    /**==========================
     * numberOfBathroom
     * ==========================
     */
    const noBath = computed(() => bathroomOptions.value[0].id);
    function numberOfBathroom(e){
      console.log("Bathroom No:", e.target.id);
    };
    return {
      noBath,
      activeRouteTab,
      typeOfListing,
      bathroomOptions,
      checkedTypeOfListing,
      numberOfBathroom
    }
  }
})
</script>