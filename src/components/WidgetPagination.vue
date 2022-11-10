<template>
  <div class="relative py-4">
    <ul class="flex justify-center items-center gap-1">
      <li v-show="!isInFirstPage">
        <button
          @click="onClickFirstPage"
          :disabled="isInFirstPage"
          type="button"
          class="border rounded-l-md flex-auto px-3 py-0.5 font-semibold"
        >
          First
        </button>
      </li>
      <li v-show="!isInFirstPage">
        <button
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
          type="button"
          class="border flex-auto px-3 py-0.5 font-semibold"
        >
          Previous
        </button>
      </li>
      <!-- Visible buttons start -->
      <li v-for="(page, index) in pages" :key="page.name + index">
        <button
          @click="onClickPage(page.name)"
          type="button"
          :class="{
            'border border-teal bg-white text-teal shadow-lg':
              currentPage === page.name,
            'bg-teal-lighter text-teal': currentPage !== page.name,
          }"
          class="rounded-md flex-auto px-3 py-0.5 font-semibold"
          :disabled="page.isDisabled"
        >
          {{ page.name }}
        </button>
      </li>
      <!-- Visible buttons ends -->
      <li>
        <button
          @click="onClickNextPage"
          :disabled="isInLastPage"
          type="button"
          class="border flex-auto px-3 py-0.5 font-semibold"
        >
          Next
        </button>
      </li>
      <li>
        <button
          @click="onClickLastPage"
          :disabled="isInLastPage"
          type="button"
          class="border rounded-r-md flex-auto px-3 py-0.5 font-semibold"
        >
          last
        </button>
      </li>
    </ul>
    <div class="text-center text-xs font-medium pt-1.5">
      {{ `${pageOffSet}-${perPage * currentPage} of 24040` }}
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
export default {
  name: "WidgetPagination",
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    offset:{
      type: Number,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    maxVisiblePageLinks: {
      type: Number,
      required: false,
      default: 6,
    },
  },
  emits: ["pageChanged"],
  setup(props, context) {
    const pageOffSet = computed(() => props.offset + 1)
    const totalPages = computed(() =>
      Math.ceil(props.totalItems / props.perPage)
    );
    const isInFirstPage = computed(() => props.currentPage === 1);
    const isInLastPage = computed(() => props.currentPage === totalPages.value);
    const startPage = computed(() => {
      // When on the first page
      if (props.currentPage === 1) {
        return 1;
      }
      // When on the last page
      if (props.currentPage === totalPages.value) {
        return totalPages.value - props.maxVisiblePageLinks + 1;
      }
      // When inbetween
      return props.currentPage - 1;
    });

    const endPage = computed(() => {
      return Math.min(
        startPage.value + props.maxVisiblePageLinks - 1,
        totalPages.value
      );
    });

    const pages = computed(() => {
      let range = [];
      for (let i = startPage.value; i <= endPage.value; i += 1) {
        range.push({
          name: i,
          isDisabled: i === props.currentPage,
        });
      }
      return range;
    });
    const onClickFirstPage = () => {
      context.emit("pageChanged", 1);
    };
    const onClickPreviousPage = () => {
      context.emit("pageChanged", props.currentPage - 1);
    };
    const onClickPage = (pageName) => {
      context.emit("pageChanged", pageName);
    };
    const onClickNextPage = () => {
      context.emit("pageChanged", props.currentPage + 1);
    };
    const onClickLastPage = () => {
      context.emit("pageChanged", totalPages.value);
    };
    return {
      totalPages,
      pageOffSet,
      startPage,
      pages,
      isInFirstPage,
      isInLastPage,
      endPage,
      onClickFirstPage,
      onClickPreviousPage,
      onClickPage,
      onClickNextPage,
      onClickLastPage,
    };
  },
};
</script>
