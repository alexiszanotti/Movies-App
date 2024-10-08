import { useParams } from "react-router-dom";
import Slider from "react-slick";
import Poster from "../assets/default_poster.jpg";
import { useConfigCarrousel } from "../hooks";
import "../less/detailMovie.less";
import Spinner from "../components/Spinner";
import { CreditCast } from "../components/CreditCast";
import { useDetailMovieQuery, useFetchCreditsQuery } from "../redux/api/apiSlice";

export const DetailMovie = () => {
  const { id } = useParams();

  const historia = window.history;

  const handleClick = () => {
    historia.go(-1);
  };

  const { data: movie, error, isLoading } = useDetailMovieQuery(id);

  const {
    data: credits,
    error: errorCredit,
    isLoading: isLoadingCredit,
  } = useFetchCreditsQuery(id);

  const { imageIndex, settings } = useConfigCarrousel();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    console.log(error);
  }

  if (isLoadingCredit) {
    return <Spinner />;
  }

  if (errorCredit) {
    console.log(error);
  }

  return (
    <main className='container-movie'>
      <article className='container-movie-detail'>
        <div className='img-fondo'></div>
        <div className='container-movie-detail-img'>
          {movie.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original/${
                movie.backdrop_path || movie.poster_path
              }`}
              alt={movie.title}
            />
          )}
        </div>
        <div className='detail-movie'>
          <div>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}` || Poster}
                alt={movie.title}
              />
            )}
          </div>
          <div className='detail-info'>
            <h1>{movie.title}</h1>
            {movie.genres &&
              movie.genres?.map(({ id, name }) => (
                <span className='genres-movie' key={id}>
                  {name + " "}
                </span>
              ))}
            <div className='runtime'>
              <span>{`(${movie.runtime} min)`}</span>
            </div>
            <p className='tagline'>{movie.tagline ? `"${movie.tagline}"` : ""}</p>
            <p>{movie.overview}</p>
            <div className='detail-info-rating'>
              <div className='detail-info-rating-average'>
                <span>
                  <i className='fas fa-poll'></i>
                  {`${movie.vote_average}/10`}
                </span>
                <span>
                  <i className='fas fa-thumbs-up'></i>
                  {movie.vote_count}
                </span>
              </div>
            </div>
            <div className='sitioWeb'>
              {movie?.homepage?.length > 3 && (
                <a href={movie.homepage} target='_blank' rel='noopener noreferrer'>
                  <i className='fas fa-link'></i>
                  <span>Sitio web</span>
                </a>
              )}
            </div>

            <div className='production-companies'>
              <p>Compañías de producción:</p>
              {movie.production_companies &&
                movie.production_companies?.map(({ id, name }, index) => (
                  <span key={id}>
                    {name} {index !== movie.production_companies.length - 1 ? ", " : ""}
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
      </article>
      <h2 className='reparto'>Reparto</h2>
      <div className='detail-cast1'>
        <Slider {...settings}>
          {credits.cast &&
            credits.cast?.map(({ profile_path, id, name, character, index }) => (
              <CreditCast
                key={id}
                id={id}
                profilePath={profile_path}
                name={name}
                character={character}
                index={index}
                imageIndex={imageIndex}
              />
            ))}
        </Slider>
      </div>
      <button onClick={handleClick} className='btn-back1'>
        Volver
      </button>
    </main>
  );
};
