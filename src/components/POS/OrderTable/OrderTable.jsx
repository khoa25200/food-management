import React, { useState } from 'react';
import './OrderTable.less';
function OrderTable({ table, handleTableSelected, openMenu, selecting }) {
  const handleCheckOrderByTable = (tableId) => {
    if (!table.status) {
      console.log('call api get order by table', tableId)
    } else {
      console.log('return []', tableId);
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
    handleActiveTable(tableId);
    openMenu();
  };


  return (
    <>
      {table.status ?

        // Chưa đặt bàn
        <div onClick={() => handleSingleClick(table.id)}
          onDoubleClick={() => handleDoubleClick(table.id)}
          className={`order-table ${!!selecting ? 'active' : ''}`} style={{ userSelect: 'none' }}>
          {table?.name}
          <div className='price-temp'></div>
        </div> :

        // Đã đặt bàn
        <div onClick={() => handleSingleClick(table.id)}
          onDoubleClick={() => handleDoubleClick(table.id)}
          className={`order-table ordered ${!!selecting ? 'active' : ''}`} style={{ userSelect: 'none' }}>
          <div className='status'>Đã đặt</div>
          {table?.name}
          <div className='price-temp'>xxx,XXX VNĐ</div>
        </div>
      }
    </>
  );
}

export default OrderTable;