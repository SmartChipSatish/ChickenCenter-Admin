import { lazy } from 'react';

const MainLayout = lazy(() => import('../modules/mainlayout/MainLayout'))
// Dashboard
const DashBoard =  lazy(() => import('../modules/dashboard/DashboardLayout/DashboardLayout')) ;
const DashBoardPage = lazy(()=> import('../modules/dashboard/pages/DashboardPage/Dashboardpage'))

// Order Page 
const OrderLayOut = lazy(()=> import('../modules/orders/OrderLayout/OrderLayout'));
const OrderPage = lazy(()=> import('../modules/orders/pages/orderPage/OrderPage'))
const OrderDetailPage = lazy(() => import('../modules/orders/pages/OrderDetailsPage/OrderDetailsPage'))

//Payment Page
const PaymentPage = lazy(()=> import('../modules/payments/PaymentLayout/Paymentlayout'));

//Branches 
const BranchLayout = lazy(()=> import('../modules/branches/BranchesLayout/BranchesLayout'));
const BranchesPage = lazy(()=>import('../modules/branches/pages/BranchesPage/BranchesPage'))
const CreateBranchPage = lazy(()=>import('../modules/branches/pages/CreateBranchPage/CreateBranchPage'));

//Users 
const UsersLayout = lazy(() => import('../modules/users/UserLayout/UserLayout'));
const UsersPage = lazy(()=>import('../modules/users/pages/UsersPage/UsersPage'))
export {
    MainLayout,
    DashBoard,
    OrderLayOut,
    PaymentPage,
    DashBoardPage,
    OrderPage,
    BranchLayout,
    BranchesPage,
    CreateBranchPage,
    OrderDetailPage,
    UsersLayout,
    UsersPage
}