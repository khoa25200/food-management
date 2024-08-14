import React from 'react';
import './menu-page.less';
import { ROLE } from 'consts/role.const';
function MenuPage({ role = ROLE.USER }) {
  return (
    <div>
      <h1>menu Page</h1>
      {role}
    </div>
  );
}

export default MenuPage;