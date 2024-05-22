import { Outlet } from "react-router-dom";


const OrderLayout = () => {
   return <>
      <p className="pageTile pageTitleSpace">Orders</p>
      <Outlet />
   </>
}

export default OrderLayout;