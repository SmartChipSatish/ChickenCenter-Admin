
import { Header, SideBar } from "../../shared"
import './MainLayout.scss'
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetUserQuery, useLazyGetUserQuery } from "../authentication/store/authenticateEndPoints";

const MainLayout = () => {
    // const [getUser, {data, isLoading, isError}] = useLazyGetUserQuery();
    // const {data, isLoading} = useGetUserQuery(undefined)
    // console.log('data main layout',data, isLoading, isError), 
    // useEffect(()=>{
    //     console.log('data main layout',data)
    //     // getUser(undefined)
    // }, [data])



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