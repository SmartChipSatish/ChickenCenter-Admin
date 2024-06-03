// const UsersPage = () => {
//     return (<>
//         Users Page
//     </>)
// }

// export default UsersPage


import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Table from "react-bootstrap/esm/Table"

import Card from "react-bootstrap/esm/Card"
import Button from "react-bootstrap/esm/Button"
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus"
import { useNavigate } from "react-router-dom"
// import { useGetAllFranchisesQuery } from "../../store/branchesEndPoint"
import { useEffect } from "react"
// import { IBranch } from "../../utils/BranchesInterfaces"
import './UsersPage.scss'
const UsersPage = () => {
    // const { data, isLoading, isError } = useGetAllFranchisesQuery(undefined)
    const navigation = useNavigate();

    const createBranch = () => {
        navigation('create');
    }

    return (
        <>
            <div className="d-flex justify-content-between pageTitleSpace">
                <p className="pageTile">Users</p>
                <Button variant="outline-primary" onClick={() => {
                    createBranch()
                }}><FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon> Add</Button>
            </div>
            <div className="usersPage">
                <Card className="h-100">
                    <Card.Body >
                        <Table hover>
                            <thead>
                                <tr>
                                    <th><p className="tableTitle">#</p></th>
                                    <th><p className="tableTitle">Name</p></th>
                                    <th><p className="tableTitle">Phone</p></th>
                                    <th><p className="tableTitle">Address</p></th>
                                    <th style={{ width: '150px' }}><p className="tableTitle">Actions</p></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="tableItem">{1}</td>
                                    <td className="tableItem"><p className="BranchesPage-id">{'Vishnu'}</p></td>
                                    <td className="tableItem"><p className="BranchesPage-id">{'8121739901'}</p></td>
                                    <td className="tableItem"><p className="BranchesPage-id">{'51-2-37, vaddila' || '---'}</p></td>
                                    <td ><FontAwesomeIcon icon={faEye} className="BranchesPage-actions BranchesPage-eye"></FontAwesomeIcon> <FontAwesomeIcon icon={faEdit} className="BranchesPage-actions"></FontAwesomeIcon></td>
                                </tr>
                                {/* {isError && <tr><td colSpan={6}><p>Something went wrong!</p></td></tr>}
                                {isLoading && <tr><td colSpan={6}><p>Loading...</p></td></tr>}
                                {data?.length === 0 && <tr><td colSpan={6}><p>No Data Found</p></td></tr>}
                                {data && data?.map((branch: IBranch, index: number) =>

                                    <tr>
                                        <td className="tableItem">{index + 1}</td>
                                        <td className="tableItem"><p className="BranchesPage-id">{branch.name}</p></td>
                                        <td className="tableItem"><p className="BranchesPage-id">{branch?.currentOrders || 0}</p></td>
                                        <td className="tableItem"><p className="BranchesPage-id">{branch.address.name || '---'} ,{branch.address.city}</p></td>
                                        <td ><FontAwesomeIcon icon={faEye} className="BranchesPage-actions BranchesPage-eye"></FontAwesomeIcon> <FontAwesomeIcon icon={faEdit} className="BranchesPage-actions"></FontAwesomeIcon></td>
                                    </tr>
                                )} */}

                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div></>)


}

export default UsersPage;