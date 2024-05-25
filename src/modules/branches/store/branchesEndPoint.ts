import { BranchesApi } from "./branchesApi";





export const updateMeetingRestrictionDetails = BranchesApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFranchises: builder.query({
            query: () => `franchises/getAllFranchises`,
            providesTags:['getAll']
        }),
        createFranchises:  builder.mutation({
            query: (body) => ({
                url: 'franchises/createFranchise',
                method: 'POST',
                body: body
            }),
            // transformResponse: (response: any) => response,
            // transformErrorResponse: (response: any) => response?.status,
            invalidatesTags: ['getAll'],
        }),
    })
})

export const { useLazyGetAllFranchisesQuery, useGetAllFranchisesQuery, useCreateFranchisesMutation } = updateMeetingRestrictionDetails;