import React from 'react';
import './SectionDisplayPOS.less';
import { Col, Row } from 'antd';

function SectionDisplayPOS({ }) {
  return (
    <>
      <Row>
        <Col span={15}>1</Col>
        <Col span={3}>2</Col>
        <Col span={3}>3</Col>
        <Col span={3}>4</Col>
      </Row>
    </>
  );
}

export default SectionDisplayPOS;