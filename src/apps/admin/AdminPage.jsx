import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './AdminPage.less';
import LoginPage from 'pages/login-page';
import RegisterPage from 'pages/register-page';
import { ROLE } from 'consts/role.const';
import { ROUTE } from '~/configs/consts/route.const';
import MenuPage from '~/pages/menu-page';
import ForgotPasswordPage from '~/pages/forgot-password';
import ManagementUserPage from '~/pages/management-user-page';
import ManagementFoodPage from '~/pages/management-food-page';
import ManagementTablePage from '~/pages/management-table-page';
import POSPage from '~/pages/pos-page';

const adminRoutes = [
  { path: `/${ROUTE.LOGIN}`, element: <LoginPage role={ROLE.ADMIN} /> },
  { path: `/${ROUTE.REGISTER}`, element: <RegisterPage role={ROLE.ADMIN} /> },
  { path: `/${ROUTE.FORGOT_PASSWORD}`, element: <ForgotPasswordPage role={ROLE.ADMIN} /> },
  { path: `/${ROUTE.MENU}`, element: <MenuPage role={ROLE.ADMIN} /> },
  { path: `/${ROUTE.USER_MANAGEMENT}`, element: <ManagementUserPage role={ROLE.ADMIN} /> },
  { path: `/${ROUTE.FOOD_MANAGEMENT}`, element: <ManagementFoodPage role={ROLE.ADMIN} /> },
  { path: `/${ROUTE.TABLE_MANAGEMENT}`, element: <ManagementTablePage role={ROLE.ADMIN} /> },
  { path: `/${ROUTE.POS}`, element: <POSPage role={ROLE.ADMIN} /> },


  /*Use case: Error route to redirect to login*/
  { path: '/', element: <Navigate to={ROUTE.LOGIN} replace /> },
  { path: '/*', element: <Navigate to={ROUTE.LOGIN} replace /> }
];

function AdminPage() {
  return (
    <Routes>
      {adminRoutes.map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
    </Routes>
  );
}

export default AdminPage;