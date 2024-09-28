import React, { useState } from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

export const useConfigCarrousel = (slideToShow = 5) => {
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
      <div className='arrow prev'>
        <VscChevronLeft onClick={onClick} />
      </div>
    );
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: slideToShow,
    centerMode: true,
    centerPadding: "10px",
    slidesToScroll: slideToShow,
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
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: false,
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
