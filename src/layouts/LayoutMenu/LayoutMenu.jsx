import React, { useCallback, useEffect, useState } from 'react';
import './LayoutMenu.less';
import LayoutHeader from '../LayoutHeader';
import LayoutFooter from '../LayoutFooter';
import { Divider, Layout } from 'antd';
import SectionCategory from './SectionCategory';
import SectionBanner from './SectionBanner';
import SectionFood from './SectionFood';
import { getAllCategories } from '~/services/category.service';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '~/configs/consts/route.const';
import { ROLE } from '~/configs/consts/role.const';



function LayoutMenu({ role }) {
  const navigate = useNavigate();
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

  const handleClickItem = () => {
    if(role===ROLE.USER){
      
    }
    navigate(`/${role}/${ROUTE.POS}`)
  }

  return (
    <>
      <LayoutHeader role={role} />
      <Layout className='menu-layout content-has-header'>
        <SectionCategory categories={categories} />
        <Divider />
        <SectionBanner />
        <Divider />
        <SectionFood categories={categories} handleClickItem={handleClickItem} />
      </Layout>
      <LayoutFooter role={role} /></>
  );
}

export default LayoutMenu;