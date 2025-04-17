export interface IFetchingData {
    readonly products: IProducts[];
    readonly categories: ICategories;
    readonly promotionalSpots: IPromotionalSpots[];
}

export interface IProducts {
    readonly id: number;
    readonly brand: string;
    readonly price: number;
    readonly stock: number | "Unlimited";
    readonly color: string;
    readonly size: SizeType[];
    readonly name: IProductName;
    readonly images: string[];
    readonly variant: IVariantProduct[];
    readonly categories: ProductCategoriesType;
}

export type ProductCategoriesType = "adults" | "women" | "women_newin" | "women_clothes" | "women_last_week_sales" | "men" |"men_newin" | "men_clothes" | "men_jeans" | "men_sales" | "last_week_sales" | "last_month_sales" | "kids";

export interface IProductName {
    readonly dk: string;
    readonly en: string;
}

export interface IVariantProduct {
    readonly stock: number | "Unlimited";
    readonly color: string;
    readonly size: SizeType[];
    readonly images: string[];
}

export type SizeType = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "3XL";

export interface ICategories {
    readonly id: string;
    readonly parent_category_id: "";
    readonly level: number;
    readonly name: ICategoryName;
    readonly categories?: ICategories[];
}

export interface ICategoryName {
    readonly en: string;
    readonly dk: string;
}
export interface IPromotionalSpots {
    readonly link: string;
    readonly position: number;
    readonly type: IPromotionalSpotsType;
    readonly image: IImageParameters;
}

export type IPromotionalSpotsType = "1x1" | "2x1" | "2x2";

export interface IImageParameters {
    readonly aspectRatio: string;
    readonly imageUrl: string;
    readonly focalPoint: Point;
    readonly maxWidth: string;
    readonly alt: string;
    readonly imageAltText: string;
    readonly _alias: string;
}

export interface Point {
    readonly x: number;
    readonly y: number;
}
