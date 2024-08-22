import React from 'react';
import './LayoutHeader.less';
import { Button, Flex, Layout } from 'antd';
import { ROLE } from '~/configs/consts/role.const';
import { MacCommandFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '~/configs/consts/route.const';
const { Header } = Layout;
function LayoutHeader({ role }) {
  const navigate = useNavigate();
  const handleGoToPage = () => {
    navigate(`/admin/${ROUTE.FOOD_MANAGEMENT}`)
  }
  return (
    <Header prefixCls='header'>
      <Flex prefixCls='container' align="center" justify="space-between">
        <h1>Food Management</h1>
        <div>
          {role===ROLE.ADMIN?<Button onClick={handleGoToPage} prefixCls='management' icon={<MacCommandFilled />}>Vào trang quản lý</Button>:<></>}
          <span style={{color: 'white'}}>Role: {role}</span>
        </div>
      </Flex>
    </Header>
  );
}

export default LayoutHeader;