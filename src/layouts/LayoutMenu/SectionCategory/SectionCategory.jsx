import React from 'react';
import './SectionCategory.less';
import CarousalBasic from '~/components/carousals/CarousalBasic';
import SectionCategoryItem from './SectionCategoryItem';
import { IMAGES } from '~/assets/images';

/**settings */
const settings = {
  autoplay: false,
  loop: true,
  pauseOnHover: true,
  slidesToShow: 9,
  responsive: [
    {
      breakpoint: 1250,
      settings: {
        slidesToShow: 6,
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
      }
    }
  ]
};

const items = [
  <SectionCategoryItem cateImg={IMAGES.cate1} cateTitle='Mì ramen' />,
  <SectionCategoryItem cateImg={IMAGES.cate1} cateTitle='Mì ramen' />,
  <SectionCategoryItem cateImg={IMAGES.cate1} cateTitle='Mì ramen' />,
  <SectionCategoryItem cateImg={IMAGES.cate1} cateTitle='Mì ramen' />,
  <SectionCategoryItem cateImg={IMAGES.cate1} cateTitle='Mì ramen' />,
  <SectionCategoryItem cateImg={IMAGES.cate1} cateTitle='Mì ramen' />,
  <SectionCategoryItem cateImg={IMAGES.cate1} cateTitle='Mì ramen' />,
  <SectionCategoryItem cateImg={IMAGES.cate1} cateTitle='Mì ramen' />,
  <SectionCategoryItem cateImg={IMAGES.cate1} cateTitle='Mì ramen' />,
  <SectionCategoryItem cateImg={IMAGES.cate1} cateTitle='Mì ramen' />,
  <SectionCategoryItem cateImg={IMAGES.cate1} cateTitle='Mì ramen' />,
  <SectionCategoryItem cateImg={IMAGES.cate1} cateTitle='Mì ramen' />,
  <SectionCategoryItem cateImg={IMAGES.cate1} cateTitle='Mì ramen' />,
  <SectionCategoryItem cateImg={IMAGES.cate1} cateTitle='Mì ramen' />,
  <SectionCategoryItem cateImg={IMAGES.cate1} cateTitle='Mì ramen' />,
];

function SectionCategory() {

  return (
    <section>
      <CarousalBasic itemsList={items} settings={settings} />
    </section>
  );
}

export default SectionCategory;