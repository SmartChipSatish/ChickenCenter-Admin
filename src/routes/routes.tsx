import React, { Suspense } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from '../modules/authentication/Login/Login';
import { MainLayout, DashBoard, OrderLayOut, OrderPage, PaymentPage, DashBoardPage } from './pages';



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
            <Route path=""
              element={
                <Suspense>
                  <OrderPage />
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
