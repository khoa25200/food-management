import React, { useState } from 'react';
import './OrderTable.less';
import { convertVNDCurrency } from '~/utils/Helper';
import { getOrderByTable } from '~/services/pos.service';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { orderTableLoading, selectedTableState } from '~/states/pos.state';
function OrderTable({ table, handleTableSelected, openMenu, selecting }) {
  const setLoadingForGetOrderTable = useSetRecoilState(orderTableLoading);
  const [selectedTable, setSelectedTable] = useRecoilState(selectedTableState);

  const handleCheckOrderByTable = async (tableId) => {
    if (table.status) {
      setLoadingForGetOrderTable(true);
      const tableSelectedRes = await getOrderByTable(tableId);

      const dishesOfTable = tableSelectedRes?.orderDetailRequests?.map(dish => dish?.dishId);
      const tableSelectedDataState = {
        id: table.id,
        dishesOfTable: dishesOfTable,
        disableRemove: true,
        data: tableSelectedRes
      }
      setSelectedTable(tableSelectedDataState);
      setLoadingForGetOrderTable(false);
    } else {
      const tableSelectedDataState = {
        id: table.id,
        dishesOfTable: [],
        disableRemove: false,
        data: {}
      }
      setSelectedTable(tableSelectedDataState);
    }
  }
  const handleActiveTable = (tableId) => {
    handleTableSelected(tableId);
    handleCheckOrderByTable(tableId);
  }
  const handleSingleClick = (tableId) => {
    handleActiveTable(tableId);
  };

  const handleDoubleClick = (tableId) => {
    // handleActiveTable(tableId);
    openMenu();
  };


  return (
    <>
      {table.status ?

        // Đã đặt bàn
        <div onClick={() => handleSingleClick(table.id)}
          onDoubleClick={() => handleDoubleClick(table.id)}
          className={`order-table ordered ${!!selecting ? 'active' : ''}`} style={{ userSelect: 'none' }}>
          <div className='status'>Đã đặt ({table?.totalDishes} Món)</div>
          {table?.name}
          <div className='price-temp'>{convertVNDCurrency
            (table?.totalPrice)}</div>
        </div> :

        // Chưa đặt bàn
        <div onClick={() => handleSingleClick(table.id)}
          onDoubleClick={() => handleDoubleClick(table.id)}
          className={`order-table ${!!selecting ? 'active' : ''}`} style={{ userSelect: 'none' }}>
          {table?.name}
          <div className='price-temp'></div>
        </div>
      }
    </>
  );
}

export default OrderTable;