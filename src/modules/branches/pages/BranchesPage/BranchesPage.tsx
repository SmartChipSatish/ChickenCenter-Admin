import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Table from "react-bootstrap/esm/Table"
import './BranchesPage.scss'
import Card from "react-bootstrap/esm/Card"
import Button from "react-bootstrap/esm/Button"
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus"
import { useNavigate } from "react-router-dom"
import { useGetAllFranchisesQuery, useLazyGetAllFranchisesQuery } from "../../store/branchesEndPoint"
import { useEffect, useState } from "react"
import { IBranch } from "../../utils/BranchesInterfaces"
import AppLoader from "../../../../shared/components/loader/loader"
import Pagination from "@material-ui/lab/Pagination"
import { perPage } from "../../../../utils/appConstants"
import { loadingState } from "../../../../utils/appFunctions"

const BranchesPage = () => {
    const [getAllFranchises, { data, isLoading, isError }] = useLazyGetAllFranchisesQuery()
    const navigation = useNavigate();
    const [page, setPage] = useState(1);
    const createBranch = () => {
        navigation('create');
    }
    useEffect(() => {
        getAllFranchises({
            params: { page, perPage }
        })
    }, [page])
    return (
        <>
            <div className="d-flex justify-content-between pageTitleSpace">
                <p className="pageTile">Franchises</p>
                <Button variant="outline-primary" onClick={() => {
                    createBranch()
                }}><FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon> Add</Button>
            </div>
            <div className="BranchesPage">
                <Card className="h-100">
                    <Card.Body className={`${!loadingState(isLoading, isError, data?.franchises) && 'appCard'}`}>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th><p className="tableTitle">#</p></th>
                                    <th><p className="tableTitle">Name</p></th>
                                    <th><p className="tableTitle">Orders</p></th>
                                    <th><p className="tableTitle">Address</p></th>
                                    <th><p className="tableTitle">Actions</p></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data?.franchises.map((branch: IBranch, index: number) =>

                                    <tr className="appRow">
                                        <td className="tableItem">{index + 1}</td>
                                        <td className="tableItem text-capitalize"><p className="BranchesPage-id primaryValue">{branch.name}</p></td>
                                        <td className="tableItem"><p className="BranchesPage-id">{branch?.currentOrders || 0}</p></td>
                                        <td className="tableItem"><p className="BranchesPage-id">{branch.address.name || '---'} ,{branch.address.city}</p></td>
                                        <td className="align-middle"><FontAwesomeIcon icon={faEye} className="BranchesPage-actions BranchesPage-eye"></FontAwesomeIcon> <FontAwesomeIcon icon={faEdit} className="BranchesPage-actions"></FontAwesomeIcon></td>
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
            </div></>)


}

export default BranchesPage;