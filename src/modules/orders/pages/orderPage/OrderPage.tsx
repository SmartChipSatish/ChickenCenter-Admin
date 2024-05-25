import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "react-bootstrap/esm/Table"
import './OrderPage.scss'
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import Dropdown from "react-bootstrap/esm/Dropdown";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/esm/Card";
import { useLazyGetAllOrdersQuery } from "../../Store/ordersEndpoints";
import { useEffect } from "react";
import { Order } from "../../util/ordersInterfaces";

const OrderPage = () => {
    const navigation = useNavigate();
    const [getAllorders, { data, isLoading, error }] = useLazyGetAllOrdersQuery();
    const getOrderDetails = () => {
        navigation('orderDetails')
    }

    useEffect(() => {
        getAllorders(undefined)
    }, [data, isLoading, error])
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
                                <th><p className="tableTitle">Transfer</p></th>
                                <th><p className="tableTitle">Actions</p></th>
                            </tr>
                        </thead>
                        <tbody>
                            {error && <tr><td colSpan={6} className="pageStatus"><p>Something went wrong!</p></td></tr>}
                            {isLoading && <tr><td colSpan={6} className="pageStatus"><p>Loading...</p></td></tr>}
                            {data?.length === 0 && <tr><td colSpan={6} className="pageStatus"><p>No Data Found</p></td></tr>}

                            {data && data?.map((order: Order, index: number) => <tr>
                                <td className="tableItem ">{index + 1}</td>
                                <td className="tableItem curserPointer"><p className="Orderpage-id">{`#${order.id}`}</p></td>
                                <td className="tableItem">{order.date}</td>
                                <td className="tableItem">{order.userId.name}</td>
                                <td className="tableItem">{order.orderStatus}</td>
                                <td className="tableItem">{order.userId.primaryNumber}</td>
                                <td className="tableItem">{order.userId.primaryAddress.name}, {order.userId.primaryAddress.houseNo}, {order.userId.primaryAddress.streetName}</td>
                                <td className="tableItem"> <DropdownButton
                                    as={ButtonGroup}
                                    // variant="outline-primary"
                                    key={'Primary'}
                                    id={`dropdown-variants-${'Primary'}`}
                                    variant={'outline-primary'}
                                    title={'Malasa'}
                                >
                                    <Dropdown.Item eventKey="1">Hi-City</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">Madhapur</Dropdown.Item>
                                    <Dropdown.Item eventKey="3" active>
                                        Durgam Cheruvu
                                    </Dropdown.Item>
                                </DropdownButton></td>
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