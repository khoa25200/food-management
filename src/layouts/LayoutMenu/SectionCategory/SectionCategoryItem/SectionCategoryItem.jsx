import React from 'react';
import './SectionCategoryItem.less';
import { useSetRecoilState } from 'recoil';
import { categoryState } from '~/states/category.state';
import { useScroll } from '~/utils/useScroll';

function SectionCategoryItem({ id, cateImg, cateTitle }) {
  const scroll = useScroll()

  const setCategory = useSetRecoilState(categoryState);
  const handleClickCategory = (id) => {
    setCategory(id);
    scroll({ dataScroll: `#filter`, heightScroll: 64 });
  }

  return (
    <div className='category-item' onClick={() => handleClickCategory(id)}>
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