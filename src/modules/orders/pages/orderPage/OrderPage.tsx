import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "react-bootstrap/esm/Table"
import './OrderPage.scss'
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import Dropdown from "react-bootstrap/esm/Dropdown";
// FontAwesomeIcon
// fa-eye
const OrderPage = () => {
    return (<>
        <Table striped bordered hover className="Orderpage">
            <thead>
                <tr>
                    <th><p className="tableTitle">#</p></th>
                    <th ><p className="tableTitle">Order</p></th>
                    <th> <p className="tableTitle">Date</p></th>
                    <th> <p className="tableTitle">Customer</p></th>
                    <th><p className="tableTitle">Payment Status</p></th>
                    <th><p className="tableTitle">Fulfillment Status</p></th>
                    <th><p className="tableTitle">Payment Method</p></th>
                    <th><p className="tableTitle">Transfer</p></th>
                    <th><p className="tableTitle">Actions</p></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td><p className="Orderpage-id">#35463</p></td>
                    <td>Aug 17, 2020, 5:48 (ET)</td>
                    <td>Jase Marley</td>
                    <td>Paid</td>
                    <td>Fulfilled</td>
                    <td>Cash</td>
                    <td> <DropdownButton
                        as={ButtonGroup}
                        key={'Primary'}
                        id={`dropdown-variants-${'Primary'}`}
                        variant={'Primary'.toLowerCase()}
                        title={'Malasa'}
                    >
                        <Dropdown.Item eventKey="1">Hi-City</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Madhapur</Dropdown.Item>
                        <Dropdown.Item eventKey="3" active>
                            Durgam Cheruvu
                        </Dropdown.Item>
                    </DropdownButton></td>
                    <td ><FontAwesomeIcon icon={faEye} className="Orderpage-actions Orderpage-eye"></FontAwesomeIcon> <FontAwesomeIcon icon={faEdit} className="Orderpage-actions"></FontAwesomeIcon></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td><p className="Orderpage-id">#65463</p></td>
                    <td>Aug 17, 2020, 5:48 (ET)</td>
                    <td>Jase Marley</td>
                    <td>Paid</td>
                    <td>Fulfilled</td>
                    <td>Cash</td>
                    <td> <DropdownButton
                        as={ButtonGroup}
                        key={'Primary'}
                        id={`dropdown-variants-${'Primary'}`}
                        variant={'Primary'.toLowerCase()}
                        title={'Malasa'}
                    >
                        <Dropdown.Item eventKey="1">Hi-City</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Madhapur</Dropdown.Item>
                        <Dropdown.Item eventKey="3" active>
                            Durgam Cheruvu
                        </Dropdown.Item>
                    </DropdownButton></td>
                    <td ><FontAwesomeIcon icon={faEye} className="Orderpage-actions Orderpage-eye"></FontAwesomeIcon> <FontAwesomeIcon icon={faEdit} className="Orderpage-actions"></FontAwesomeIcon></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td><p className="Orderpage-id">#25463</p></td>
                    <td>Aug 17, 2020, 5:48 (ET)</td>
                    <td>Mathew Gustaffson</td>
                    <td>Pending</td>
                    <td>Unfulfilled</td>
                    <td>Cash</td>
                    <td> <DropdownButton
                        as={ButtonGroup}
                        key={'Primary'}
                        id={`dropdown-variants-${'Primary'}`}
                        variant={'Primary'.toLowerCase()}
                        title={'Malasa'}
                    >
                        <Dropdown.Item eventKey="1">Hi-City</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Madhapur</Dropdown.Item>
                        <Dropdown.Item eventKey="3" active>
                            Durgam Cheruvu
                        </Dropdown.Item>

                    </DropdownButton></td>
                    <td ><FontAwesomeIcon icon={faEye} className="Orderpage-actions Orderpage-eye"></FontAwesomeIcon> <FontAwesomeIcon icon={faEdit} className="Orderpage-actions"></FontAwesomeIcon></td>
                </tr>
            </tbody>
        </Table>
    </>)

}

export default OrderPage;