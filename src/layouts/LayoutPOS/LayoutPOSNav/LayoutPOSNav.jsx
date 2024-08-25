import React from 'react';
import './LayoutPOSNav.less';
import { Col, Row } from 'antd';

function LayoutPOSNav({ }) {
  return (
    <Row prefixCls='nav'>
      <Col className='search' span={7}>col</Col>
      <Col className='help-buttons' span={17}>col</Col>
    </Row>
  );
}

export default LayoutPOSNav;