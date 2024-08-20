import React from 'react';
import './SectionCategory.less';
import CarousalBasic from '~/components/carousals/CarousalBasic';
function SectionCategory() {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];
  const settings = {
    autoplay: false,
    loop: true,
    pauseOnHover: true,
    slidesToShow: 9
  };
  return (
    <section>
      <CarousalBasic itemsList={items} settings={settings} />
    </section>
  );
}

export default SectionCategory;