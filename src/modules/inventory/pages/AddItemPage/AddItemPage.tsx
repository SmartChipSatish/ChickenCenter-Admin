import { Image } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import '../AddItemPage/AdditmePage.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateItemMutation, useLazyGetItemByIdQuery, useUpdateItemMutation } from "../../store/InventoryEndPoint";
import { useForm } from "react-hook-form";
import { AddItem } from "../../Utils/InventoryInterfaces";
import { getErrorMessage } from "../../Utils/appFuntions";
import { successToast } from "../../../../shared/utils/appToaster";
import { fileUpload } from "../../../../shared/utils/appFunctions";
import { getItemFromLocalStorage } from "../../../../utils/localStorage";


const AddItemPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { defaultValues, errors },
    } = useForm<AddItem>({});

    const [createItem, { isLoading }] = useCreateItemMutation();
    const [updateItem, { isError: updateError, isLoading: updateLoading }] = useUpdateItemMutation();
    const [getItemById, { isError: getItemError, isLoading: getItemLoading, data: getItemData }] = useLazyGetItemByIdQuery();
    const navigate = useNavigate();
    const { id } = useParams()
    const inputRef = useRef<any>(null);
    const [selectedFile, SetSelectedFile] = useState<File | null>(null);
    const [imgUrl, SetImgUrl] = useState('https://as2.ftcdn.net/v2/jpg/02/41/38/73/1000_F_241387314_Sr3d8fVbXw0tWHQvZlKvbwY5YnEDC91V.jpg')

    const selectFile = () => {
        if (inputRef?.current) {
            inputRef.current?.click()
        }
    }

    const fileChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            SetImgUrl(URL.createObjectURL(event.target.files[0]));
            SetSelectedFile(event.target.files[0])
            inputRef.current.target.files = '';
        }
    }

    const addUpdateItemPage = async (data: AddItem) => {
        try {
            let fileUrl = ''
            if (selectedFile) {
                fileUrl = await fileUpload(selectedFile) as string;
            }

            const item = Object.assign(data, {
                createdBy: getItemFromLocalStorage('userId'),
                updatedBy: getItemFromLocalStorage('userId'),
                imageUrl: fileUrl || imgUrl,
                globalItemStatus: defaultValues?.globalItemStatus ? true : false,
            });

            if (id) {
                await updateItem(item);
                successToast('Item Updated Succesfully');
                navigate('/inventory')
                return
            }

            const itemAdded = await createItem(item);
            if (itemAdded?.data) {
                successToast('Item Added Succesfully');
                navigate('/inventory')
            }
        } catch (e) {
            successToast('Something went wrong!')
        }
    }


    useEffect(() => {

        const getItemDetails = async () => {
            try {
                const itemDetails: any = await getItemById(id!);
                reset(itemDetails.data)
                SetImgUrl(itemDetails?.data?.imageUrl || imgUrl)
            } catch (e) {
                successToast('Something went wrong!')
            }
        }
        if (id) {
            getItemDetails()
        }

    }, [id])


    useEffect(() => { }, [updateError, updateLoading]);
    useEffect(() => { }, [getItemError, getItemLoading, getItemData])
    useEffect(() => {
    }, [defaultValues])

    return (<>
        <p className="pageTile pageTitleSpace">{!id ? 'Add Item' : 'Update Item'}</p>
        <div className="addItemPage">
            <Card>
                <Card.Body >
                    <Form onSubmit={handleSubmit(addUpdateItemPage)}>
                        <Row>
                            <Col className="img d-flex justify-content-center">
                                <div className="h-100 position-relative imgWidth imgContainer">
                                    <Image className="h-100 imgWidth" src={imgUrl} roundedCircle />
                                    <FontAwesomeIcon icon={faEdit} className="editIcon" onClick={() => {
                                        selectFile();
                                    }}></FontAwesomeIcon>
                                    <input type="file" ref={inputRef} className="fileselection" onChange={(e) => fileChange(e)}></input>
                                </div>

                            </Col>
                        </Row>

                        <div className="itemDetails">
                            <Row>
                                <Col>
                                    <Form.Label className="fromLabel" >Item Name</Form.Label>
                                    <Form.Control type="text" placeholder="Item Name" {...register("itemName", { required: true })} />
                                    {errors?.itemName && <p className="errorlabel">{getErrorMessage('Item Name', errors?.itemName.type)}</p>}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label className="fromLabel">Price</Form.Label>
                                    <Form.Control type="text" placeholder="Price" maxLength={5} {...register("itemPrice", {
                                        required: true,
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: "Entered value does not match email format"
                                        },
                                    })} />
                                    {errors?.itemPrice && <p className="errorlabel">{getErrorMessage('Item Price', errors?.itemPrice.type)}</p>}
                                </Col>
                                <Col>
                                    <Form.Label className="fromLabel">Quantity</Form.Label>
                                    <Form.Select aria-label="Default select example" {...register("itemQty", { required: true })}>
                                        <option value="2Kg">2KG</option>
                                        <option value="1Kg">1KG</option>
                                        <option value="500 gms">500 Grams</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label className="fromLabel">Type</Form.Label>
                                    <Form.Select aria-label="Default select example" {...register("itemType", { required: true })}>
                                        <option value="Leg Piece">Leg Piece</option>
                                        <option value="Wings">Wings</option>
                                        <option value="liver">Liver</option>
                                        <option value="Boneless">Boneless</option>
                                        <option value="withBone">With Bone</option>
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Form.Label className="fromLabel">Meat Type</Form.Label>
                                    <Form.Select aria-label="Default select example" {...register("meatType", { required: true })}>
                                        <option value="Chicken">Chicken</option>
                                        <option value="Mutton">Mutton</option>
                                        <option value="Eggs">Eggs</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label className="fromLabel">Availability</Form.Label>
                                    <br></br>
                                    <Form.Check
                                        inline
                                        label="Available"
                                        type={'radio'}
                                        id={`inline-${'radio'}-1`}
                                        {...register("globalItemStatus", { required: true })}
                                        value="1"
                                        checked={!defaultValues || defaultValues.globalItemStatus === true}
                                        onChange={() => {
                                            if (defaultValues) {
                                                reset({ ...defaultValues, globalItemStatus: true })
                                            } else {
                                                reset({ globalItemStatus: true })
                                            }
                                        }}
                                    />
                                    <Form.Check
                                        inline
                                        label="Out of stock"
                                        type={'radio'}
                                        id={`inline-${'radio'}-2`}
                                        {...register("globalItemStatus", { required: true })}
                                        value="0"
                                        checked={defaultValues?.globalItemStatus === false}
                                        onChange={() => {
                                            if (defaultValues) {
                                                reset({ ...defaultValues, globalItemStatus: false })
                                            } else {
                                                reset({ globalItemStatus: false })
                                            }

                                            console.log('change2')
                                        }}
                                    />
                                    {/* <div className="form-check">
                                        <input className="form-check-input" type="radio" id="flexRadioDefault1"  {...register("globalItemStatus", { required: true })}/>
                                            <label className="form-check-label" for="flexRadioDefault1">
                                                Default radio
                                            </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio"  {...register("globalItemStatus", { required: true })} id="flexRadioDefault2" checked />
                                            <label className="form-check-label" for="flexRadioDefault2">
                                                Default checked radio
                                            </label>
                                    </div> */}
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-end actionbtn">
                                <Button variant="outline-secondary" className="elementSpace" onClick={() => {
                                    navigate('/inventory')
                                }}>Cancel</Button>
                                <Button variant="outline-primary" type="submit" disabled={isLoading} onClick={() => {
                                }}>
                                    {!id ? 'Add' : 'Update'}
                                </Button>
                            </div>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    </>)
}

export default AddItemPage;