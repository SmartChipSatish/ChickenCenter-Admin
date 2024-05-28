import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "react-bootstrap/esm/Table"
import './OrderPage.scss'
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/esm/Card";
import { useLazyGetOrderbyFranchiseQuery, useLazyGetAllOrdersQuery, useUpdateOrderTranferMutation } from "../../Store/ordersEndpoints";
import { useEffect, useState } from "react";
import { ORDERSTATUS, Order } from "../../util/ordersInterfaces";
import { useGetAllFranchisesQuery } from "../../../branches/store/branchesEndPoint";
import { IBranch } from "../../../branches/utils/BranchesInterfaces";
import Form from "react-bootstrap/esm/Form";
import { successToast } from "../../../../shared/utils/appToaster";
import { useSelector } from "react-redux";
import { UserTypeHook } from "../../../../utils/hooks/userTypeHook";
import { FRANCHISETYPE } from "../../../../utils/interfaces/appInterfaces";


const OrderPage = () => {
    const navigation = useNavigate();
    const [getAllOrders, { data: allOrdersData, isLoading: allOrdersLoading, error: allOdersError }] = useLazyGetAllOrdersQuery();
    const [getAllFranchiceorders, { data: franchiseOrdersData, isLoading: franchiseOrdersLoading, error: franchiseOrdersError }] = useLazyGetOrderbyFranchiseQuery();
    const { data: franchies, isLoading: franchiesLoading, isError: franchiesError } = useGetAllFranchisesQuery(undefined);
    const [updateOrderTranfer, { data: updateOrderData, isLoading: updateOrderisLoading, isError: updateOrderError }] = useUpdateOrderTranferMutation()
    const userInfo = useSelector((state: any) => state?.userInfoSlice?.userInfo);
    const userType = UserTypeHook()
    const [isLoading, SetLoading] = useState<any>(null);
    const [data, SetData] = useState<any>(null);
    const [error, SetError] = useState<any>(null);
    const getOrderDetails = () => {
        navigation('orderDetails')
    }

    const orderTransfer = async (data: { id: string, franchiseId: string }) => {
        try {
            const orderTransfer = await updateOrderTranfer(data);
            successToast('Order transfered succesfully');
        } catch (e) {
            console.log('e', e)
        }

    }


    useEffect(() => {
        if (userType === FRANCHISETYPE.FRANCHISE) {
            getAllFranchiceorders({ franchiseId: userInfo?.id })
        }
        if (userType === FRANCHISETYPE.ADMIN) {
            getAllOrders(undefined)
        }

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
        <div className="Orderpage">
            <Card className="h-100">
                <Card.Body >
                    <Table hover >
                        <thead>
                            <tr>
                                <th><p className="tableTitle">#</p></th>
                                <th ><p className="tableTitle">Order</p></th>
                                <th> <p className="tableTitle">Date</p></th>
                                <th> <p className="tableTitle">Customer</p></th>
                                <th><p className="tableTitle">Order Status</p></th>
                                <th><p className="tableTitle">Phone</p></th>
                                <th><p className="tableTitle">Address</p></th>
                                {userType === FRANCHISETYPE.ADMIN && <th><p className="tableTitle">Transfer</p></th>}
                                <th><p className="tableTitle">Actions</p></th>
                            </tr>
                        </thead>
                        <tbody>
                            {error && <tr><td colSpan={6} className="pageStatus"><p>Something went wrong!</p></td></tr>}
                            {isLoading && <tr><td colSpan={6} className="pageStatus"><p>Loading...</p></td></tr>}
                            {data?.length === 0 && <tr><td colSpan={6} className="pageStatus"><p>No Data Found</p></td></tr>}

                            {data && data?.map((order: Order, index: number) => <tr>
                                <td className="tableItem ">{index + 1}</td>
                                <td className="tableItem curserPointer" onClick={() => {
                                    getOrderDetails();
                                }}><p className="Orderpage-id">{`#${order?.id}`}</p></td>
                                <td className="tableItem">{order?.date}</td>
                                <td className="tableItem">{order.userId?.name}</td>
                                <td className="tableItem"><p className={`pending ${(order?.orderStatus === ORDERSTATUS.Delivered) && 'completed'}`}>{order?.orderStatus}</p></td>
                                <td className="tableItem">{order?.userId?.primaryNumber}</td>
                                <td className="tableItem">{order?.userId?.primaryAddress?.name}, {order?.userId?.primaryAddress?.houseNo}, {order?.userId?.primaryAddress?.streetName}</td>
                                {userType === FRANCHISETYPE.ADMIN && <td className="tableItem">
                                    <Form.Select aria-label="Order Transfer" onChange={(data) => {
                                        orderTransfer({ id: order.id, franchiseId: data?.target?.value })
                                    }}>
                                        {franchies && franchies?.map((branch: IBranch) => <option value={branch._id} selected={order?.franchiseId === branch._id}>{branch?.name}</option>)}
                                    </Form.Select>
                                </td>}

                                <td ><FontAwesomeIcon icon={faEye} className="Orderpage-actions Orderpage-eye" onClick={() => {
                                    getOrderDetails();
                                }}></FontAwesomeIcon> <FontAwesomeIcon icon={faEdit} className="Orderpage-actions"></FontAwesomeIcon></td>
                            </tr>)}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

        </div>

    </>)

}

export default OrderPage;