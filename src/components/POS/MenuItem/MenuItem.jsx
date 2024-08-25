import React, { useState } from 'react';
import './MenuItem.less';
import { convertVNDCurrency } from '~/utils/Helper';
import { useSetRecoilState } from 'recoil';
import { orderTableLoading } from '~/states/pos.state';

function MenuItem({ dish, handleAddDish }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [imagePosition, setImagePosition] = useState({ top: 0, left: 0 });

  const handleClickDish = (e, id) => {
    const rect = e.target.getBoundingClientRect();
    setImagePosition({
      top: rect.top,
      left: rect.left,
    });
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);

    handleAddDish(id);
  };

  return (
    <>
      <div className='menu-item' onClick={(e) => handleClickDish(e, dish.id)} style={{ userSelect: 'none' }}>
        <img src={dish?.image} alt={dish?.name} />
        <span className="price-tag">{convertVNDCurrency(dish?.price)}</span>
        <div className="product-name">{dish?.name}</div>
      </div>
      {isAnimating && (
        <div
          className="animation-image"
          style={{
            top: imagePosition.top,
            left: imagePosition.left,
            backgroundImage: `url(${dish?.image})`,
          }}
        />
      )}
    </>
  );
}

export default MenuItem;
