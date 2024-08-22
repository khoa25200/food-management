import React from 'react';
import './SectionFoodItemSkeleton.less';
import { Skeleton } from 'antd';

function SectionFoodItemSkeleton() {
  return (
    <div className='category-food-item'>
      <Skeleton
        avatar
        paragraph={{
          rows: 4,
        }}
      />
    </div>
  );
}

export default SectionFoodItemSkeleton;