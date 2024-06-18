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


const BranchesPage = () => {
    const [getAllFranchises, { data, isLoading, isError }] = useLazyGetAllFranchisesQuery()
    const navigation = useNavigate();
    const deleteModalData = useRef<IAppDeleteModalRefType>();
    const [searchQuery, setSearchQuery] = useState<{ page: number, name: string }>({
        page: 1,
        name: ''
    });
    const editBranch = (id: string) => {
        navigation(`update/${id}`)
    }

    const accept = (status: boolean, data: IBranch) => {
        console.log('deleteModalData.current', data)
    };

    useEffect(() => {
        getAllFranchises({
            params: {
                page: searchQuery.page,
                perPage,
                userType: FRANCHISETYPE.FRANCHISE,
                name: searchQuery.name
            }
        })
    }, [searchQuery])

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
                    <div className='filters'>
                        <div>
                            <form className="d-flex" role="search">
                                <Form.Control className="me-2" type="search" placeholder="Search Franchise" aria-label="Search Franchise" onChange={(searchValue) => {
                                    setSearchQuery({
                                        ...searchQuery,
                                        page: 1,
                                        name: searchValue.target.value
                                    })
                                }} />
                                <Button variant="outline-primary" onClick={() => {
                                }}>
                                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                                </Button>

                            </form>
                        </div>
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
                                    setSearchQuery({
                                        ...searchQuery,
                                        page: value,
                                    })
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