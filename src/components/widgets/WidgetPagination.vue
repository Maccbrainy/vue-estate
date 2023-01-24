<template>
  <div class="relative py-4 outline-none">
    <ul class="flex justify-center items-center gap-1">
      <!-- <li v-show="!isInFirstPage">
        <button
          @click="pageChangeHandler('isFirstPage')"
          :disabled="isInFirstPage"
          type="button"
          class="border rounded-l-md flex-auto px-3 py-0.5 font-semibold"
        >
          First
        </button>
      </li> -->
      <li v-show="!isInFirstPage">
        <button
          @click="pageChangeHandler('isPreviousPage')"
          :disabled="isInFirstPage"
          type="button"
          class="
            outline-none
            flex
            justify-center
            items-center
            border border-teal
            bg-teal
            rounded-lg
            px-1.5
            py-0.5
            hover:bg-white
            text-white
            hover:text-teal
          "
        >
          <chevron-left />
        </button>
      </li>
      <!-- Visible buttons start -->
      <li v-for="(page, index) in pages" :key="page.name + index">
        <button
          @click="pageChangeHandler(page.name)"
          type="button"
          :class="{
            'border border-teal bg-white text-teal shadow-lg':
              currentPage === page.name,
            'bg-teal-lighter text-teal': currentPage !== page.name,
          }"
          class="outline-none rounded-md flex-auto px-3 py-0.5 font-semibold"
          :disabled="page.isDisabled"
        >
          {{ page.name }}
        </button>
      </li>
      <!-- Visible buttons ends -->
      <li v-show="!isInLastPage">
        <button
          @click="pageChangeHandler('isNextPage')"
          :disabled="isInLastPage"
          type="button"
          class="
            outline-none
            flex
            justify-center
            items-center
            border border-teal
            bg-teal
            rounded-lg
            px-1.5
            py-0.5
            text-white
            hover:text-teal hover:bg-white
          "
        >
          <chevron-right />
        </button>
      </li>
      <!-- <li>
        <button
          @click="pageChangeHandler('isLastPage')"
          :disabled="isInLastPage"
          type="button"
          class="border rounded-r-md flex-auto px-3 py-0.5 font-semibold"
        >
          last
        </button>
      </li> -->
    </ul>
    <div class="text-center text-xs font-normal pt-1.5 text-gray-500">
      {{
        `${pageOffSet}-${paginationContentDescription} of ${addCommaToNumberFormat(
          totalItems
        )} Results`
      }}
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { ChevronRight, ChevronLeft } from "@/assets/icons";
import { addCommaToNumberFormat } from "@/helper";
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
    offset: {
      type: Number,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    totalItemsInCurrentPage: {
      type: Number,
      required: true,
    },
    maxVisiblePageLinks: {
      type: Number,
      required: false,
      default: 7,
    },
  },
  components: {
    ChevronRight,
    ChevronLeft,
  },
  emits: ["pageChanged"],
  setup(props, context) {
    const pageOffSet = computed(() => props.offset + 1);
    const totalPages = computed(() =>
      Math.ceil(props.totalItems / props.perPage)
    );
    const isInFirstPage = computed(() => props.currentPage === 1);
    const isInLastPage = computed(() => props.currentPage === totalPages.value);

    const paginationContentDescription = computed(
      () =>
        (props.currentPage - 1) * props.perPage + props.totalItemsInCurrentPage
    );

    const maxVisiblePageButtons = computed(() =>
      totalPages.value >= props.maxVisiblePageLinks
        ? props.maxVisiblePageLinks
        : totalPages.value
    );

    const startPage = computed(() => {
      let visiblePageButtonsStartFrom;
      // When on the first page
      if (isInFirstPage.value) {
        visiblePageButtonsStartFrom = 1;
        return visiblePageButtonsStartFrom;
      }
      // When on the last page
      if (isInLastPage.value) {
        visiblePageButtonsStartFrom =
          totalPages.value - maxVisiblePageButtons.value + 1;
        return visiblePageButtonsStartFrom;
      }
      // When inbetween
      visiblePageButtonsStartFrom = props.currentPage - 1;
      return visiblePageButtonsStartFrom;
    });

    const endPage = computed(() => {
      let visiblePageButtonsEndsAt = Math.min(
        startPage.value + maxVisiblePageButtons.value - 1,
        totalPages.value
      );
      return visiblePageButtonsEndsAt;
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

    const pageChangeHandler = (pageName) => {
      let isPage;
      if (pageName === "isFirstPage") {
        isPage = 1;
      } else if (pageName === "isPreviousPage") {
        isPage = props.currentPage - 1;
      } else if (pageName === "isNextPage") {
        isPage = props.currentPage + 1;
      } else if (pageName === "isLastPage") {
        isPage = totalPages.value;
      } else {
        isPage = pageName;
      }
      context.emit("pageChanged", isPage);
    };

    return {
      totalPages,
      pageOffSet,
      startPage,
      pages,
      isInFirstPage,
      isInLastPage,
      endPage,
      pageChangeHandler,
      paginationContentDescription,
      addCommaToNumberFormat,
    };
  },
};
</script>
