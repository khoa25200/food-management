import React, { useCallback, useEffect, useState } from 'react';
import './LayoutMenu.less';
import LayoutHeader from '../LayoutHeader';
import LayoutFooter from '../LayoutFooter';
import { Divider, Layout } from 'antd';
import SectionCategory from './SectionCategory';
import SectionBanner from './SectionBanner';
import SectionFood from './SectionFood';
import { getAllCategories } from '~/services/category.service';



function LayoutMenu({ role }) {
  const [categories, setCategories] = useState([]);
  const handleGetCategories = useCallback(
    async () => {
      const categories = await getAllCategories();
      setCategories(categories);
    },
    []
  );

  useEffect(() => {
    handleGetCategories();
  }, []);

  return (
    <>
      <LayoutHeader role={role} />
      <Layout className='menu-layout content-has-header'>
        <SectionCategory categories={categories} />
        <Divider />
        <SectionBanner />
        <Divider />
        <SectionFood categories={categories} />
      </Layout>
      <LayoutFooter role={role} /></>
  );
}

export default LayoutMenu;