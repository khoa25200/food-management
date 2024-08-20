import React from 'react';
import './SectionFoodItem.less';
import { TagOutlined } from '@ant-design/icons';
import { convertVNDCurrency } from '~/utils/Helper';
function SectionFoodItem({ cateImg, name, desc, price }) {
  return (
    <div className='category-food-item'>
      <article>
        <div>
          <div className='tag'>
            <TagOutlined />
            <div>Ưu đãi</div>
          </div>
        </div>
        <div className='image'>
          <img src={cateImg} alt={name} />
        </div>
        <div className='main'>
          <div>
            <h3>{name}</h3>
            <p>{desc}</p>
            <div>
              <span>{convertVNDCurrency(price)}</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default SectionFoodItem;