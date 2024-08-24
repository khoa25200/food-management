import React from 'react';
import './ButtonSubmit.less';
import { Button } from 'antd';
function ButtonSubmit({ text, type = 'primary', htmlType = 'submit', color, disable }) {
  return (
    <Button type='primary' htmlType={htmlType} style={{
      borderRadius: 3
    }} disabled={disable}>
      {text}
    </Button>
  );
}

export default ButtonSubmit;