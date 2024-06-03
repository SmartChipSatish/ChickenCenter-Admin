import { useNavigate } from "react-router-dom"
import Form from "react-bootstrap/esm/Form";
import './Login.scss'
import Button from "react-bootstrap/esm/Button";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import { useLazyGetUserQuery, useLoginMutation } from "../../store/authenticateEndPoints";
import { useForm } from "react-hook-form";
import { errorToast, successToast } from "../../../../shared/utils/appToaster";
import { AppConstants, setItemToLocalStorage } from "../../../../utils/localStorage";
import { useDispatch } from "react-redux";
import { adduserInfo } from "../../store/userInfoSlice";
import Spinner from "react-bootstrap/esm/Spinner";
import { OrderStatus } from "../../../../shared/components/OrderStatusComponet/OrderStatusComponent";

const Login = () => {
    const {
        register,
        handleSubmit,
    } = useForm<any>({});
    const [login, { isLoading, }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const authenticate = async (data: any) => {
        try {
            const loginUser = await login(data);
            if (loginUser?.error) {
                errorToast('Please enter valid credentials')
                return
            }
            successToast(loginUser?.data?.message || 'Logged in succesfully');
            dispatch(adduserInfo(loginUser.data.userInfo));
            setItemToLocalStorage(AppConstants.userId, loginUser.data.userInfo.id);
            setItemToLocalStorage(AppConstants.userInfo, loginUser.data.userInfo);
            setItemToLocalStorage(AppConstants.accessToken, loginUser?.data?.accessToken);
            navigation('/dashboard')
        } catch (e) {
            errorToast('something went wrong, try again!')
        }
    }

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
                                {/* <OrderStatus label="Pending" status="OrderPending" />
                                <OrderStatus label="Delivered" status="Success" /> */}
                                {/* OrederCompleted <form action="#!"> */}
                                <Form onSubmit={handleSubmit(authenticate)}>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="User Name"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" placeholder="User Name"  {...register("userName", { required: true })} />
                                    </FloatingLabel>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Password"
                                        className="mb-3"
                                    >
                                        <Form.Control type="password" placeholder="Password"  {...register("password", { required: true })} />
                                    </FloatingLabel>


                                    <div className="col-12">
                                        <div className="d-grid my-3">
                                            <Button variant="outline-primary" className="loginButton" disabled={isLoading} type="submit">
                                             { isLoading && <Spinner animation="border" className="me-2" /> }  Log in
                                            </Button>
                                        </div>
                                    </div>
                                </Form>

                                <div className="col-12">
                                    <p className="m-0 text-secondary text-center">Don't have an account? <a href="#!" className="text-decoration-none register">Sign up</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section ></>)


}

export default Login