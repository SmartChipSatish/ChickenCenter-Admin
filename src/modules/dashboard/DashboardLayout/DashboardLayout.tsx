import { Outlet } from "react-router-dom"
import { PageTitle } from "../../../shared/components/PageTitle/PageTitle";


const DashBoardLayout = () => {
    return (<>
        <PageTitle name="DashBoard" classNames="pageTitleSpace" pageItems={2 || 0}></PageTitle>
        <Outlet />
    </>)
}

export default DashBoardLayout;