import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "react-bootstrap/esm/Button"
import { Outlet, useNavigate } from "react-router-dom"
import './inventoryLayout.scss';

const InventoryLayOut = () => {
    const navigation = useNavigate();
    const addItem = () => {
        navigation('addItem');
    }
    return (<>
        <Outlet></Outlet>
    </>)
}

export default InventoryLayOut