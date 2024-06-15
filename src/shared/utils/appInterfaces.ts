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
    perPage: number
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
    data: IAppDeleteModalData,
    title: string,
    id: string
    handleClose: (status: boolean, id?: string) => void
}