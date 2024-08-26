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
    console.log({
      selectedTable
    })
  }, [selectedTable]);

  const isDisableRemove = !!selectedTable?.id;

  const handleQuantityChange = (dishId, newQuantity, newNote) => {
    const updatedDishes = dishes.map(dish =>
      dish.dishId === dishId ? { ...dish, quantity: newQuantity, note: newNote } : dish
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

  const handleNoteChange = (dishId, newNote) => {
    const updatedDishes = dishes.map(dish =>
      dish.dishId === dishId ? { ...dish, note: newNote } : dish
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

  const handleDeleteDish = (dishId) => {
    const updatedDishes = dishes.filter(dish => dish.dishId !== dishId);
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

  const handleResetDish = (dishId) => {
    const originalDish = dishes.find(dish => dish.dishId === dishId);
    const updatedDishes = dishes.map(dish =>
      dish.dishId === dishId ? { ...dish, quantity: originalDish?.quantity || 1, note: originalDish?.note || '' } : dish
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

  const renderDishes = () => {
    if (isLoading) {
      return <Spin />;
    }

    return dishes.map((dish, index) => (
      <MemoizedFoodDisplayItem
        key={index}
        index={index}
        dish={dish}
        isDeleteApi={(selectedTable?.dishesOfTable?.some(val=>val==dish.dishId))}
        handleQuantityChange={handleQuantityChange}
        handleNoteChange={handleNoteChange}
        handleDeleteDish={handleDeleteDish}
        handleResetDish={handleResetDish}
      />
    ));
  };

  return (
    <Layout className='section-display-pos'>
      <Row>
        <Tag color='blue'>{selectedTable?.id ? `Bàn ${selectedTable?.id}` : 'Chọn bàn'}</Tag>

        <Col span={24}>
          <div className='section-display-pos-header'>
            <Row className='header-display-section'>
              <Col span={1}>#</Col>
              <Col span={13}>TÊN MÓN</Col>
              <Col span={4}></Col>
              <Col span={2} style={{ textAlign: 'center' }}>ĐVT</Col>
              <Col span={2} style={{ textAlign: 'center' }}>ĐƠN GIÁ</Col>
              <Col span={2}></Col>
            </Row>
          </div>
          <div className='section-display-pos-content'>
            {renderDishes()}
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default SectionDisplayPOS;
