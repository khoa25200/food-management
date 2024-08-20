import React from 'react';
import './management-user-page.less';
import LayoutManagement from '~/layouts/LayoutManagement';
import { ROUTE } from '~/configs/consts/route.const';
function ManagementUserPage({ role }) {
  return (
    <LayoutManagement role={role} content={<>User page</>} breadcrumb={`Tài khoản`} route={ROUTE.USER_MANAGEMENT}/>
  );
}

export default ManagementUserPage;