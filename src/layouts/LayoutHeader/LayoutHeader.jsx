import React from 'react';
import './LayoutHeader.less';
import { Layout } from 'antd';
const { Header } = Layout;
function LayoutHeader({ role }) {
  return (
    <Header>
      --Role: {role}--
    </Header>
  );
}

export default LayoutHeader;