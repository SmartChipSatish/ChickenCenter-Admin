import { prepairQueryParams } from "../../../utils/appFunctions";
import { IAPIRequest } from "../../../utils/interfaces/appInterfaces";
import { BranchesApi } from "./branchesApi";


export const updateMeetingRestrictionDetails = BranchesApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFranchises: builder.query({
            query: () => `franchises/getAllFranchises`,
        }),

        getAllFranchisesUsers: builder.query({
            query: (body: IAPIRequest) => `${prepairQueryParams('franchises/getAllusers', body?.params)}`,
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
        })

    })
})

export const {
    useLazyGetAllFranchisesQuery,
    useGetAllFranchisesQuery,
    useCreateFranchisesOrUserMutation,
    useGetAllFranchisesUsersQuery,
    useUpdateUserMutation,
    useLazyGetAllFranchisesUsersQuery } = updateMeetingRestrictionDetails;