import { configureStore } from '@reduxjs/toolkit';
import dashboardSlice from '../modules/dashboard/store/dashboardSlice';
import branchesSlice from '../modules/branches/store/branchesSlice';

// dashboardSlice
export default configureStore({
    reducer: {
        'dashboardSlice': dashboardSlice,
        'brancesSlice': branchesSlice
    },
});