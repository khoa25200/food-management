import React, { useEffect, useState } from 'react';
import './OrderTableList.less';
import { Flex } from 'antd';
import OrderTable from '../OrderTable/OrderTable';
import { useRecoilState } from 'recoil';
import { selectedTableState } from '~/states/pos.state';

function OrderTableList({ tables, openMenu }) {
  const [selectedTable, setSelectedTable] = useRecoilState(selectedTableState);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    if (tables && tables.length) {
      const initializedTables = tables.map(table => ({ ...table, selecting: false }));
      setTableData(initializedTables);
    }
  }, [tables]);
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
