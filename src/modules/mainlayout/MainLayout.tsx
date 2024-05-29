
import { Header, SideBar } from "../../shared"
import './MainLayout.scss'
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppConstants, getItemFromLocalStorage } from "../../utils/localStorage";
import { adduserInfo } from "../authentication/store/userInfoSlice";

const MainLayout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const userInfo = getItemFromLocalStorage(AppConstants.userInfo);
        if (userInfo) {
            dispatch(adduserInfo(userInfo))
        }
    }, [])


    return <>
        <div className="main bg-white h-100">
            <Header></Header>
            <div className="main-container">
                <div className="main-sidebar">
                    <SideBar></SideBar>
                </div>
                <div className="p-2 w-100 main-placeholder overflow-y"><Outlet /></div>
            </div>
        </div>
    </>
}
export default MainLayout;