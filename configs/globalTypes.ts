import { IProductName } from "./fetchingDataTypes";

export interface IToggleMenuCategoryData {
    readonly [level: number]: {
        readonly id: string;
        readonly name: IProductName;
    }
}

export interface ISwitchMenuData {
    readonly level: number;
    readonly name: IProductName
}
