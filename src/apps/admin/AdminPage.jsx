import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './AdminPage.less';
import LoginPage from 'pages/login-page';
import RegisterPage from 'pages/register-page';
import { ROLE } from 'consts/role.const';
import { ROUTE } from '~/configs/consts/route.const';
import MenuPage from '~/pages/menu-page';

const adminRoutes = [
  { path: `/${ROUTE.LOGIN}`, element: <LoginPage role={ROLE.ADMIN} /> },
  { path: `/${ROUTE.REGISTER}`, element: <RegisterPage role={ROLE.ADMIN} /> },
  { path: `/${ROUTE.MENU}`, element: <MenuPage role={ROLE.ADMIN} /> },


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