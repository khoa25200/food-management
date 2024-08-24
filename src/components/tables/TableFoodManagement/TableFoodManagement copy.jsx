import React, { useCallback, useEffect, useState } from 'react';
import './TableFoodManagement.less';
import TableEditable from '~/components/tables/TableEditable';
import api from '~/utils/HttpRequest';
import { API, GET_METHOD } from '~/configs/consts/api.const';
import { deleteDish, updateDish } from '~/services/dish-api.service';
import FormCreateDish from '~/components/forms/FormCreateDish';
import { getAllCategories } from '~/services/category.service';
import { Button, Modal } from 'antd';

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
  const [categories, setCategories] = useState([]);
  const handleGetCategories = useCallback(
    async () => {
      const categories = await getAllCategories();
      setCategories(categories);
    },
    []
  );
  useEffect(() => {
    handleGetCategories();
  }, []);

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
      // update dish api
      await updateDish(key, JSON.stringify(data));
    },
    []
  );

  const handleDeleteFood = useCallback(
    async (key) => {
      // delete dish api
      await deleteDish(key)
    },
    []
  );

  const columns = [
    { title: 'Tên món', dataIndex: 'name', width: '20%', editable: true },
    { title: 'Mô tả', dataIndex: 'description', width: '30%', editable: true },
    { title: 'Mô tả', dataIndex: 'image', width: '30%', editable: true },
    { title: 'Giá', dataIndex: 'price', width: '10%', editable: true },
    { title: 'Trạng thái', dataIndex: 'status', width: '10%', editable: true },
    { title: 'Phân loại', dataIndex: 'categoryId', width: '10%', source: categories, editable: true },
  ];

  /**Modal Create Food*/
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCloseModal = () => {
    setShowCreateModal(false);
  }

  const reloadDishesFn = () => {
    /**Reload data */ //improve after
    // getDishedData({ current: 1, pageSize: 10 });
  };

  return <TableEditable getEditableTableData={getDishedData} columnsPre={columns} initialPagination={{ current: 1, pageSize: 10 }} callUpdateApi={handleUpdateFood} callDeleteApi={handleDeleteFood} createModal={
    <Modal
      title="Tạo món mới"
      open={showCreateModal}
      width={800}
      onCancel={() => setShowCreateModal(false)}
      footer={[
        <Button key="1" onClick={() => setShowCreateModal(false)}>Hủy</Button>,
      ]}
      centered
    >
      <FormCreateDish categories={categories}/>
    </Modal>
  } setShowCreateModal={setShowCreateModal} />;
}

export default TableFoodManagement;
