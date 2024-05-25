import { configureStore } from '@reduxjs/toolkit';
import dashboardSlice from '../modules/dashboard/store/dashboardSlice';
import branchesSlice from '../modules/branches/store/branchesSlice';
import { InventoryApi } from '../modules/inventory/store/InventoryApi';
import { BranchesApi } from '../modules/branches/store/branchesApi';

export default configureStore({
    reducer: {
        'dashboardSlice': dashboardSlice,
        'brancesSlice': branchesSlice,
        [InventoryApi.reducerPath]: InventoryApi.reducer,
        [BranchesApi.reducerPath]: BranchesApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(InventoryApi.middleware, BranchesApi.middleware)
});