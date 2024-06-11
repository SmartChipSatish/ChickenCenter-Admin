import { prepairQueryParams } from "../../../utils/appFunctions";
import { IAPIRequest } from "../../../utils/interfaces/appInterfaces";
import { InventoryApi } from "./InventoryApi";



export const InventoryEndPonts = InventoryApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllItems: builder.query({
            query: (body:IAPIRequest) => `${prepairQueryParams('items/getAllItems', body.params)}`,
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
        deletItem: builder.mutation({
            query: (body) => ({
                url:'items/updateItem?itemId=${body.id}',
                method:'DELETE',
                body:body
            })
        })
    })
})

export const { 
    useLazyGetAllItemsQuery, 
    useCreateItemMutation, 
    useUpdateItemMutation, 
    useLazyGetItemByIdQuery 
} = InventoryEndPonts;