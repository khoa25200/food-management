import React from 'react';
import './ButtonSubmit.less';
import { Button } from 'antd';
function ButtonSubmit({ text, type = 'primary', htmlType = 'submit', color }) {
  return (
    <Button type='primary' htmlType={htmlType} style={{
      borderRadius: 3
    }}>
      {text}
    </Button>
  );
}

export default ButtonSubmit;