import { InventoryApi } from "./InventoryApi";



export const InventoryEndPonts = InventoryApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllItems: builder.query({
            query: () => `items/getAllItems`,
            providesTags: ['getAll']
        }),

        getItemById: builder.query({
            query: (id: string) => `items/getItemById?itemId=${id}`,
        }),

        createItem: builder.mutation({
            query: (body) => ({
                url: 'items/createItem',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['getAll'],
        }),
        updateItem: builder.mutation({
            query: (body) => ({
                url: `items/updateItem?itemId=${body.id}`,
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['getAll'],
        }),
    })
})

export const { 
    useLazyGetAllItemsQuery, 
    useCreateItemMutation, 
    useUpdateItemMutation, 
    useLazyGetItemByIdQuery 
} = InventoryEndPonts;