import { useNavigate } from "react-router-dom"


const Login = () => {
    const navigation = useNavigate();
    return (<><div>
        <button onClick={() => {
            navigation('/')
        }}>Login</button>
    </div></>)
}

export default Login