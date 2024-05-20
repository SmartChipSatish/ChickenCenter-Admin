import { lazy } from 'react';

const MainLayout = lazy(() => import('../modules/mainlayout/MainLayout'))
// Dashboard
const DashBoard =  lazy(() => import('../modules/dashboard/DashboardLayout/DashboardLayout')) ;

// Order Page 
const OrderPage = lazy(()=> import('../modules/orders/OrderLayout/OrderLayout'));

//Payment Page
const PaymentPage = lazy(()=> import('../modules/payments/PaymentLayout/Paymentlayout'))

export {
    MainLayout,
    DashBoard,
    OrderPage,
    PaymentPage
}