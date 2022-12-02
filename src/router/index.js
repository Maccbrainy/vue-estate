import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import { computed } from "vue";
import { removeUnderScoresFromAString } from "@/helper";

import { TheHomePage, ThePropertyListPage } from "../views/";
import settingsData from "@/api/settingsData.json";

const storeData = computed(() => store.getters.getStore);
const agentType = [...settingsData.agentType];
const regExpNumbersOnly = /^\d+$/; //Regular Expression for Number detection

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: TheHomePage,
    meta: {
      title: "Vue-estate: Real Estate Listings, Homes For Sale, Housing Data",
    },
  },
  {
    path: "/rent",
    name: "list-for-rent",
    component: TheHomePage,
    meta: {
      title: "Rental Listings in your Neighbourhood | Vue-estate.com",
    },
  },
  {
    path: "/for_sale/:slug/:city?",
    name: "BuyPage",
    component: ThePropertyListPage,
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
      sortType: route.query.sortType,
      page: route.query.page,
    })
  },
  {
    path: "/for_rent/:slug/:city?",
    name: "RentPage",
    component: ThePropertyListPage,
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
      sortType: route.query.sortType,
      page: route.query.page,
    })
  },
  {
    path: "/sold/:slug/:city?",
    name: "SoldPage",
    component: ThePropertyListPage,
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
      sortType: route.query.sortType,
      page: route.query.page,
    })
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
    component: ThePropertyListPage,
    props: (route) => ({
      name: route.name,
      lat: route.params.lat,
      long: route.params.long,
    }),
  },
  {
    path: "/apartments-for-rent-near-me",
    name: "RentsNearMe",
    component: ThePropertyListPage,
    props: (route) => ({
      name: route.name,
      lat: route.query.lat,
      long: route.query.long,
    }),
  },
  {
    path: "/",
    name: "list-sold",
    component: TheHomePage,
    alias: "/list-sold",
    meta: {
      title: "Vue-estate: Real Estate Sold Listings, and Housing Data",
    },
  },
  {
    path: "/C/:slug/:city/:address?/:propertyId/:postalCode?",
    name: "SalesPageDetail",
    // route level code-splitting
    // this generates a separate chunk (ThePropertyDetailedPage.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "ThePropertyDetailedPage" */ "../views/ThePropertyDetailedPage.vue"
      ),
    props: (route) => ({
      name: route.name,
      slug: route.params.slug,
      city: route.params.city,
      address: route.params.address,
      propertyId: route.params.propertyId,
      postalCode: route.params.postalCode,
      mediaTable: route.query.mediaTable,
    })
  },
  {
    path: "/P/:slug/:city/:address?/:propertyId/:postalCode?",
    name: "RentPageDetail",
    // route level code-splitting
    // this generates a separate chunk (ThePropertyDetailedPage.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "ThePropertyDetailedPage" */ "../views/ThePropertyDetailedPage.vue"
      ),
    props: (route) => ({
      name: route.name,
      slug: route.params.slug,
      city: route.params.city,
      address: route.params.address,
      propertyId: route.params.propertyId,
      postalCode: route.params.postalCode,
      mediaTable: route.query.mediaTable,
    })
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
      meta: {
        title: "Neighborhoods | Vue-estate.com",
      },
  },
  {
    path: "/mortgages",
    name: "mortgagePage",
    // route level code-splitting
    // this generates a separate chunk (TheMortgagePage.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "TheMortgagePage" */ "../views/TheMortgagePage.vue"
      ),
      meta: {
        title: "Mortgages | Vue-estate.com",
      },
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
    isPostalTitle = `Apartments For Rents in ${to.params.slug} Zip Code`;
    isTitle = `Apartments For Rents in ${slugParam} | Vue Estate`;
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
