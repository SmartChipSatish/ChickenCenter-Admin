import { useLocation, useNavigate } from "react-router-dom";
import './Sidebar.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faCartPlus, faHouse, faStore } from "@fortawesome/free-solid-svg-icons";
import { faFirstOrder } from "@fortawesome/free-brands-svg-icons";
import { useCallback, useEffect } from "react";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Tooltip from "react-bootstrap/esm/Tooltip";

const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
        Simple tooltip
    </Tooltip>
);
const SideBar = () => {
    const navigation = useNavigate();
    const location = useLocation();


    const isActivePath = useCallback((path: string) => {
        return location?.pathname.includes(path) ? 'module-active' : '';
    }, [location.pathname])

    return <>
        <div className="appSidebar text-white h-100">
            <div>
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={(props) => {
                        return <Tooltip id="button-tooltip" {...props}>
                            Dashboard
                        </Tooltip>
                    }}
                >
                    <p className={`module ${isActivePath('dashboard')}`} onClick={() => {
                        navigation('dashboard')
                    }}><FontAwesomeIcon icon={faHouse} className="module-appIcon" /></p>
                </OverlayTrigger>

                <p className={`module ${isActivePath('orders')}`} onClick={() => {
                    navigation('orders')
                }}> <FontAwesomeIcon icon={faCartPlus} className="module-appIcon" /></p>
                <p className={`module ${isActivePath('branches')}`} onClick={() => {
                    navigation('branches')
                }}><FontAwesomeIcon icon={faBuilding} className="module-appIcon" /></p>
                <p className={`module ${isActivePath('inventory')}`} onClick={() => {
                    navigation('inventory')
                    // 
                }}><FontAwesomeIcon icon={faStore} className="module-appIcon" /></p>
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
                <p className="appVersion">V 0.0.1</p>
            </div>

        </div>


    </>
}

export default SideBar;