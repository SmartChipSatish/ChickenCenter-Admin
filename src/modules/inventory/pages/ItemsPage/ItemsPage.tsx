import { faEdit, faPlus, faTrash, faRupeeSign, faInr, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Form, Modal } from "react-bootstrap";
import Table from "react-bootstrap/esm/Table";
import Image from 'react-bootstrap/Image';
import './ItemsPage.scss'
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useLazyGetAllItemsQuery, useUpdateItemMutation } from "../../store/InventoryEndPoint";
import { IItem } from "../../Utils/InventoryInterfaces";
import { loadingState } from "../../../../shared/utils/appFunctions";
import AppLoader from "../../../../shared/components/loader/loader";
import Pagination from "@material-ui/lab/Pagination";
import { perPage } from "../../../../shared/utils/appConstants";
import { IAppDeleteModalRefType } from "../../../../shared/utils/appInterfaces";
import { AppDeleteModal } from "../../../../shared/components/AppDeleteModal/AppDeleteModal";
import { errorToast, successToast } from "../../../../shared/utils/appToaster";
import { AppSearchBar } from "../../../../shared/components/AppSearchBar/AppSearchBar";
import { PageTitle } from "../../../../shared/components/PageTitle/PageTitle";

/**
 * Items Page
 * @returns Jsx Element
 */
const ItemsPage = () => {
    const [getAllItems, { data, isLoading, isError }] = useLazyGetAllItemsQuery();
    const [updateItem] = useUpdateItemMutation();
    const navigation = useNavigate();
    const [page, setPage] = useState(1)
    const [itemStatus, SetItemStatus] = useState('');
    const [search, SetSearch] = useState('')
    const deleteModalData = useRef<IAppDeleteModalRefType>();


    const accept = async (status: boolean, data: IItem) => {
        try {
            const deleteItem = await updateItem({
                params: {
                    itemId: data.id
                },
                body: {
                    status: false
                }
            })
            if (deleteItem) {
                successToast('Item Deleted Succesfully!');
            }
        } catch (err) {
            errorToast('Something went wrong!')
        }

    };


    const addItem = () => {
        navigation('addItem');
    }

    useEffect(() => {
        let params = {
            perPage, page,
        }
        if (itemStatus || search) {
            params = Object.assign(params, { globalItemStatus: itemStatus, itemName: search })
        }
        getAllItems({
            params: params,
        })
    }, [page, itemStatus, search])

    return (<>
        <div className="d-flex justify-content-between pageTitleSpace">
            <PageTitle name="Items" pageItems={data?.totalItems || 0}></PageTitle>
            <Button variant="outline-primary" onClick={() => {
                addItem()
            }}><FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon> Add</Button>
        </div>
        <div className="itemsPage">
            <Card className="h-100">
                <div className='filters'>
                    <div>
                        <AppSearchBar searchFn={(searchKey) => {
                            SetSearch(searchKey)
                        }} placeholder="Search Item" />
                    </div>
                    <div>
                        <Form.Select aria-label="Default select example" onChange={(value) => {
                            console.log('value', value?.target?.value)
                            SetItemStatus(value?.target?.value)
                        }}>
                            <option value=''>Item Status(All)</option>
                            <option value="true">Available</option>
                            <option value="false">Out of Stock</option>
                        </Form.Select>

                    </div>
                </div>

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
                                    <td className="tableItem" onClick={() => {
                                        navigation(`updateItem/${item?._id}`)
                                    }}><p className="primaryValue">{item.itemName}</p></td>
                                    <td className="tableItem"> <div className="d-flex align-items-center"><FontAwesomeIcon icon={faInr} className="rupeeicon" /> <p className="fw-bold me-1">  {item.itemPrice}</p> / <p className="ms-1">{item.itemQty}</p></div></td>
                                    <td className="tableItem"><p className={`pending ${item.globalItemStatus && 'completed'}`}>{item.globalItemStatus ? 'Available' : 'Out of stock'}</p> </td>
                                    <td className="tableItem align-middle"><FontAwesomeIcon icon={faEdit} className="itemEdit" onClick={() => {
                                        navigation(`updateItem/${item?._id}`)
                                    }}></FontAwesomeIcon> <FontAwesomeIcon icon={faTrash} className="itemEdit deleteIcon" onClick={() => {
                                        deleteModalData.current?.open(item)
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


        {<AppDeleteModal ref={deleteModalData} title="Do you want to delete this item?"
            accept={accept} />
        }
    </>)
}

export default ItemsPage