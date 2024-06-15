import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiUrl } from '../../../ApiUrl/apiUrl';
import { AppConstants } from '../../../shared/utils/localStorage';

export const OrdersApi = createApi({
    reducerPath: 'OrdersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${ApiUrl.URL}`,
        prepareHeaders: async (Headers) => {
            const token = localStorage.getItem(AppConstants.accessToken)
            Headers.set('Authorization', `${token}`);
        }
    }),
    tagTypes: ['getAllOrders'],
    endpoints: () => ({

    })
});