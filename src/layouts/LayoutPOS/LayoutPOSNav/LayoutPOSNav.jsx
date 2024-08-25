import React from 'react';
import './LayoutPOSNav.less';
import { Button, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

function LayoutPOSNav({ }) {
  const navigate = useNavigate();
  const handleGoToPage = () => {
    navigate('/staff/menu')
  }
  return (
    <Row prefixCls='nav'>
      <Col className='search' span={7}><h3>POS</h3></Col>
      <Col className='help-buttons' span={17} >
        <Button type="primary" style={{
          width: 100
        }} onClick={handleGoToPage}>Menu</Button>
      </Col>
    </Row>
  );
}

export default LayoutPOSNav;