import { OrdersApi } from "./ordersApi";


export const OrdersEndPoints = OrdersApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => `orders/getAllOrders`,
            providesTags: ['getAllOrders']
        }),

        getOrderById: builder.query({
            query: (id: string) => `orders/getOrdersByUserId?orderId=${id}`,
        }),
        getAllDeliveryAgents: builder.mutation({
            query: (body) => ({
                url: `orders/updateOrder?orderId=${body.id}`,
                method: 'POST',
                body: { franchiseId: body.franchiseId }
            }),
        }),
        updateOrderTranfer: builder.mutation({
            query: (body) => ({
                url: `orders/updateOrder?orderId=${body.id}`,
                method: 'POST',
                body: { franchiseId: body.franchiseId }
            }),
        }),

        getOrderbyFranchise: builder.query({
            query: (body) => ({
                url: `orders/ordersByQuery?franchiseId=${body.franchiseId}`,
                method: 'GET',
            }),
        })
    })
})

export const {
    useLazyGetAllOrdersQuery,
    useGetOrderByIdQuery,
    useUpdateOrderTranferMutation,
    useLazyGetOrderbyFranchiseQuery,
    useGetAllDeliveryAgentsMutation
} = OrdersEndPoints;