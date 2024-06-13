import { faClose, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "react-bootstrap/esm/Table"
import './OrderPage.scss'
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/esm/Card";
import { useLazyGetOrderbyFranchiseQuery, useLazyGetAllOrdersQuery, useUpdateOrderTranferMutation, useAssignOrderMutation } from "../../Store/ordersEndpoints";
import { useCallback, useEffect, useState } from "react";
import { ORDERSTATUS, Order, PAYMENTSTATUS, STATUSTYPES } from "../../util/ordersInterfaces";
import { useGetAllFranchisesQuery, useLazyGetAllFranchisesUsersQuery } from "../../../branches/store/branchesEndPoint";
import { IBranch } from "../../../branches/utils/BranchesInterfaces";
import Form from "react-bootstrap/esm/Form";
import { successToast } from "../../../../shared/utils/appToaster";
import { useSelector } from "react-redux";
import { UserTypeHook } from "../../../../utils/hooks/userTypeHook";
import { FRANCHISETYPE } from "../../../../utils/interfaces/appInterfaces";
import { OrderStatus } from "../../../../shared/components/OrderStatusComponet/OrderStatusComponent";
import { IUser } from "../../../users/utils/userInterfaces";
import { getOrderDate, isAdmin, isFranchiese, isUser, loadingState } from "../../../../utils/appFunctions";
import Button from "react-bootstrap/esm/Button";
import AppLoader from "../../../../shared/components/loader/loader";
import Pagination from "@material-ui/lab/Pagination";
import { perPage } from "../../../../utils/appConstants";
import { useGetAllOrders } from "../../../../shared/hooks/OrdersHook/OrdersHook";
import { AllOrdersListComponent } from "../../../../shared/components/AllOrdersList/AllOrdersListComponent";

const OrderPage = () => {
    const [page, setPage] = useState(1);
    const { data, isError, isLoading } = useGetAllOrders({
        perPage, page
    })
    

    return (<>
        <div className="d-flex justify-content-between pageTitleSpace">
            <p className="pageTile">Orders</p>
        </div>
        <div className="Orderpage">
            <Card className="h-100">
                <Card.Body className={`${!loadingState(isLoading, isError, data?.orders) && 'appCard'}`}>
                    <AllOrdersListComponent perPage={perPage} isPagination={true}></AllOrdersListComponent>
                </Card.Body>
            </Card>

        </div>

    </>)

}

export default OrderPage;