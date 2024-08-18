import React from 'react';
import './LayoutFooter.less';
import { Layout } from 'antd';
const { Footer } = Layout;
function LayoutFooter({ role }) {
  return (
    <Footer>
      TODO(G): Add footer here
      {role}
    </Footer>
  );
}

export default LayoutFooter;