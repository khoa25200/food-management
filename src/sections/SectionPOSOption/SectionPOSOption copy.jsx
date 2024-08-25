import React, { useEffect, useState } from 'react';
import './SectionPOSOption.less';
import { Tabs, Button, Flex } from 'antd';
import { AppleFilled, CompressOutlined } from '@ant-design/icons';
import OrderTableList from '~/components/POS/OrderTableList';
import MenuList from '~/components/POS/MenuList';

function SectionPOSOption({ dishes, tables }) {
  const [activeKey, setActiveKey] = useState('1');


  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  const openMenuTab = () => {
    setActiveKey('2');
  }

  return (
    <>
      <Flex gap={10} className="custom-tab-buttons">
        <Button onClick={() => handleTabChange('1')} className='btn'>
          <div><CompressOutlined /> BÀN [0/XX]</div>
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
            children: <MenuList dishes={dishes} />,
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
