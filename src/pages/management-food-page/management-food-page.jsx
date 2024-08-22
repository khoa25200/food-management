import React from 'react';
import './management-food-page.less';
import LayoutManagement from '~/layouts/LayoutManagement';
import { ROUTE } from '~/configs/consts/route.const';
import TableFoodManagement from '~/components/tables/TableFoodManagement';

function ManagementFoodPage({ role }) {
  return (
    <LayoutManagement role={role} content={
      <>
        <TableFoodManagement />
      </>
    } breadcrumb={`Món ăn`} route={ROUTE.FOOD_MANAGEMENT} />
  );
}

export default ManagementFoodPage;