import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ROLE } from 'consts/role.const';
import { ROUTE } from 'consts/route.const';
import LoginPage from 'pages/login-page';
import RegisterPage from 'pages/register-page';
import MenuPage from 'pages/menu-page';
import POSPage from '~/pages/pos-page';

const staffRoutes = [
  { path: `/${ROUTE.LOGIN}`, element: <LoginPage role={ROLE.STAFF} /> },
  { path: `/${ROUTE.REGISTER}`, element: <RegisterPage role={ROLE.STAFF} /> },
  { path: `/${ROUTE.MENU}`, element: <MenuPage role={ROLE.STAFF} /> },
  { path: `/${ROUTE.POS}`, element: <POSPage role={ROLE.STAFF} /> },

  /*Use case: Error route to redirect to login*/
  { path: '/', element: <Navigate to={ROUTE.LOGIN} replace /> },
  { path: '/*', element: <Navigate to={ROUTE.LOGIN} replace /> }
];

function StaffPage() {
  return (
    <Routes>
      {staffRoutes.map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
    </Routes>
  );
}

export default StaffPage;
