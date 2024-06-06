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
        updateOrderTranfer: builder.mutation({
            query: (body) => ({
                url: `orders/updateOrder?orderId=${body.id}`,
                method: 'POST',
                body: { franchiseId: body.franchiseId }
            }),
        }),
        assignOrder : builder.mutation({
            query: (body) => {
                console.log('body', body)
                return {
                    url: `orders/updateOrder?orderId=${body.id}`,
                    method: 'POST',
                    body: { deliveryAgentId: body.deliveryAgentId }
                }
            },
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
    useAssignOrderMutation
} = OrdersEndPoints;