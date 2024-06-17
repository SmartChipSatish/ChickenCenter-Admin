import { prepairQueryParams } from "../../../shared/utils/appFunctions";
import { IAPIRequest } from "../../../shared/utils/appInterfaces";
import { InventoryApi } from "./InventoryApi";



export const InventoryEndPonts = InventoryApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllItems: builder.query({
            query: (body:IAPIRequest) => `${prepairQueryParams('items/getAllItems', body.params)}`,
            providesTags: ['getAll']
        }),

        getItemById: builder.query({
            query: (id: string) => `${prepairQueryParams('items/getItemById', {itemId:id})}`,
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
            query: (body:IAPIRequest) => ({
                url: `${prepairQueryParams('items/updateItem', body.params)}`,
                method: 'POST',
                body: body.body
            }),
            invalidatesTags: ['getAll'],
        }),
        // deletItem: builder.mutation({
        //     query: (body) => ({
        //         url:'items/updateItem?itemId=${body.id}',
        //         method:'DELETE',
        //         body:body
        //     })
        // })
    })
})

export const { 
    useLazyGetAllItemsQuery, 
    useCreateItemMutation, 
    useUpdateItemMutation, 
    useLazyGetItemByIdQuery 
} = InventoryEndPonts;