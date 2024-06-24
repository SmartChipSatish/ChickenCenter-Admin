
import { faEdit, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Table from "react-bootstrap/esm/Table"

import Card from "react-bootstrap/esm/Card"
import Button from "react-bootstrap/esm/Button"
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus"
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useGetAllFranchisesQuery, useLazyGetAllFranchisesUsersQuery, useUpdateUserMutation } from "../../../branches/store/branchesEndPoint";
import { useSelector } from "react-redux";
import { IUser } from "../../utils/userInterfaces";
import './UsersPage.scss';
import { UserTypeHook } from "../../../../shared/hooks/userTypeHook"
import { FRANCHISETYPE, IAppDeleteModalRefType } from "../../../../shared/utils/appInterfaces"
import { addIdToInProgress, hasInProgress, isAdmin, loadingState, removeIdToInProgress } from "../../../../shared/utils/appFunctions"
import Form from "react-bootstrap/esm/Form"
import { IBranch } from "../../../branches/utils/BranchesInterfaces"
import { errorToast, successToast } from "../../../../shared/utils/appToaster"
import AppLoader from "../../../../shared/components/loader/loader"
import Pagination from '@material-ui/lab/Pagination';
import { perPage } from "../../../../shared/utils/appConstants";
import { AppDeleteModal } from "../../../../shared/components/AppDeleteModal/AppDeleteModal"
import { AppSearchBar } from "../../../../shared/components/AppSearchBar/AppSearchBar"
import { PageTitle } from "../../../../shared/components/PageTitle/PageTitle"

const UsersPage = () => {
    const navigation = useNavigate();
    const [getAllFranchisesUsers, { data, isLoading, isError }] = useLazyGetAllFranchisesUsersQuery();
    const { data: franchies, isLoading: franchiesLoading, isError: franchiesError } = useGetAllFranchisesQuery({
        params: {
            perPage: '', page: '',
            userType: FRANCHISETYPE.FRANCHISE
        }
    });
    const [update] = useUpdateUserMutation()
    const userInfo = useSelector((state: any) => state?.userInfoSlice?.userInfo);
    const userType = UserTypeHook();
    const [searchQuery, setSearchQuery] = useState<{ page: number, name: string }>({
        page: 1,
        name: ''
    });
    const deleteModalData = useRef<IAppDeleteModalRefType>();

    const accept = (status: boolean, data: IUser) => {
        console.log('deleteModalData.current', data)
    };
    const createBranch = () => {
        navigation('create');
    }
    const updateUser = async (userId: string, franchiseId: string) => {
        addIdToInProgress(userId)
        try {
            const userAssigned = await update({
                userId,
                franchiseId
            })
            successToast('User Transfered Successfully');
            removeIdToInProgress(userId)
        } catch (err) {
            errorToast('Try Again!');
            removeIdToInProgress(userId)
        }
    }
    useEffect(() => {
        if (!userType) {
            return
        }
        if (userType === FRANCHISETYPE.FRANCHISE) {
            getAllFranchisesUsers({
                params: {
                    franchiseId: userInfo?.id,
                    userType: FRANCHISETYPE.DELIVERYAGENTS,
                    perPage,
                    page: searchQuery.page,
                    name: searchQuery.name
                },
            })
        }
        if (userType === FRANCHISETYPE.ADMIN) {
            getAllFranchisesUsers({
                params: {
                    userType: FRANCHISETYPE.DELIVERYAGENTS,
                    perPage,
                    page: searchQuery.page,
                    name: searchQuery.name
                }
            })
        }

    }, [userType, searchQuery]);


    return (
        <>
            <div className="d-flex justify-content-between pageTitleSpace">
                <PageTitle name="Users" pageItems={data?.totalFranchises || 0}></PageTitle>
                <Button variant="outline-primary" onClick={() => {
                    createBranch()
                }}><FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon> Add</Button>
            </div>
            <div className="usersPage">
                <Card className="h-100">
                    <div className='filters'>
                        <div>
                            <AppSearchBar searchFn={(searchKey) => {
                                setSearchQuery({
                                    ...searchQuery,
                                    page: 1,
                                    name: searchKey
                                })
                            }} placeholder="Search User" />
                        </div>
                    </div>
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
                                            <td className="tableItem primaryValue"><p className="primaryValue text-capitalize text-nowrap">{user.name}</p></td>
                                            <td className="tableItem"><p className="usersPage-id">{user?.primaryNumber}</p></td>
                                            {isAdmin(userType) && <td className="tableItem">
                                                <Form.Select aria-label="Order Transfer" onChange={(data) => {
                                                    updateUser(user.id, data?.target?.value)
                                                }} disabled={hasInProgress(user.id)}>
                                                    <option>Select Franchise</option>
                                                    {franchies && franchies?.franchises.map((branch: IBranch) => <option value={branch._id}
                                                        selected={user?.franchiseId?.franchiseId === branch._id}
                                                    >{branch?.name}</option>)}
                                                </Form.Select>
                                            </td>}
                                            <td className="tableItem"><p className="usersPage-id text-nowrap">{user?.address.city}, {user?.address.state}</p></td>
                                            <td className="align-middle" >
                                                <FontAwesomeIcon icon={faEdit} className="usersPage-actions usersPage-eye" onClick={() => {
                                                    navigation(`update/${user.id}`)
                                                }}></FontAwesomeIcon> <FontAwesomeIcon icon={faTrash} className="itemEdit deleteIcon" onClick={() => {
                                                    deleteModalData.current?.open(user)
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
                                setSearchQuery({
                                    ...searchQuery,
                                    page: value,
                                })
                            }} /></div>}
                    </Card.Body>
                </Card>
            </div>
            {<AppDeleteModal ref={deleteModalData} title="Do you want to delete this User?"
                accept={accept} />
            }
        </>)


}

export default UsersPage;