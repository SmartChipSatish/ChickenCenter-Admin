import Breadcrumb from "react-bootstrap/esm/Breadcrumb";
import { Outlet } from "react-router-dom";


const OrderLayout = () => {
   return <>
      <p className="pageTile pageTitleSpace">Orders</p>
      <Outlet />
   </>
}

export default OrderLayout;