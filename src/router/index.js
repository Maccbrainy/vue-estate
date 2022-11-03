import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import { computed } from "vue";
import { removeUnderScoresFromAString } from "@/helper";

import HomePage from "../views/TheHomePage.vue";
import settingsData from "@/api/settingsData.json";
import SearchResultContentLayout from "@/layouts/SearchResultContentLayout.vue";
// import SearchResultDetailedContentLayout from "@/layouts/SearchResultDetailedContentLayout.vue";
import SiteMapsContentLayout from "@/layouts/SiteMapsContentLayout.vue";

const storeData = computed(() => store.getters.getStore);
const agentType = [...settingsData.agentType];
const regExpNumbersOnly = /^\d+$/; //Regular Expression for Number detection

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    meta: {
      title: "Vue-estate: Real Estate Listings, Homes For Sale, Housing Data",
    },
  },
  {
    path: "/rent",
    name: "list-for-rent",
    component: HomePage,
    meta: {
      title: "Rental Listings in your Neighbourhood | Vue-estate.com",
    },
  },
  {
    path: "/for_sale/:slug/:city?",
    name: "BuyPage",
    component: SearchResultContentLayout,
    alias: ["/:slug/:city?"],
    props: (route) => ({
      name: route.name,
      slug: route.params.slug,
      city: route.params.city,
      bed: route.query.bed,
      bath: route.query.bath,
      priceMin: route.query.priceMin,
      priceMax: route.query.priceMax,
      homeType: route.query.homeType,
      dogsAllowed: route.query.dogsAllowed,
      catsAllowed: route.query.catsAllowed,
      homeFeatures: route.query.homeFeatures,
      yearBuiltMin: route.query.yearBuiltMin,
      yearBuiltMax: route.query.yearBuiltMax,
      lotSize: route.query.lotSize,
      hasOpenHouses: route.query.hasOpenHouses,
      has3DTours: route.query.has3DTours,
      foreClosure: route.query.foreClosure,
      newConstruction: route.query.newConstruction,
      newPlans: route.query.newPlans,
      radius: route.query.radius,
      contingents: route.query.contingents,
      sortType: route.query.sortType
    }),
    meta: {
      title: "Vue-estate",
    },
  },
  {
    path: "/for_rent/:slug/:city?",
    name: "RentPage",
    component: SearchResultContentLayout,
    props: (route) => ({
      name: route.name,
      slug: route.params.slug,
      city: route.params.city,
      bed: route.query.bed,
      bath: route.query.bath,
      priceMin: route.query.priceMin,
      priceMax: route.query.priceMax,
      homeType: route.query.homeType,
      dogsAllowed: route.query.dogsAllowed,
      catsAllowed: route.query.catsAllowed,
      homeFeatures: route.query.homeFeatures,
      yearBuiltMin: route.query.yearBuiltMin,
      yearBuiltMax: route.query.yearBuiltMax,
      lotSize: route.query.lotSize,
      hasOpenHouses: route.query.hasOpenHouses,
      has3DTours: route.query.has3DTours,
      foreClosure: route.query.foreClosure,
      newConstruction: route.query.newConstruction,
      newPlans: route.query.newPlans,
      radius: route.query.radius,
      contingents: route.query.contingents,
      sortType: route.query.sortType

    }),
    meta: {
      title: "Vue-estate",
    },
  },
  {
    path: "/sold/:slug/:city?",
    name: "SoldPage",
    component: SearchResultContentLayout,
    props: (route) => ({
      name: route.name,
      slug: route.params.slug,
      city: route.params.city,
      bed: route.query.bed,
      bath: route.query.bath,
      priceMin: route.query.priceMin,
      priceMax: route.query.priceMax,
      homeType: route.query.homeType,
      dogsAllowed: route.query.dogsAllowed,
      catsAllowed: route.query.catsAllowed,
      homeFeatures: route.query.homeFeatures,
      yearBuiltMin: route.query.yearBuiltMin,
      yearBuiltMax: route.query.yearBuiltMax,
      lotSize: route.query.lotSize,
      hasOpenHouses: route.query.hasOpenHouses,
      has3DTours: route.query.has3DTours,
      foreClosure: route.query.foreClosure,
      newConstruction: route.query.newConstruction,
      newPlans: route.query.newPlans,
      radius: route.query.radius,
      contingents: route.query.contingents,
      sortType: route.query.sortType

    }),
    meta: {
      title: "Vue-estate",
    },
  },
  {
    path: "/new-for-sale-properties/:slug",
    redirect: {
      name: "BuyPage",
    },
  },
  {
    path: "/houses-for-sale-near-me",
    name: "SalesNearMe",
    component: SearchResultContentLayout,
    props: (route) => ({
      name: route.name,
      lat: route.params.lat,
      long: route.params.long,
    }),
  },
  {
    path: "/apartments-for-rent-near-me",
    name: "RentsNearMe",
    component: SearchResultContentLayout,
    props: (route) => ({
      name: route.name,
      lat: route.query.lat,
      long: route.query.long,
    }),
  },
  {
    path: "/sitemaps/",
    name: "SiteMaps",
    component: SiteMapsContentLayout,
    meta: {
      title: "Homes in USA",
    },
  },
  {
    path: "/",
    name: "list-sold",
    component: HomePage,
    alias: "/list-sold",
    meta: {
      title: "Vue-estate: Real Estate Sold Listings, and Housing Data",
    },
  },
  {
    path: "/C/:slug/:city/:address?/:propertyId/:postalCode?",
    name: "SalesPageDetail",
    // component: SearchResultDetailedContentLayout,

    // route level code-splitting
    // this generates a separate chunk (SalesPageDetail.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "SalesPageDetail" */ "../layouts/SearchResultDetailedContentLayout.vue"
      ),
    props: (route) => ({
      name: route.name,
      slug: route.params.slug,
      city: route.params.city,
      address: route.params.address,
      propertyId: route.params.propertyId,
      postalCode: route.params.postalCode,
      mediaTable: route.query.mediaTable,
    }),
    meta: {
      title: "Vue-estate",
    },
  },
  {
    path: "/P/:slug/:city/:address?/:propertyId/:postalCode?",
    name: "RentPageDetail",
    // component: SearchResultDetailedContentLayout,

    // route level code-splitting
    // this generates a separate chunk (RentPageDetail.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "RentPageDetail" */ "../layouts/SearchResultDetailedContentLayout.vue"
      ),
    props: (route) => ({
      name: route.name,
      slug: route.params.slug,
      city: route.params.city,
      address: route.params.address,
      propertyId: route.params.propertyId,
      postalCode: route.params.postalCode,
      mediaTable: route.query.mediaTable,
    }),
    meta: {
      title: "Vue-estate",
    },
  },
  {
    path: "/neighborhoods",
    name: "neighborhoods",
    // route level code-splitting
    // this generates a separate chunk (neighborhoods.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "neighborhoods" */ "../views/TheMortgagePage.vue"
      ),
  },
  {
    path: "/mortgage",
    name: "TheMortgagePage",
    // route level code-splitting
    // this generates a separate chunk (mortgage.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "mortgage" */ "../views/TheMortgagePage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  let setRouteMetaTitle;
  let makeActiveRouteToBe;
  let city = to.params.city ? `${to.params.city}` : "";
  let cityParam = city ? removeUnderScoresFromAString(city) : city;
  let slugParam = `${cityParam},${to.params.slug}`;

  let isPostalCode = regExpNumbersOnly.test(to.params.slug);
  let isPostalTitle;
  let isTitle;

  let addressParam = removeUnderScoresFromAString(to.params.address);

  if (to.name == "RentPage") {
    isPostalTitle = `Homes For Sale & Real Estate in ${to.params.slug} Zip Code`;
    isTitle = `${slugParam} Homes For Sale & ${slugParam} Real Estate | Vue Estate`;
    makeActiveRouteToBe = to.name;
    setRouteMetaTitle = !isPostalCode ? isTitle : isPostalTitle;
  } else if (to.name == "SoldPage") {
    isPostalTitle = `Recently Sold Properties in ${to.params.slug} Zip Code`;
    isTitle = `${slugParam} Recently Sold Properties | Vue Estate`;
    makeActiveRouteToBe = to.name;
    setRouteMetaTitle = !isPostalCode ? isTitle : isPostalTitle;
  } else if (to.name == "BuyPage") {
    isPostalTitle = `Homes For Sale & Real Estate in ${to.params.slug} Zip Code`;
    isTitle = `${slugParam} Homes For Sale & ${slugParam} Real Estate | Vue Estate`;
    makeActiveRouteToBe = to.name;
    setRouteMetaTitle = !isPostalCode ? isTitle : isPostalTitle;
  } else if (to.name == "RentsNearMe") {
    makeActiveRouteToBe = "RentPage";
    setRouteMetaTitle = `Apartments for rent near me - Find An Apartment Nearby | Vue Estate`;
  } else if (to.name == "SalesNearMe") {
    setRouteMetaTitle = `Houses for sale near me - Find a nearby Real Estate & Homes | Vue Estate`;
    makeActiveRouteToBe = "BuyPage";
  } else if (to.name == "SalesPageDetail" || to.name == "RentPageDetail") {
    setRouteMetaTitle = `${addressParam} in ${cityParam}, ${to.params.slug} - ${to.params.propertyId} | Vue Estate`;
    makeActiveRouteToBe = to.name;
  } else {
    setRouteMetaTitle = to.meta.title;
  }
  document.title = setRouteMetaTitle;

  if (makeActiveRouteToBe == "BuyPage" && !storeData.value.activeListBranch) {
    store.commit("setActiveListBranch", agentType[0].id);
  }
  store.commit("setActiveRoutePath", makeActiveRouteToBe);
});

export default router;
