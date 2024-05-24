import { faDeleteLeft, faEdit, faEye, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Card, Dropdown, Modal } from "react-bootstrap";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import Table from "react-bootstrap/esm/Table";
import Image from 'react-bootstrap/Image';
import './ItemsPage.scss'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const ItemsPage = () => {
    const navigation = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const addItem = () => {
        navigation('addItem');
    }

    return (<>
        <div className="d-flex justify-content-between pageTitleSpace">
            <p className="pageTile">Inventory</p>
            <Button variant="outline-primary" onClick={() => {
                addItem()
            }}><FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon> Add</Button>
        </div>
        <div className="itemsPage">
            <Card className="h-100">
                <Card.Body >
                    <Table hover>
                        <thead>
                            <tr>
                                <th><p className="tableTitle">#</p></th>
                                <th ><p className="tableTitle"></p></th>
                                <th> <p className="tableTitle">Name</p></th>
                                <th> <p className="tableTitle">Price/Quantity</p></th>
                                <th><p className="tableTitle">Stock</p></th>


                                <th><p className="tableTitle">Actions</p></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="tableItem">1</td>
                                <td className="tableItem itemImg"> <Image src="https://www.licious.in/blog/wp-content/uploads/2022/03/Chicken-Curry-Cut-min-1.png" roundedCircle /></td>
                                <td className="tableItem">Chicken Wings</td>
                                <td className="tableItem">500/1kg</td>
                                <td className="tableItem">25kg's</td>


                                <td className="tableItem"><FontAwesomeIcon icon={faEdit} className="itemEdit" onClick={() => {
                                    // getOrderDetails();
                                }}></FontAwesomeIcon> <FontAwesomeIcon icon={faTrash} className=" itemEdit text-danger" onClick={() => {
                                    handleShow()
                                }}></FontAwesomeIcon></td>
                            </tr>

                        </tbody>
                    </Table>
                </Card.Body>

            </Card>
        </div>



        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to delete this item?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="outline-primary" onClick={handleClose}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal></>)
}

export default ItemsPage