export interface IItem {
    createdAt: string;
    globalItemStatus: boolean
    id: string;
    itemName: string;
    itemPrice: number;
    itemQty: string;
    itemStatus: [];
    imageUrl: string;
    updatedAt: string;
    totalQuantity: string;
    _id: string;
};

export type AddItem = {
    itemName?: string,
    itemQty?: string,
    itemUnit?: string,
    imageUrl?: string,
    itemPrice?: number,
    globalItemStatus?: boolean,
    itemType?:string,
    meatType?:string
}