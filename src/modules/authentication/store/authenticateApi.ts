import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiUrl } from '../../../ApiUrl/apiUrl';
import { AppConstants, getItemFromLocalStorage } from '../../../utils/localStorage';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${ApiUrl.URL}`,
        prepareHeaders: async (Headers) => {
            const token = getItemFromLocalStorage(AppConstants.accessToken)


            Headers.set('authorizationadmin', `${token}`);
        }
    }),
    endpoints: () => ({

    })
});