import { faEdit, faPlus, faTrash, faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Modal } from "react-bootstrap";
import Table from "react-bootstrap/esm/Table";
import Image from 'react-bootstrap/Image';
import './ItemsPage.scss'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLazyGetAllItemsQuery } from "../../store/InventoryEndPoint";
import { IItem } from "../../Utils/InventoryInterfaces";

/**
 * Items Page
 * @returns Jsx Element
 */
const ItemsPage = () => {
    const [getAllItems, { data, isLoading, error }] = useLazyGetAllItemsQuery();
    const navigation = useNavigate();
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addItem = () => {
        navigation('addItem');
    }

    useEffect(() => {
        getAllItems(undefined)
    }, [])

    return (<>
        <div className="d-flex justify-content-between pageTitleSpace">
            <p className="pageTile">Items</p>
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
                                <th><p className="tableTitle"></p></th>
                                <th><p className="tableTitle">Name</p></th>
                                <th><p className="tableTitle">Price/Quantity</p></th>
                                <th><p className="tableTitle">Status</p></th>
                                <th><p className="tableTitle">Actions</p></th>
                            </tr>
                        </thead>
                        <tbody>
                            {error && <tr><td colSpan={6} className="pageStatus"><p>Something went wrong!</p></td></tr>}
                            {isLoading && <tr><td colSpan={6} className="pageStatus"><p>Loading...</p></td></tr>}
                            {data?.items.length === 0 && <tr><td colSpan={6} className="pageStatus"><p>No Data Found</p></td></tr>}
                            {data && data?.items.map((item: IItem, index: number) =>
                                <tr>
                                    <td className="tableItem indexWidth">{index + 1}</td>
                                    <td className="tableItem imgWidth"> <Image className="itemImg" src={item.imageUrl || "https://www.licious.in/blog/wp-content/uploads/2022/03/Chicken-Curry-Cut-min-1.png"} roundedCircle /></td>
                                    <td className="tableItem">{item.itemName}</td>
                                    <td className="tableItem"> <div className="d-flex"><p className="fw-bold me-1"> <FontAwesomeIcon icon={faRupeeSign} /> {item.itemPrice}</p> / <p className="ms-1">{item.itemQty}</p></div></td>
                                    <td className="tableItem"><p className={`pending ${item.globalItemStatus && 'completed'}`}>{item.globalItemStatus ? 'Available' : 'Out of stock'}</p> </td>
                                    <td className="tableItem"><FontAwesomeIcon icon={faEdit} className="itemEdit" onClick={() => {
                                        navigation(`updateItem/${item?._id}`)
                                    }}></FontAwesomeIcon> <FontAwesomeIcon icon={faTrash} className=" itemEdit" onClick={() => {
                                        handleShow()
                                    }}></FontAwesomeIcon></td>
                                </tr>
                            )}
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
                <Button variant="outline-secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="outline-primary" onClick={handleClose}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal></>)
}

export default ItemsPage