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

function SectionCategory({categories}) {

  return (
    <section>
      <CarousalBasic itemsList={categories.map((cate)=><SectionCategoryItem key={cate.id} id={cate.id} cateImg={cate.image||IMAGES.cate1} cateTitle={cate.name}/>)} settings={settings} />
    </section>
  );
}

export default SectionCategory;