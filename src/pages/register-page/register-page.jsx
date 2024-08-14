import React from 'react';
import './register-page.less';
import { ROLE } from 'consts/role.const';
function RegisterPage({ role = ROLE.USER }) {
  return (
    <div>
      <h1>register Page</h1>
      {role}
    </div>
  );
}

export default RegisterPage;