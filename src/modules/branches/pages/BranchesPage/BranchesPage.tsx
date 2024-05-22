import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Table from "react-bootstrap/esm/Table"
import './BranchesPage.scss'
const BranchesPage = () => {
    return (<Table striped bordered hover className="BranchesPage">
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
            <tr>
                <td>1</td>
                <td><p className="BranchesPage-id">Hi Tech City</p></td>
                <td>25</td>
                <td>51-2-37, Hi-tech city, HYD</td>
                <td ><FontAwesomeIcon icon={faEye} className="BranchesPage-actions BranchesPage-eye"></FontAwesomeIcon> <FontAwesomeIcon icon={faEdit} className="BranchesPage-actions"></FontAwesomeIcon></td>
            </tr>

            <tr>
                <td>2</td>
                <td><p className="BranchesPage-id">Durgam Cheruvu</p></td>
                <td>35</td>
                <td>144-2-137, Durgam Cheruvu, HYD</td>
                <td ><FontAwesomeIcon icon={faEye} className="BranchesPage-actions BranchesPage-eye"></FontAwesomeIcon> <FontAwesomeIcon icon={faEdit} className="BranchesPage-actions"></FontAwesomeIcon></td>
            </tr>


        </tbody>
    </Table>)
}

export default BranchesPage;