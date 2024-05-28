import { dashboardApi } from "./dashboardApi";

export const dashboardEndPonts = dashboardApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardData: builder.query({
            query: () => `dashboard/getAllMetrics`,
        }),
    })
})

export const { 
    useGetDashboardDataQuery, 
} = dashboardEndPonts;