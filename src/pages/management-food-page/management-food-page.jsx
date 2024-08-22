import React from 'react';
import './management-food-page.less';
import LayoutManagement from '~/layouts/LayoutManagement';
import { ROUTE } from '~/configs/consts/route.const';
import TableFoodManagement from '~/components/tables/TableFoodManagement';
import { API, POST_METHOD } from '~/configs/consts/api.const';
import api from '~/utils/HttpRequest';
import ButtonUploadImage from '~/components/buttons/ButtonUploadImage';
const handleCallTestCorsApi = async () => {
  try {
    const dishes = await api({
      url: `${API.GET_ALL_DISHES}`,
      method: POST_METHOD,
      data: {
        "name": "San pham test 1",
        "description": "San pham test 1",
        "price": "1999292",
        "image": "https://res.cloudinary.com/dzyaevy5k/image/upload/v1724215540/xiwbwpccabdbnyagkjpi.jpg",
        "status": true,
        "category_id": 2
      }
    })
    return dishes;
  }
  catch (error) {
    console.error('Error fetching dishes', error);
  }
  return;
}
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