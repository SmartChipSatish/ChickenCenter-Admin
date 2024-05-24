// const MyProfilePage = () => {
//     return (<>
//         my Profile
//     </>)
// }

// export default MyProfilePage;
import { Image } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './MyProfile.scss'


const MyProfilePage = () => {
    const inputRef = useRef<any>(null);
    const [imgUrl, SetImgUrl] = useState('https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250')
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
        <p className="pageTile pageTitleSpace">My Account</p>
        <div className="myProfile">
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
                                        label="First Name"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" placeholder="51-2-37" />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Last Name"
                                        className="mb-3"
                                    >
                                        <Form.Control type="Email" placeholder="Email" />
                                    </FloatingLabel>
                                </Col>

                            </Row>
                            <Row>
                                <Col>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Email"
                                        className="mb-3"
                                    >
                                        <Form.Control type="Email" placeholder="Email" />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Phone"
                                        className="mb-3"
                                    >
                                        <Form.Control type="phone" placeholder="Phone" />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <div>
                                <p className="address">Address</p>
                                <Row>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Door No"
                                            className="mb-3"
                                        >
                                            <Form.Control type="text" placeholder="51-2-37" />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Street"
                                            className="mb-3"
                                        >
                                            <Form.Control type="text" placeholder="enter street" />
                                        </FloatingLabel>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="City"
                                            className="mb-3"
                                        >
                                            <Form.Control type="text" placeholder="City" />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="State"
                                            className="mb-3"
                                        >
                                            <Form.Control type="text" placeholder="State" />
                                        </FloatingLabel>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Pin Code"
                                            className="mb-3"
                                        >
                                            <Form.Control type="text" placeholder="City" />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>

                                    </Col>

                                </Row>
                            </div>

                            <div className="d-flex justify-content-end actionbtn">
                                <Button variant="outline-secondary" className="elementSpace" onClick={() => {
                                    navigate('/dashboard')
                                }}>Cancel</Button>
                                <Button variant="outline-primary" onClick={() => {
                                    navigate('/dashboard')
                                }}>
                                    Update
                                </Button>
                            </div>
                        </div>




                    </Form>
                </Card.Body>
            </Card>

        </div>


    </>)
}

export default MyProfilePage;