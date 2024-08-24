import React, { useState } from 'react';
import './LayoutManagement.less';
import LayoutHeader from '../LayoutHeader';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import { Footer, Header } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '~/configs/consts/route.const';
const { Content } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Món ăn', ROUTE.FOOD_MANAGEMENT, <PieChartOutlined />),
  getItem('Người dùng', ROUTE.USER_MANAGEMENT, <DesktopOutlined />),
  getItem('Bàn', ROUTE.TABLE_MANAGEMENT, <FileOutlined />),

  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '4'), getItem('Team 2', '5')]),
];

function LayoutManagement({ role, breadcrumb, route = ROUTE.FOOD_MANAGEMENT, content }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const handleNavigate = (e) => {
    navigate(`/admin/${e.key}`)
  }
  return (
    <>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
      </Header>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ zIndex: 100 }}>
          <div className="demo-logo-vertical" />
          <Menu onSelect={(e) => handleNavigate(e)} theme="dark" defaultSelectedKeys={[route]} mode="inline" items={items} />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
              }} items={[
                {
                  href: '',
                  title: 'Quản lý',
                },
                {
                  href: '',
                  title: breadcrumb || '',
                }
              ]} />
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {content}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default LayoutManagement;