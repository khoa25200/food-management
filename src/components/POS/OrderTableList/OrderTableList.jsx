import React, { useState } from 'react';
import './OrderTableList.less';
import { Flex } from 'antd';
import OrderTable from '../OrderTable/OrderTable';

function OrderTableList({ tables, openMenu }) {
  // Initialize state with the tables data, including the `selecting` property
  const [tableData, setTableData] = useState(
    tables.map(table => ({ ...table, selecting: table.id === 1 }))
  );

  const handleTableSelected = (id) => {
    const updatedTables = tableData.map(table =>
      ({ ...table, selecting: table.id === id })
    );
    setTableData(updatedTables);
  };

  return (
    <Flex wrap style={{ marginTop: 10 }}>
      {tableData.map((table) => (
        <OrderTable
          key={table.id}
          table={table}
          handleTableSelected={handleTableSelected}
          openMenu={openMenu}
          selecting={table.selecting}
        />
      ))}
    </Flex>
  );
}

export default OrderTableList;
