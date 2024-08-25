import React, { useCallback, useEffect, useState } from 'react';
import './TableFoodManagement.less';
import TableEditable from '~/components/tables/TableEditable';
import api from '~/utils/HttpRequest';
import { API, GET_METHOD } from '~/configs/consts/api.const';
import { createDish, deleteDish, updateDish } from '~/services/dish-api.service';
import { getAllCategories } from '~/services/category.service';
import ModalCreateDish from '~/components/modals/ModalCreateDish';

const getAllDishes = async (page = 0, size = 10, sortBy = 'id', sortDirection = 'asc') => {
  try {
    const response = await api({
      url: API.GET_ALL_DISHES,
      params: { page, size, sortBy, sortDirection },
      method: GET_METHOD,
    });
    return {
      data: response?.content?.map((value) => ({
        ...value,
        key: value.id,
      })),
      total: response?.total || 0,
    };
  } catch (error) {
    console.error('Error fetching dishes:', error);
    return { data: [], total: 0 };
  }
};

function TableFoodManagement() {
  const [categories, setCategories] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleGetCategories = useCallback(async () => {
    const categories = await getAllCategories();
    setCategories(categories);
  }, []);

  useEffect(() => {
    handleGetCategories();
  }, [handleGetCategories]);

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
    async (key, data) => {
      await updateDish(key, JSON.stringify(data));
    },
    []
  );

  const handleDeleteFood = useCallback(
    async (key) => {
      await deleteDish(key);
    },
    []
  );

  const handleCreateFood = useCallback(
    async (data) => {
      await createDish(data);
    },
    []
  );

  const columns = [
    { title: 'Tên món', dataIndex: 'name', width: '20%', editable: true },
    { title: 'Mô tả', dataIndex: 'description', width: '30%', editable: true },
    { title: 'Ảnh', dataIndex: 'image', width: '30%', editable: true },
    { title: 'Giá', dataIndex: 'price', width: '10%', editable: true },
    { title: 'Trạng thái', dataIndex: 'status', width: '10%', editable: true },
    { title: 'Phân loại', dataIndex: 'categoryId', width: '10%', source: categories, editable: true },
  ];

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  return (
    <>
      <TableEditable
        getEditableTableData={getDishedData}
        columnsPre={columns}
        initialPagination={{ current: 1, pageSize: 10 }}
        callUpdateApi={handleUpdateFood}
        callDeleteApi={handleDeleteFood}
        setShowCreateModal={openCreateModal}
      />
      <ModalCreateDish
        visible={showCreateModal}
        onClose={closeCreateModal}
        categories={categories}
        createDishApi={handleCreateFood}
      />
    </>
  );
}

export default TableFoodManagement;
