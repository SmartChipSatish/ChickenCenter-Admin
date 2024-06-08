
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Table from "react-bootstrap/esm/Table"

import Card from "react-bootstrap/esm/Card"
import Button from "react-bootstrap/esm/Button"
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLazyGetAllFranchisesUsersQuery } from "../../../branches/store/branchesEndPoint";
import { useSelector } from "react-redux";
import { IUser } from "../../utils/userInterfaces";
import './UsersPage.scss';
import { UserTypeHook } from "../../../../utils/hooks/userTypeHook"
import { FRANCHISETYPE } from "../../../../utils/interfaces/appInterfaces"

const UsersPage = () => {
    const navigation = useNavigate();
    const [getAllFranchisesUsers, { data, isLoading, isError }] = useLazyGetAllFranchisesUsersQuery();
    const userInfo = useSelector((state: any) => state?.userInfoSlice?.userInfo);
    const userType = UserTypeHook()
    const createBranch = () => {
        navigation('create');
    }

    useEffect(() => {
        if(!userType){
            return
        }
        if (userType === FRANCHISETYPE.FRANCHISE) {
            getAllFranchisesUsers({ franchiseId: userInfo?.id, userType:  FRANCHISETYPE.DELIVERYAGENTS  })
        }
        if (userType === FRANCHISETYPE.ADMIN) {
            getAllFranchisesUsers({ userType:  FRANCHISETYPE.DELIVERYAGENTS  })
        }
        
    }, [userType]);


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
                                {isError && <tr><td colSpan={5} className="pageStatus"><p>Something went wrong!</p></td></tr>}
                                {isLoading && <tr><td colSpan={5} className="pageStatus"><p>Loading...</p></td></tr>}
                                {data?.length === 0 && <tr><td colSpan={5} className="pageStatus"><p>No Data Found</p></td></tr>}
                                {data && data.map((user: IUser, index: number) => {
                                    return <>
                                        <tr>
                                            <td className="tableItem">{index + 1}</td>
                                            <td className="tableItem"><p className="usersPage-id">{user.name}</p></td>
                                            <td className="tableItem"><p className="usersPage-id">{user?.primaryNumber}</p></td>
                                            <td className="tableItem"><p className="usersPage-id text-nowrap">{user?.address.city}, {user?.address.state}</p></td>
                                            <td ><FontAwesomeIcon icon={faEye} className="usersPage-actions usersPage-eye"></FontAwesomeIcon> <FontAwesomeIcon icon={faEdit} className="usersPage-actions"></FontAwesomeIcon></td>
                                        </tr>
                                    </>
                                })}

                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div></>)


}

export default UsersPage;