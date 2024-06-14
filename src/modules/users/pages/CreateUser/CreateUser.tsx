import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/esm/Form";
import Card from "react-bootstrap/esm/Card";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AppConstants, getItemFromLocalStorage } from "../../../../utils/localStorage";
import { errorToast, successToast } from "../../../../shared/utils/appToaster";
import { useCreateFranchisesOrUserMutation, useLazyGetFranchiseByIdQuery, useUpdateFranchiseMutation } from "../../../branches/store/branchesEndPoint";
import './CreateUser.scss'
import { FRANCHISETYPE } from "../../../../utils/interfaces/appInterfaces";
import { getErrorMessage } from "../../../inventory/Utils/appFuntions";
import { UserForm } from "../../utils/userInterfaces";
import { hasKey } from "../../../../utils/appFunctions";

const CreateUserPage = () => {
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        reset,
        formState: {touchedFields, errors }
    } = useForm<any>({});

    const [createUser, { isLoading }] = useCreateFranchisesOrUserMutation();
    const [getFranchiseById, { data, isLoading: getFranchiesLoading, isError }] = useLazyGetFranchiseByIdQuery();
    const [updateFranchise, { data: updateUser, isLoading: updateUserLoading, }] = useUpdateFranchiseMutation()
    const userInfo = useSelector((state: any) => state?.userInfoSlice?.userInfo);
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const inputRef = useRef<any>(null);
    const [imgUrl, SetImgUrl] = useState('https://as2.ftcdn.net/v2/jpg/02/41/38/73/1000_F_241387314_Sr3d8fVbXw0tWHQvZlKvbwY5YnEDC91V.jpg')
    const back = () => {
        navigation('/users')
    }
    const submit = async (data: any) => {
        try {

            let user: any = {
                name: data.name,
                userName: data.userName,
                password: data.password,
                primaryNumber: data.primaryNumber,
                createdBy: getItemFromLocalStorage(AppConstants.userId),
                updatedBy: getItemFromLocalStorage(AppConstants.userId),
                address: {
                    name: data.name,
                    houseNo: data.houseNo,
                    streetName: data.streetName,
                    city: data.city,
                    pincode: data.pincode,
                    landmark: data.landmark,
                    state: data.state,
                },
                userType: FRANCHISETYPE.DELIVERYAGENTS,
            }

            if (userInfo?.userType === FRANCHISETYPE.FRANCHISE) {
                user = await {
                    ...user,
                    franchiseId: userInfo?.id
                }
            }
            if (id) {
                const branchUpdate = await updateFranchise({
                    params: {
                        userId: id,
                        userType: FRANCHISETYPE.DELIVERYAGENTS,
                    },
                    body: user
                });
                successToast('User Updated Successfully');
            } else {
                const branchCreaete = await createUser(user);
                successToast('User Create Successfully');
            }

            back();
        } catch (e) {
            console.log('e', e)
            errorToast('Something went wrong1')
        }

    }

    useEffect(() => {
        if (id) {
            getFranchiseById({
                params: {
                    franchiseId: id,
                    userType: FRANCHISETYPE.DELIVERYAGENTS,
                }
            })
        }
    }, [id])

    useEffect(() => {
        console.log('Test', data)
        if (data) {
            const userData = {
                [UserForm.Name]: data.name,
                [UserForm.UserName]: data.userName,
                [UserForm.PrimaryNumber]: data.primaryNumber,
                [UserForm.Password]: data.password,
                [UserForm.HouseNo]: data?.address?.houseNo,
                [UserForm.City]: data?.address?.city,
                [UserForm.Pincode]: data?.address?.pincode,
                [UserForm.Landmark]: data?.address?.landmark,
                [UserForm.StreetName]: data?.address?.streetName,
                [UserForm.State]: data?.address?.state,
            }
            reset(userData)
        }
    }, [data])
    // const selectFile = () => {
    //     if (inputRef?.current) {
    //         inputRef.current?.click()
    //     }
    // }

    // const fileChange = (event: any) => {
    //     if (event.target.files && event.target.files[0]) {
    //         SetImgUrl(URL.createObjectURL(event.target.files[0]));
    //         inputRef.current.target.files = '';
    //     }
    // }

    return (<>
        <p className="pageTile pageTitleSpace">{id ? 'Update User' : 'Create User'}</p>
        <Card className="createUser">
            <Card.Body className="userFrom">
                <Form onSubmit={handleSubmit(submit)}>
                    {/* <Row>
                        <Col className="img d-flex justify-content-center">
                            <div className="h-100 position-relative imgWidth imgContainer">
                                <Image className="h-100 imgWidth" src={imgUrl} roundedCircle />
                                <FontAwesomeIcon icon={faEdit} className="editIcon" onClick={() => {
                                    // selectFile();
                                }}></FontAwesomeIcon>
                                <input type="file" ref={inputRef} className="fileselection" onChange={(e) => fileChange(e)}></input>
                            </div>

                        </Col>
                    </Row> */}
                    <Row>
                        <Col>
                            <Form.Label className="fromLabel" >Name</Form.Label>
                            <Form.Control type="text" placeholder="Name"
                                {...register(UserForm.Name, { required: true })} />
                            {errors?.name && hasKey(touchedFields, UserForm.Name)
                                && <p className="errorlabel">{getErrorMessage('Name', errors.name.type)}</p>}
                        </Col>
                        <Col>
                            <Form.Label className="fromLabel" >Phone</Form.Label>
                            <Form.Control type="number" placeholder="Phone" minLength={10} maxLength={10}
                                {...register(UserForm.PrimaryNumber, { required: true })} />
                            {errors?.primaryNumber && hasKey(touchedFields, UserForm.PrimaryNumber)
                                && <p className="errorlabel">{getErrorMessage('Name', errors.primaryNumber.type)}</p>}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Label className="fromLabel" >UserName</Form.Label>
                            <Form.Control type="text" placeholder="UserName" minLength={5} maxLength={20}
                                {...register(UserForm.UserName, { required: true })} />
                            {errors?.userName && hasKey(touchedFields, UserForm.UserName)
                                && <p className="errorlabel">{getErrorMessage('User Name', errors.userName.type)}</p>}
                        </Col>
                        <Col>
                            <Form.Label className="fromLabel" >Password</Form.Label>
                            <Form.Control type="password" placeholder="password" minLength={5} maxLength={10}
                                {...register(UserForm.Password, { required: true })} />
                            {errors?.password && hasKey(touchedFields, UserForm.Password)
                                && <p className="errorlabel">{getErrorMessage('Password', errors.password.type)}</p>}
                        </Col>
                    </Row>

                    <div>
                        <p className="address">Address</p>
                        <Row>
                            <Col>

                                <Form.Label className="fromLabel" >House No</Form.Label>
                                <Form.Control type="text" placeholder="House No" maxLength={20}
                                    {...register(UserForm.HouseNo, { required: true })} />
                                {errors?.houseNo && hasKey(touchedFields, UserForm.HouseNo)
                                    && <p className="errorlabel">{getErrorMessage('House No', errors.houseNo.type)}</p>}
                            </Col>
                            <Col>

                                <Form.Label className="fromLabel" >Street Name</Form.Label>
                                <Form.Control type="text" placeholder="Street" maxLength={100}
                                    {...register(UserForm.StreetName, { required: true })} />
                                {errors?.streetName && hasKey(touchedFields, UserForm.StreetName)
                                    && <p className="errorlabel">{getErrorMessage('Street Name', errors.streetName.type)}</p>}
                            </Col>

                        </Row>
                        <Row>
                            <Col>

                                <Form.Label className="fromLabel" >City</Form.Label>
                                <Form.Control type="text" placeholder="City" maxLength={20}
                                    {...register(UserForm.City, { required: true })} />
                                {errors?.city && hasKey(touchedFields, UserForm.City)
                                    && <p className="errorlabel">{getErrorMessage('City', errors.city.type)}</p>}

                            </Col>
                            <Col>

                                <Form.Label className="fromLabel" >Landmark</Form.Label>
                                <Form.Control type="text" placeholder="Landmark" maxLength={50}
                                    {...register(UserForm.Landmark, { required: true })} />
                                {errors?.landmark && hasKey(touchedFields, UserForm.Landmark)
                                    && <p className="errorlabel">{getErrorMessage('Landmark', errors.landmark.type)}</p>}
                            </Col>

                        </Row>
                        <Row>
                            <Col>

                                <Form.Label className="fromLabel" >Pincode</Form.Label>
                                <Form.Control type="number" placeholder="Pincode" minLength={6} maxLength={6}
                                    {...register(UserForm.Pincode, { required: true })} />
                                {errors?.pincode && hasKey(touchedFields, UserForm.Landmark)
                                    && <p className="errorlabel">{getErrorMessage('Pincode', errors.pincode.type)}</p>}
                            </Col>
                            <Col>
                                <Col>

                                    <Form.Label className="fromLabel" >State</Form.Label>
                                    <Form.Control type="text" placeholder="State" minLength={2} maxLength={50}
                                        {...register(UserForm.State, { required: true, minLength: 2, maxLength: 50 })} />
                                    {errors?.state && hasKey(touchedFields, UserForm.State)
                                        && <p className="errorlabel">{getErrorMessage('State', errors.state.type)}</p>}
                                </Col>
                            </Col>

                        </Row>
                    </div>


                    <div className="d-flex justify-content-end submitbtns">
                        <Button variant="outline-secondary" className="elementSpace" onClick={() => {
                            back()
                        }}>Cancel</Button>
                        <Button variant="outline-primary" type="submit" disabled={isLoading || updateUserLoading}>
                            {id ? 'Update' : 'Create'}
                        </Button>
                    </div>

                </Form>
            </Card.Body>
        </Card>


    </>)
}

export default CreateUserPage;