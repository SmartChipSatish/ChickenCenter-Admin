import React, { Suspense } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from '../modules/authentication/Login/Login';
import { MainLayout, DashBoard, OrderLayOut, OrderPage, PaymentPage, DashBoardPage, BranchLayout, BranchesPage, OrderDetailPage, UsersLayout, UsersPage } from './pages';
import CreateBranchPage from '../modules/branches/pages/CreateBranchPage/CreateBranchPage';



export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <Login />
          } />
        <Route
          path=""
          element={
            <Suspense>
              <MainLayout />
            </Suspense>

          }>
          <Route path="dashboard"
            element={
              <Suspense>
                <DashBoard />
              </Suspense>
            }>
            <Route path=""
              element={
                <Suspense>
                  <DashBoardPage></DashBoardPage>
                </Suspense>
              }>
            </Route>
          </Route>
          <Route path="orders"
            element={
              <Suspense>
                <OrderLayOut />
              </Suspense>
            }>
              {/* OrderDetailPage */}
            <Route path=""
              element={
                <Suspense>
                  <OrderPage />
                </Suspense>
              }>

            </Route>
            <Route path="orderDetails"
              element={
                <Suspense>
                  <OrderDetailPage />
                </Suspense>
              }>

            </Route>
          </Route>
          <Route path="payment"
            element={
              <Suspense>
                <PaymentPage />
              </Suspense>
            }>
          </Route>
          <Route path="branches"
            element={
              <Suspense>
                <BranchLayout />
              </Suspense>
            }>
            <Route path=""
              element={
                <Suspense>
                  <BranchesPage />
                </Suspense>
              }>
            </Route>
            <Route path="create"
              element={
                <Suspense>
                  <CreateBranchPage />
                </Suspense>
              }>
            </Route>
          </Route>
          <Route path="users"
            element={
              <Suspense>
                <UsersLayout />
              </Suspense>
            }>
            <Route path=""
              element={
                <Suspense>
                  <UsersPage />
                </Suspense>
              }>
            </Route>
            <Route path="create"
              element={
                <Suspense>
                  <CreateBranchPage />
                </Suspense>
              }>
            </Route>
          </Route>
          {/* BranchLayout */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
