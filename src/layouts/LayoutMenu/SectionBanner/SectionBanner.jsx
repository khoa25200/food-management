import React from 'react';
import './SectionBanner.less';
import CarousalBasic from '~/components/carousals/CarousalBasic';
import SectionBannerItem from './SectionBannerItem';
import { IMAGES } from '~/assets/images';
const items = [
  <SectionBannerItem cateImg={IMAGES.cateBanner1}/>,
  <SectionBannerItem cateImg={IMAGES.cateBanner1}/>,
  <SectionBannerItem cateImg={IMAGES.cateBanner1}/>,
  <SectionBannerItem cateImg={IMAGES.cateBanner1}/>,
  <SectionBannerItem cateImg={IMAGES.cateBanner1}/>,
];

function SectionBanner() {

  return (
    <section>
      <CarousalBasic itemsList={items} />
    </section>
  );
}

export default SectionBanner;