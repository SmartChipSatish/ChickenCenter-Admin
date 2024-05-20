import { useNavigate } from "react-router-dom";


const SideBar = () => {
    const navigation = useNavigate();
    return <>
        <div className="bg-primary text-white">
            <p onClick={() => {
                navigation('orders')
            }}>Orders</p>
            <p onClick={() => {
                navigation('payment')
            }}>Payment</p>
        </div>


    </>
}

export default SideBar;