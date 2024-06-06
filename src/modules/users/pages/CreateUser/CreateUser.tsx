import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/esm/Form";
import Card from "react-bootstrap/esm/Card";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AppConstants, getItemFromLocalStorage } from "../../../../utils/localStorage";
import { errorToast, successToast } from "../../../../shared/utils/appToaster";
import { useCreateFranchisesOrUserMutation } from "../../../branches/store/branchesEndPoint";
import './CreateUser.scss'
import { FRANCHISETYPE } from "../../../../utils/interfaces/appInterfaces";

const CreateUserPage = () => {
    const {
        register,
        handleSubmit,
    } = useForm<any>({});

    const [createUser, { isLoading }] = useCreateFranchisesOrUserMutation();
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
            let user:any = {
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
            const branchCreaete = await createUser(user);
            successToast('User Create Successfully');
            back();
        } catch (e) {
            console.log('e', e)
            errorToast('Something went wrong1')
        }

    }
    
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
        <p className="pageTile pageTitleSpace">Create User</p>
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
                            <Form.Control type="text" placeholder="Malasa" {...register("name", { required: true })} />
                        </Col>
                        <Col>
                            <Form.Label className="fromLabel" >Phone</Form.Label>
                            <Form.Control type="number" placeholder="Phone" minLength={10} maxLength={10} {...register("primaryNumber", { required: true })} />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Label className="fromLabel" >User Name</Form.Label>
                            <Form.Control type="text" placeholder="User name" minLength={5} maxLength={20} {...register("userName", { required: true })} />
                        </Col>
                        <Col>
                            <Form.Label className="fromLabel" >Password</Form.Label>
                            <Form.Control type="password" minLength={5} maxLength={10} {...register("password", { required: true })} />
                        </Col>
                    </Row>

                    <div>
                        <p className="address">Address</p>
                        <Row>
                            <Col>

                                <Form.Label className="fromLabel" >House No</Form.Label>
                                <Form.Control type="text" placeholder="House No" maxLength={20}  {...register("houseNo", { required: true })} />

                            </Col>
                            <Col>

                                <Form.Label className="fromLabel" >Street Name</Form.Label>
                                <Form.Control type="text" placeholder="Street" maxLength={100} {...register("streetName", { required: true })} />

                            </Col>

                        </Row>
                        <Row>
                            <Col>

                                <Form.Label className="fromLabel" >City</Form.Label>
                                <Form.Control type="text" placeholder="City" maxLength={20} {...register("city", { required: true })} />

                            </Col>
                            <Col>

                                <Form.Label className="fromLabel" >Landmark</Form.Label>
                                <Form.Control type="text" placeholder="Landmark" maxLength={50} {...register("landmark", { required: true })} />

                            </Col>

                        </Row>
                        <Row>
                            <Col>

                                <Form.Label className="fromLabel" >Pincode</Form.Label>
                                <Form.Control type="number" placeholder="Pincode" minLength={6} maxLength={6} {...register("pincode", { required: true })} />

                            </Col>
                            <Col>
                                <Col>

                                    <Form.Label className="fromLabel" >State</Form.Label>
                                    <Form.Control type="text" placeholder="State" minLength={2} maxLength={50} {...register("state", { required: true })} />

                                </Col>
                            </Col>

                        </Row>
                    </div>


                    <div className="d-flex justify-content-end submitbtns">
                        <Button variant="outline-secondary" className="elementSpace" onClick={() => {
                            back()
                        }}>Cancel</Button>
                        <Button variant="outline-primary" type="submit" disabled={isLoading}>
                            Create
                        </Button>
                    </div>

                </Form>
            </Card.Body>
        </Card>


    </>)
}

export default CreateUserPage;