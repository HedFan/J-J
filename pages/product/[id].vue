<template>
  <div v-if="currentProduct">
    <div class="container mx-auto px-5 sm:px-10 md:px-15 lg:px-20">
      <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 lg:gap-6">
        <div class="col-span-1">
          <div v-if="currentItemVariant.images">
            <div class="mb-2">
              <img
                  :src="selectedImage || currentItemVariant.images[0] ||  '/images/emptyItem.jpg'"
                  :alt="currentProduct.name.dk || currentProduct.name.en"
                  class="object-cover shadow-md"
              />
            </div>
            <div v-if="currentItemVariant.images.length > 1" class="grid grid-cols-6 gap-1">
              <div v-for="(image, i) in currentItemVariant.images"
                   :class="
                   {
  'ring-2 ring-amber-800': selectedImage === image
}"
                   :key="i"
                   class="cursor-pointer"
                   @click="selectedImage = image"

              >
                <img :src="image"
                     :alt="currentProduct.name"
                     class="h-full object-cover"
                ></div>
            </div>
          </div>
          <div v-else>
            <img :src="'/images/emptyItem.jpg'" alt="">
          </div>
        </div>

        <div class="col-span-1">
          <h1><b>{{ currentProduct.name.dk || currentProduct.name.en }}</b></h1>
          <div>
            <span>{{ currentProduct.price }}kr </span>
            <div><span><b>Brand:</b> </span> <span>{{ currentProduct.brand }}</span></div>
            <div v-if="currentProduct.color">
              <b>Color:</b> {{ currentItemVariant.color }}
            </div>
            <div v-if="currentProduct.variant"
                 class="inline-flex">
              <div>
                <button v-if="currentProduct.color"
                        :class="
                   {
  'ring-2 ring-amber-800': currentItemVariant === currentProduct
}"
                        class="mr-1 cursor-pointer w-7 h-7 rounded-full border-2 hover:scale-110 transition-all"
                        :style="{ backgroundColor: itemColors[currentProduct.color] }"
                        @click="[currentItemVariant = currentProduct, selectedImage = null]"
                ></button>

              </div>

              <div v-for="(variant, i) in currentProduct.variant"
              >
                <button v-if="variant.color"
                        :class="
                   {
  'ring-2 ring-amber-800': currentItemVariant === variant
}"
                        :key="i"
                        class="mr-1 cursor-pointer w-7 h-7 rounded-full border-2 hover:scale-110 transition-all"
                        :style="{ backgroundColor: itemColors[variant.color] }"
                        @click="[currentItemVariant = variant, selectedImage = null]"
                ></button>

              </div>
            </div>
            <div v-else-if="currentProduct.color"
                 :style="{ backgroundColor: itemColors[currentProduct.color] }"
                 class="w-7 h-7 rounded-full border-2 border-amber-500"></div>

            <div>
              <div class="mb-4"><b>Size:</b> {{ currentSize }}</div>
              <div class="mb-6">
                <span v-for="(value, i) in currentItemVariant.size"
                      :key="i"
                      :class="[
                      currentSize === value
                      ? 'bg-amber-500 border border-amber-500'
                      : 'border border-gray-400',
                      currentItemVariant.stock === 0
                      ? 'opacity-50 cursor-default'
                      : 'cursor-pointer'
                      ]"
                      class="p-3 mr-2"
                      @click="currentItemVariant.stock !== 0 && (currentSize = value)">{{ value }}</span>
              </div>
            </div>
            <div class="mb-4">
              <span v-if="currentItemVariant.stock > 0 || currentItemVariant.stock === `Unlimited`"
                    class="border border-green-600 text-green-600 p-2 text-center">In Stock</span>
              <span class="border-red-600 text-red-600 border p-2 text-center" v-else>Out Of Stock</span>
            </div>
            <div class="inline-flex">
              <div class="items-center space-x-2 mr-4">
                <button
                    @click="decrement"
                    :disabled="quantity <= 0"
                    class="px-4 py-2 border border-gray-400  disabled:opacity-50"
                >−
                </button>

                <span class="px-4">{{ quantity }}</span>

                <button
                    @click="increment"
                    :disabled="currentItemVariant.stock !== 'Unlimited' && quantity >= currentItemVariant.stock"
                    class="px-4 py-2 border border-gray-400 disabled:opacity-50"
                >+
                </button>
              </div>
              <button
                  @click="currentItemVariant.stock !== 0 && quantity > 0 &&
                toggleModal()"
                  class="bg-amber-900 text-white px-4 py-2"
                  :class="currentItemVariant.stock === 0 || quantity < 1
                      ? 'opacity-50 cursor-default disabled no-hover-transition'
                      : 'cursor-pointer hover:bg-amber-500 hover:text-black transition'"
              >
                Add to Cart
              </button>
            </div>
            <div><b>Tags:</b>
              <div class="w-sm flex flex-wrap gap-1"><span v-for="category in currentProduct.categories"
                                                           class="text-sm"> {{ category }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isModalOpen" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <div class="text-center text-xl mb-3 text-amber-900"><b>Added to cart</b></div>
      <div><b>{{ currentProduct?.name.dk || currentProduct?.name.en }}</b></div>
      <div><b>Size:</b> {{ currentSize }}</div>
      <div><b>Colour:</b> {{ currentItemVariant.color }}</div>
      <div><b>Quantity:</b> {{ quantity }}</div>
      <div class="text-center">
        <button
            @click="isModalOpen = false"
            class="mt-4 px-4 py-2 bg-amber-700 text-white hover:bg-amber-500 hover:text-black transition duration-200">Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useProducts } from "../../composables/fetchItemsData";
import { itemColors } from "../../configs/fetchingDataConfig.js";
import { IVariantProduct } from "../../configs/fetchingDataTypes.js";

const { productsData } = useProducts();

const route = useRoute();
const id = route.params.id;

const headerData = useState("headerData");
onMounted(() => {
  headerData.value.title = "Product Details";
  headerData.value.breadCrumbs = id;
});

const currentProduct = computed(() => productsData.value.find(item => String(item.id) === String(id)));
const currentItemVariant = ref<IProducts | IVariantProduct | null>(null);
watch(currentProduct, (val) => {
  if (!val) {
    return;
  }
  currentItemVariant.value = val;
  if (val?.variant?.length) {
    currentItemVariant.value = val.variant[0];
  }
}, {immediate: true});

const currentSize = ref("");
watch(currentProduct, (val) => {
  if (val?.size?.length) {
    currentSize.value = val.size[0];
  }
}, {immediate: true});

const selectedImage = ref<string | null>(null);
watch(currentProduct, (val) => {
  if (val?.images?.length) {
    selectedImage.value = null;
  }
}, {immediate: true});

const quantity = ref(1);
watch(currentItemVariant, (val) => {
  if (val?.stock !== undefined && val.stock !== "Unlimited") {
    quantity.value = Math.min(quantity.value, val.stock);
  }
}, {immediate: true});

const increment = () => {
  const maxValue = currentItemVariant.value.stock === "Unlimited" ? Infinity : currentItemVariant.value.stock;
  if (quantity.value < maxValue) {
    quantity.value++;
  }
};

const decrement = () => {
  if (quantity.value > 0) {
    quantity.value--;
  }
};

const isModalOpen = ref(false);
const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
}

</script>