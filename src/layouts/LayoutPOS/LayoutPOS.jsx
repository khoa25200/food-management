import React from 'react';
import './LayoutPOS.less';
import { Col, Layout, Row } from 'antd';

import LayoutPOSNav from './LayoutPOSNav';

function LayoutPOS({ quickActionsSection, displayWrapperSection, mainActionsActions, optionSection }) {
  return (
    <Layout prefixCls='pos-wrapper'>
      <LayoutPOSNav />
      <Row prefixCls='main'>
        <Col
          prefixCls='display'
          xs={24} sm={24} md={14}
          lg={14} xl={14}
        >
          <Row className='quick-actions'>{quickActionsSection}</Row>
          <Row className='display-wrapper'>{displayWrapperSection}</Row>
          <Row className='main-actions'>{mainActionsActions}</Row>
        </Col>
        <Col
          prefixCls='option'
          xs={24} sm={24} md={10}
          lg={10} xl={10}
        >
          {optionSection}
        </Col>
      </Row>
    </Layout>
  );
}

export default LayoutPOS;