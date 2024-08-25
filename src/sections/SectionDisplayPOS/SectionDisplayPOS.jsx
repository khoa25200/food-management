import React, { useEffect, useState, memo } from 'react';
import './SectionDisplayPOS.less';
import { Col, Layout, Row, Spin, Tag } from 'antd';
import FoodDisplayItem from '~/components/POS/FoodDisplayItem';
import { useRecoilState } from 'recoil';
import { orderTableLoading, selectedTableState } from '~/states/pos.state';

// Memoize the FoodDisplayItem to prevent unnecessary re-renders
const MemoizedFoodDisplayItem = memo(FoodDisplayItem);

function SectionDisplayPOS() {
  const [selectedTable, setSelectedTable] = useRecoilState(selectedTableState);
  const [isLoading] = useRecoilState(orderTableLoading);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    if (selectedTable?.data?.orderDetailRequests) {
      setDishes(selectedTable.data.orderDetailRequests);
    } else {
      setDishes([]);
    }
  }, [selectedTable]);

  const isDisableRemove = !!selectedTable?.id;

  const handleQuantityChange = (dishId, newQuantity) => {
    setDishes(prevDishes => {
      const updatedDishes = prevDishes.map(dish =>
        dish.dishId === dishId ? { ...dish, quantity: newQuantity } : dish
      );

      // Update the selectedTable state accordingly
      setSelectedTable(prevTable => ({
        ...prevTable,
        data: {
          ...prevTable.data,
          orderDetailRequests: updatedDishes
        }
      }));

      return updatedDishes; // Return the updated dishes array
    });
  };

  const handleDeleteDish = (dishId) => {
    setDishes(prevDishes => {
      const updatedDishes = prevDishes.filter(dish => dish.dishId !== dishId);

      // Update the selectedTable state accordingly
      setSelectedTable(prevTable => ({
        ...prevTable,
        data: {
          ...prevTable.data,
          orderDetailRequests: updatedDishes
        }
      }));

      return updatedDishes; // Return the updated dishes array
    });
  };

  const handleResetDish = (dishId) => {
    setDishes(prevDishes => {
      const updatedDishes = prevDishes.map(dish =>
        dish.dishId === dishId ? { ...dish, quantity: dish.defaultQuantity, note: dish.defaultNote } : dish
      );

      // Update the selectedTable state accordingly
      setSelectedTable(prevTable => ({
        ...prevTable,
        data: {
          ...prevTable.data,
          orderDetailRequests: updatedDishes
        }
      }));

      return updatedDishes; // Return the updated dishes array
    });
  };

  const renderDishes = () => {
    if (dishes.length > 0) {
      return dishes.map((dish, index) => (
        <React.Fragment key={dish.dishId || index}>
          <MemoizedFoodDisplayItem
            index={index}
            dish={dish}
            isDisableRemove={isDisableRemove}
            handleQuantityChange={handleQuantityChange}
            handleDeleteDish={handleDeleteDish}
            handleResetDish={handleResetDish}
            isDeleteApi={selectedTable?.dishesOfTable?.some(id => id === dish.dishId)}
          />
        </React.Fragment>
      ));
    }
    return (
      <Tag bordered={false} color="warning">
        Chưa có món ăn ở bàn này! Vui lòng chọn bàn, hoặc thêm món ăn
      </Tag>
    );
  };

  return (
    <Layout className='display-pos-section'>
      <Row className='header-display-section'>
        <Col span={1}>#</Col>
        <Col span={13}>TÊN HÀNG HÓA</Col>
        <Col span={4} style={{ textAlign: 'center' }}>SL</Col>
        <Col span={2}>ĐƠN GIÁ</Col>
        <Col span={3}>THÀNH TIỀN</Col>
        <Col span={1}></Col>
        <Col span={1}></Col>
      </Row>
      {isLoading ? <Spin tip="Uploading..." /> : renderDishes()}
    </Layout>
  );
}

export default SectionDisplayPOS;
