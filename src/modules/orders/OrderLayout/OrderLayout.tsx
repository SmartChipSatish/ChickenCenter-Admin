import { Outlet } from "react-router-dom";


const OrderLayout = () => {
   return <>
      <p className="pageTile">Orders</p>
      <Outlet />
   </>
}

export default OrderLayout;