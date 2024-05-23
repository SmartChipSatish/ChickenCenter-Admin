import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Table from "react-bootstrap/esm/Table"
import './BranchesPage.scss'
import Card from "react-bootstrap/esm/Card"
import Button from "react-bootstrap/esm/Button"
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
const BranchesPage = () => {
    const navigation = useNavigate();

    const createBranch = () => {
        navigation('create');
    }
    
    return (
        <>
            <div className="d-flex justify-content-between pageTitleSpace">
                <p className="pageTile">Branches</p>
                <Button variant="outline-primary" onClick={() => {
                    createBranch()
                }}><FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon> Add</Button>
            </div>
            <div className="BranchesPage">
                <Card className="h-100">
                    <Card.Body >
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
                                <tr>
                                    <td className="tableItem">1</td>
                                    <td className="tableItem"><p className="BranchesPage-id">Hi Tech City</p></td>
                                    <td className="tableItem">25</td>
                                    <td className="tableItem">51-2-37, Hi-tech city, HYD</td>
                                    <td ><FontAwesomeIcon icon={faEye} className="BranchesPage-actions BranchesPage-eye"></FontAwesomeIcon> <FontAwesomeIcon icon={faEdit} className="BranchesPage-actions"></FontAwesomeIcon></td>
                                </tr>

                                <tr>
                                    <td className="tableItem">2</td>
                                    <td className="tableItem"><p className="BranchesPage-id">Durgam Cheruvu</p></td>
                                    <td className="tableItem">35</td>
                                    <td className="tableItem">144-2-137, Durgam Cheruvu, HYD</td>
                                    <td className="tableItem"><FontAwesomeIcon icon={faEye} className="BranchesPage-actions BranchesPage-eye"></FontAwesomeIcon> <FontAwesomeIcon icon={faEdit} className="BranchesPage-actions"></FontAwesomeIcon></td>
                                </tr>


                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div></>)


}

export default BranchesPage;