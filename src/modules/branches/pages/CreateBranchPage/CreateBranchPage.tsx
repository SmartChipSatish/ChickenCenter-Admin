import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/esm/Form";
import Card from "react-bootstrap/esm/Card";
import './CreateBranchPage.scss'
import { Col, Row } from "react-bootstrap";
import { useCreateFranchisesOrUserMutation } from "../../store/branchesEndPoint";
import { useForm } from "react-hook-form";
import { AppConstants, getItemFromLocalStorage } from "../../../../utils/localStorage";
import { errorToast, successToast } from "../../../../shared/utils/appToaster";
import { getErrorMessage } from "../../../inventory/Utils/appFuntions";
import { hasKey } from "../../../../utils/appFunctions";
import { BranchFields } from "../../utils/BranchesInterfaces";

const CreateBranchPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { defaultValues, errors, isDirty, dirtyFields, touchedFields },
    } = useForm<any>({});

    const [createBranch, { isLoading }] = useCreateFranchisesOrUserMutation();
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const inputRef = useRef<any>(null);
    const [imgUrl, SetImgUrl] = useState('https://as2.ftcdn.net/v2/jpg/02/41/38/73/1000_F_241387314_Sr3d8fVbXw0tWHQvZlKvbwY5YnEDC91V.jpg')
    const back = () => {
        navigation('/branches')
    }
    const submit = async (data: any) => {
        try {
            const newBranchObj = {
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
                }
            }
            const branchCreaete = await createBranch(newBranchObj);
            successToast('Franchises Create Successfully');
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
    console.log('isDirty, dirtyFields', isDirty, dirtyFields, touchedFields)

    return (<>
        <p className="pageTile pageTitleSpace">Create Franchises</p>
        <Card className="createBranch">
            <Card.Body className="branchFrom">
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
                            <Form.Label className="fromLabel" >Franchises Name</Form.Label>
                            <Form.Control type="text" placeholder="Franchise Name" minLength={5} maxLength={20} {...register(BranchFields.Name, { required: true })} />
                            {(errors?.name && hasKey(touchedFields, BranchFields.Name))
                                && <p className="errorlabel">{getErrorMessage('Franchises Name', errors.name.type! as string)}</p>}
                        </Col>
                        <Col>
                            <Form.Label className="fromLabel" >Phone</Form.Label>
                            <Form.Control type="number" placeholder="Phone" minLength={10} maxLength={10} {...register(BranchFields.PrimaryNumber, { required: true })} />
                            {(errors?.primaryNumber && hasKey(touchedFields, BranchFields.PrimaryNumber))
                                && <p className="errorlabel">{getErrorMessage('Phone Number', errors.primaryNumber.type! as string)}</p>}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Label className="fromLabel" >User Name</Form.Label>
                            <Form.Control type="text" placeholder="User name" minLength={5} maxLength={20} {...register(BranchFields.UserName, { required: true })} />
                            {errors?.userName && hasKey(touchedFields, BranchFields.UserName)&& <p className="errorlabel">{getErrorMessage('userName', errors.userName.type! as string)}</p>}

                        </Col>
                        <Col>
                            <Form.Label className="fromLabel" >Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" minLength={5} maxLength={10} {...register(BranchFields.Password, { required: true })} />
                            {errors?.password && hasKey(touchedFields, BranchFields.Password)&& <p className="errorlabel">{getErrorMessage('Password', errors.password.type! as string)}</p>}
                        </Col>
                    </Row>

                    <div>
                        <p className="address">Address</p>
                        <Row>
                            <Col>

                                <Form.Label className="fromLabel" >House No</Form.Label>
                                <Form.Control type="text" placeholder="House No" maxLength={20}  {...register(BranchFields.HouseNo, { required: true })} />
                                {errors?.houseNo && hasKey(touchedFields, BranchFields.HouseNo) && <p className="errorlabel">{getErrorMessage('House No', errors.houseNo.type! as string)}</p>}

                            </Col>
                            <Col>

                                <Form.Label className="fromLabel" >Street Name</Form.Label>
                                <Form.Control type="text" placeholder="Street" maxLength={100} {...register(BranchFields.StreetName, { required: true })} />
                                {errors?.streetName && hasKey(touchedFields, BranchFields.StreetName) && <p className="errorlabel">{getErrorMessage('Street Name', errors.streetName.type! as string)}</p>}
                            </Col>

                        </Row>
                        <Row>
                            <Col>

                                <Form.Label className="fromLabel" >City</Form.Label>
                                <Form.Control type="text" placeholder="City" maxLength={20} {...register(BranchFields.City, { required: true })} />
                                {errors?.city && hasKey(touchedFields, BranchFields.City) && <p className="errorlabel">{getErrorMessage('City', errors.city.type! as string)}</p>}

                            </Col>
                            <Col>

                                <Form.Label className="fromLabel" >Landmark</Form.Label>
                                <Form.Control type="text" placeholder="Landmark" maxLength={50} {...register(BranchFields.Landmark, { required: true })} />
                                {errors?.landmark  && hasKey(touchedFields, BranchFields.Landmark) && <p className="errorlabel">{getErrorMessage('Landmark', errors.landmark.type! as string)}</p>}
                            </Col>

                        </Row>
                        <Row>
                            <Col>

                                <Form.Label className="fromLabel" >Pincode</Form.Label>
                                <Form.Control type="number" placeholder="Pincode" minLength={6} maxLength={6} {...register(BranchFields.Pincode, { required: true })} />
                                {errors?.pincode && hasKey(touchedFields, BranchFields.Pincode) && <p className="errorlabel">{getErrorMessage('Pincode', errors.pincode.type! as string)}</p>}

                            </Col>
                            <Col>
                                <Col>

                                    <Form.Label className="fromLabel" >State</Form.Label>
                                    <Form.Control type="text" placeholder="State" minLength={2} maxLength={50} {...register(BranchFields.State, { required: true })} />
                                    {errors?.state && hasKey(touchedFields, BranchFields.State) && <p className="errorlabel">{getErrorMessage('Pincode', errors.state.type! as string)}</p>}
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

export default CreateBranchPage;