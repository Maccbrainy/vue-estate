<template>
  <dropdown-button buttonTitle="All Beds" menuTitle="Bedrooms">
    <button-group>
      <button-singular 
        class="rounded-l-md text-teal-lighter bg-teal hover:bg-teal">
        Studio+
      </button-singular>
      <button-singular>1+</button-singular>
      <button-singular>2+</button-singular>
      <button-singular>3+</button-singular>
      <button-singular class="border-r rounded-r-md">4+</button-singular>
    </button-group>
  </dropdown-button>
</template>
<script>
import { ButtonSingular, ButtonGroup, DropdownButton } from "@/utilityui/index";
export default ({
  name: "FilterButtonGroup",
  components: {
    ButtonSingular,
    ButtonGroup,
    DropdownButton,
  }
})
</script>