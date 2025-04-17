<template>
  <button class="m-2 hover:underline" @click="resetCategories()">Toj</button>
  <div v-if="getOpenCategories">
    <button
        v-for="(category, index) in getOpenCategories"
        :key="index"
        @click="index !== getOpenCategories.length -1 && switchCategory(category)"
        class="main-menu-button text-gray-800 m-4 lg:m-3 pt-1"
    >
    <span class="mr-2 lg:mr-4">></span> <span class="main-menu-name"> {{ category.name }} </span>
    </button>
  </div>

</template>

<script setup lang="ts">

import { ICategories } from "../../configs/fetchingDataTypes";
import { ISwitchMenuData, IToggleMenuCategoryData } from "../../configs/globalTypes";

const prop = defineProps<{ categories: ICategories[] }>();

const openCategories = useState<Record<IToggleMenuCategoryData>>("openCategories", () => ({}));

function switchCategory(category: ISwitchMenuData[] | []): void {
  Object.keys(openCategories.value).forEach((menuLevel) => {
    if(menuLevel > category.level) {
      delete openCategories.value[menuLevel];
    }
  });
}

const getOpenCategories = computed((): ISwitchMenuData[] | [] => {
  if(Object.keys(openCategories.value).length > 0) {
    const categories = [];
    Object.keys(openCategories.value).forEach(key => {
      const name = openCategories.value[key].name.dk || openCategories.value[key].name.en;
      categories.push({level: key, name});
    });
    return categories;
  }
  return [];
});

function resetCategories(): void {
  Object.keys(openCategories.value).forEach(key => {
    delete openCategories.value[key];
  });
}

</script>