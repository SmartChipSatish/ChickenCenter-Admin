import { authApi } from "./authenticateApi";


export const authEndPoints = authApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => `users/getuser`
        }),

        login: builder.mutation({
            query: (body) => ({
                url: `franchises/login`,
                method: 'POST',
                body: body
            }),
        }),
        // users/createUser’
        createUser: builder.mutation({
            query: (body) => ({
                url: `users/createUser`,
                method: 'POST',
                body: body
            }),
        })
    })
})

export const {
    useLoginMutation,
    useGetUserQuery,
    useLazyGetUserQuery,
    useCreateUserMutation
} = authEndPoints;