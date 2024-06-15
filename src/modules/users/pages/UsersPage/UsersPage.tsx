
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Table from "react-bootstrap/esm/Table"

import Card from "react-bootstrap/esm/Card"
import Button from "react-bootstrap/esm/Button"
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetAllFranchisesQuery, useLazyGetAllFranchisesUsersQuery, useUpdateUserMutation } from "../../../branches/store/branchesEndPoint";
import { useSelector } from "react-redux";
import { IUser } from "../../utils/userInterfaces";
import './UsersPage.scss';
import { UserTypeHook } from "../../../../shared/hooks/userTypeHook"
import { FRANCHISETYPE } from "../../../../shared/utils/appInterfaces"
import { isAdmin, loadingState } from "../../../../shared/utils/appFunctions"
import Form from "react-bootstrap/esm/Form"
import { IBranch } from "../../../branches/utils/BranchesInterfaces"
import { errorToast, successToast } from "../../../../shared/utils/appToaster"
import AppLoader from "../../../../shared/components/loader/loader"
import Pagination from '@material-ui/lab/Pagination';
import { perPage } from "../../../../shared/utils/appConstants";

const UsersPage = () => {
    const navigation = useNavigate();
    const [getAllFranchisesUsers, { data, isLoading, isError }] = useLazyGetAllFranchisesUsersQuery();
    const { data: franchies, isLoading: franchiesLoading, isError: franchiesError } = useGetAllFranchisesQuery({
        params: {
            perPage: '', page: ''
        }
    });
    const [update] = useUpdateUserMutation()
    const userInfo = useSelector((state: any) => state?.userInfoSlice?.userInfo);
    const userType = UserTypeHook();
    const [page, SetPage] = useState(1);

    const createBranch = () => {
        navigation('create');
    }
    const updateUser = async (userId: string, franchiseId: string) => {
        try {
            const userAssigned = await update({
                userId,
                franchiseId
            })
            successToast('User Transfered Successfully')
        } catch (err) {
            errorToast('Try Again!')
        }
    }
    useEffect(() => {
        if (!userType) {
            return
        }
        if (userType === FRANCHISETYPE.FRANCHISE) {
            getAllFranchisesUsers({
                params: { franchiseId: userInfo?.id, userType: FRANCHISETYPE.DELIVERYAGENTS, perPage, page },
            })
        }
        if (userType === FRANCHISETYPE.ADMIN) {
            getAllFranchisesUsers({
                params: { userType: FRANCHISETYPE.DELIVERYAGENTS, perPage, page }
            })
        }

    }, [userType, page]);


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
                    <Card.Body className={`${!loadingState(isLoading, isError, data?.franchises) && 'appCard'}`}>
                        <Table hover >
                            <thead>
                                <tr>
                                    <th><p className="tableTitle">#</p></th>
                                    <th><p className="tableTitle">Name</p></th>
                                    <th><p className="tableTitle">Phone</p></th>
                                    {isAdmin(userType) && <th><p className="tableTitle">Franchise</p></th>}
                                    <th><p className="tableTitle">Address</p></th>
                                    <th style={{ width: '150px' }}><p className="tableTitle">Actions</p></th>
                                </tr>
                            </thead>

                            <tbody>
                                {data && data.franchises.map((user: IUser, index: number) => {
                                    return <>
                                        <tr className="appRow" key={user?.id}>
                                            <td className="tableItem">{index + 1}</td>
                                            <td className="tableItem primaryValue"><p className="primaryValue text-capitalize">{user.name}</p></td>
                                            <td className="tableItem"><p className="usersPage-id">{user?.primaryNumber}</p></td>
                                            {isAdmin(userType) && <td className="tableItem">
                                                <Form.Select aria-label="Order Transfer" onChange={(data) => {
                                                    updateUser(user.id, data?.target?.value)
                                                }}>
                                                    <option>Select Franchise</option>
                                                    {franchies && franchies?.franchises.map((branch: IBranch) => <option value={branch._id}
                                                        selected={user?.franchiseId === branch._id}
                                                    >{branch?.name}</option>)}
                                                </Form.Select>
                                            </td>}
                                            <td className="tableItem"><p className="usersPage-id text-nowrap">{user?.address.city}, {user?.address.state}</p></td>
                                            <td className="align-middle" >
                                                <FontAwesomeIcon icon={faEdit} className="usersPage-actions usersPage-eye" onClick={() => {
                                                    navigation(`update/${user.id}`)
                                                }}></FontAwesomeIcon> <FontAwesomeIcon icon={faTrash} className="itemEdit deleteIcon" onClick={() => {
                                                    // handleShow()
                                                }}></FontAwesomeIcon>
                                            </td>
                                        </tr>
                                    </>
                                })}
                            </tbody>
                        </Table>
                        {isError && <div className="emptyTable"><p>Something went wrong!</p></div>}
                        {isLoading && <div className="emptyTable"><AppLoader></AppLoader></div>}
                        {data?.franchises?.length === 0 && <div className="emptyTable">No Data Found</div>}
                        {data?.totalFranchises > 10 && <div className="d-flex justify-content-end">
                            <Pagination count={data.totalPages} shape="rounded" onChange={(_, value: number) => {
                                console.log('value', value);
                                SetPage(value);
                            }} /></div>}
                    </Card.Body>
                </Card>
            </div></>)


}

export default UsersPage;