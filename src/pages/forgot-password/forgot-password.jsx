

import React from 'react';
import './forgot-password.less';
import { ROLE } from 'consts/role.const';
// import Layout from 'antd/es/layout/layout';
import ForgotPassword from '~/components/forms/ForgotPassword';
import LayoutAuth from '~/layouts/LayoutAuth';
function ForgotPasswordPage({ role = ROLE.USER }) {
  return (
    <LayoutAuth role={role} content={<ForgotPassword role={role}/>} />
  );
}

export default ForgotPasswordPage;