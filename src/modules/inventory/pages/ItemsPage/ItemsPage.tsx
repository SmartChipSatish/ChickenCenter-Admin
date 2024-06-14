import { faEdit, faPlus, faTrash, faRupeeSign, faInr } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Modal } from "react-bootstrap";
import Table from "react-bootstrap/esm/Table";
import Image from 'react-bootstrap/Image';
import './ItemsPage.scss'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLazyGetAllItemsQuery } from "../../store/InventoryEndPoint";
import { IItem } from "../../Utils/InventoryInterfaces";
import { loadingState } from "../../../../utils/appFunctions";
import AppLoader from "../../../../shared/components/loader/loader";
import Pagination from "@material-ui/lab/Pagination";
import { perPage } from "../../../../utils/appConstants";

/**
 * Items Page
 * @returns Jsx Element
 */
const ItemsPage = () => {
    const [getAllItems, { data, isLoading, isError }] = useLazyGetAllItemsQuery();
    const navigation = useNavigate();
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(1)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addItem = () => {
        navigation('addItem');
    }

    useEffect(() => {
        getAllItems({
            params: {
                perPage, page
            }
        })
    }, [page])

    return (<>
        <div className="d-flex justify-content-between pageTitleSpace">
            <p className="pageTile">Items</p>
            <Button variant="outline-primary" onClick={() => {
                addItem()
            }}><FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon> Add</Button>
        </div>
        <div className="itemsPage">
            <Card className="h-100">
                <Card.Body className={`${!loadingState(isLoading, isError, data?.items) && 'appCard'}`} >
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
                            {data && data?.items.map((item: IItem, index: number) =>
                                <tr className="appRow" key={item?._id}>
                                    <td className="tableItem indexWidth">{index + 1}</td>
                                    <td className="tableItem imgWidth"> <Image className="itemImg" src={item.imageUrl || "https://www.licious.in/blog/wp-content/uploads/2022/03/Chicken-Curry-Cut-min-1.png"} roundedCircle /></td>
                                    <td className="tableItem"><p className="primaryValue">{item.itemName}</p></td>
                                    <td className="tableItem"> <div className="d-flex align-items-center"><FontAwesomeIcon icon={faInr} className="rupeeicon" /> <p className="fw-bold me-1">  {item.itemPrice}</p> / <p className="ms-1">{item.itemQty}</p></div></td>
                                    <td className="tableItem"><p className={`pending ${item.globalItemStatus && 'completed'}`}>{item.globalItemStatus ? 'Available' : 'Out of stock'}</p> </td>
                                    <td className="tableItem align-middle"><FontAwesomeIcon icon={faEdit} className="itemEdit" onClick={() => {
                                        navigation(`updateItem/${item?._id}`)
                                    }}></FontAwesomeIcon> <FontAwesomeIcon icon={faTrash} className="itemEdit deleteIcon" onClick={() => {
                                        handleShow()
                                    }}></FontAwesomeIcon></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    {isError && <div className="emptyTable"><p>Something went wrong!</p></div>}
                    {isLoading && <div className="emptyTable"><AppLoader></AppLoader></div>}
                    {data?.items?.length === 0 && <div className="emptyTable">No Data Found</div>}
                    {data?.totalItems > 10 && <div className="d-flex justify-content-end">
                        <Pagination count={data.totalPages}
                            shape="rounded" onChange={(_, value: number) => {
                                setPage(value);
                            }} /></div>}
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