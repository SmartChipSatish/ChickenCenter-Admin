import { useEffect } from "react";
import { isBrannch } from "../../store/branchesSlice";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/esm/Form";
import Card from "react-bootstrap/esm/Card";
import './CreateBranchPage.scss'
import { Col, FloatingLabel, Row } from "react-bootstrap";
import { useCreateFranchisesMutation } from "../../store/branchesEndPoint";

const CreateBranchPage = () => {
    const [updateContact] = useCreateFranchisesMutation();
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const back = () => {
        dispatch(isBrannch(true));
        navigation('/branches')
    }
    const submit = () => {
        updateContact({
            "name": "Durgam Cheruvu",
            "createdBy": "664de740835b08b634646081",
            "updatedBy": "664de740835b08b634646081",
            "address": {
                "name": "Durgam Cheruvu, HYD"
            }
        })
    }

    return (<>
        <p className="pageTile pageTitleSpace">Create Branch</p>
        <Card className="createBranch">
            <Card.Body className="branchFrom">
                <Form>
                    <Row>
                        <Col>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Branch Name"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="Malasa" />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Phone"
                                className="mb-3"
                            >
                                <Form.Control type="number" placeholder="8121739901" />
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


                    <div className="d-flex justify-content-end">
                        <Button variant="outline-secondary" className="elementSpace" onClick={() => {
                            back()
                        }}>Cancel</Button>
                        <Button variant="outline-primary" onClick={() => {
                            submit()
                        }}>
                            Submit
                        </Button>
                    </div>

                </Form>
            </Card.Body>
        </Card>


    </>)
}

export default CreateBranchPage;