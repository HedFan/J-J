<template>
  <div class="ml-1">
    <div v-for="(category, index) in categories" :key="category.id + '_' + index"
         class="ml-2">
      <button
          @click="toggleCategory(category.id, category.level, category.name)"
          class="font-semibold text-left block hover:underline"
          :class="{'text-amber-600': isOpen(category.id, category.level)}"
      >
        {{ category.name.dk || category.name.en }}
      </button>
      <transition name="fade-slide" mode="out-in">
        <div v-show="isOpen(category.id, category.level)" v-if="category.categories && Array.isArray(category.categories)">
          <SideMenu :categories="category.categories"/>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ICategories, IProductName } from "../../configs/fetchingDataTypes";
import { IToggleMenuCategoryData } from "../../configs/globalTypes";
const openCategories = useState<Record<IToggleMenuCategoryData>>("openCategories", () => ({}));

defineProps<{
  categories: ICategories[];
}>();

function toggleCategory(id: string, level: number, name: IProductName): void {

  if (Object.keys(openCategories.value).length > 0 && openCategories.value[level] && openCategories.value[level].id === id) {
    delete openCategories.value[level];
  }
  else {
    if (Object.keys(openCategories.value).length > 0 && openCategories.value[level] && openCategories.value[level].id !== id) {
      Object.keys(openCategories.value).forEach((menuLevel) => {
        if (menuLevel >= level) {
          delete openCategories.value[menuLevel];
        }
      });
    }
    openCategories.value[level] = { id, name };
  }
}

function isOpen(id: string, level: number): boolean {
  if(Object.keys(openCategories.value).length > 0 && openCategories.value[level]) {
    return openCategories.value[level].id === id;
  }
  return false;
}


</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>