import { Outlet } from "react-router-dom"


const DashBoardLayout = () => {
    return (<>
        <p>DashBoard</p>
        <Outlet />
    </>)
}

export default DashBoardLayout;