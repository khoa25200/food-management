import React, { useEffect, useState, memo } from 'react';
import './SectionDisplayPOS.less';
import { Col, Layout, Row, Spin, Tag } from 'antd';
import FoodDisplayItem from '~/components/POS/FoodDisplayItem';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { orderTableLoading, selectedTableState } from '~/states/pos.state';

// Memoize the FoodDisplayItem to prevent unnecessary re-renders
const MemoizedFoodDisplayItem = memo(FoodDisplayItem);

function SectionDisplayPOS() {
  const [selectedTable, setSelectedTable] = useRecoilState(selectedTableState);
  const [isLoading] = useRecoilState(orderTableLoading);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    // Update dishes when selectedTable changes
    if (selectedTable?.data?.orderDetailRequests) {
      setDishes(selectedTable.data.orderDetailRequests);
    } else {
      setDishes([]);
    }
  }, [selectedTable]);

  const isDisableRemove = !!selectedTable?.id;

  const handleQuantityChange = (dishId, newQuantity) => {
    const updatedDishes = dishes.map(dish =>
      dish.dishId === dishId ? { ...dish, quantity: newQuantity } : dish
    );
    setDishes(updatedDishes);
    
    // Update the selectedTableState with new dishes list
    setSelectedTable(prevState => ({
      ...prevState,
      data: {
        ...prevState.data,
        orderDetailRequests: updatedDishes,
        totalPrice: updatedDishes.reduce((total, dish) => total + dish.pricePerItem * dish.quantity, 0)
      }
    }));
  };

  // Function to render dishes or a message if none are available
  const renderDishes = () => {
    if (dishes.length > 0) {
      return dishes.map((dish, index) => (
        <React.Fragment key={dish.dishId || index}>
          <MemoizedFoodDisplayItem
            index={index}
            dish={dish}
            isDisableRemove={isDisableRemove}
            handleQuantityChange={handleQuantityChange}
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
    <Layout prefixCls='display-pos-section'>
      <Row prefixCls='header-display-section'>
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
