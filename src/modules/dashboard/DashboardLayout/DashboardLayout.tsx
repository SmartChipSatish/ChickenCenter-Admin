import { Outlet } from "react-router-dom"


const DashBoardLayout = () => {
    return (<>
        <p className="pageTile">DashBoard</p>
        <Outlet />
    </>)
}

export default DashBoardLayout;