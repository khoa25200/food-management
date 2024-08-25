import React, { useState } from 'react';
import './MenuList.less';
import { Flex } from 'antd';
import { useRecoilState } from 'recoil';
import { selectedTableState } from '~/states/pos.state';
import MenuItem from '../MenuItem';
const getDishInfo = (idFind, dishes) => {
  const dish = dishes.find(dish => dish.id === idFind);
  return {
    dishId: dish.id,
    dishName: dish.name,
    image: dish.image,
    quantity: 1,
    pricePerItem: dish.price,
    note: ''
  }
}
function MenuList({ dishes, openMenu }) {
  const [selectedTable, setSelectedTable] = useRecoilState(selectedTableState);

  const handleAddDish = (id) => {
    // Clone existing orderDetailRequests
    const dishedState = [...(selectedTable.data?.orderDetailRequests || [])];
    const findDish = dishedState.findIndex(d => d.dishId === id);

    if (findDish === -1) {
      const newDish = getDishInfo(id, dishes);
      dishedState.push({ ...newDish, quantity: 1 });
    } else {
      dishedState[findDish] = {
        ...dishedState[findDish],
        quantity: dishedState[findDish].quantity + 1,
      };
    }

    // Update selectedTable state, keeping dishesOfTable and other fields unchanged
    setSelectedTable(prevState => ({
      ...prevState,
      disableRemove: prevState.disableRemove,
      data: {
        ...prevState.data,
        orderDetailRequests: dishedState
      }
    }));
  }
  return (
    <Flex className="container" gap={5}>
      {dishes.map((dish, index) => (
        <MenuItem key={index} dish={dish} handleAddDish={handleAddDish} className="item" />
      ))}
    </Flex>

  );
}

export default MenuList;
