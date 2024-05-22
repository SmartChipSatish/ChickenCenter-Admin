import { Outlet } from "react-router-dom"


const DashBoardLayout = () => {
    return (<>
        <p className="pageTile pageTitleSpace">DashBoard</p>
        <Outlet />
    </>)
}

export default DashBoardLayout;