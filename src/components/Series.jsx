import { useEffect, useState } from "react";
import Slider from "react-slick";
import "../less/series.less";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { Link } from "react-router-dom";

const Series = () => {
  const apiKey = "7c703bc4ce83a4e6ccf422ae071636e7";
  const [series, setSeries] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const getSeries = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=es-ES`
      );

      if (data.status === 200) {
        const resultado = await data.json();

        setSeries(resultado.results);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSeries();
  }, []);

  const NextArrow = ({ onClick }) => {
    return (
      <div className='arrow4 next4' onClick={onClick}>
        <VscChevronRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className='arrow4 prev4' onClick={onClick}>
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
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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

  return (
    <div className='container4'>
      <h1>Series populares</h1>
      <div className='serie-container'>
        <Slider {...settings}>
          {series?.map((series, index) => (
            <div
              key={series.id}
              className={index === imageIndex ? "slide4 activeSlide4" : "slide4"}
            >
              <Link to={`/serie/${series.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`}
                  alt={`${series.name}`}
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Series;
