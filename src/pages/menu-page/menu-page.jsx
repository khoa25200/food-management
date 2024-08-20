import React from 'react';
import './menu-page.less';
import { ROLE } from 'consts/role.const';
import LayoutMenu from '~/layouts/LayoutMenu';
function MenuPage({ role = ROLE.USER }) {
  return (
    <LayoutMenu role={role} className='menu-layout'/>
  );
}

export default MenuPage;