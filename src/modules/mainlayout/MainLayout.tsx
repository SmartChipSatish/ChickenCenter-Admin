
import { Header, SideBar } from "../../shared"
import './MainLayout.scss'
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MainLayout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/dashboard')
    }, [])

    return <>
        <div className="main bg-white h-100">
            <Header></Header>
            <div className="main-container">
                <div className="main-sidebar">
                    <SideBar></SideBar>
                </div>
                <div className="p-2 w-100"><Outlet /></div>
            </div>
        </div>
    </>
}
export default MainLayout;