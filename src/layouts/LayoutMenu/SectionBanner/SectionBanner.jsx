import React from 'react';
import './SectionBanner.less';
import CarousalBasic from '~/components/carousals/CarousalBasic';
function SectionBanner() {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];

  return (
    <section>
      <CarousalBasic itemsList={items} />
    </section>
  );
}

export default SectionBanner;