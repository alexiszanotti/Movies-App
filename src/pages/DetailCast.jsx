import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import Poster from "../assets/default_poster.jpg";
import { useConfigCarrousel } from "../hooks";
import Spinner from "../components/Spinner";
import { useDetailActorQuery, useFetchCombinedCreditsQuery } from "../redux/api/apiSlice";
import "../less/detailCast.less";

export const DetailCast = () => {
  const { id } = useParams();

  const historia = window.history;

  const handleClick = () => {
    historia.go(-1);
  };

  const { data: cast, error, isLoading } = useDetailActorQuery(id);

  const {
    data: credits,
    error: errorCredits,
    isLoading: isLoadingCredits,
  } = useFetchCombinedCreditsQuery(id);

  const { imageIndex, settings } = useConfigCarrousel();

  if (isLoading || isLoadingCredits) {
    return <Spinner />;
  }

  if (error) {
    console.log(error);
  }

  if (errorCredits) {
    console.log(error);
  }

  return (
    <div className='cast-container'>
      <section className='cast-detail'>
        <div className='cast-img'>
          <img src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`} alt='' />
          <h2>Nacionalidad:</h2>
          <p>{cast.place_of_birth}</p>
          <h2>Fecha de nacimiento:</h2>
          <p>{cast.birthday && cast.birthday.split("-").reverse().join("-")}</p>
          {cast.homepage && (
            <>
              <h2>Web</h2>
              <a href={cast.homepage} target='_blank' rel='noreferrer'>
                {cast.homepage}
              </a>
            </>
          )}
        </div>
        <div className='cast-info'>
          <h1>{cast.name}</h1>
          <h2>Biografía:</h2>
          <p>{cast.biography ? cast.biography : "Biogrfía no disponible en español."}</p>
        </div>
      </section>
      <section className='more-info'>
        <div className='more-info-container'>
          <h1>También conocido como:</h1>
          {cast.also_known_as?.map(item => (
            <p key={item}>{item}</p>
          ))}
          <h1 className='genero'>Género:</h1>
          <p>{cast.gender === 2 ? "Masculino" : "Femenino"}</p>
        </div>
      </section>
      <section className='cast-credits'>
        <h1>Conocido por</h1>
        <div className='cast-credits-container'>
          <Slider {...settings}>
            {credits.cast?.map(({ id, poster_path, character, release_date }, index) => (
              <div key={id} className={index === imageIndex ? "slide7 activeSlide7" : "slide7"}>
                <Link to={`/pelicula/${id}`}>
                  <img
                    src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : Poster}
                    alt={character}
                  />
                </Link>
                <p>{character}</p>
                <p>{release_date ? `(${release_date.substring(0, 4)})` : ""}</p>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <button onClick={handleClick} className='btn-back1'>
        Volver
      </button>
    </div>
  );
};
