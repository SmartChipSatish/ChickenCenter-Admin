import { authApi } from "./authenticateApi";


export const authEndPoints = authApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => `users/getuser`
        }),

        login: builder.mutation({
            query: (body) => ({
                url: `users/login`,
                method: 'POST',
                body: body
            }),
        }),
    })
})

export const {
    useLoginMutation,
    useGetUserQuery,
    useLazyGetUserQuery
} = authEndPoints;