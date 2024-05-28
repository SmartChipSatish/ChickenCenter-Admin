import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiUrl } from '../../../ApiUrl/apiUrl';
import { AppConstants } from '../../../utils/localStorage';

export const InventoryApi = createApi({
    reducerPath: 'Inventory',
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