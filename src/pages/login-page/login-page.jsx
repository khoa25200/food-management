import React from 'react';
import './login-page.less';
import LayoutAuth from '~/layouts/LayoutAuth';
import FormLogin from '~/components/forms/FormLogin';
function UserBookingPage({ role }) {
  return (
    <LayoutAuth role={role} content={<FormLogin role={role}/>} />
  );
}

export default UserBookingPage;