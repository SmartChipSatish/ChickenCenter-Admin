import { useLocation, useNavigate } from "react-router-dom";
import './Sidebar.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faCartPlus, faHouse, faStore, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { faFirstOrder } from "@fortawesome/free-brands-svg-icons";
import { useCallback, useEffect, useState } from "react";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Tooltip from "react-bootstrap/esm/Tooltip";
import { useSelector } from "react-redux";
import { User, Franchies, Admin } from "../../utils/appConstants";
import { UserTypeHook } from "../../../utils/hooks/userTypeHook";
import { FRANCHISETYPE } from "../../../utils/interfaces/appInterfaces";


const SideBar = () => {
    const navigation = useNavigate();
    const location = useLocation();
    const userInfo = useSelector((state: any) => state?.userInfoSlice?.userInfo);
    const [sidebarOptions, setSidebarOptions] = useState(User)
    const userType = UserTypeHook();

    const isActivePath = useCallback((path: string) => {
        return location?.pathname.includes(path) ? 'module-active' : '';
    }, [location.pathname]);

    useEffect(() => {
        if (userType === FRANCHISETYPE.FRANCHISE) {
            setSidebarOptions(Franchies);
            return;
        }
        if (userType === FRANCHISETYPE.ADMIN) {
            setSidebarOptions(Admin);
            return;
        }
        if(userType === FRANCHISETYPE.DELIVERYAGENTS){
            setSidebarOptions(User);
            return;
        }
    }, [userType])

    return <>
        <div className="appSidebar text-white h-100">
            <div>
                {sidebarOptions.map(({ title, icon, tooltip }: { title: string, icon: any, tooltip: string }) => {
                    return <>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={(props) => {
                                return <Tooltip id="button-tooltip" {...props}>
                                    {tooltip}
                                </Tooltip>
                            }}
                        >
                            <p className={`module ${isActivePath(title)}`} onClick={() => {
                                navigation(`${title}`)
                            }}><FontAwesomeIcon icon={icon} className="module-appIcon" /></p>
                        </OverlayTrigger>
                    </>
                })}


                {/* <p className={`module ${isActivePath('orders')}`} onClick={() => {
                    navigation('orders')
                }}> <FontAwesomeIcon icon={faCartPlus} className="module-appIcon" /></p>
                {userInfo?.userType === 'admin'
                    && <p className={`module ${isActivePath('branches')}`} onClick={() => {
                        navigation('branches')
                    }}><FontAwesomeIcon icon={faBuilding} className="module-appIcon" /></p>}

                <p className={`module ${isActivePath('inventory')}`} onClick={() => {
                    navigation('inventory')
                    // 
                }}><FontAwesomeIcon icon={faStore} className="module-appIcon" /></p>

                <p className={`module ${isActivePath('users')}`} onClick={() => {
                    navigation('users')
                }}><FontAwesomeIcon icon={faUsers} className="module-appIcon" /></p> */}
                {/* <p className="module" onClick={() => {
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