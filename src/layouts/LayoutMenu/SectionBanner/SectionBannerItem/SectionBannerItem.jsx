import React from 'react';
import './SectionBannerItem.less';
function SectionBannerItem({cateImg, alt}) {
  return (
    <div className='category-banner-item'>
        <div className='image'>
          <img src={cateImg} alt={alt} fetchpriority="high" />
        </div>
    </div>
  );
}

export default SectionBannerItem;