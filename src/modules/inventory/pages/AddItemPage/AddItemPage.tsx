import { Image } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import '../AddItemPage/AdditmePage.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


const AddItemPage = () => {
    const inputRef = useRef<any>(null);
    const [imgUrl, SetImgUrl] = useState('https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=')
    const navigate = useNavigate();

    const selectFile = () => {
        if (inputRef?.current) {
            inputRef.current?.click()
        }
    }

    const fileChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            SetImgUrl(URL.createObjectURL(event.target.files[0]));
            inputRef.current.target.files = '';
        }
    }


    return (<>
        <p className="pageTile pageTitleSpace">Add Item</p>
        <div className="addItemPage">
            <Card>
                <Card.Body >
                    <Form>
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
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Item Name"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" placeholder="51-2-37" />
                                    </FloatingLabel>
                                </Col>


                            </Row>
                            <Row>
                                <Col>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Price"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" placeholder="Price" />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <Form.Select aria-label="Default select example">
                                        <option>Quantity</option>
                                        <option value="2Kg">2KG</option>
                                        <option value="1Kg">1KG</option>
                                        <option value="500grams">500 Grams</option>

                                    </Form.Select>
                                </Col>

                            </Row>
                            <Row>

                                <Col>
                                    <Form.Select aria-label="Default select example">
                                        <option>Part Type</option>
                                        <option value="Leg Piece">Leg Piece</option>
                                        <option value="Wings">Wings</option>
                                        <option value="liver">Liver</option>
                                        <option value="Boneless">Boneless</option>
                                        <option value="withBone">With Bone</option>
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Form.Select aria-label="Default select example">
                                        <option>Meat Type</option>
                                        <option value="Chicken">Chicken</option>
                                        <option value="Mutton">Mutton</option>
                                        <option value="Eggs">Eggs</option>
                                    </Form.Select>
                                </Col>


                            </Row>
                            <div className="d-flex justify-content-end actionbtn">
                                <Button variant="outline-secondary" className="elementSpace" onClick={() => {
                                    navigate('/inventory')
                                }}>Cancel</Button>
                                <Button variant="outline-primary" onClick={() => {
                                    navigate('/inventory')
                                }}>
                                    Add
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