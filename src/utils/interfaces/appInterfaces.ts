export enum FRANCHISETYPE {
    ADMIN = "admin",
    FRANCHISE = 'franchise',
    DELIVERYAGENTS = 'deliveryAgent'
}
export interface IAPIRequest {
    params?: Object,
    body?: Object
}