import React from 'react';
import './management-table-page.less';
import LayoutManagement from '~/layouts/LayoutManagement';
import { ROUTE } from '~/configs/consts/route.const';
function ManagementTablePage({ role }) {
  return (
    <LayoutManagement role={role} content={<>Table page</>} breadcrumb={`Bàn`} route={ROUTE.TABLE_MANAGEMENT}/>
  );
}

export default ManagementTablePage;