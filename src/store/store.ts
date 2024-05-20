import { configureStore } from '@reduxjs/toolkit';
import dashboardSlice from '../modules/dashboard/store/dashboardSlice';
// dashboardSlice
export default configureStore({
    reducer: {
        [dashboardSlice.name]:dashboardSlice
    },
});