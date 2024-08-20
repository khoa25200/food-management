import React from 'react';
import './LayoutMenu.less';
import LayoutHeader from '../LayoutHeader';
import LayoutFooter from '../LayoutFooter';
import { Divider, Layout } from 'antd';
import SectionCategory from './SectionCategory';
import SectionBanner from './SectionBanner';
import SectionFood from './SectionFood';

function LayoutMenu({ role, content }) {
  return (<>
    <LayoutHeader role={role} />
    <Layout className='menu-layout'>
      <SectionCategory />
      <Divider />
      <SectionBanner />
      <Divider />
      <SectionFood />
    </Layout>
    <LayoutFooter role={role} /></>
  );
}

export default LayoutMenu;