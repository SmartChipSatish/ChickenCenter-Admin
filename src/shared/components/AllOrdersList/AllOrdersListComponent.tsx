import { Button, Form, Table } from "react-bootstrap";
import { isActiveOrder, getOrderDate, getOrderSmallId, isAdmin, isFranchiese, isUser, addIdToInProgress, hasInProgress, removeIdToInProgress } from "../../../shared/utils/appFunctions";
import { UserTypeHook } from "../../hooks/userTypeHook";
import { Order, STATUSTYPES } from "../../../modules/orders/util/ordersInterfaces";
import { useGetAllOrders } from "../../hooks/OrdersHook/OrdersHook";
import { useNavigate } from "react-router-dom";
import { OrderStatus } from "../OrderStatusComponet/OrderStatusComponent";
import { useGetAllFranchisesQuery, useLazyGetAllFranchisesUsersQuery } from "../../../modules/branches/store/branchesEndPoint";
import { IBranch } from "../../../modules/branches/utils/BranchesInterfaces";
import { IUser } from "../../../modules/users/utils/userInterfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import AppLoader from "../loader/loader";
import Pagination from "@material-ui/lab/Pagination";
import { useEffect, useRef, useState } from "react";
import { useAssignOrderMutation, useUpdateOrderTranferMutation } from "../../../modules/orders/Store/ordersEndpoints";
import { errorToast, successToast } from "../../utils/appToaster";
import "./AllOrdersListComponent.scss"
import { FRANCHISETYPE, IAppDeleteModalRefType, IOrdersPage } from "../../../shared/utils/appInterfaces";
import { useSelector } from "react-redux";
import { AppDeleteModal } from "../AppDeleteModal/AppDeleteModal";
export const AllOrdersListComponent = ({ perPage, isPagination, queryParams }: IOrdersPage) => {
    const userType = UserTypeHook();
    const { data: franchies } = useGetAllFranchisesQuery({
        params: {
            perPage: '',
            page: '',
            userType: FRANCHISETYPE.FRANCHISE
        }
    });

    const [updateOrderTranfer] = useUpdateOrderTranferMutation();
    const [assignOrder] = useAssignOrderMutation();
    const [page, setPage] = useState(1);
    const [apiParams, SetApiParams] = useState({ page, perPage })
    const { data, isLoading, isError, triggerAPi } = useGetAllOrders(apiParams);
    const [getAllFranchisesUsers, { data: franchiesUsers }] = useLazyGetAllFranchisesUsersQuery();
    const navigation = useNavigate();
    const userInfo = useSelector((state: any) => state?.userInfoSlice?.userInfo);
    const deleteModalData = useRef<IAppDeleteModalRefType>();


    const accept = (status: boolean, data: Order) => {
        console.log('deleteModalData.current', data)
    };

    const orderUpdate = async (data: { id: string, franchiseId: string }) => {
        addIdToInProgress(data.id)
        try {
            const orderTransfer = await updateOrderTranfer(data);
            if (orderTransfer?.data) {
                successToast('Order transfered succesfully');
            }
            removeIdToInProgress(data.id)
        } catch (e) {
            console.log('e', e);
            removeIdToInProgress(data.id);
            errorToast('Something went wrong!')
        }
    }

    const assignOrderToAgent = async (data: { id: string, deliveryAgentId: string }) => {
        addIdToInProgress(data.id)
        try {
            const assignOrderToDeliveryAgent = await assignOrder(data);
            console.log('assignOrderToDeliveryAgent', assignOrderToDeliveryAgent, data);
            if (assignOrderToDeliveryAgent?.data) {
                successToast('Order Assigned succesfully');
            }
            removeIdToInProgress(data.id)
        } catch (e) {
            console.log('e', e);
            errorToast('Something went wrong!')
            removeIdToInProgress(data.id)
        }
    }
    const getOrderDetails = (id: string) => {
        navigation(`/orders/orderDetails/${id}`)
    }

    useEffect(() => {
        if (userType === FRANCHISETYPE.FRANCHISE) {
            getAllFranchisesUsers({ params: { franchiseId: userInfo?.id, userType: FRANCHISETYPE.DELIVERYAGENTS } })
        }
    }, [userType]);

    useEffect(() => {
        SetApiParams({
            ...apiParams,
            ...queryParams,
            page: 1
        })
    }, [queryParams]);


    useEffect(() => {
        SetApiParams({
            ...apiParams,
            page
        })
    }, [page]);

    useEffect(() => {
        console.log('apiParams Vishnu', apiParams);
        triggerAPi()
    }, [apiParams]);
    console.log('isLoading Vishnu', isLoading)
    return <>
        <Table hover>
            <thead>
                <tr>
                    <th><p className="tableTitle">#</p></th>
                    <th><p className="tableTitle">Order</p></th>
                    <th><p className="tableTitle">Date</p></th>
                    <th><p className="tableTitle">Customer Name</p></th>
                    <th><p className="tableTitle">Order Status</p></th>
                    <th><p className="tableTitle">Payment Status</p></th>
                    <th><p className="tableTitle">Phone</p></th>
                    <th><p className="tableTitle">Address</p></th>
                    {isAdmin(userType) && <th><p className="tableTitle">Transfer</p></th>}
                    {isFranchiese(userType) && <th><p className="tableTitle">Assign To</p></th>}
                    <th><p className="tableTitle">Actions</p></th>
                </tr>
            </thead>
            <tbody>
                {(data && !isLoading) && data?.orders.map((order: Order, index: number) => <tr className="appRow" key={order?.id}>
                    <td className="tableItem ">{index + 1}</td>
                    <td className="tableItem curserPointer" onClick={() => {
                        getOrderDetails(order?.id);
                    }}><p className="Orderpage-id text-uppercase" title={order?.id}>{`#${getOrderSmallId(order?.id)}`}</p></td>
                    <td className="tableItem text-nowrap">{getOrderDate(order?.date)} </td>
                    <td className="tableItem text-capitalize">{order.userId?.name || '---'}</td>
                    <td className="tableItem text-capitalize"><OrderStatus label={order?.orderStatus} status={order?.orderStatus} type={STATUSTYPES.Order} /></td>
                    <td className="tableItem text-capitalize"><OrderStatus label={order?.paymentStatus?.toLocaleLowerCase()} status={order?.paymentStatus} type={STATUSTYPES.Payment} />
                    </td>
                    <td className="tableItem">{order?.userId?.primaryNumber || '---'}</td>
                    <td className="tableItem">{order?.userId?.primaryAddress?.name}, {order?.userId?.primaryAddress?.houseNo}, {order?.userId?.primaryAddress?.streetName}</td>

                    {isAdmin(userType) && <td className="tableItem">
                        <Form.Select aria-label="Order Transfer" onChange={(data) => {
                            orderUpdate({ id: order.id, franchiseId: data?.target?.value })
                        }} disabled={isActiveOrder(order?.orderStatus) || hasInProgress(order.id)}>
                            <option>Select Franchise</option>
                            {franchies?.franchises && franchies?.franchises.map((branch: IBranch) => <option value={branch._id} selected={order?.franchiseId?.id === branch._id} key={branch._id}>{branch?.name}</option>)}
                        </Form.Select>
                    </td>}

                    {isFranchiese(userType) && <th className="tableItem">
                        <Form.Select aria-label="Order Transfer" onChange={(data) => {
                            assignOrderToAgent({ id: order.id, deliveryAgentId: data?.target?.value })
                        }} disabled={isActiveOrder(order?.orderStatus) || hasInProgress(order.id)}>
                            <option>Select Agent</option>
                            {franchiesUsers && franchiesUsers?.map((user: IUser) => <option value={user.id} selected={order?.deliveryAgentId === user.id} key={user.id}>{user?.name}</option>)}
                        </Form.Select>
                    </th>}

                    <td className="text-nowrap align-middle">
                        {(isAdmin(userType) || isFranchiese(userType)) && <><FontAwesomeIcon icon={faEye} className="Orderpage-actions Orderpage-eye" onClick={() => {
                            getOrderDetails(order?.id);
                        }}></FontAwesomeIcon>
                            <FontAwesomeIcon icon={faTrash} className="Orderpage-actions deleteIcon" onClick={() => {
                                deleteModalData.current?.open(order)
                            }}>
                            </FontAwesomeIcon> </>}
                        {isUser(userType) && <>
                            <Button variant="outline-primary" className="elementSpace">Accept</Button>
                            <Button variant="outline-secondary">Cancel</Button></>
                        }
                    </td>
                </tr>)}
            </tbody>
        </Table>
        {isError && <div className="emptyTable"><p>Something went wrong!</p></div>}
        {isLoading && <div className="emptyTable"><AppLoader></AppLoader></div>}
        {data?.orders?.length === 0 && <div className="emptyTable">No Data Found</div>}
        {
            (data?.totalOrders > 10 && isPagination) && <div className="d-flex justify-content-end paginationdiv">
                <Pagination count={data.totalPages}
                    shape="rounded" onChange={(_, value: number) => {
                        setPage(value);
                    }} /></div>
        }
        {<AppDeleteModal ref={deleteModalData} title="Do you want to delete this Order?"
            accept={accept} />
        }
    </>
}