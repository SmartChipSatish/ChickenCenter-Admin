import { useLocation, useNavigate } from "react-router-dom";
import './Sidebar.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faHouse, faStore } from "@fortawesome/free-solid-svg-icons";
import { faFirstOrder } from "@fortawesome/free-brands-svg-icons";
import { useCallback, useEffect } from "react";


const SideBar = () => {
    const navigation = useNavigate();
    const location = useLocation();


    const isActivePath = useCallback((path: string) => {
        return location?.pathname.includes(path) ? 'module-active' : '';
    }, [location.pathname])

    return <>
        <div className="appSidebar text-white h-100">
            <div>
                <p className={`module ${isActivePath('dashboard')}`} onClick={() => {
                    navigation('dashboard')
                }}><FontAwesomeIcon icon={faHouse} className="module-appIcon" />DashBoard</p>
                <p className={`module ${isActivePath('orders')}`} onClick={() => {
                    navigation('orders')
                }}> <FontAwesomeIcon icon={faFirstOrder} className="module-appIcon" /> Orders</p>
                <p className={`module ${isActivePath('branches')}`} onClick={() => {
                    navigation('branches')
                }}><FontAwesomeIcon icon={faBuilding} className="module-appIcon" /> Branches</p>
                <p className={`module ${isActivePath('inventory')}`} onClick={() => {
                    navigation('inventory')
                    // 
                }}><FontAwesomeIcon icon={faStore} className="module-appIcon" />Inventory</p>
                {/* <p className="module" onClick={() => {
                    navigation('users')
                }}><FontAwesomeIcon icon={faUser} className="module-appIcon" /> Users</p>
                <p className="module" onClick={() => {
                    navigation('payment')
                }}><FontAwesomeIcon icon={faCreditCard} className="module-appIcon" /> Payment</p>
                <p className="module" onClick={() => {
                    navigation('payment')
                }}><FontAwesomeIcon icon={faCogs} className="module-appIcon" /> Settings</p> */}
            </div>
            <div>
                <p className="appVersion">App Version 0.0.1</p>
            </div>

        </div>


    </>
}

export default SideBar;