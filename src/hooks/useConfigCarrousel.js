import React, { useState } from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

export const useConfigCarrousel = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const NextArrow = ({ onClick }) => {
    return (
      <div className='arrow next' onClick={onClick}>
        <VscChevronRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className='arrow prev' onClick={onClick}>
        <VscChevronLeft />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return {
    settings,
    imageIndex,
  };
};
