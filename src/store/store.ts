import { configureStore } from '@reduxjs/toolkit';
import dashboardSlice from '../modules/dashboard/store/dashboardSlice';
import branchesSlice from '../modules/branches/store/branchesSlice';
import { InventoryApi } from '../modules/inventory/store/InventoryApi';
import { BranchesApi } from '../modules/branches/store/branchesApi';
import { OrdersApi } from '../modules/orders/Store/ordersApi';
import { authApi } from '../modules/authentication/store/authenticateApi';
import userInfoSlice from '../modules/authentication/store/userInfoSlice';
import { dashboardApi } from '../modules/dashboard/store/dashboardApi';


export default configureStore({
    reducer: {
        'dashboardSlice': dashboardSlice,
        'brancesSlice': branchesSlice,
        'userInfoSlice': userInfoSlice,
        [InventoryApi.reducerPath]: InventoryApi.reducer,
        [BranchesApi.reducerPath]: BranchesApi.reducer,
        [OrdersApi.reducerPath]: OrdersApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(InventoryApi.middleware, BranchesApi.middleware, OrdersApi.middleware, authApi.middleware, dashboardApi.middleware)
});