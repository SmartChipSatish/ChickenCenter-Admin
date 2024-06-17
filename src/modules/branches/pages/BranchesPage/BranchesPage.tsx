import { faEdit, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Table from "react-bootstrap/esm/Table"
import './BranchesPage.scss'
import Card from "react-bootstrap/esm/Card"
import Button from "react-bootstrap/esm/Button"
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus"
import { useNavigate } from "react-router-dom"
import { useLazyGetAllFranchisesQuery } from "../../store/branchesEndPoint"
import { useEffect, useRef, useState } from "react"
import { IBranch } from "../../utils/BranchesInterfaces"
import AppLoader from "../../../../shared/components/loader/loader"
import Pagination from "@material-ui/lab/Pagination"
import { perPage } from "../../../../shared/utils/appConstants"
import { loadingState } from "../../../../shared/utils/appFunctions"
import { FRANCHISETYPE } from "../../../../shared/utils/appInterfaces"
import { AppDeleteModal } from "../../../../shared/components/AppDeleteModal/AppDeleteModal"
import { IAppDeleteModalRefType } from '../../../../shared/utils/appInterfaces';
import { Form } from "react-bootstrap";
import { addDays } from 'date-fns';
import { DateRangePickers } from '../../../../shared/components/DateRangePickers/DateRangePickers'


const BranchesPage = () => {
    const [getAllFranchises, { data, isLoading, isError }] = useLazyGetAllFranchisesQuery()
    const navigation = useNavigate();
    const deleteModalData = useRef<IAppDeleteModalRefType>();
    const [dateRange, setDateRange] = useState({ startDate: addDays(new Date(), -30), endDate: new Date() });
    const [page, setPage] = useState(1);
    const selectedDate = (dateArray:any) => {
        console.log('dateArray', dateArray)
	}
  

    const editBranch = (id: string) => {
        navigation(`update/${id}`)
    }

    const accept = (status: boolean, data: IBranch) => {
        console.log('deleteModalData.current', data)
    };

    useEffect(() => {
        getAllFranchises({
            params: {
                page,
                perPage,
                userType: FRANCHISETYPE.FRANCHISE
            }
        })
    }, [page])

    return (
        <>
            <div className="d-flex justify-content-between pageTitleSpace">
                <p className="pageTile">Franchises</p>

                <Button variant="outline-primary" onClick={() => {
                    navigation('create');
                }}><FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon> Add</Button>
            </div>
            <div className="BranchesPage">
                <Card className="h-100">
                    <div className="d-flex">
                        {/* <DateRangePicker
                            onChange={(date) => {
                                console.log('Hell', date)
                            }}
                            showPreview={false}
                            //   showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            months={2}
                            ranges={state}
                            direction="horizontal" /> */}
                        <div className="d-flex align-items-center gap-3">
                            <Form.Group className="position-relative">
                                <DateRangePickers  selectedDate={selectedDate} dateArray={dateRange} />
                            </Form.Group>
                            {/* <Button variant="link p-0" onClick={handleDownload}><img src="/assets/dashboard/download.svg" alt="" /></Button> */}
                        </div>
                        {/* <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Recipient's username"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />

                            <Button variant="outline-secondary" id="button-addon2">
                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            </Button>
                        </InputGroup> */}
                    </div>
                    <Card.Body className={`${!loadingState(isLoading, isError, data?.franchises) && 'appCard'}`}>

                        <Table hover>
                            <thead>
                                <tr>
                                    <th><p className="tableTitle">#</p></th>
                                    <th><p className="tableTitle">Name</p></th>
                                    <th><p className="tableTitle">Orders</p></th>
                                    <th><p className="tableTitle">Address</p></th>
                                    <th><p className="tableTitle">Phone</p></th>
                                    <th><p className="tableTitle">Actions</p></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data?.franchises.map((branch: IBranch, index: number) =>

                                    <tr className="appRow" key={branch._id}>
                                        <td className="tableItem">{index + 1}</td>
                                        <td className="tableItem text-capitalize" onClick={() => {
                                            editBranch(branch._id)
                                        }}><p className="BranchesPage-id primaryValue">{branch.name}</p></td>
                                        <td className="tableItem"><p className="BranchesPage-id">{branch?.currentOrders || 0}</p></td>
                                        <td className="tableItem"><p className="BranchesPage-id">{branch.address.name || '---'} ,{branch.address.city}</p></td>
                                        <td className="tableItem"><p className="BranchesPage-id">{branch.primaryNumber}</p></td>
                                        <td className="align-middle">
                                            <FontAwesomeIcon icon={faEdit} className="BranchesPage-actions BranchesPage-eye" onClick={() => {
                                                editBranch(branch._id)
                                            }}></FontAwesomeIcon>
                                            <FontAwesomeIcon icon={faTrash} className="BranchesPage-actions deleteIcon" onClick={() => {
                                                deleteModalData.current?.open(branch);
                                            }}></FontAwesomeIcon>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        {isError && <div className="emptyTable"><p>Something went wrong!</p></div>}
                        {isLoading && <div className="emptyTable"><AppLoader></AppLoader></div>}
                        {data?.franchises?.length === 0 && <div className="emptyTable">No Data Found</div>}
                        {data?.totalFranchises > 10 && <div className="d-flex justify-content-end">
                            <Pagination count={data.totalPages}
                                shape="rounded" onChange={(_, value: number) => {
                                    setPage(value);
                                }} /></div>}
                    </Card.Body>
                </Card>
            </div>

            {<AppDeleteModal ref={deleteModalData} title="Do you want to delete this Franchise?"
                accept={accept} />
            }
        </>)


}

export default BranchesPage;