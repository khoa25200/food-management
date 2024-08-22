import React, { useCallback } from 'react';
import './TableFoodManagement.less';
import TableEditable from '~/components/tables/TableEditable';
import api from '~/utils/HttpRequest';
import { API, GET_METHOD } from '~/configs/consts/api.const';

const getAllDishes = async (page = 0, size = 10, sortBy = 'id', sortDirection = 'asc') => {
  try {
    const response = await api({
      url: API.GET_ALL_DISHES,
      params: { page, size, sortBy, sortDirection },
      method: GET_METHOD,
    });
    // Assuming API returns both content and total count
    return {
      data: response?.content?.map((value) => ({
        ...value,
        key: value.id,
      })),
      total: response?.total || 0, // Adjust based on your API response structure
    };
  } catch (error) {
    console.error('Error fetching dishes:', error);
    return { data: [], total: 0 };
  }
};

function TableFoodManagement() {
  const getDishedData = useCallback(
    async (pagination) => {
      const { current = 1, pageSize = 10 } = pagination;
      const result = await getAllDishes(current - 1, pageSize);
      return {
        data: result.data,
        pagination: {
          ...pagination,
          total: result.total,
        },
      };
    },
    []
  );

  const handleUpdateFood = useCallback(
    async (data) => {
      console.log('update food', data);
    },
    []
  );

  const handleDeleteFood = useCallback(
    async (key) => {
      console.log('xoa food api', key);
    },
    []
  );

  const columns = [
    { title: 'Tên món', dataIndex: 'name', width: '20%', editable: true },
    { title: 'Mô tả', dataIndex: 'description', width: '30%', editable: true },
    { title: 'Mô tả', dataIndex: 'image', width: '30%', editable: true },
    { title: 'Giá', dataIndex: 'price', width: '10%', editable: true },
    { title: 'Trạng thái', dataIndex: 'status', width: '10%', editable: true },
    { title: 'Phân loại', dataIndex: 'categoryId', width: '10%', editable: true },
  ];

  return <TableEditable getEditableTableData={getDishedData} columnsPre={columns} initialPagination={{ current: 1, pageSize: 10 }} callUpdateApi={handleUpdateFood} callDeleteApi={handleDeleteFood}/>;
}

export default TableFoodManagement;
