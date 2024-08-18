import React from 'react';
import './LayoutAuth.less';
import LayoutHeader from '../LayoutHeader';
import LayoutFooter from '../LayoutFooter';
import { Flex, Layout } from 'antd';
import SpaceEmptyAuth from '../SpaceEmptyAuth';
const { Content } = Layout;
function LayoutAuth({ role, content }) {
  return (
    <Layout className='auth-layout'>
      <LayoutHeader role={role} />
      <Flex>
        <SpaceEmptyAuth />
        <Content className='layout-content'>{content}</Content>
      </Flex>
      <LayoutFooter role={role} />
    </Layout>
  );
}

export default LayoutAuth;