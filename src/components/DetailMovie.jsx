import "../less/detailMovie.less";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ImgPerfil from "../img/Img-Default-Perfil.jpg";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const apiKey = process.env.REACT_APP_API_KEY;

const DetailMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [credits, setCredits] = useState({});
  const [imageIndex, setImageIndex] = useState(0);

  const historia = window.history;

  const handleClick = () => {
    historia.go(-1);
  };

  const getMovie = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-ES`
      );
      if (res.status === 200) {
        const data = await res.json();
        setMovie(data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCredits = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=es-ES`
      );

      if (res.status === 200) {
        const data = await res.json();
        setCredits(data);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const NextArrow = ({ onClick }) => {
    return (
      <div className='arrow1 next1' onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className='arrow1 prev1' onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const settings6 = {
    infinite: true,
    lazyLoad: false,
    speed: 500,
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 1,
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

  useEffect(() => {
    getMovie();
    getCredits();
  }, [id]);

  return (
    <div className='container-movie'>
      <div className='container-movie-detail'>
        <div className='img-fondo'></div>
        <div className='container-movie-detail-img'>
          {movie.backdrop_path ? (
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt='backdrop'
            />
          ) : (
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt='backdrop' />
          )}
        </div>
        <div className='detail-movie'>
          <div>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
          </div>
          <div className='detail-info'>
            <h1>{movie.title}</h1>
            {movie.genres &&
              movie.genres?.map((genre, index) => (
                <span key={genre.id}>
                  {genre.name} {index !== movie.genres.length - 1 ? "- " : ""}
                </span>
              ))}
            <span>{`(${movie.runtime} min)`}</span>
            <p>{movie.tagline ? `"${movie.tagline}"` : ""}</p>
            <p>{movie.overview}</p>
            <div className='detail-info-rating'>
              <div className='detail-info-rating-average'>
                <p>
                  {" "}
                  <span>
                    <i className='fas fa-poll'></i>
                  </span>
                  {`${movie.vote_average}/10`}
                </p>
              </div>
              <div className='detail-info-rating-count'>
                <p>
                  <i className='fas fa-thumbs-up'></i>
                  {movie.vote_count} <span>Votos</span>
                </p>
              </div>
            </div>
            <div className='sitioWeb'>
              <a href={movie.homepage} target='_blank' rel='noopener noreferrer'>
                <i className='fas fa-link'></i>
                <span>Sitio web</span>
              </a>
            </div>

            <div className='production-companies'>
              <p>Compañías de producción:</p>
              {movie.production_companies &&
                movie.production_companies?.map((company, index) => (
                  <span key={company.id}>
                    {company.name} {index !== movie.production_companies.length - 1 ? ", " : ""}
                  </span>
                ))}
            </div>

            <div className='detail-info-buttons'>
              <button>
                <a
                  href={`https://www.youtube.com/results?search_query=${movie.title}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Ver trailer <i className='fab fa-youtube'></i>
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2 className='reparto'>Reparto</h2>
      <div className='detail-cast1'>
        <Slider {...settings6}>
          {credits.cast &&
            credits.cast?.map(actor => (
              <div key={actor.id} className='slide1'>
                {actor.profile_path ? (
                  <Link to={`/personaje/${actor.id}`}>
                    <img
                      className='img-perfil'
                      src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                      alt={actor.name}
                    />
                  </Link>
                ) : (
                  <Link to={`/personaje/${actor.id}`}>
                    <img className='img-perfil' src={ImgPerfil} alt={actor.name} />
                  </Link>
                )}
                <div>
                  <h4>{actor.name}</h4>
                  <p>{actor.character}</p>
                </div>
              </div>
            ))}
        </Slider>
      </div>

      <button onClick={handleClick} className='btn-back1'>
        Volver
      </button>
    </div>
  );
};

export default DetailMovie;
