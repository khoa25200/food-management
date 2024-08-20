import React, { useRef } from 'react';
import Slider from "react-slick";
import './CarousalBasic.less';
import { DEFAULT_SLIDES_TO_SCROLL, DEFAULT_SLIDES_TO_SHOW, DEFAULT_SLIDES_TO_SPEED } from '~/configs/consts/carousal.const';
import { Button, Flex } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

function CarousalBasic({ itemsList = [], settings }) {
  const sliderRef = useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const settingsD = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: DEFAULT_SLIDES_TO_SPEED,
    loop: true,
    pauseOnHover: true,
    slidesToShow: DEFAULT_SLIDES_TO_SHOW,
    slidesToScroll: DEFAULT_SLIDES_TO_SCROLL,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };
  const settingOverride = settings ? {...settingsD, ...settings} : {...settingsD};
  
  return (
    <div className="slider-container">
      <Slider ref={sliderRef} {...settingOverride} className='slider'>
        {itemsList.map((item, index) => (
          <div key={index}>
            {item}
          </div>
        ))}
      </Slider>
      <div className='button-control'>
        <Flex align="center" justify="flex-end" gap="middle" className='flex'>
          <Button onClick={previous} aria-label="Previous Slide">
            <LeftOutlined />
          </Button>
          <Button onClick={next} aria-label="Next Slide">
            <RightOutlined />
          </Button>
        </Flex>
      </div>
    </div>
  );
}

export default CarousalBasic;
