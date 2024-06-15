import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiUrl } from '../../../ApiUrl/apiUrl';
import { AppConstants } from '../../../shared/utils/localStorage';

export const BranchesApi = createApi({
    reducerPath: 'BranchesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${ApiUrl.URL}`,
        prepareHeaders: async (Headers) => {
            const tocken = localStorage.getItem(AppConstants.accessToken)
            Headers.set('Authorization', `${tocken}`);
        }
    }),
    tagTypes: ['getAll'],
    endpoints: () => ({

    })
});