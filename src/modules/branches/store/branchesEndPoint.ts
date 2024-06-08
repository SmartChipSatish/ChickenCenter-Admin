import { BranchesApi } from "./branchesApi";


export const updateMeetingRestrictionDetails = BranchesApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFranchises: builder.query({
            query: () => `franchises/getAllFranchises`,
            // providesTags: ['getAll']
        }),

        getAllFranchisesUsers: builder.query({
            query: (body) => `franchises/getAllusers?userType=${body?.userType}${body.franchiseId ? `&franchiseId=${body.franchiseId}`:''}`,
        }),

        createFranchisesOrUser: builder.mutation({
            query: (body) => ({
                url: 'franchises/createUser',
                method: 'POST',
                body: body
            }),
            // invalidatesTags: ['getAll'],
        }),

    })
})

export const {
    useLazyGetAllFranchisesQuery,
    useGetAllFranchisesQuery,
    useCreateFranchisesOrUserMutation,
    useGetAllFranchisesUsersQuery,
    useLazyGetAllFranchisesUsersQuery } = updateMeetingRestrictionDetails;