<template>
  <div>
    <div>
      <div class="md:mb-5">
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 text-center">Best sellers</h2>
      </div>
      <div class="mx-auto px-5 mt-5 md:px-15 mb-6 border border-gray-400 lg:border-none lg:px-20">
        <div class="text-center">
          <div class="flex lg:block lg:px-4 lg:py-2">
            <div class="lg:hidden">
              <button @click="toggleMenu"
                      class="p-3 pb-3 pt-3 py-2 mt-0.3 text-gray-800 opacity:5 border border-white hover:border-gray-400 transition duration-200">
                <img class="w-10" src="/public/images/menu-icon.svg" alt="">
              </button>
            </div>
            <div class="hidden text-m lg:text-xl lg:inline-flex lg:px-4 lg:py-2 lg:mb-10">
              <MainMenu :categories="getCategoriesList"/>
            </div>
          </div>
        </div>
      </div>
      <div v-if="getCategoriesList && getCategoriesList.length"
           class="container mx-auto px-5 sm:px-10 md:px-15 lg:px-20">
        <div class="grid sm:grid-cols-1 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-4 lg:gap-6 grid-flow-dense">
          <div
              class="col-span-1 lg:flex absolute lg:relative lg:shadow-none lg:pt-0"
              :class="[isMenuOpen ? 'flex top-0 left-0 pt-10 pr-20 pb-10 pl-7 h-full bg-white shadow-md' : 'hidden']">
            <div class="ml-2">
              <button
                  class="lg:hidden absolute right-5 top-5 w-10"
                  @click="toggleMenu">
                <img :src="`/images/close.svg`" alt=""></button>
              <button
                  @click="toggleCategory()"
                  class="font-semibold text-left block hover:underline"
              >Toj
              </button>
              <div v-if="getCategoriesList && getCategoriesList.length">
                <SideMenu :categories="getCategoriesList"/>
              </div>
            </div>
          </div>

          <div class="col-span-3">
            <div v-if="productsData && productsData.length"
                 class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-[minmax(250px,auto)]">
              <ProductList :productsData="productsData"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ICategories } from "../configs/fetchingDataTypes";
import { IToggleMenuCategoryData } from "../configs/globalTypes";
import { useProducts } from "../composables/fetchItemsData";
import SideMenu from "./menu/SideMenu.vue";
import MainMenu from "./menu/MainMenu.vue";
import ProductList from "./product/ProductList.vue";
const { productsData, categoriesData } = useProducts();

const headerData = useState("headerData");
onMounted(() => headerData.value.title = "Products");
const openCategories = useState<Record<IToggleMenuCategoryData>>("openCategories", () => ({}));

const getCategoriesList = computed((): ICategories[] => {
  const categoriesList = categoriesData.value;
  return Array.isArray(categoriesList?.categories) ? categoriesList.categories : [];
});

function toggleCategory(): void {
  Object.keys(openCategories.value).forEach(key => {
    delete openCategories.value[key];
  });
}

const isMenuOpen = ref(false);
const isLargeScreen = ref(false);
const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value;
}
const checkScreenSize = () => {
  isLargeScreen.value = window.matchMedia("(min-width: 1024px)").matches;
};

watch(isLargeScreen, (newVal) => {
  isMenuOpen.value = newVal;
});

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>