import React from 'react';
import './SectionCategoryItem.less';

function SectionCategoryItem({ cateImg, cateTitle }) {
  return (
    <div className='category-item'>
      <section>
        <div className='image'>
          <img src={cateImg} alt={cateTitle} fetchpriority="high" />
        </div>
        <div className='cate-title'>
          <h2>{cateTitle}</h2>
        </div>
      </section>
    </div>
  );
}

export default SectionCategoryItem;