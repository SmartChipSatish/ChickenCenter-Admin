import { useCallback, useEffect, useState } from "react";
import { useLazyGetAllOrdersQuery, useLazyGetOrderbyFranchiseQuery } from "../../../modules/orders/Store/ordersEndpoints";
import { UserTypeHook } from "../../../utils/hooks/userTypeHook";
import { FRANCHISETYPE } from "../../../utils/interfaces/appInterfaces";
import { useSelector } from "react-redux";

export const useGetAllOrders = ({ perPage, page }: {
    perPage: number,
    page: number
}) => {
    const [getAllOrders, { data: allOrdersData, isLoading: allOrdersLoading, error: allOdersError }] = useLazyGetAllOrdersQuery();
    const [getAllFranchiceorders, { data: franchiseOrdersData, isLoading: franchiseOrdersLoading, error: franchiseOrdersError }] = useLazyGetOrderbyFranchiseQuery();
    const [isLoading, SetLoading] = useState<any>(null);
    const [data, SetData] = useState<any>(null);
    const [isError, SetError] = useState<any>(null);
    const userInfo = useSelector((state: any) => state?.userInfoSlice?.userInfo);
    const userType = UserTypeHook();

    const getAllMyOrders = useCallback(() => {
        if (userType === FRANCHISETYPE.FRANCHISE) {
            getAllFranchiceorders({
                params: { franchiseId: userInfo?.id, perPage, page }
            });
        }
        if (userType === FRANCHISETYPE.ADMIN) {
            getAllOrders({ params: { perPage, page } });
        }
    }, [userType, page])


    useEffect(() => {
        getAllMyOrders()
    }, [userType, page]);

    useEffect(() => {
        SetLoading(allOrdersLoading)
        SetData(allOrdersData)
        SetError(allOdersError)
    }, [allOrdersData, , allOrdersLoading, allOdersError]);

    useEffect(() => {
        SetLoading(franchiseOrdersLoading)
        SetData(franchiseOrdersData)
        SetError(franchiseOrdersError)
    }, [franchiseOrdersData, , franchiseOrdersLoading, franchiseOrdersError])

    return { isLoading, data, isError }

}  