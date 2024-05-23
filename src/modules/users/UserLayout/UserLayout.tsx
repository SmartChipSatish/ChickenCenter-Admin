import { Outlet } from "react-router-dom"

const UserLayout = () => {
    return (<>
        <p className="pageTile pageTitleSpace">Users</p>
        <Outlet></Outlet>
    </>)
}
export default UserLayout;