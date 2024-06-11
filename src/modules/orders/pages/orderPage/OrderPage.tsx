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
import dayjs from 'dayjs';
import { IUser } from "../../../users/utils/userInterfaces";
import { getOrderDate, isAdmin, isFranchiese, isUser } from "../../../../utils/appFunctions";
import Button from "react-bootstrap/esm/Button";
import AppLoader from "../../../../shared/components/loader/loader";

const OrderPage = () => {
    const navigation = useNavigate();
    const [getAllOrders, { data: allOrdersData, isLoading: allOrdersLoading, error: allOdersError }] = useLazyGetAllOrdersQuery();
    const [getAllFranchiceorders, { data: franchiseOrdersData, isLoading: franchiseOrdersLoading, error: franchiseOrdersError }] = useLazyGetOrderbyFranchiseQuery();
    const { data: franchies, isLoading: franchiesLoading, isError: franchiesError } = useGetAllFranchisesQuery(undefined);
    const [updateOrderTranfer, { data: updateOrderData, isLoading: updateOrderisLoading, isError: updateOrderError }] = useUpdateOrderTranferMutation();
    const [assignOrder] = useAssignOrderMutation();
    const [getAllFranchisesUsers, { data: franchiesUsers, isLoading: franchiseUsersLoading, isError: franchiseUserError }] = useLazyGetAllFranchisesUsersQuery();
    const userInfo = useSelector((state: any) => state?.userInfoSlice?.userInfo);
    const userType = UserTypeHook()
    const [isLoading, SetLoading] = useState<any>(null);
    const [data, SetData] = useState<any>(null);
    const [error, SetError] = useState<any>(null);


    const getOrderDetails = (id: string) => {
        navigation(`orderDetails/${id}`)
    }

    const orderUpdate = async (data: { id: string, franchiseId: string }) => {
        try {
            const orderTransfer = await updateOrderTranfer(data);
            // if(orderTransfer)
            successToast('Order transfered succesfully');
            getAllMyOrders();
        } catch (e) {
            console.log('e', e)
        }
    }

    const assignOrderToAgent = async (data: { id: string, deliveryAgentId: string }) => {
        try {
            const assignOrderToDeliveryAgent = await assignOrder(data);
            console.log('assignOrderToDeliveryAgent', assignOrderToDeliveryAgent, data);
            successToast('Order Assigned succesfully');
        } catch (e) {
            console.log('e', e)
        }
    }

    const getAllMyOrders = useCallback(() => {
        if (userType === FRANCHISETYPE.FRANCHISE) {
            getAllFranchiceorders({ franchiseId: userInfo?.id });
            getAllFranchisesUsers({ params: { franchiseId: userInfo?.id, userType: FRANCHISETYPE.DELIVERYAGENTS } })
        }
        if (userType === FRANCHISETYPE.ADMIN) {
            getAllOrders(undefined);
        }
    }, [userType])

    useEffect(() => {
        getAllMyOrders()
    }, [userType]);

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


    useEffect(() => { }, [updateOrderData, updateOrderisLoading, updateOrderError]);
    useEffect(() => { }, [franchiesLoading, franchiesError]);

    return (<>
        <div className="d-flex justify-content-between pageTitleSpace">
            <p className="pageTile">Orders</p>
        </div>
        <div className="Orderpage">
            <Card className="h-100">
                <Card.Body >
                    <Table hover >
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
                    {error && <div className="emptyTable"><p>Something went wrong!</p></div>}
                    {isLoading && <div className="emptyTable"><AppLoader></AppLoader></div>}
                    {data?.orders?.length !== 0 && <div className="emptyTable">No Data Found</div>}
                </Card.Body>
            </Card>

        </div>

    </>)

}

export default OrderPage;