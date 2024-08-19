import React from 'react';
import './register-page.less';
import { ROLE } from 'consts/role.const';
// import Layout from 'antd/es/layout/layout';
import FormRegister from '~/components/forms/FormRegister';
import LayoutAuth from '~/layouts/LayoutAuth';
function RegisterPage({ role = ROLE.USER }) {
  return (
    <LayoutAuth role={role} content={<FormRegister role={role}/>} />
  );
}

export default RegisterPage;