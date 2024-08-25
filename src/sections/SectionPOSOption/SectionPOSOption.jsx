import React, { useState } from 'react';
import './SectionPOSOption.less';
import { Tabs, Button, Flex } from 'antd';
import { AppleFilled, CompressOutlined } from '@ant-design/icons';
import OrderTableList from '~/components/POS/OrderTableList';
const tables = [
  {
    "id": 1,
    "name": "A1",
    "status": false
  },
  {
    "id": 2,
    "name": "A2",
    "status": true
  },
  {
    "id": 3,
    "name": "A3",
    "status": true
  },
  {
    "id": 4,
    "name": "A4",
    "status": true
  },
  {
    "id": 5,
    "name": "A5",
    "status": true
  },
  {
    "id": 6,
    "name": "A6",
    "status": true
  },
  {
    "id": 7,
    "name": "A7",
    "status": true
  },
  {
    "id": 8,
    "name": "A8",
    "status": true
  },
  {
    "id": 9,
    "name": "B1",
    "status": true
  },
  {
    "id": 10,
    "name": "B2",
    "status": true
  },
  {
    "id": 11,
    "name": "B3",
    "status": true
  },
  {
    "id": 12,
    "name": "B4",
    "status": true
  },
  {
    "id": 13,
    "name": "B5",
    "status": true
  },
  {
    "id": 14,
    "name": "B6",
    "status": true
  },
  {
    "id": 15,
    "name": "B7",
    "status": true
  },
  {
    "id": 16,
    "name": "B8",
    "status": true
  },
  {
    "id": 17,
    "name": "B9",
    "status": true
  },
  {
    "id": 18,
    "name": "C1-VIP",
    "status": true
  },
  {
    "id": 19,
    "name": "C2-VIP",
    "status": true
  }
]
function SectionPOSOption() {
  const [activeKey, setActiveKey] = useState('1');

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  const openMenuTab = ()=>{
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
      <Tabs
        activeKey={activeKey}
        items={[
          {
            key: '1',
            label: 'Tab 1',
            children: <OrderTableList tables={tables} openMenu={openMenuTab}/>,
          },
          {
            key: '2',
            label: 'Tab 2',
            children: 'Content of Tab Pane 2',
          }
        ]}
        onChange={handleTabChange}
        tabBarStyle={{ display: 'none' }} // Ẩn các tab mặc định
      />
    </>
  );
}

export default SectionPOSOption;
