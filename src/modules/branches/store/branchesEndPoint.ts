import { prepairQueryParams } from "../../../utils/appFunctions";
import { IAPIRequest } from "../../../utils/interfaces/appInterfaces";
import { BranchesApi } from "./branchesApi";


export const updateMeetingRestrictionDetails = BranchesApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFranchises: builder.query({
            query: (body: IAPIRequest) => `${prepairQueryParams('franchises/getAllFranchises', body?.params)}`,
        }),

        getAllFranchisesUsers: builder.query({
            query: (body: IAPIRequest) => `${prepairQueryParams('franchises/getAllusers', body?.params)}`,
        }),
        getFranchiseById: builder.query({
            query: (body: IAPIRequest) => `${prepairQueryParams('franchises/getFranchiseById', body.params)}`
        }),

        createFranchisesOrUser: builder.mutation({
            query: (body) => ({
                url: 'franchises/createUser',
                method: 'POST',
                body: body
            }),
        }),

        updateUser: builder.mutation({
            query: (body) => ({
                url: `${prepairQueryParams('franchises/updateUser', { userId: body.userId })}`,
                method: 'POST',
                body: body
            })
        }),
        updateFranchise: builder.mutation({
            query: (body: IAPIRequest) => ({
                url: `${prepairQueryParams('franchises/updateFranchise', body.params)}`,
                method: 'POST',
                body: body.body
            })
        }),
        // franchises/updateFranchise

    })
})

export const {
    useLazyGetAllFranchisesQuery,
    useGetAllFranchisesQuery,
    useCreateFranchisesOrUserMutation,
    useGetAllFranchisesUsersQuery,
    useUpdateUserMutation,
    useLazyGetAllFranchisesUsersQuery,
    useLazyGetFranchiseByIdQuery,
    useUpdateFranchiseMutation } = updateMeetingRestrictionDetails;