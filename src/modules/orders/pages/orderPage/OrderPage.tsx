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

const OrderPage = () => {
    const navigation = useNavigate();
    const { data: franchies } = useGetAllFranchisesQuery({
        params: {
            perPage: '', page: ''
        }
    });
    const [getAllFranchisesUsers, { data: franchiesUsers }] = useLazyGetAllFranchisesUsersQuery();
    const [updateOrderTranfer] = useUpdateOrderTranferMutation();
    const [assignOrder] = useAssignOrderMutation();
    const userInfo = useSelector((state: any) => state?.userInfoSlice?.userInfo);
    const userType = UserTypeHook()
    const [page, setPage] = useState(1);
    const { data, isError, isLoading } = useGetAllOrders({
        perPage, page
    })
    const getOrderDetails = (id: string) => {
        navigation(`orderDetails/${id}`)
    }

    const orderUpdate = async (data: { id: string, franchiseId: string }) => {
        try {
            const orderTransfer = await updateOrderTranfer(data);
            if (orderTransfer?.data) {
                successToast('Order transfered succesfully');
            }

        } catch (e) {
            console.log('e', e)
        }
    }

    const assignOrderToAgent = async (data: { id: string, deliveryAgentId: string }) => {
        try {
            const assignOrderToDeliveryAgent = await assignOrder(data);
            console.log('assignOrderToDeliveryAgent', assignOrderToDeliveryAgent, data);
            if (assignOrderToDeliveryAgent?.data) {
                successToast('Order Assigned succesfully');
            }

        } catch (e) {
            console.log('e', e)
        }
    }

    useEffect(() => {
        if (userType === FRANCHISETYPE.FRANCHISE) {
            getAllFranchisesUsers({ params: { franchiseId: userInfo?.id, userType: FRANCHISETYPE.DELIVERYAGENTS } })
        }
    }, [userType, page]);


    return (<>
        <div className="d-flex justify-content-between pageTitleSpace">
            <p className="pageTile">Orders</p>
        </div>
        <div className="Orderpage">
            <Card className="h-100">
                <Card.Body className={`${!loadingState(isLoading, isError, data?.orders) && 'appCard'}`}>
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
                            {data && data?.orders.map((order: Order, index: number) => <tr className="appRow">
                                <td className="tableItem ">{index + 1}</td>
                                <td className="tableItem curserPointer" onClick={() => {
                                    getOrderDetails(order?.id);
                                }}><p className="Orderpage-id">{`#${order?.id}`}</p></td>
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
                                    }}>
                                        <option>Select Franchise</option>
                                        {franchies?.franchises && franchies?.franchises.map((branch: IBranch) => <option value={branch._id} selected={order?.franchiseId?.id === branch._id}>{branch?.name}</option>)}
                                    </Form.Select>
                                </td>}

                                {isFranchiese(userType) && <th className="tableItem">
                                    <Form.Select aria-label="Order Transfer" onChange={(data) => {
                                        assignOrderToAgent({ id: order.id, deliveryAgentId: data?.target?.value })
                                    }}>
                                        <option>Select Agent</option>
                                        {franchiesUsers && franchiesUsers?.map((user: IUser) => <option value={user.id} selected={order?.deliveryAgentId === user.id}>{user?.name}</option>)}
                                    </Form.Select>
                                </th>}

                                <td className="text-nowrap align-middle">
                                    {(isAdmin(userType) || isFranchiese(userType)) && <><FontAwesomeIcon icon={faEye} className="Orderpage-actions Orderpage-eye" onClick={() => {
                                        getOrderDetails(order?.id);
                                    }}></FontAwesomeIcon> <FontAwesomeIcon icon={faClose} className="Orderpage-actions" onClick={() => {
                                        getOrderDetails(order?.id);
                                    }}></FontAwesomeIcon> </>}
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
                    {data?.totalOrders > 10 && <div className="d-flex justify-content-end">
                        <Pagination count={data.totalPages}
                            shape="rounded" onChange={(_, value: number) => {
                                setPage(value);
                            }} /></div>}
                </Card.Body>
            </Card>

        </div>

    </>)

}

export default OrderPage;