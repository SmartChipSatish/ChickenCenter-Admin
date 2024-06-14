import { Button, Form, Modal, Table } from "react-bootstrap";
import { getOrderDate, getOrderSmallId, isAdmin, isFranchiese, isUser } from "../../../utils/appFunctions";
import { UserTypeHook } from "../../../utils/hooks/userTypeHook";
import { Order, STATUSTYPES } from "../../../modules/orders/util/ordersInterfaces";
import { useGetAllOrders } from "../../hooks/OrdersHook/OrdersHook";
import { useNavigate } from "react-router-dom";
import { OrderStatus } from "../OrderStatusComponet/OrderStatusComponent";
import { useGetAllFranchisesQuery, useLazyGetAllFranchisesUsersQuery } from "../../../modules/branches/store/branchesEndPoint";
import { IBranch } from "../../../modules/branches/utils/BranchesInterfaces";
import { IUser } from "../../../modules/users/utils/userInterfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import AppLoader from "../loader/loader";
import Pagination from "@material-ui/lab/Pagination";
import { useEffect, useState } from "react";
import { useAssignOrderMutation, useUpdateOrderTranferMutation } from "../../../modules/orders/Store/ordersEndpoints";
import { successToast } from "../../utils/appToaster";
import "./AllOrdersListComponent.scss"
import { FRANCHISETYPE, IOrdersPage } from "../../../utils/interfaces/appInterfaces";
import { useSelector } from "react-redux";
export const AllOrdersListComponent = ({ perPage, isPagination }: IOrdersPage) => {
    const userType = UserTypeHook();
    const { data: franchies } = useGetAllFranchisesQuery({
        params: {
            perPage: '', page: ''
        }
    });
    const [updateOrderTranfer] = useUpdateOrderTranferMutation();
    const [assignOrder] = useAssignOrderMutation();
    const [page, setPage] = useState(1);
    const { data, isLoading, isError } = useGetAllOrders({ perPage, page: page });
    const [getAllFranchisesUsers, { data: franchiesUsers }] = useLazyGetAllFranchisesUsersQuery();
    const navigation = useNavigate();
    const userInfo = useSelector((state: any) => state?.userInfoSlice?.userInfo);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
    const getOrderDetails = (id: string) => {
        navigation(`/orders/orderDetails/${id}`)
    }

    useEffect(() => {
        if (userType === FRANCHISETYPE.FRANCHISE) {
            getAllFranchisesUsers({ params: { franchiseId: userInfo?.id, userType: FRANCHISETYPE.DELIVERYAGENTS } })
        }
    }, [userType, page]);

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
                {data && data?.orders.map((order: Order, index: number) => <tr className="appRow">
                    <td className="tableItem ">{index + 1}</td>
                    <td className="tableItem curserPointer" onClick={() => {
                        getOrderDetails(order?.id);
                    }}><p className="Orderpage-id text-uppercase">{`#${getOrderSmallId(order?.id)}`}</p></td>
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
                        }}></FontAwesomeIcon> <FontAwesomeIcon icon={faTrash} className="Orderpage-actions deleteIcon" onClick={handleShow}></FontAwesomeIcon> </>}
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
            (data?.totalOrders > 10 && isPagination) && <div className="d-flex justify-content-end">
                <Pagination count={data.totalPages}
                    shape="rounded" onChange={(_, value: number) => {
                        setPage(value);
                    }} /></div>
        }
        {show &&
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to cancel this order?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="outline-primary" onClick={handleClose}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>}
    </>
}