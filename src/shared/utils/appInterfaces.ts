export enum FRANCHISETYPE {
    ADMIN = "admin",
    FRANCHISE = 'franchise',
    DELIVERYAGENTS = 'deliveryAgent'
}
export interface IAPIRequest {
    params?: Object,
    body?: Object
}

export interface IOrdersPage {
    isPagination?: boolean,
    perPage: number,
    queryParams?:any
}

export enum DashBoardEnum {
    orders = 1,
    deliverd,
    canceled,
    revenue
}

export interface IAppDeleteModalData {
    show: boolean,
    id: string,
    name: string
}
export interface IAppDeleteModalProps {
    title: string,
    accept: (status: boolean, data: any) => void
}

export interface IAppDeleteModalRefType {
    open: (data: any) => void,
    data:any
}