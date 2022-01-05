import { useEffect, useState } from "react";
import Slider from "react-slick";
import "../less/movie.less";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const apiKey = process.env.REACT_APP_API_KEY;

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const getMovies = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES`
      );

      if (data.status === 200) {
        const resultado = await data.json();

        setMovies(resultado.results);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);

  const NextArrow = ({ onClick }) => {
    return (
      <div className='arrow next' onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className='arrow prev' onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
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
        },
      },
    ],
  };

  return (
    <div className='container'>
      <h1>Peliculas populares</h1>
      <div className='movie-container'>
        <Slider {...settings}>
          {movies.map((movie, index) => (
            <div key={movie.id} className={index === imageIndex ? "slide activeSlide" : "slide"}>
              <Link to={`/pelicula/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={`${movie.title}`}
                />
              </Link>
              <h3>{movie.title}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Movies;
