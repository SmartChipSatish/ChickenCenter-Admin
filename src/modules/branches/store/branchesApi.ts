import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiUrl } from '../../../ApiUrl/apiUrl';

export const BranchesApi = createApi({
    reducerPath: 'BranchesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${ApiUrl.URL}`,
        prepareHeaders: async (Headers) => {
            const tocken = localStorage.getItem('accessToken')
            Headers.set('Authorization', `${tocken}`);
        }
    }),
    tagTypes: ['getAll'],
    endpoints: () => ({

    })
});