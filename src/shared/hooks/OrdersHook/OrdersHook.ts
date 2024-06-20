import { useCallback, useEffect, useState } from "react";
import { useLazyGetAllOrdersQuery, useLazyGetOrderbyFranchiseQuery } from "../../../modules/orders/Store/ordersEndpoints";
import { UserTypeHook } from "../userTypeHook";
import { FRANCHISETYPE } from "../../../shared/utils/appInterfaces";
import { useSelector } from "react-redux";

export const useGetAllOrders = (params: any) => {
    console.log('useGetAllOrders Hook Vishnu 1', params)
    const [getAllOrders, { data: allOrdersData, isLoading: allOrdersLoading, error: allOdersError }] = useLazyGetAllOrdersQuery();
    const [getAllFranchiceorders, { data: franchiseOrdersData, isLoading: franchiseOrdersLoading, error: franchiseOrdersError }] = useLazyGetOrderbyFranchiseQuery();
    const [isLoading, SetLoading] = useState<any>(null);
    const [data, SetData] = useState<any>(null);
    const [isError, SetError] = useState<any>(null);
    const userInfo = useSelector((state: any) => state?.userInfoSlice?.userInfo);
    const userType = UserTypeHook();

    const getAllMyOrders = () => {
        SetLoading(true);
        // SetData(null);
        // SetError(null);
        if (userType === FRANCHISETYPE.FRANCHISE) {
            getAllFranchiceorders({
                params: { franchiseId: userInfo?.id, ...params }
            });
        }
        if (userType === FRANCHISETYPE.ADMIN) {
            console.log('useGetAllOrders Hook Vishnu 2', params)
            getAllOrders({ params });
        }
    }

    useEffect(() => {
        console.log('allOrdersData, , allOrdersLoading, allOdersError IsLoading', allOrdersData,  allOrdersLoading, allOdersError)
        SetLoading(allOrdersLoading)
        SetData(allOrdersData)
        SetError(allOdersError)
    }, [allOrdersData, , allOrdersLoading, allOdersError]);

    useEffect(() => {
        SetLoading(franchiseOrdersLoading)
        SetData(franchiseOrdersData)
        SetError(franchiseOrdersError)
    }, [franchiseOrdersData, , franchiseOrdersLoading, franchiseOrdersError])
    const triggerAPi = () => {
        getAllMyOrders()
    }
    return { isLoading, data, isError, triggerAPi }

}  