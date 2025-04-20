<template>
  <div v-for="(product, index) in filteredProducts"
       :key="product.id"
       :class="{'col-span-1 row-span-1' : product.name || (product.type && product.type === '1x1')}"
       :style="getGridStyle(index, product.type)"
       class="shadow-md h-full"
  >

    <div v-if="product.name && product.id">
      <NuxtLink :to="`/product/${product.id}`">
        <div>
          <img :src="product.images?.length ? product.images[0] : '/images/emptyItem.jpg'"
               :alt="product.name?.dk || product.name?.en || 'Product image'"
               class="h-full object-cover"
               loading="lazy"
          />
        </div>
        <div class="p-2 flex flex-col items-left text-left space-y-2 h-full">
          <span class="text-md font-semibold text-gray-800 leading-4"> {{ product.name.dk || product.name.en }}</span>
          <span class="text-sm text-gray-600"> {{ product.price }} kr </span>
        </div>
      </NuxtLink>
    </div>

    <div v-else class="flex justify-center items-center h-full">
      <NuxtLink :to="`${product.link}`">
        <div :style="{ maxWidth: product.image.maxWidth + 'px' }" class="mx-auto" v-if="product.image">
          <img :src="product.image.imageUrl ? product.image.imageUrl : `/images/${product.image.alt}`"
               :alt="product.imageAltText || product.link"
               class="h-full object-cover"
          />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect, onUnmounted } from "vue";
import { IProducts, IPromotionalSpots, IPromotionalSpotsType } from "../../configs/fetchingDataTypes";
import { useProducts } from "../../composables/fetchItemsData";
import { IToggleMenuCategoryData } from "../../configs/globalTypes";
import { gridLg, gridSm } from "../../configs/globalConfigs";

const { promotionalSpotsData } = useProducts();

const productDataProps = defineProps<{
  productsData: IProducts[];
}>()

const openCategories = useState<Record<IToggleMenuCategoryData>>("openCategories", () => ({}));

const filteredProducts = computed((): (IProducts | IPromotionalSpots)[] => {
  if (!productDataProps.productsData || !promotionalSpotsData.value) {
    return [];
  }
  let displayed: (IProducts | IPromotionalSpots)[] = [];

  for (let i = 0; i < productDataProps.productsData.length; i++) {
    const currentProduct = productDataProps.productsData[i];
    let filterCategory = true;
    if (Object.keys(openCategories.value).length) {
      filterCategory = Object.keys(openCategories.value).every(level => {
        const category = openCategories.value[+level];
        return currentProduct.categories?.includes(category.id);
      });
    }

    const promo = matchingPromo(displayed.length);
    if (promo) {
      displayed.push(promo);
    }
    if (filterCategory) {
      displayed.push(currentProduct);
    }
  }
  return displayed;
});

const matchingPromo = (position: number): IPromotionalSpots => {
  return promotionalSpotsData.value.find(spot => spot.position === position);
};

const rowSize = ref(gridSm);

const gridHandler = (matchMedia: MediaQueryList | MediaQueryListEvent): void => {
  rowSize.value = matchMedia.matches ? gridLg : gridSm;
}
watchEffect(() => {
  const matchMedia = window.matchMedia("(min-width: 1024px)");
  gridHandler(matchMedia);

  matchMedia.addEventListener("change", gridHandler);

  onUnmounted(() => {
    matchMedia.removeEventListener("change", gridHandler);
  });
});

function getGridStyle(index: number, type?: IPromotionalSpotsType): Record<string, string | number> {
  if(!type) {
    return;
  }

  const currentRowSize = rowSize.value;
  const [colSpanStr, rowSpanStr] = type.split("x");

  const colTypeValue = Number(colSpanStr);
  const rowTypeValue = Number(rowSpanStr);

  const rowStart = Math.floor(index / currentRowSize) + 1;
  const rowEnd = rowStart + rowTypeValue;

  const colStart = Math.min(Math.floor(index % currentRowSize) + 1, currentRowSize + 1 - colTypeValue);
  const colEnd = colStart + colTypeValue

  return {
    '--row-start': rowStart,
    '--row-end': rowEnd,
    '--column-start': colStart,
    '--column-end': colEnd,
    gridRow: 'var(--row-start) / var(--row-end)',
    gridColumn: 'var(--column-start) / var(--column-end)'
  }
}
</script>
