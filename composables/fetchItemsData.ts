import { onMounted, ref } from "vue";
import { ICategories, IFetchingData, IProducts, IPromotionalSpots } from "../configs/fetchingDataTypes";

const productsData = ref<IProducts[]>([]);
const categoriesData = ref<ICategories | null>(null);
const promotionalSpotsData = ref<IPromotionalSpots[]>([]);

export function useProducts() {
    onMounted(async () => {
        if (productsData.value && categoriesData.value && promotionalSpotsData.value) {
            return { productsData, categoriesData, promotionalSpotsData }
        }

        const response = await fetch("/data.json")
            .then(data => data.json())
            .then((parsedData: IFetchingData) => {
                const { products, categories, promotionalSpots } = parsedData;
                productsData.value = products;
                categoriesData.value = categories;
                promotionalSpotsData.value = promotionalSpots;
            })
    })

    return { productsData, categoriesData, promotionalSpotsData }
}