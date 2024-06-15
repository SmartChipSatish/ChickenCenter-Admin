import { prepairQueryParams } from "../../../shared/utils/appFunctions";
import { IAPIRequest } from "../../../shared/utils/appInterfaces";
import { OrdersApi } from "./ordersApi";


export const OrdersEndPoints = OrdersApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: (body: IAPIRequest) => `${prepairQueryParams('orders/getAllOrders', body?.params)}`,
        }),

        getOrderByUserId: builder.query({
            query: (Id: string) => `${prepairQueryParams('orders/getOrdersByUserId', { orderId: Id })}`,
        }),

        getOrderById: builder.query({
            query: (Id: string) => `${prepairQueryParams('orders/getOrderById', { orderId: Id })}`,
        }),


        updateOrderTranfer: builder.mutation({
            query: (body) => ({
                url: `${prepairQueryParams('orders/updateOrder', { orderId: body.id })}`,
                method: 'POST',
                body: { franchiseId: body.franchiseId }
            }),
        }),
        assignOrder: builder.mutation({
            query: (body) => {
                console.log('body', body)
                return {
                    url: `${prepairQueryParams('orders/updateOrder', { orderId: body.id })}`,
                    method: 'POST',
                    body: { deliveryAgentId: body.deliveryAgentId }
                }
            },
        }),
        getOrderbyFranchise: builder.query({
            query: (body: IAPIRequest) => ({
                url: `${prepairQueryParams('orders/ordersByQuery', body?.params)}`,
                method: 'GET',
            }),
        })
    })
})

export const {
    useLazyGetAllOrdersQuery,
    useGetOrderByUserIdQuery,
    useGetOrderByIdQuery,
    useLazyGetOrderByIdQuery,
    useUpdateOrderTranferMutation,
    useLazyGetOrderbyFranchiseQuery,
    useAssignOrderMutation
} = OrdersEndPoints;