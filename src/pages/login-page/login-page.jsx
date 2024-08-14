import React from 'react';
import './login-page.less';
function LoginPage({ role }) {
  return (
    <div>
      <h1>login page Page</h1>
      {role}
    </div>
  );
}

export default LoginPage;