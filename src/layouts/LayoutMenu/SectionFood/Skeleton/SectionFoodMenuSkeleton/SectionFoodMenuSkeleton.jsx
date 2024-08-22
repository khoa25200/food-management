import React from 'react';
import './SectionFoodMenuSkeleton.less';
import { Col, Row } from 'antd';
import SectionFoodItemSkeleton from '../SectionFoodItemSkeleton';

function SectionFoodMenuSkeleton({ repeat = 20 }) {
  const items = Array.from({ length: repeat }, (_, index) => index);
  return (
    <Row className='foods-section' >
      {items.map((item) => (
        <Col
          key={item}
          xs={{
            flex: '60%',
          }}
          sm={{
            flex: '50%',
          }}
          md={{
            flex: '50%',
          }}
          lg={{
            flex: '33.33%',
          }}
          xl={{
            flex: '20%',
          }}
        >
          <SectionFoodItemSkeleton className='category-food-ite' />
        </Col>
      ))}
    </Row>
  );
}

export default SectionFoodMenuSkeleton;