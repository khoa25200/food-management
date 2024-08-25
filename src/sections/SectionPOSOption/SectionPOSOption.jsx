import React, { useState } from 'react';
import './SectionPOSOption.less';
import { Tabs, Button, Input, Flex } from 'antd';
import { AppleFilled, CompressOutlined, SearchOutlined } from '@ant-design/icons';
import OrderTableList from '~/components/POS/OrderTableList';
import MenuList from '~/components/POS/MenuList';

function SectionPOSOption({ dishes, tables }) {
  const [activeKey, setActiveKey] = useState('1');
  const [searchTerm, setSearchTerm] = useState('');
  const renderTablesAvailable = tables => {
    const totalTables = tables.length;
    const activeTables = tables.filter(table => table.status === true).length;
    return `BÀN [${activeTables}/${totalTables}]`;
  }
  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  const openMenuTab = () => {
    setActiveKey('2');
  };

  // Lọc danh sách món ăn theo từ khóa tìm kiếm
  const filteredDishes = dishes.filter(dish =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Flex gap={10} className="custom-tab-buttons">
        <Button onClick={() => handleTabChange('1')} className='btn'>
          <div><CompressOutlined /> {renderTablesAvailable(tables)}</div>
          <b>A1</b>
        </Button>
        <Button onClick={() => handleTabChange('2')} className='btn'>
          <div><AppleFilled /> THỰC ĐƠN</div>
          <b>Tất cả</b>
        </Button>
      </Flex>
      <Tabs className='option-tab'
        activeKey={activeKey}
        items={[
          {
            key: '1',
            label: 'Tab 1',
            children: <OrderTableList tables={tables} openMenu={openMenuTab} />,
          },
          {
            key: '2',
            label: 'Tab 2',
            children: (
              <div style={{ paddingTop: 20 }}>
                <Input
                  placeholder="Tìm món ăn"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ marginBottom: 16, width: 250 }}
                  prefix={<SearchOutlined />}
                />
                <MenuList dishes={filteredDishes} />
              </div>
            ),
          }
        ]}
        onChange={handleTabChange}
        tabBarStyle={{ display: 'none' }} // Ẩn các tab mặc định
        style={{ overflowY: 'auto', height: '100%' }}
      />
    </>
  );
}

export default SectionPOSOption;
