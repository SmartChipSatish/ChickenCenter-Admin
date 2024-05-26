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
                body: {franchiseId:body.franchiseId}
            }),
            invalidatesTags: ['getAllOrders'],
        }),
    })
})

export const {
    useLazyGetAllOrdersQuery,
    useGetOrderByIdQuery,
    useUpdateOrderTranferMutation
} = OrdersEndPoints;