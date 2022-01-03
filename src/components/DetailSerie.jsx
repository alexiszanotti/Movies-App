import "../less/detailSerie.css";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ImgPerfil from "../img/Img-Default-Perfil.jpg";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const apiKey = process.env.REACT_APP_API_KEY;

const DetailSerie = () => {
  const { id } = useParams();
  const [serie, setSerie] = useState({});
  const [credits, setCredits] = useState({});
  const [imageIndex, setImageIndex] = useState(0);

  const getSerie = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=es-ES`
      );
      if (res.status === 200) {
        const data = await res.json();
        setSerie(data);
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
        `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}&language=es-ES`
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
      <div className='arrow3 next3' onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className='arrow3 prev3' onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 500,
    dots: true,
    rows: 1,
    slidesToShow: 4,
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
    getSerie();
    getCredits();
  }, [id]);

  return (
    <div className='container-serie'>
      <div className='container-serie-detail'>
        <div className='img-fondo1'></div>
        <div className='container-serie-detail-img'>
          {serie.backdrop_path ? (
            <img
              src={`https://image.tmdb.org/t/p/original/${serie.backdrop_path}`}
              alt='backdrop'
            />
          ) : (
            <img src={`https://image.tmdb.org/t/p/original/${serie.poster_path}`} alt='backdrop' />
          )}
        </div>
        <div className='detail-serie'>
          <div>
            <img src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`} alt={serie.name} />
          </div>
          <div className='detail-info1'>
            <h1>{serie.name}</h1>
            {serie.genres &&
              serie.genres.map((genre, index) => (
                <span key={genre.id}>
                  {genre.name} {index !== serie.genres.length - 1 ? "- " : ""}
                </span>
              ))}
            <span>{`(${serie.episode_run_time} min)`}</span>
            <p>{serie.tagline ? `"${serie.tagline}"` : ""}</p>
            <p>{serie.overview}</p>
            <div className='detail-info-rating'>
              <div className='detail-info-rating-average'>
                <p>
                  {" "}
                  <span>
                    <i className='fas fa-poll'></i>
                  </span>
                  {`${serie.vote_average}/10`}
                </p>
              </div>
              <div className='detail-info-rating-count'>
                <p>
                  <i className='fas fa-thumbs-up'></i>
                  {serie.vote_count} <span>Votos</span>
                </p>
              </div>
            </div>

            <div className='networks'>
              {serie.networks &&
                serie.networks.map(network => (
                  <div key={network.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200/${network.logo_path}`}
                      alt={network.name}
                    />
                  </div>
                ))}
            </div>

            <div className='created-by'>
              <div className='creador'>
                <p>Creado por:</p>
                {serie.created_by &&
                  serie.created_by.map((creator, index) => (
                    <span key={creator.id}>
                      {creator.name} {index !== serie.created_by.length - 1 ? ", " : ""}
                    </span>
                  ))}
              </div>

              <h5>Temporadas: {serie.number_of_seasons}</h5>
              <h5>Episodios: {serie.number_of_episodes}</h5>
            </div>

            <div className='detail-info-buttons'>
              <button>
                <a
                  href={`https://www.youtube.com/results?search_query=${serie.title}`}
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
      <h2>Reparto</h2>
      <div className='detail-cast'>
        <Slider {...settings}>
          {credits.cast &&
            credits.cast.map((actor, index) => (
              <div
                key={actor.id}
                className={index === imageIndex ? "slide8 activeSlide8" : "slide8"}
              >
                {actor.profile_path ? (
                  <img
                    className='img-perfil'
                    src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                    alt={actor.name}
                  />
                ) : (
                  <img className='img-perfil' src={ImgPerfil} alt={actor.name} />
                )}
                <div>
                  <h4>{actor.name}</h4>
                  <p>{actor.character}</p>
                </div>
              </div>
            ))}
        </Slider>
      </div>
      <Link to='/'>
        <button className='btn-back'>Volver</button>
      </Link>
    </div>
  );
};

export default DetailSerie;
