import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import Poster from "../img/default_poster.jpg";
import { useFetch, useConfigCarrousel } from "./../hooks";
import Spinner from "./Spinner";
import "../less/detailCast.less";

const DetailCast = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const { id } = useParams();

  const historia = window.history;

  const handleClick = () => {
    historia.go(-1);
  };

  const {
    data: cast,
    error,
    isLoading,
  } = useFetch(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=es-ES`);

  const {
    data: credits,
    error: errorCredits,
    isLoading: isLoadingCredits,
  } = useFetch(
    `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${apiKey}&language=es-ES`
  );

  const { imageIndex, settings } = useConfigCarrousel();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    console.log(error);
  }
  if (isLoadingCredits) {
    return <Spinner />;
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
                    alt=''
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

export default DetailCast;
