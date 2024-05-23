import { useNavigate } from "react-router-dom"
import Form from "react-bootstrap/esm/Form";
import './Login.scss'
import Button from "react-bootstrap/esm/Button";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
const Login = () => {
    const navigation = useNavigate();
    return (<>
        <section className="bg-light py-3 py-md-5 login">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="card border border-light-subtle rounded-3 shadow-sm">
                            <div className="card-body p-3 p-md-4 p-xl-5">
                                <div className="text-center mb-3">
                                    <a href="#!">
                                        <img className="logo" src="https://t4.ftcdn.net/jpg/00/90/04/07/360_F_90040768_uax340ASN3Ewca0N42f3EQHCkP2hdQlO.jpg" alt="BootstrapBrain Logo" width="175" height="57" />
                                    </a>
                                </div>
                                <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Sign in to your account</h2>
                                {/* <form action="#!"> */}
                                <Form>
                                    {/* <div className="row gy-2 overflow-hidden"> */}
                                        {/* <div className="col-12">
                                            
                                        </div> */}
                                        {/* <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input type="password" className="form-control" name="password" id="password" value="" placeholder="Password" required />
                                                <label for="password" className="form-label">Password</label>
                                            </div>
                                        </div> */}
                                        <FloatingLabel
                                                controlId="floatingInput"
                                                label="User Name"
                                                className="mb-3"
                                            >
                                                <Form.Control type="text" placeholder="User Name" />
                                            </FloatingLabel>
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="Password"
                                                className="mb-3"
                                            >
                                                <Form.Control type="password" placeholder="Password" />
                                            </FloatingLabel>


                                        <div className="col-12">
                                            <div className="d-grid my-3">
                                                <Button variant="outline-primary" className="loginButton" onClick={() => {
                                                    navigation('/dashboard')
                                                }}>
                                                    Log in
                                                </Button>
                                                {/* <button className="btn btn-primary btn-lg" type="submit">Log in</button> */}
                                            </div>
                                        </div>
                                </Form>

                                {/* <div className="col-12">
                          <p className="m-0 text-secondary text-center">Don't have an account? <a href="#!" className="link-primary text-decoration-none">Sign up</a></p>
                        </div> */}
                            {/* </div> */}
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section ></>)


}

export default Login