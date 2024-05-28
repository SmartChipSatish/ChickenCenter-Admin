export interface IBranch {
    address: { name: string, _id: string, city: string },
    createdAt: string;
    createdBy: string;
    id: string;
    name: string;
    updatedAt: string;
    updatedBy: string;
    _id: string;
    currentOrders: number;
}