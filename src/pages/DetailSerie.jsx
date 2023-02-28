import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { useConfigCarrousel } from "../hooks";
import Spinner from "../components/Spinner";
import { Seasons } from "../components/Seasons";
import { CreditCast } from "../components/CreditCast";
import { useDetailSerieQuery, useFetchCreditSerieQuery } from "../redux/api/apiSlice";
import "../less/detailSerie.less";

export const DetailSerie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/series");
  };

  const { data: serie, error, isLoading } = useDetailSerieQuery(id);

  const {
    data: credits,
    error: errorCredit,
    isLoading: isLoadingCredit,
  } = useFetchCreditSerieQuery(id);

  const { imageIndex, settings } = useConfigCarrousel();

  if (isLoading || isLoadingCredit) {
    return <Spinner />;
  }

  if (error) {
    console.log(error);
  }

  if (errorCredit) {
    console.log(error);
  }

  return (
    <div className='container-serie'>
      <div className='container-serie-detail'>
        <div className='img-fondo1'></div>
        <div className='container-serie-detail-img'>
          {serie.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original/${
                serie.backdrop_path || serie.poster_path
              }`}
              alt={serie.name}
            />
          )}
        </div>
        <div className='detail-serie'>
          <div>
            {serie.poster_path && (
              <img src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`} alt={serie.name} />
            )}
          </div>
          <div className='detail-info1'>
            <h1>{serie.name}</h1>
            {serie.genres &&
              serie.genres?.map(({ id, name }) => (
                <span className='genres' key={id}>
                  {name + " "}
                </span>
              ))}
            <span>{`(${serie.episode_run_time} min)`}</span>
            <p className='tagline'>{serie.tagline ? `"${serie.tagline}"` : ""}</p>
            <p>{serie.overview}</p>
            <div className='detail-info-rating'>
              <div className='detail-info-rating-average1'>
                <span>
                  <i className='fas fa-poll'></i>
                  {`${serie.vote_average}/10`}
                  <i className='fas fa-thumbs-up'></i>
                  {serie.vote_count}
                </span>
              </div>
            </div>

            <div className='networks'>
              {serie.networks &&
                serie.networks?.map(({ id, name, logo_path }) => (
                  <img key={id} src={`https://image.tmdb.org/t/p/w200/${logo_path}`} alt={name} />
                ))}
            </div>

            <div className='created-by'>
              <div className='creador'>
                <p>Creado por:</p>
                {serie.created_by &&
                  serie.created_by?.map(({ id, name }, index) => (
                    <span key={id}>
                      {name} {index !== serie.created_by.length - 1 ? ", " : "."}
                    </span>
                  ))}
              </div>

              <h5>Temporadas: {serie.number_of_seasons}</h5>
              <h5>Episodios: {serie.number_of_episodes}</h5>
            </div>

            <div className='detail-info-buttons'>
              <button>
                <a
                  href={`https://www.youtube.com/results?search_query=${serie.name}`}
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
            credits.cast?.map(({ id, profile_path, name, character }, index) => (
              <CreditCast
                ket={id}
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
      <h2>Temporadas</h2>
      <div className='seasons'>
        {serie.seasons &&
          serie.seasons?.map(({ id, name, poster_path, air_date, episode_count }) => (
            <Seasons
              id={id}
              name={name}
              poster_path={poster_path}
              airDate={air_date}
              episodeCount={episode_count}
            />
          ))}
      </div>

      <button onClick={handleClick} className='btn-back1'>
        Volver
      </button>
    </div>
  );
};
