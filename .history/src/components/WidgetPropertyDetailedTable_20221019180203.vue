<template>
  <div class="relative my-6">
    <div class="text-gray-700 font-bold text-xl my-4">
      {{ `Home Detail for ${addressOfProperty}` }}
    </div>
    <table
      v-for="feature in propertyFeatures"
      :key="feature"
      class="
        table-fixed
        bg-teal-lighter
        w-full
        h-auto
        overflow-hidden
        text-gray-600
        my-4
        rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-lg
      "
    >
      <thead>
        <tr class="w-full py-3 text-gray-600">
          <th class="w-full text-left py-2 px-4">
            {{ feature.category }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr class="w-full flex flex-wrap justify-between border">
          <td
            v-for="text in feature.text"
            :key="text"
            class="w-auto py-2 px-4 flex"
          >
            <div>{{ text }}</div>
          </td>
        </tr>
      </tbody>
    </table>
    <span
      class="bg-gradient-to-t from-black h-10 w-full -mt-12 z-10"
    >
    </span>
    <button
      v-on:click="toggleTable = !toggleTable"
      class="
        w-28
        mt-6
        px-4
        py-2
        text-gray-600
        font-bold
        text-base
        border border-gray-400
        rounded-lg
        bg-white
        active:border-gray-800
      "
    >
      {{ toggleTable ? "See Less" : "See More" }}
    </button>
  </div>
</template>
<script>
import { ref, computed } from "vue";
export default {
  name: "WidgetPropertyDetailedTable",
  props: {
    addressOfProperty: {
      type: String,
    },
    propertyFeatureDetails: {
      type: Array,
    },
  },
  setup(props) {
    const toggleTable = ref(false);

    const propertyFeaturesToShowAtDefault = computed(() => {
      let featureData = "";
      if (props.propertyFeatureDetails.length > 2) {
        featureData = props.propertyFeatureDetails.filter((data, index) =>
          index < 2 ? data : ""
        );
      }
      if (
        props.propertyFeatureDetails.length > 0 &&
        props.propertyFeatureDetails.length <= 2
      ) {
        featureData = props.propertyFeatureDetails;
      }

      return featureData;
    });
    const propertyFeatures = computed(() => {
      let features = toggleTable.value
        ? props.propertyFeatureDetails
        : propertyFeaturesToShowAtDefault.value;
      return features;
    });

    return { toggleTable, propertyFeatures }
  },
};
</script>
