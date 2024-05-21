import { Outlet } from "react-router-dom"
import { CardComponent } from "../components/CardComponent/CardComponent";


const DashBoardLayout = () => {
    return (<>
        <p className="pageTile">DashBoard</p>
        <Outlet />
    </>)
}

export default DashBoardLayout;